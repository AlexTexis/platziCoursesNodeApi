import { MongoClient } from 'mongodb'
import { config } from '../config/index'
import chalk from 'chalk'


const MONGO_URI = `mongodb://${config.pro.DB_USER}:${config.pro.DB_PASSWORD}@${config.pro.DB_HOST}:${config.pro.DB_PORT}/?authSource=${config.pro.DB_NAME}`
let INSTANCE_CONNECTION = null

const setupConnect = async () => {
  let client
  try 
  {
    if(INSTANCE_CONNECTION)  return INSTANCE_CONNECTION
    
    client = await MongoClient.connect(MONGO_URI,{useNewUrlParser : true})
    INSTANCE_CONNECTION = await client.db(config.pro.DB_NAME)
    console.log(chalk.bgGreen('CONNECT SUCCESFUL'))
  }
  catch(e)
  {
    console.log(chalk.bgRed(e.name))
    process.exit(1)
  }

  return INSTANCE_CONNECTION
}

export const GET_ALL =  async({collection,filter={}}={}) => {
  let elements
  let db

  db = await setupConnect()
  elements = await db.collection(collection).find(filter).toArray()

  return elements
}


export const GET_ONE =  async({collection,filter={}}={}) => {
  let element
  let db

  db = await setupConnect()
  element = await db.collection(collection).findOne(filter)

  return element
}

export const GET_ONE_WITH_PROYECTION =  async({collection,filter,proyection}={}) => {
  let element
  let db
  db = await setupConnect()
  element = await db.collection(collection).findOne(filter,proyection)

  return element
}

export const CREATE =  async({collection,input={}}={}) => {
  let element
  let db

  db = await setupConnect()
  element = await db.collection(collection).insertOne(input)
 
  return element.ops[0]
}

export const UPDATE =  async({collection,query={},filter={}}={}) => {
  let element
  let db

  db = await setupConnect()
  element = await db.collection(collection).findOneAndUpdate(filter,query)
  return element.value
}

export const DELETE =  async({collection,query={}}={}) => {
  let element
  let db

  db = await setupConnect()
  element = await db.collection(collection).findOneAndDelete(query)

  return element.value._id
}

