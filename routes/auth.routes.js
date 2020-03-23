const { Router } = require('express');
const router = Router()

// /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body
    } catch (err) {
        res.status(500).json({ message: 'Error' })
    }
})

router.post('/login', async (req, res) => { })

module.exports = router
