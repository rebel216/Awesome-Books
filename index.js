/* eslint-disable max-classes-per-file */

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
// window.localStorage.removeItem('bookdata');
const AddBooks = document.getElementById('addBook-btn');

let BookList = [];

function addbook(book) {
  // this.data.push(book);
  BookList.push(book);
  localStorage.setItem('bookdata', JSON.stringify(BookList || '[]'));
}

function Book(Title, Author) {
  this.Title = Title;
  this.Author = Author;
  this.id = Math.random();
}

function getBook() {
  const Title = document.getElementById('bookTitle').value;
  const Author = document.getElementById('bookAuthor').value;
  // const book = new Book(Title, Author);
  const book = new Book(Title, Author);
  document.getElementById('bookTitle').value = '';
  document.getElementById('bookAuthor').value = '';
  return book;
}

function CreateUIBookList(bookOBJ) {
  const BookListUi = document.getElementById('Book-List');
  const bookList = document.createElement('div');
  bookList.classList.add('list');
  bookList.setAttribute('id', bookOBJ.id);
  bookList.innerHTML = `<p>${bookOBJ.Title} <br/> by ${bookOBJ.Author}</p>`;
  const deleteBook = document.createElement('button');
  deleteBook.innerHTML = 'Remove';
  deleteBook.addEventListener('click', () => {
    const book = document.getElementById(bookOBJ.id);
    book.remove();
    console.log(BookList);
    BookList = BookList.filter((book) => book.id !== bookOBJ.id);
    localStorage.setItem('bookdata', JSON.stringify(BookList));
    console.log(BookList);
  });
  bookList.appendChild(deleteBook);
  BookListUi.appendChild(bookList);
}

AddBooks.addEventListener('click', () => {
  const newbook = getBook();
  addbook(newbook);
  CreateUIBookList(newbook);
});

window.onload = () => {
  const bookl = JSON.parse(localStorage.getItem('bookdata' || '[]'));
  if (bookl === null) {
    localStorage.setItem('bookdata', JSON.stringify(initialData));
  }
  localStorage.setItem('bookdata', JSON.stringify(bookl));
  for (let i = 0; i < bookl.length; i += 1) {
    CreateUIBookList(bookl[i]);
  }
};
