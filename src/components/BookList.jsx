import { useState } from "react";

export default function BookList({ books, onRemove }) {
  const [sortConfig, setSortConfig] = useState({ key: "title", ascending: true });

  if (books.length === 0) {
    return (
      <div className="no-books-message">No books found</div>
    );
  }

  // Käsittelee sarakkeen otsikon klikkauksen ja päivittää sortConfigin
  const handleSort = (key) => {
    if (sortConfig.key === key) {
      // Jos klikataan samaa saraketta uudestaan → vaihdetaan järjestyssuunta
      setSortConfig({ key, ascending: !sortConfig.ascending });
    } else {
      // Uusi sarake, asetetaan järjestys nousevaksi
      setSortConfig({ key, ascending: true });
    }
  };

  const sortedBooks = [...books].sort((a, b) => {
    let comparison = 0;
    if (sortConfig.key === "year") {
      comparison = parseInt(a.year) - parseInt(b.year);
    } else {
      comparison = a[sortConfig.key].localeCompare(b[sortConfig.key]);
    }
    return sortConfig.ascending ? comparison : -comparison;
  });

  // Näytetään nuoli sarakkeen vieressä, jos se on järjestetty sen mukaan
  const getArrow = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.ascending ? "↓" : "↑";
  };

  return (
    <div className="mt-6">
      <table className="w-full border-collapse shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th
              className="text-left px-4 py-2 cursor-pointer hover:text-blue-600 select-none"
              onClick={() => handleSort("title")}
            >
              Title {getArrow("title")}
            </th>
            <th
              className="text-left px-4 py-2 cursor-pointer hover:text-blue-600 select-none"
              onClick={() => handleSort("author")}
            >
              Author {getArrow("author")}
            </th>
            <th
              className="text-left px-4 py-2 cursor-pointer hover:text-blue-600 select-none"
              onClick={() => handleSort("year")}
            >
              Year {getArrow("year")}
            </th>
            <th className="text-left px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.map((book, idx) => (
            <tr key={idx} className="odd:bg-gray-50">
              <th className="px-4 py-2">{book.title}</th>
              <th className="px-4 py-2">{book.author}</th>
              <th className="px-4 py-2">{book.year}</th>
              <th className="px-4 py-2">
                <button
                  onClick={() => onRemove(book.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M9 3v1H4v2h16V4h-5V3H9zm-4 6v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9H5zm2 2h2v8H7v-8zm4 0h2v8h-2v-8zm4 0h-2v8h2v-8z"
                    />
                  </svg>
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}