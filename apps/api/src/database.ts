import express, { Request, Response } from 'express'

const { Pool } = require('pg')
const app = express()

const dbPool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'workoutloud',
  database: 'workoutloud',
})

export { dbPool }
