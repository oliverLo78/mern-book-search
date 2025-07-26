import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import auth from "../utils/auth";
import { searchGoogleBooks } from "../utils/API";
import { saveBookIds, getSavedBookIds } from "../utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVE_BOOK } from "../utils/mutations";

const SearchBooks = () => {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  const [saveBook] = useMutation(SAVE_BOOK);

  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) return;

    try {
      const response = await searchGoogleBooks(searchInput);
      if (!response.ok) throw new Error("API request failed");
      
      const { items } = await response.json();
      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ["No author"],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description || "No description",
        image: book.volumeInfo.imageLinks?.thumbnail || "",
      }));

      setSearchedBooks(bookData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
    const token = auth.loggedIn() ? auth.getToken() : null;

    if (!token || !bookToSave) return false;

    try {
      await saveBook({ variables: { bookData: { ...bookToSave } }});
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Books in Google's API!</h1>
          
          <Form onSubmit={handleFormSubmit}>
            <Row>  {/* Changed from Form.Row to just Row */}
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a book"
                  className="mb-3"  // Added margin bottom
                />
              </Col>
              <Col xs={12} md={4} className="d-flex align-items-center">
                <Button 
                  type="submit" 
                  variant="success" 
                  size="lg"
                  className="w-100"  // Make button full width
                  >
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Container>

      <Container className="py-5">
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : "Search for a book to begin"}
        </h2>
        <Col>
          {searchedBooks.map((book) => (
            <Card key={book.bookId} border="dark" className="mb-3">
              {book.image && (
                <Card.Img
                  src={book.image}
                  alt={`The cover for ${book.title}`}
                  variant="top"
                />
              )}
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <p className="small">Authors: {book.authors.join(", ")}</p>
                <Card.Text>{book.description}</Card.Text>
                {auth.loggedIn() && (
                  <Button
                    disabled={savedBookIds.includes(book.bookId)}
                    className="btn-block btn-info"
                    onClick={() => handleSaveBook(book.bookId)}
                  >
                    {savedBookIds.includes(book.bookId)
                      ? "Already Saved!"
                      : "Save This Book!"}
                  </Button>
                )}
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Container>
    </>
  );
};

export default SearchBooks;