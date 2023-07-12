const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
    let usersamename = users.filter((user)=>{
      return user.username === username
    });
    if(usersamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User" +username+ "successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User" +username+ " already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  const get_books = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify({books}, null, 4)));
  });

  get_books.then(() => console.log("Promise for Task 10 resolved"));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  const get_books = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify(books[isbn],null,4)));
  });

  get_books.then(() => console.log("Promise for Task 10 resolved"));

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;

  const get_books = new Promise((resolve, reject) => {
    const filtered_books = Object.keys(books).filter((isbn) => {
        return books[isbn].author === author;
      }).map((isbn) => {
        return books[isbn];
      });
      res.send(JSON.stringify(filtered_books,null,4));
  });

  get_books.then(() => console.log("Promise for Task 10 resolved"));


  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;


  const get_books = new Promise((resolve, reject) => {
    const filtered_books = Object.keys(books).filter((isbn) => {
        return books[isbn].title === title;
      }).map((isbn) => {
        return books[isbn];
      });
      res.send(JSON.stringify(filtered_books,null,4));
  });

  get_books.then(() => console.log("Promise for Task 10 resolved"));


});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn].reviews,null,4));
});

module.exports.general = public_users;
