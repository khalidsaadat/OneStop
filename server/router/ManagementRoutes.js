const express = require('express')
const router = express.Router()
const managementController = require('../controllers/ManagementController')

// API routes
router.get('/getOccupiedDictionary', managementController.getOccupiedDictionary)
router.get('/getDeniedDictionary', managementController.getDeniedDictionary)

module.exports = router
