exports.getConnectionString = ({
  host,
  db,
  pw,
  port,
  replicaSetName,
  ssl,
  user,
}) => {
  const credentials = user ? `${user}:${pw}@` : ''
  const replicaSetOption = replicaSetName ? `replicaSet=${replicaSetName}` : ''
  const sslOption = ssl ? `ssl=true` : ''

  return `mongodb://${credentials}${host}:${port}/${db}?${[
    replicaSetOption,
    sslOption,
  ].join('&')}`
}
