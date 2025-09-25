import { useState, useEffect } from "react";
import BookList from "./components/BookList";
import AddBookForm from "./components/AddBookForm";
import "./App.css";

export default function App() {
  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem("books");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Virhe ladattaessa localStoragea:", e);
      return [];
    }
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    setBooks([...books, { id: Date.now(), ...book }]);
  };

  const removeBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const editBook = (id, updatedBook) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, ...updatedBook } : book
      )
    );
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">📚 Booklist</h1>
        <input
          type="text"
          className="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Title..."
        />
      </header>

      <AddBookForm onAdd={addBook} />
      <BookList books={filteredBooks} onRemove={removeBook} onEdit={editBook} />
    </div>
  );
}