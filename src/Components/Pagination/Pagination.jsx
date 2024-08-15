import React from 'react';

const Pagination = ({
  previousPage,
  nextPage,
  canNextPage,
  canPreviousPage,
  pageOptions,
  gotoPage,
  pageIndex,
}) => (
  <div className="pagination">
    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
      Anterior
    </button>
    {pageOptions.map((pageNum, index) => {
      if (
        index < 5 ||
        index > pageOptions.length - 5 ||
        (index >= pageIndex - 2 && index <= pageIndex + 2)
      ) {
        return (
          <button
            key={pageNum}
            onClick={() => gotoPage(pageNum)}
            disabled={pageNum === pageIndex}
            style={{
              fontWeight: pageNum === pageIndex ? 'bold' : 'normal',
              border: pageNum === pageIndex ? '1px solid black' : 'none',
              borderRadius: pageNum === pageIndex ? '5px' : 'none',
            }}
          >
            {pageNum + 1}
          </button>
        );
      }
      if (index === 5 || index === pageOptions.length - 5) {
        return <span key={pageNum}>...</span>;
      }
      return null;
    })}
    <button onClick={() => nextPage()} disabled={!canNextPage}>
      Próximo
    </button>
  </div>
);

export default Pagination;
