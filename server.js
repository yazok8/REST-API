import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db.js'
import Book from './model.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

// const router = express.Router()

//find books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find()
    res.json({ books })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//create one book
app.post('/books', async (req, res) => {
  const book = new Book({
    name: req.body.name,
    author: req.body.author,
    keywords: req.body.keywords,
  })
  try {
    const newBook = await book.save()
    res.status(201).json(newBook)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
// delete a book
app.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    await book.remove()
    res.json({ message: 'Book is removed' })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} `)
})
