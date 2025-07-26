# mern-book-search

This week, you’ll take starter code with a fully functioning Google Books API search engine built with a RESTful API, and refactor it to be a GraphQL API built with Apollo Server. The app was built using the MERN stack with a React front end, MongoDB database, and Node.js/Express.js server and API.

![License Shield](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)
[![LinkedIn Shield](https://img.shields.io/badge/LinkedIn-555555?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/oliver-lopez78/)

## Description

To complete the assignment, you’ll need to do the following:

Set up an Apollo Server to use GraphQL queries and mutations to fetch and modify data, replacing the existing RESTful API.

Modify the existing authentication middleware so that it works in the context of a GraphQL API.

Create an Apollo Provider so that requests can communicate with an Apollo Server.

Deploy your application to Heroku with a MongoDB database using MongoDB Atlas. Use the Deploy with Heroku and MongoDB Atlas walkthrough for instructions.

## User Story

AS AN avid reader

I WANT to search for new books to read
SO THAT I can keep a list of books to purchase

## Acceptance Criteria

GIVEN a book search engine

WHEN I load the search engine

THEN I am presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button

WHEN I click on the Search for Books menu option

THEN I am presented with an input field to search for books and a submit button

WHEN I am not logged in and enter a search term in the input field and click the submit button

THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site

WHEN I click on the Login/Signup menu option

THEN a modal appears on the screen with a toggle between the option to log in or sign up

WHEN the toggle is set to Signup

THEN I am presented with three inputs for a username, an email address, and a password, and a signup button

WHEN the toggle is set to Login

THEN I am presented with two inputs for an email address and a password and login button

WHEN I enter a valid email address and create a password and click on the signup button

THEN my user account is created and I am logged in to the site

WHEN I enter my account’s email address and password and click on the login button

THEN I the modal closes and I am logged in to the site

WHEN I am logged in to the site

THEN the menu options change to Search for Books, an option to see my saved books, and Logout

WHEN I am logged in and enter a search term in the input field and click the submit button

THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site and a button to save a book to my account

WHEN I click on the Save button on a book

THEN that book’s information is saved to my account

WHEN I click on the option to see my saved books

THEN I am presented with all of the books I have saved to my account, each featuring the book’s title, author, description, image, and a link to that book on the Google Books site and a button to remove a book from my account

WHEN I click on the Remove button on a book

THEN that book is deleted from my saved books list

WHEN I click on the Logout button

THEN I am logged out of the site and presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button  

<p align="right">(<a href="#readme-top">back to top</a>)</p>

While building this project I learned to: 

  -The MERN stack has a three-layer architecture based on the Model-View-Controller design pattern. Each interconnected layer performs a specific function
  
  -ReactJS is a front-end JavaScript library that allows us to turn reusable components into interactive user interfaces
  
  -The client layer controls what the user sees and how the user interacts with data. 
  
  -In the client layer, data retrieved from the database can be displayed. Users can also input data using the user interface.
  
  -The server layer defines how data is handled in our apps and routes it between the database and client layer.
  
  -The server layer listens for events from the client layer and responds by executing methods that save and retrieve data from the database layer.
  
  -The database layer stores all the data needed for your application to function.
  
  -MongoDB stores JSON natively (technically BSON), which makes it work easily with JavaScript apps.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With MERN Stack

  -MERN is built on widely used technologies and relies on a single programming language.
  -MERN’s three-layer architecture makes it relatively easy to debug.
  -MERN is easily scalable and a great solution for data-heavy apps.

## Live Demo 
- [link to mern-book-search](https://still-peak-05339-5ca1af3bc8e3.herokuapp.com/)

## Table of Contents
- [Installation](#installation)
- [Contributing](#contributing)
- [Tests](#insomnia)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Installation


## Mock-Up


Let's start by revisiting the web application's appearance and functionality.

As you can see in the following animation, a user can type a search term (in this case, "star wars") in a search box and the results appear:

![21-mern-homework-demo-01](https://user-images.githubusercontent.com/109435666/206861236-01811d96-9ad9-415a-9a0d-3aa58d58b77e.gif)

The user can save books by clicking "Save This Book!" under each search result, as shown in the following animation:

![21-mern-homework-demo-02](https://user-images.githubusercontent.com/109435666/206861275-7da2a69c-5b49-4454-91aa-6ffcab0c63f3.gif)

A user can view their saved books on a separate page, as shown in the following animation:

![21-mern-homework-demo-03](https://user-images.githubusercontent.com/109435666/206861291-41e54634-cb31-41fb-a036-37abd23fbf0b.gif)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

For any further questions feel free to contact me via:
- GitHub: [GitHub oliverLo78](https://github.com/oliverLo78)
- Email: [oliverberto@gmail.com](mailto:oliverberto@gmail.com)
- LinkedIn: [Oliver Lopez](https://www.linkedin.com/in/oliver-lopez78/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
