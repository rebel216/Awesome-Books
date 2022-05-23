/* eslint-disable max-classes-per-file */

const AddBooks = document.getElementById('addBooks');

class BookList {
  constructor() {
    this.data = [];
  }

  addbook(book) {
    this.data.push(book);
  }

  removeBook(id) {
    const book = document.getElementById(id);
    book.remove();
    this.data = this.data.filter((bookObj) => bookObj.id !== id);
  }
}

class Book {
  constructor(Title, Author) {
    this.Title = Title;
    this.Author = Author;
    this.id = Math.random();
  }
}

const booklist = new BookList();

function getBook() {
  const Title = document.getElementById('bookTitle').value;
  const Author = document.getElementById('bookAuthor').value;
  const book = new Book(Title, Author);
  Title.value = '';
  Author.value = '';
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
  deleteBook.addEventListener('click', () => booklist.removeBook(bookOBJ.id));
  bookList.appendChild(deleteBook);
  BookListUi.appendChild(bookList);
}

AddBooks.addEventListener('submit', (e) => {
  const newbook = getBook();
  booklist.addbook(newbook);
  CreateUIBookList(newbook);
  e.preventDefault();
});
