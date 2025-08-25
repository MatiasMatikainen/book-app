export default function BookList({ books, onRemove }) {
 if (books.length === 0) {
  return (
    <div className="no-books-message">No books added yet</div>
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
              <button onClick={() => onRemove(book.id)} className="delete" title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M9 3v1H4v2h16V4h-5V3H9zm-4 6v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9H5zm2 2h2v8H7v-8zm4 0h2v8h-2v-8zm4 0h-2v8h2v-8z"/>
                </svg>
              </button>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}