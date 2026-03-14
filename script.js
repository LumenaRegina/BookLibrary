const library = [];

const addBookBtn = document.querySelector(".addBook");



function Book(title, author, year, pages, isRead) {
    this.UUID = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.isRead = isRead;
}


function addBookToLibrary(){
    console.log("hi")
}
addBookBtn.addEventListener("click", addBookToLibrary)