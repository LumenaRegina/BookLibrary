const library = [];

const addBookBtn = document.querySelector(".modalBtn");
const inputTitle = document.getElementById("bookTitle");
const inputAuthor = document.getElementById("bookAuthor");
const inputYear = document.getElementById("bookYear");
const inputPages = document.getElementById("bookPages");
const inputIsRead = document.getElementById("bookIsRead");
const formElement = document.getElementById("bookentry");
const main = document.querySelector(".librarysection");

function Book(title, author, year, pages, isRead) {
  this.UUID = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary() {
  const title = inputTitle.value;
  const author = inputAuthor.value;
  const year = inputYear.value;
  const pages = inputPages.value;
  const isRead = inputIsRead.checked;
  const newBook = new Book(title, author, year, pages, isRead);
  library.push(newBook);

  formElement.reset();
  renderBooks();
}
addBookBtn.addEventListener("click", addBookToLibrary);
document.querySelector(".cancel").addEventListener("click", () => {
  formElement.reset();
});

function createSpan(className, label, value) {
  const span = document.createElement("span");
  span.className = className;
  const em = document.createElement("em");
  em.textContent = label;
  span.append(em, value);
  return span;
}

function createCard(author, title, pages, year, isRead, UUID) {
  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("id", UUID);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "bookIcon");

  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", "/icons/book.svg");

  const readSpan = document.createElement("span");
  readSpan.className = "isRead";
  const em = document.createElement("em");
  em.textContent = "Read: ";

  const readBtn = document.createElement("button");
  isRead
    ? ((readBtn.className = "isReadStatus read"), (readBtn.textContent = "Yes"))
    : ((readBtn.className = "isReadStatus unread"),
      (readBtn.textContent = "No"));

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";

  const svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg2.setAttribute("class", "deleteIcon");

  const use2 = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use2.setAttribute("href", "/icons/delete.svg");
  svg2.appendChild(use2);
  deleteBtn.appendChild(svg2);

  readSpan.append(em, readBtn, deleteBtn);

  svg.appendChild(use);
  card.append(
    svg,
    createSpan("Title", "", title),
    createSpan("Author", "by ", author),
    createSpan("Year", "Published in: ", year),
    createSpan("PageCount", "Pages: ", pages),
    readSpan,
  );
  main.appendChild(card);
}

function renderBooks() {
  main.replaceChildren();
  library.forEach((book) => {
    createCard(
      book.author,
      book.title,
      book.year,
      book.pages,
      book.isRead,
      book.UUID,
    );
  });
}

function deleteEntry(event) {
  if (event.target.matches(".delete") ||event.target.matches(".deleteIcon")||event.target.matches(".deleteIcon > use")) {
    const card = event.target.closest(".card");
    const deleteID = card.id;
    card.remove();
    const deleteIndex = library.findIndex((book) => book.UUID === deleteID);
    library.splice(deleteIndex, 1);
  }
}

function readToggle(event) {
  if (event.target.matches(".isReadStatus")) {
    const card = event.target.closest(".card");
    const bookID = card.id;
    const readIndex = library.findIndex((book) => book.UUID === bookID);
    library[readIndex].isRead = !library[readIndex].isRead
      library[readIndex].isRead
    ? ((event.target.className = "isReadStatus read"), (event.target.textContent = "Yes"))
    : ((event.target.className = "isReadStatus unread"),
      (event.target.textContent = "No"));
  }
}

main.addEventListener("click", deleteEntry);
main.addEventListener("click", readToggle);
