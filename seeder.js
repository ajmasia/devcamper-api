const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const { getConnectionString } = require('./server/tools/db')
const dotenv = require('dotenv')

// Load end vars
dotenv.config()

// Load models
const Bootcamp = require('./server/models/Bootcamp')

// Connect to database
const {
  DATABASE_DATABASE: db,
  DATABASE_HOST: host,
  DATABASE_PASSWORD: pw,
  DATABASE_PORT: port,
  DATABASE_REPLICA_SET: replicaSetName,
  DATABASE_SSL: ssl,
  DATABASE_USER: user,
} = process.env
const connectionString = getConnectionString({
  host,
  db,
  pw,
  port,
  replicaSetName,
  ssl,
  user,
})
const connection = mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
)

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps)
    console.log('Data Imported...'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany()
    console.log('Data Destroyed...'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
