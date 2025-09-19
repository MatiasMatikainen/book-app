import { useState } from "react";

export default function BookList({ books, onRemove, onEdit }) {
  const [editBookId, setEditBookId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    author: "",
    year: ""
  });

  const [sortConfig, setSortConfig] = useState({ key: "title", direction: "asc" });

  if (books.length === 0) {
    return <div className="no-books-message">No books added yet</div>;
  }

  const handleEditClick = (book) => {
    setEditBookId(book.id);
    setEditFormData({
      title: book.title,
      author: book.author,
      year: book.year
    });
  };

  const handleSaveClick = (id) => {
    onEdit(id, editFormData);
    setEditBookId(null);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedBooks = [...books].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <table className="w-full mt-6">
      <thead>
        <tr>
          <th
            className="text-left px-4 py-2 cursor-pointer"
            onClick={() => handleSort("title")}
          >
            Title{" "}
            {sortConfig.key === "title"
              ? sortConfig.direction === "asc"
                ? "▲"
                : "▼"
              : ""}
          </th>
          <th
            className="text-left px-4 py-2 cursor-pointer"
            onClick={() => handleSort("author")}
          >
            Author{" "}
            {sortConfig.key === "author"
              ? sortConfig.direction === "asc"
                ? "▲"
                : "▼"
              : ""}
          </th>
          <th
            className="text-left px-4 py-2 cursor-pointer"
            onClick={() => handleSort("year")}
          >
            Year{" "}
            {sortConfig.key === "year"
              ? sortConfig.direction === "asc"
                ? "▲"
                : "▼"
              : ""}
          </th>
          <th className="text-left px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedBooks.map((book) => (
          <tr key={book.id}>
            {editBookId === book.id ? (
              <>
                <td className="px-4 py-2">
                  <input
                    value={editFormData.title}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, title: e.target.value })
                    }
                    className="border p-1 w-full"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    value={editFormData.author}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, author: e.target.value })
                    }
                    className="border p-1 w-full"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={editFormData.year}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, year: e.target.value })
                    }
                    className="border p-1 w-full"
                  />
                </td>
                <td className="px-4 py-2 flex gap-3">
                  <button
                    onClick={() => handleSaveClick(book.id)}
                    className="text-green-600"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setEditBookId(null)}
                    className="text-gray-600"
                  >
                    Cancel
                  </button>
                </td>
              </>
            ) : (
              <>
                <th className="px-4 py-2">{book.title}</th>
                <th className="px-4 py-2">{book.author}</th>
                <th className="px-4 py-2">{book.year}</th>
                <th className="px-4 py-2 flex gap-3">
                  <button
                    onClick={() => handleEditClick(book)}
                    className="text-blue-600"
                    style={{ marginRight: "8px" }}
                    title="Edit"
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
                        d="M3 17.25V21h3.75l11-11.03-3.75-3.75L3 17.25zm14.71-9.04a1.003 
                        1.003 0 0 0 0-1.42l-2.5-2.5a1.003 
                        1.003 0 0 0-1.42 0l-1.83 1.83 
                        3.75 3.75 1.99-1.66z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => onRemove(book.id)}
                    className="text-red-600"
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
                        d="M9 3v1H4v2h16V4h-5V3H9zm-4 
                        6v12a2 2 0 0 0 2 2h10a2 2 0 0 
                        0 2-2V9H5zm2 2h2v8H7v-8zm4 
                        0h2v8h-2v-8zm4 0h-2v8h2v-8z"
                      />
                    </svg>
                  </button>
                </th>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}