const BuildErrorResponse = (h, httpStatus, message) => {
  const response = h.response({
    status: httpStatus,
    message
  })

  return response
}

const BuildSuccessResponse = (h, httpStatus, message, bookID) => {
  const response = h.response({
    status: httpStatus,
    message,
    data: {
      bookId: bookID
    }
  })
  return response
}

module.exports = { BuildErrorResponse, BuildSuccessResponse }
