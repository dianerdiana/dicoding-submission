function main() {
  const appService = new AppService(STORAGE_NAME);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const bookId = urlParams.get('bookId');
  const book = appService.getBookById(bookId);

  // Book Form Elements
  const bookForm = document.getElementById('bookForm');
  const inputTitle = document.getElementById('bookFormTitle');
  const inputAuthor = document.getElementById('bookFormAuthor');
  const inputYear = document.getElementById('bookFormYear');
  const checkboxIsComplete = document.getElementById('bookFormIsComplete');

  inputTitle.defaultValue = book.title;
  inputAuthor.defaultValue = book.author;
  inputYear.defaultValue = book.year;
  checkboxIsComplete.checked = book.isComplete;

  bookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = inputTitle.value.trim();
    const author = inputAuthor.value.trim();
    const year = Number(inputYear.value.trim());
    const isComplete = checkboxIsComplete.checked;

    if (typeof year !== 'number') {
      return alert('Tahun harus berupa angka.');
    }

    appService.updateBookById(bookId, title, author, year, isComplete);
    bookForm.reset();
    alert(`Berhasil mengubah data buku`);
    window.location.href = 'index.html';
  });
}

document.addEventListener('DOMContentLoaded', main);
