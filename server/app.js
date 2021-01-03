const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')

// Routes
const bootcamps = require('./routes/bootcamps')

// Get env vars
dotenv.config()

// Connect to de database
connectDB()

// Create an express app
const app = express()

// Dev logger middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Mount routes
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

// Handle unhandled promises rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  // Close server & exit process
  server.close(() => process.exit(1))
})
