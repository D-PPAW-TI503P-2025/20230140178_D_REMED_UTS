const BASE_URL = 'http://localhost:3001/api';

/* ======================
   HELPER RESPONSE
====================== */
async function handleResponse(res) {
  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('Response tidak valid dari server');
  }

  if (!res.ok) {
    throw new Error(data.message || 'Terjadi kesalahan');
  }

  return data;
}

/* ======================
   BOOK (PUBLIC)
====================== */
export async function getBooks() {
  const res = await fetch(`${BASE_URL}/books`);
  return handleResponse(res);
}

/* ======================
   BOOK (ADMIN)
====================== */
export async function addBook(data) {
  const res = await fetch(`${BASE_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-role': 'admin'
    },
    body: JSON.stringify({
      title: data.title,
      author: data.author,
      stock: Number(data.stock)
    })
  });

  return handleResponse(res);
}

export async function deleteBook(id) {
  const res = await fetch(`${BASE_URL}/books/${id}`, {
    method: 'DELETE',
    headers: {
      'x-user-role': 'admin'
    }
  });

  return handleResponse(res);
}

/* ======================
   BORROW (USER)
====================== */
export async function borrowBook(bookId) {
  const res = await fetch(`${BASE_URL}/borrow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-role': 'user',
      'x-user-id': '1'
    },
    body: JSON.stringify({
      bookId,
      latitude: -7.8092146,
      longitude: 110.3222707
    })
  });

  return handleResponse(res);
}
