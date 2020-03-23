const { Router } = require('express');
const User = require('../models/User');
const router = Router()
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

// /api/auth/register
router.post('/register',
    [
        check('email', 'Not correct email').isEmail(),
        check('password', 'Password short, need 6+ symbols').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array,
                    message: 'Uncorrect data for registration'
                })
            }

            const { email, password } = req.body

            const candidate = await User.findOne({ email })
            if (candidate) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                email: email,
                password: hashedPassword,
            })
            await user.save()
            res.status(201).json({ message: 'user has been created' })


        } catch (err) {
            res.status(500).json({ message: 'Error' })
        }
    })


// /api/auth/login
router.post('/login',
    [
        check('email', 'enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array,
                    message: 'Uncorrect data for login'
                })
            }
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(500).json({ message: 'Error' })
            }

            const isMatch = bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ message: 'Password incorrect' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })

        } catch (err) {
            res.status(500).json({ message: 'Error' })
        }
    })

module.exports = router
