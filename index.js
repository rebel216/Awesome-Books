/* eslint-disable max-classes-per-file */

const AddBooks = document.getElementById('addBooks');

// class BookList {
//   constructor() {
//     this.data = [];
//   }
let BookList = [];

function addbook(book) {
  // this.data.push(book);
  BookList.push(book);
  localStorage.setItem('bookdata', JSON.stringify(BookList || '[]'));
}

// class Book {
//   constructor(Title, Author) {
//     this.Title = Title;
//     this.Author = Author;
//     this.id = Math.random();
//   }
// }
function Book(Title, Author) {
  this.Title = Title;
  this.Author = Author;
  this.id = Math.random();
}

// const booklist = new BookList();

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
    BookList = BookList.filter((bookOj) => bookOj.id !== bookOBJ.id);
    localStorage.setItem('bookdata', JSON.stringify(BookList));
  });
  bookList.appendChild(deleteBook);
  BookListUi.appendChild(bookList);
}

AddBooks.addEventListener('submit', (e) => {
  const newbook = getBook();
  addbook(newbook);
  CreateUIBookList(newbook);
  e.preventDefault();
});

window.onload = () => {
  const bookl = JSON.parse(localStorage.getItem('bookdata' || '[]'));
  if (BookList === null) {
    return;
  }
  console.log(bookl);
  BookList.foreach((book) => CreateUIBookList(book));
};