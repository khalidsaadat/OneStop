const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

// const { connectToMongoDB } = require('./utilities/MongoDBConnection')

// API Routes
const manageRouter = require('./router/ManagementRoutes')

// Create an instance of Express
const app = express()
app.use(express.json())
app.use(cors())

// connectToMongoDB()

// Start the server
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

// Parse incoming JSON requests
app.use(express.json())

// Routes
app.use('/api/management', manageRouter)
