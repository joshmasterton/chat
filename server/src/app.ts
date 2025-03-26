import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

// Setup app
export const app = express()
const { PORT, NODE_ENV } = process.env

// Global get route
app.get('/', (_req, res) => {
  res.json('welcome to chat api')
})

// Listen to server
if (NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Listening to port on port ${PORT}`)
  })
}
