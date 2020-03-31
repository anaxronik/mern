const { Router } = require('express')
const Link = require('../models/Link')
const router = Router()
const auth = require('../midleware/auth.midleware')

router.post('/generate', async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: 'что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId })
    } catch (error) {
        res.status(500).json({ message: 'что-то пошло не так, попробуйте снова' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (error) {
        res.status(500).json({ message: 'что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router