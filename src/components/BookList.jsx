export default function BookList({ books, onRemove }) {
 if (books.length === 0) {
  return (
    <div className="flex justify-center items-center w-screen min-h-screen text-xl text-gray-500">
      No books added yet
    </div>
  );
}

  return (
    <table className="w-full mt-6">
      <thead>
        <tr>
          <th className="text-left px-4 py-2">Title</th>
          <th className="text-left px-4 py-2">Author</th>
          <th className="text-left px-4 py-2">Year</th>
          <th className="text-left px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, idx) => (
          <tr key={idx}>
            <th className="px-4 py-2">{book.title}</th>
            <th className="px-4 py-2">{book.author}</th>
            <th className="px-4 py-2">{book.year}</th>
            <th className="px-4 py-2">
              <button onClick={() => onRemove(book.id)} className="text-red-600">Delete</button>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}