const BASE_URL = '/api';

export async function getBooks() {
  const res = await fetch(`${BASE_URL}/books`);
  return res.json();
}

export async function addBook(data) {
  const res = await fetch(`${BASE_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-role': 'admin'   // ← ADMIN
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteBook(id) {
  const res = await fetch(`${BASE_URL}/books/${id}`, {
    method: 'DELETE',
    headers: {
      'x-user-role': 'admin'   // ← ADMIN
    }
  });
  return res.json();
}

export async function borrowBook(data) {
  const res = await fetch(`${BASE_URL}/borrow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-role': 'user',   // ← USER
      'x-user-id': '1'
    },
    body: JSON.stringify(data)
  });
  return res.json();
}