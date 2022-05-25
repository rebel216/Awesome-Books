/* eslint-disable max-classes-per-file */

const AddBooks = document.getElementById('addBooks');

class BookList {
  constructor() {
    this.data = [];
  }

  addbook(book) {
    this.data.push(book);
    localStorage.setItem('bookdata', JSON.stringify(this.data));
  }

  removeBook(id) {
    const book = document.getElementById(id);
    book.remove();
    this.data = this.data.filter((bookObj) => bookObj.id !== id);
    localStorage.setItem('bookdata', JSON.stringify(this.data));
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
  const BookListUi = document.getElementById('Bookcollection');
  const bookList = document.createElement('li');
  bookList.classList.add('book-item');
  bookList.setAttribute('id', bookOBJ.id);
  bookList.innerHTML = `${bookOBJ.Title}by ${bookOBJ.Author}`;
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
  document.getElementById('bookAuthor').value = '';
  document.getElementById('bookTitle').value = '';
  e.preventDefault();
});

window.onload = () => {
  booklist.data = JSON.parse(localStorage.getItem('bookdata' || '[]'));
  if (booklist.data === null) {
    booklist.data = [];
    return;
  }

  booklist.data.forEach((book) => CreateUIBookList(book));
};

// eslint-disable-next-line no-unused-vars
function display(section) {
  const BookList = document.getElementById('Bookcollection');
  const Form = document.getElementById('addBooks');
  const Contact = document.getElementById('Contactinfo');
  const heading = document.getElementById('title');
  const linkAllBooks = document.getElementById('link');
  const linkAddBook = document.getElementById('newBook');
  const linkContact = document.getElementById('Contact');

  switch (section) {
    case 'Bookcollection':
      BookList.style.display = 'grid';
      linkAllBooks.style.color = 'blue';
      linkAddBook.style.color = 'black';
      linkContact.style.color = 'black';
      Form.style.display = 'none';
      Contact.style.display = 'none';
      heading.innerHTML = 'All Awesome Books';
      break;

    case 'addBooks':
      BookList.style.display = 'none';
      Form.style.display = 'flex';
      linkAllBooks.style.color = 'black';
      linkAddBook.style.color = 'blue';
      linkContact.style.color = 'black';
      Contact.style.display = 'none';
      heading.innerHTML = 'Add a New Book';
      break;

    case 'Contactinfo':
      BookList.style.display = 'none';
      Form.style.display = 'none';
      linkAllBooks.style.color = 'black';
      linkAddBook.style.color = 'black';
      linkContact.style.color = 'blue';
      Contact.style.display = 'block';
      heading.innerHTML = 'Contact Information';
      break;

    default: break;
  }
}