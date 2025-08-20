export default function BookList({ books, onRemove }) {
  if (books.length === 0) {
    return <p className="text-gray-600">No books added yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {books.map((book) => (
        <li
          key={book.id}
          className="flex justify-between items-center border p-2 rounded"
        >
          <div>
            <p className="font-semibold">{book.title}</p>
            <p className="text-sm text-gray-600">
              {book.author} ({book.year})
            </p>
          </div>
          <button
            onClick={() => onRemove(book.id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}