const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()


const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(
            config.get('mongoUri'),
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        )
        app.listen(PORT, () => { console.log('>>> server has been started on port ', PORT); })

    } catch (error) {
        console.log('>>> Server error, in mongo function', error.message);
        process.exit(1)
    }
}

start()