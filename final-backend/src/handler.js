const { nanoid } = require('nanoid')
const books = require('./books')
const { BuildErrorResponse, BuildSuccessResponse } = require('./response')
const { errs, success } = require('./messages')

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  // attribute checking

  if (name === undefined) {
    const response = BuildErrorResponse(h, 'fail', errs.FAIL_EMPTY_NAME)
    response.code(400)
    return response
  }

  if (readPage > pageCount) {
    const response = BuildErrorResponse(h, 'fail', errs.FAIL_READPAGE)
    response.code(400)
    return response
  }

  const id = nanoid(16)

  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt
  const finished = (readPage === pageCount)

  const newbook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    id,
    insertedAt,
    updatedAt,
    finished
  }

  books.push(newbook)
  const isSuccess = books.filter((book) => book.id === id).length > 0

  if (isSuccess) {
    const response = BuildSuccessResponse(h, 'success', success.OK_NEW_BOOK, id)

    response.code(201)
    return response
  }
}

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query
  const bookReturn = []

  if (name !== undefined) {
    const nameLower = name.toLowerCase()

    books.forEach(book => {
      const bookLower = book.name.toLowerCase()
      if (bookLower.indexOf(nameLower) !== -1) {
        bookReturn.push(book)
      }
    })

    const response = h.response({
      status: 'success',
      data: {
        books: bookReturn.map(book => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    })

    response.code(200)
    return response
  }

  if (reading !== undefined) {
    const isReading = reading !== '0'

    const booksReading = books.filter((n) => n.reading === isReading)

    const response = h.response({
      status: 'success',
      data: {
        books: booksReading.map(book => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    })

    response.code(200)
    return response
  }

  if (finished !== undefined) {
    const isFinished = finished !== '0'

    const booksFinished = books.filter((n) => n.finished === isFinished)
    const response = h.response({
      status: 'success',
      data: {
        books: booksFinished.map(book => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    })

    response.code(200)
    return response
  }

  const response = h.response({
    status: 'success',
    data: {
      books: books.map(book => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }))
    }
  })

  response.code(200)
  return response
}

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params

  const book = books.filter((n) => n.id === bookId)[0]

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book
      }
    }
  }
  const response = BuildErrorResponse(h, 'fail', errs.FAIL_NOBOOK)

  response.code(404)
  return response
}

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const updatedAt = new Date().toISOString()

  if (name === undefined) {
    const response = BuildErrorResponse(h, 'fail', errs.FAIL_PUT_EMPTY_NAME)
    response.code(400)
    return response
  }

  if (readPage > pageCount) {
    const response = BuildErrorResponse(h, 'fail', errs.FAIL_PUT_READPAGE)
    response.code(400)
    return response
  }

  const index = books.findIndex((book) => book.id === bookId)

  if (index === -1) {
    const response = BuildErrorResponse(h, 'fail', errs.FAIL_ID_NOTFOUND)
    response.code(404)
    return response
  } else if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    }

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })

    response.code(200)
    return response
  }
}

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params

  const index = books.findIndex((book) => book.id === bookId)

  if (index !== -1) {
    books.splice(index, 1)

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const response = BuildErrorResponse(h, 'fail', errs.FAIL_DEL_ID_NOTFOUND)
  response.code(404)
  return response
}

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler }
