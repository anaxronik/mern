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
        console.log('New request on /api/auth/login', '\nRequest body: ', req.body);
        try {
            const { email, password } = req.body

            if (email == '' || !email.includes('@') || !email.includes('.')) {
                return res.status(400).json({ message: 'Некоректный email' })
            }

            if (password.length <= 6) {
                return res.status(400).json({ message: 'Слишком короткий пароль' })
            }

            const user = await User.findOne({ email })
            if (!user) {
                console.log('User not found in db')
                return res.status(500).json({ message: 'Пользователь не найден' })
            } else {
                console.log('Find user in db')
            }

            const isMatch = await bcrypt.compare(password, user.password)
            console.log('Try passwords', password, isMatch)
            if (!isMatch) {
                console.log('Password NOT correct')
                return res.status(400).json({ message: 'Пароль не верный' })
            } else {
                console.log('Password is correct')
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })
            console.log('Response sended')

        } catch (err) {
            res.status(500).json({ message: 'Ошибка при попытке логина' })
            console.log('Login failed')
        }
    })

module.exports = router
