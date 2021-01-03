const mongoose = require('mongoose')
const { getConnectionString } = require('../tools/db')

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

const connectDB = async () => {
  const connection = await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  console.log(`MongoDB connected to ${connectionString}`.cyan.underline.bold)
}

module.exports = connectDB
