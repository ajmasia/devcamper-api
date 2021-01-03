const mongoose = require('mongoose')

const {
  DATABASE_DATABASE: db,
  DATABASE_HOST: host,
  DATABASE_PASSWORD: pw,
  DATABASE_PORT: port,
  DATABASE_REPLICA_SET: replicaSetName,
  DATABASE_SSL: ssl,
  DATABASE_USER: user,
} = process.env

function getConnectionString({
  host,
  db,
  pw,
  port,
  replicaSetName,
  ssl,
  user,
}) {
  const credentials = user ? `${user}:${pw}@` : ''
  const replicaSetOption = replicaSetName ? `replicaSet=${replicaSetName}` : ''
  const sslOption = ssl ? `ssl=true` : ''

  return `mongodb://${credentials}${host}:${port}/${db}?${[
    replicaSetOption,
    sslOption,
  ].join('&')}`
}

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
    userNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  console.log(
    `MongoDB connected: ${connection.connection.host}`.cyan.underline.bold
  )
}

module.exports = connectDB
