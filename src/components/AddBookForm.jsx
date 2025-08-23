import { useState } from "react";

export default function AddBookForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !year) return;

    onAdd({ title, author, year });
    setTitle("");
    setAuthor("");
    setYear("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col items-center">
      <div className="mb-4 w-80">
        <label className="block mb-1 text-left">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4 w-80">
        <label className="block mb-1 text-left">Author</label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4 w-80">
        <label className="block mb-1 text-left">Year</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <button className="bg-cyan-700 text-white w-48 py-2 hover:bg-cyan-800">
        Submit
      </button>
    </form>
  );
}
