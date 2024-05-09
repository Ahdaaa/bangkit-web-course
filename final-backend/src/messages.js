const errs = {
  FAIL_EMPTY_NAME: 'Gagal menambahkan buku. Mohon isi nama buku',
  FAIL_READPAGE: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
  FAIL_NOBOOK: 'Buku tidak ditemukan',
  FAIL_ID_NOTFOUND: 'Gagal memperbarui buku. Id tidak ditemukan',
  FAIL_PUT_EMPTY_NAME: 'Gagal memperbarui buku. Mohon isi nama buku',
  FAIL_PUT_READPAGE: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
  FAIL_DEL_ID_NOTFOUND: 'Buku gagal dihapus. Id tidak ditemukan'
}

const success = {
  OK_NEW_BOOK: 'Buku berhasil ditambahkan'
}

module.exports = { errs, success }
