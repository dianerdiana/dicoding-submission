import { AppService } from './AppService.js';
import { STORAGE_NAME } from './constant.js';

function main() {
  const appService = new AppService(STORAGE_NAME);
  appService.initializeData();
  appService.renderBooks();

  // Book Form Elements
  const formCreate = document.getElementById('bookForm');
  const inputTitle = document.getElementById('bookFormTitle');
  const inputAuthor = document.getElementById('bookFormAuthor');
  const inputYear = document.getElementById('bookFormYear');
  const checkboxIsComplete = document.getElementById('bookFormIsComplete');

  // Button Element
  const bookItemIsCompleteButton = document.querySelector(
    '[data-testid="bookItemIsCompleteButton"]'
  );

  formCreate.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = inputTitle.value.trim();
    const author = inputAuthor.value.trim();
    const year = inputYear.value.trim();
    const isComplete = checkboxIsComplete.checked;

    appService.createBook(title, author, year, isComplete);
    formCreate.reset();
    appService.renderBooks();
    alert(`Buku dengan judul "${title}" berhasil ditambahkan`);
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-testid="bookItemIsCompleteButton"]')) {
      const bookItem = e.target.closest('[data-testid="bookItem"]');
      const bookId = bookItem.getAttribute('data-bookid');

      appService.updateStatusBookById(bookId);
      appService.renderBooks();
    }

    if (e.target.matches('[data-testid="bookItemDeleteButton"]')) {
      const bookItem = e.target.closest('[data-testid="bookItem"]');
      const bookId = bookItem.getAttribute('data-bookid');

      appService.deleteBookById(bookId);
      appService.renderBooks();
    }
  });
}

document.addEventListener('DOMContentLoaded', main);
