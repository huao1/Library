const myLibrary = [];

class Book { 
  // the constructor...
  constructor(valList) {
    this.title = valList["Title"];
    this.author = valList["Author"];
    this.pages = valList["Pages"];
    this.read = valList["read"];
  }
}

function addBookToLibrary(newBook) {
  // do stuff here

  const libContainer = document.querySelector(".books-container")
  const newDiv = document.createElement('div');
  let bookInfo;

  newDiv.classList.add('books');

  for (const key in newBook) {
    bookInfo = document.createElement("h6");
    if (key == "Pages") {
      bookInfo.textContent = `${newBook[key]} ${key}`;
    }
    else if (key == "read") {
      bookInfo = document.createElement("button");
      bookInfo.classList.add("book-button");
      newBook[key] ? bookInfo.classList.add("completed") : bookInfo.classList.add("incomplete")
      newBook[key] ? bookInfo.textContent = "Completed" : bookInfo.textContent = "Incomplete"
      bookInfo.addEventListener("click", bookButtonSwitch)
      newDiv.appendChild(bookInfo);
    }
    else {
      bookInfo.textContent = `${key}: ${newBook[key]}`;
    }
    newDiv.appendChild(bookInfo);
  }
  let delButton = document.createElement("button")
  delButton.classList.add("book-button")
  delButton.classList.add("delete")
  delButton.textContent = "Delete"
  delButton.addEventListener("click", delBook)
  newDiv.appendChild(delButton)
  newDiv.id = "b" + myLibrary.length.toString()
  libContainer.appendChild(newDiv);
  const book = new Book(newBook);
  myLibrary.push(book);
} 

function clearInput() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.name == "read") {
      input.checked = false;
    }
    else {
      input.value = "";
    }
  });
}

function bookButtonSwitch(e) {
  e.target.textContent == "Completed" ? e.target.textContent = "Incomplete" : e.target.textContent = "Completed";
  e.target.classList.toggle("incomplete");
  e.target.classList.toggle("completed");
};

function delBook(e) {
  let lib = document.querySelector(".books-container")
  let book = lib.removeChild(e.target.parentNode)
  myLibrary.splice(Number(book.id[1]), 1)
  let index = 0
  for (const child of lib.children) {
    child.id = index
    console.log(child)
    index++;
  }
  
};

const addBooks = document.getElementById("add");
const addDialog = document.getElementById("bookDialog");
const submit = document.querySelector(".submit");

addBooks.addEventListener("click", () => {
  addDialog.showModal();
});

submit.addEventListener("click", (event) => {
  event.preventDefault();
  const inputs = document.querySelectorAll("input");
  let inputValue = {};
  inputs.forEach((input) => {
    if (input.name == "read") {
      inputValue[input.name] = input.checked;
    }
    else {
      inputValue[input.name] = input.value;
    }
  });

  addBookToLibrary(inputValue);
  clearInput();
  console.log(myLibrary)
  addDialog.close();
});