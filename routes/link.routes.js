const { Router } = require('express')
const Link = require('../models/Link')
const router = Router()
const config = require('config')
const shortid = require('shortid')

router.post('/generate', async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const longLink = req.body.longLink
        const code = shortid.generate()

        const existing = await Link.findOne({ longLink })
        if (existing) {
            return res.status(201).json(existing)
        } else {
            const shortLink = baseUrl + '/t/' + code
            const link = await new Link({
                longLink,
                shortLink,
                code,
            })
            await link.save()
            return res.status(201).json(link)
        }

    } catch (error) {
        res.status(500).json({ message: 'что-то пошло не так, попробуйте снова' })
        console.log('Error in generate and save link');
    }
})


router.get('/', async (req, res) => {
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