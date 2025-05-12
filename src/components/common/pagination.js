import { useLocation, Link } from "react-router-dom";

const Pagination = ({ pages }) => {
  const { pathname } = useLocation();
  const { total, limit, currentPage, hasNext, hasPrev, next, prev, keyword } = pages;
  const totalPages = Math.ceil(total / limit);

  const formatUrl = (page) => {
    const getkeyword = keyword === null || keyword === undefined;
    return getkeyword ? `${pathname}?page=${page}` : `${pathname}?keyword=${keyword}&page=${page}`;
  };

  const renderPagesHTML = (delta = 2) => {
    const pagesHtml = [];
    const left = currentPage - delta;
    const right = currentPage + delta;
    let lastPage = 0;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        if (lastPage + 1 !== i) {
          pagesHtml.push("...");
        }
        pagesHtml.push(i);
        lastPage = i;
      }
    }
    return pagesHtml;
  };

  return (
    <ul className="pagination">
      {hasPrev && (
        <li className="page-item">
          <Link className="page-link" to={formatUrl(prev)}>
            Trang trước
          </Link>
        </li>
      )}

      {renderPagesHTML().map((page, index) => (
        <li key={index} className={`page-item ${page === currentPage ? "active" : ""}`}>
          {page === "..." ? (
            <span className="page-link">{page}</span>
          ) : (
            <Link className="page-link" to={formatUrl(page)}>
              {page}
            </Link>
          )}
        </li>
      ))}

      {hasNext && (
        <li className="page-item">
          <Link className="page-link" to={formatUrl(next)}>
            Trang sau
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
