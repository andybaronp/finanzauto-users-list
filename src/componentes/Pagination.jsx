const Pagination = ({ pagination, handlePageChange }) => {
  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        onClick={() => handlePageChange(pagination.page - 1)}
        disabled={pagination.page === 0}
        className={`text-teal-700 hover:underline ${pagination.page === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        &lt;
      </button>
      {[...Array(Math.ceil(pagination.total / pagination.limit)).keys()].map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => handlePageChange(pageNum)}
          className={`text-teal-700 ${pagination.page === pageNum ? 'font-bold underline' : 'hover:underline'}`}
        >
          {pageNum + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(pagination.page + 1)}
        disabled={pagination.page === Math.ceil(pagination.total / pagination.limit) - 1}
        className={`text-teal-700 hover:underline ${pagination.page === Math.ceil(pagination.total / pagination.limit) - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        &gt;
      </button>
    </div>

  )
}
export default Pagination