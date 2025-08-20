import { useState } from "react";

export default function AddBookForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !year.trim()) return;
    onAdd({ title, author, year });
    setTitle("");
    setAuthor("");
    setYear("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4 flex-wrap">
      <input
        type="text"
        placeholder="Book"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded p-2 flex-1 min-w-[150px]"
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border rounded p-2 flex-1 min-w-[150px]"
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border rounded p-2 w-32"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}