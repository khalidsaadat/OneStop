const express = require('express')
const router = express.Router()
const managementController = require('../controllers/ManagementController')

// API routes
router.get('/managementController', managementController.firstApi)

module.exports = router
