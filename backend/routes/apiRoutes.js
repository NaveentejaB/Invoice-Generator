const express = require('express')
const api = require('../controllers/api')

const Router = express.Router()

Router.post('/generate-inovice',api.makePdf)

module.exports = Router