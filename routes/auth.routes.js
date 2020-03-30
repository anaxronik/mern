const { Router } = require('express');
const User = require('../models/User');
const router = Router()
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

// /api/auth/register
router.post('/register',
    async (req, res) => {
        console.log('New request on /api/auth/register', '\nRequest body: ', req.body);
        try {
            const { email, password } = req.body

            if (email == '' || !email.includes('@') || !email.includes('.')) {
                return res.status(400).json({ message: 'Некоректный email' })
            }

            if (password.length <= 6) {
                return res.status(400).json({ message: 'Слишком короткий пароль' })
            }

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
            res.status(201).json({ message: `Пользователь ${user.email} успешно создан` })
            console.log('Create new user, with email: ', user.email)


        } catch (err) {
            console.log('Error in route /api/auth/register');
            res.status(500).json({ message: 'Ошибка при регистрации нового пользователя' })
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
