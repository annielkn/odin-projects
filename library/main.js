const myLibrary = [];

function Book(title, author, pages, read, id) {
  if (!new.target){
    throw Error("Must use new constructor")
  }
  this.author = author;
  this.pages = pages;
  this.title = title;
  this.read = read;
  this.id = id;
}

Book.prototype.info = function() {
    const s = `${this.title} by ${this.author}, ${this.pages} pages}` //, ${this.read ? 'read' : 'not read yet'
    return s;  
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  const newBook = new Book(titorle, author, pages, read, crypto.randomUUID());
  myLibrary.push(newBook);
  return newBook;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

Book.prototype.goLive = function () {
    const libraryDisplay = document.querySelector(".container");
    const template = document.getElementById("book-card-template");
    const card = template.content.cloneNode(true); // deep clone the template

    const bookDisplay = card.querySelector(".bookCard");
    const checkboxRead = card.querySelector(".readRefresh");

    checkboxRead.checked = this.read;
    checkboxRead.addEventListener("changed", (e) => {
        this.toggleRead();
    });
    card.querySelector(".bookData").textContent = this.info(); // still safe — textContent, not innerHTML

    card.querySelector(".delete-btn").addEventListener("click", () => {
        const index = myLibrary.findIndex(b => b.id === this.id);
        myLibrary.splice(index, 1);
        bookDisplay.remove();
    });

    libraryDisplay.appendChild(card);
};

function loopThroughLibrary() {
    const libraryDisplay = document.querySelector(".container");
    libraryDisplay.innerHTML = "";
    myLibrary.forEach(b => {
        b.goLive();
    });
}

function createBook (event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const { title, author, pages, read } = Object.fromEntries(form);
    addBookToLibrary(title, author, pages, read === "on");
    event.target.reset();
    loopThroughLibrary();
}

const dialog = document.getElementById("my-dialog");
const openBtn = document.getElementById("open-btn");
const addBtn = document.getElementById("add-btn");
const cancelBtn = document.getElementById("cancel-btn");

openBtn.addEventListener("click", () => dialog.showModal());
document.getElementById("book-form").addEventListener("submit", createBook);
cancelBtn.addEventListener("click", () => dialog.close());

const myBook = addBookToLibrary("author", "title", "pages", "read");
loopThroughLibrary();