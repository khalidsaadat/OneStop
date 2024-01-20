const express = require('express')
const router = express.Router()
const managementController = require('../controllers/ManagementController')

// API routes
router.get('/firstApi', managementController.firstApi)

module.exports = router
