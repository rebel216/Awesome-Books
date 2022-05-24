const initialData = [
  {
    id: '176543',
    Title: "Santa's Apprentice",
    Author: 'Nicolle Plackstone',
  },
  {
    id: '223244556',
    Title: 'History Is Made at Night',
    Author: 'Eduard Ekell',
  },
  {
    id: '3324',
    Title: 'Hercules',
    Author: 'Ofelia Lockless',
  },
];
const addBooks = document.getElementById('addBook-btn');

let BookList = [];

function addBook(book) {
  BookList.push(book);
  localStorage.setItem('bookData', JSON.stringify(BookList || '[]'));
}

function Book(Title, Author) {
  this.Title = Title;
  this.Author = Author;
  this.id = Math.random();
}

function getBook() {
  const Title = document.getElementById('bookTitle').value;
  const Author = document.getElementById('bookAuthor').value;
  const book = new Book(Title, Author);
  document.getElementById('bookTitle').value = '';
  document.getElementById('bookAuthor').value = '';
  return book;
}

function CreateUIBookList(bookOBJ) {
  const BookListUi = document.getElementById('book-list');
  const bookList = document.createElement('div');
  bookList.classList.add('list');
  bookList.setAttribute('id', bookOBJ.id);
  bookList.innerHTML = `<p>${bookOBJ.Title} <br/> by ${bookOBJ.Author}</p>`;
  const deleteBook = document.createElement('button');
  deleteBook.innerHTML = 'Remove';
  deleteBook.addEventListener('click', () => {
    const book = document.getElementById(bookOBJ.id);
    book.remove();
    BookList = BookList.filter((book) => book.id !== bookOBJ.id);
    localStorage.setItem('bookData', JSON.stringify(BookList));
  });
  bookList.appendChild(deleteBook);
  BookListUi.appendChild(bookList);
}

addBooks.addEventListener('click', () => {
  const newBook = getBook();
  addBook(newBook);
  CreateUIBookList(newBook);
});

window.onload = () => {
  const bookList = JSON.parse(localStorage.getItem('bookData' || '[]'));
  if (bookList === null) {
    localStorage.setItem('bookData', JSON.stringify(initialData));
  }
  localStorage.setItem('bookData', JSON.stringify(bookList));
  for (let i = 0; i < bookList.length; i += 1) {
    CreateUIBookList(bookList[i]);
  }
};
