import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db.js'
import Book from './bookModel.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

//find all books and find books by keyword
app.get('/books', async (req, res) => {
  try {
    const keyword = req.query.keywords
      ? {
          name: {
            $regex: req.query.keywords,
            $options: 'i',
          },
        }
      : {}
    const books = await Book.find({ ...keyword })
    res.json(books)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//create one book
app.post('/book', async (req, res) => {
  const book = new Book({
    name: req.body.name,
    author: req.body.author,
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
