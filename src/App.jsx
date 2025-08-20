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

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    setBooks([...books, { id: Date.now(), ...book }]);
  };

  const removeBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📚 Book App</h1>
      <AddBookForm onAdd={addBook} />
      <BookList books={books} onRemove={removeBook} />
    </div>
  );
}