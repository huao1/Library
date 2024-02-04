
class Library {

  static delBook(e) {
    console.log("Runs delete")
    let lib = document.querySelector(".books-container")
    let book = lib.removeChild(e.target.parentNode)
    myLibrary.splice(Number(book.id[0]), 1)
    let index = 0
    for (const child of lib.children) {
      child.id = index
      index++;
    }
  };

  static bookButtonSwitch(e) {
    e.target.textContent == "Completed" ? e.target.textContent = "Incomplete" : e.target.textContent = "Completed";
    e.target.classList.toggle("incomplete");
    e.target.classList.toggle("completed");
  };

  constructor() {
    this.libContainer = document.querySelector(".books-container")
    this.inputs = document.querySelectorAll("input");
    this.libary = []
  }

  addToLib(newbook) {
    this.libary.push(newbook)
  }

  addToHTML(newBook) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('books');
    let bookInfo = document.createElement("h6");

    for (const key in newBook) {
      if (key == "Pages") {
        bookInfo.textContent = `${newBook[key]} ${key}`;
      }
      else if (key == "read") {
        bookInfo = document.createElement("button");
        bookInfo.classList.add("book-button");
        newBook[key] ? bookInfo.classList.add("completed") : bookInfo.classList.add("incomplete")
        newBook[key] ? bookInfo.textContent = "Completed" : bookInfo.textContent = "Incomplete"
        bookInfo.addEventListener("click", Library.bookButtonSwitch)
        newDiv.appendChild(bookInfo);
      }
      else {
        bookInfo.textContent = `${key}: ${newBook[key]}`;
      }
      newDiv.appendChild(bookInfo);
      bookInfo = document.createElement("h6");
    }

    let delBtn = document.createElement("button")
    delBtn.classList.add("book-button")
    delBtn.classList.add("delete")
    delBtn.textContent = "Delete"
    delBtn.addEventListener("click", Library.delBook)
    newDiv.appendChild(delBtn)
    newDiv.id = this.libary.length.toString()
    this.libContainer.appendChild(newDiv);
  }

  clearInput() {
    this.inputs.forEach((input) => {
      if (input.name == "read") {
        input.checked = false;
      }
      else {
        input.value = "";
      }
    });
  }
}

class Book { 
  // the constructor...
  constructor(valList) {
    this.Title = valList["Title"];
    this.Author = valList["Author"];
    this.Pages = valList["Pages"];
    this.read = valList["read"];
  }
}

const submitEvent = (e) => {
  e.preventDefault();
  let inputValue = {};
  myLib.inputs.forEach((input) => {
    if (input.name == "read") {
      inputValue[input.name] = input.checked;
    }
    else {
      inputValue[input.name] = input.value;
    }
  });

  const newBook = new Book(inputValue)

  myLib.addToHTML(newBook)
  myLib.addToLib(newBook)
  myLib.clearInput();
  addDialog.close();
}

const myLib = new Library()

const addBooks = document.getElementById("add");
const addDialog = document.getElementById("bookDialog");
const submit = document.querySelector(".submit");

addBooks.addEventListener("click", () => {
  addDialog.showModal();
});

submit.addEventListener("click", submitEvent)