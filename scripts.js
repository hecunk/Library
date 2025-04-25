const bookList = [];

function Book(id, title, author, year, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
}

function addBook(title, author, year, read) {
    let book = new Book(crypto.randomUUID(), title, author, year, read);
    bookList.push(book);
}

function deleteBlock(id, e) {
    for (let i = 0; i < bookList.length; i++) {
        if (bookList[i].id === id) {
            bookList.pop(i);
            e.target.parentElement.parentElement.remove();
        }
    }
}

function toggleRead(id, e) {
    for (let i = 0; i < bookList.length; i++) {
        if (bookList[i].id === id) {
            if (bookList[i].read === "Yes") {
                bookList[i].read = "No";
                e.target.textContent = "Unread";
                e.target.style.backgroundColor = "red";
            }
            else {
                bookList[i].read = "Yes";
                e.target.textContent = "Read";
                e.target.style.backgroundColor = "#37afff";
            }
        }
    }
}

const mainCont = document.querySelector(".main-cont");

function addBookUi() {
        const bookBlock = document.createElement("div");
        bookBlock.classList.add("book-block");
        const ul = document.createElement("ul");
        const title = document.createElement("li");
        const author = document.createElement("li");
        const year = document.createElement("li");
        const buttons = document.createElement("div");
        const readButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        readButton.classList.add("read");
        if (bookList.at(-1).read === "Yes") {
            readButton.style.backgroundColor = "red";
            readButton.textContent = "Unread";
        }
        else {
            readButton.style.backgroundColor = "#37afff";
            readButton.textContent = "Read";
        }
        readButton.addEventListener("click", (e) => {toggleRead(bookList.at(-1).id, e)})
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", (e) => {deleteBlock(bookList.at(-1).id, e)});
        buttons.classList.add("buttons");
        buttons.appendChild(readButton);
        buttons.appendChild(deleteButton);
        title.textContent = `Title: ${bookList.at(-1).title}`;
        author.textContent = `Author: ${bookList.at(-1).author}`;
        year.textContent = `Year: ${bookList.at(-1).year}`;
        ul.appendChild(title);
        ul.appendChild(author);
        ul.appendChild(year);
        bookBlock.appendChild(ul);
        bookBlock.appendChild(buttons);
        mainCont.appendChild(bookBlock);
}

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");

function showDialog() {
    dialog.showModal();
}

const plusButton = document.querySelector("#PlusButton");
plusButton.addEventListener("click", () => {showDialog()});

const closeButton = document.querySelector("#closebutton");
closeButton.addEventListener("click", () => {dialog.close()});

function submitBook() {
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const year = document.querySelector("#year");
    const read = document.querySelector("#read");
    let readval;
    if (read.checked === true) {
        readval = "Yes"
    }
    else {
        readval = "No"
    }
    addBook(title.value, author.value, year.value, readval);
    addBookUi();
    dialog.close();
}

const submitButton = document.querySelector("#submitbutton");
submitButton.addEventListener("click", function(e) {
    submitBook();
    e.preventDefault();
});