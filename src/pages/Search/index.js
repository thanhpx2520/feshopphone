import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../../services/Api";
import ProductItem from "../../components/common/product-item";
import Pagination from "../../components/common/pagination";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const page = Number(searchParams.get("page")) || 1;
  const maxPrice = Number(searchParams.get("maxPrice")) || 100000000;
  const sortOption = searchParams.get("sortOption") || "";
  const limitOption = Number(searchParams.get("limitOption")) || 9;

  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState({
    total: 0,
    limit: limitOption,
    currentPage: page,
  });

  // State cho form điều khiển
  const [formMaxPrice, setFormMaxPrice] = useState(maxPrice);
  const [formSortOption, setFormSortOption] = useState(sortOption);
  const [formLimitOption, setFormLimitOption] = useState(limitOption);

  const formatPriceVND = (value) => Number(value).toLocaleString("vi-VN") + "₫";

  const handlePriceChange = (e) => {
    setFormMaxPrice(Number(e.target.value));
  };

  const handleSortChange = (e) => {
    setFormSortOption(e.target.value);
  };

  const handleLimitChange = (e) => {
    setFormLimitOption(Number(e.target.value));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      keyword,
      page: 1,
      maxPrice: formMaxPrice,
      sortOption: formSortOption,
      limitOption: formLimitOption,
    });
  };

  useEffect(() => {
    const params = {
      limit: limitOption,
      name: keyword,
      is_stock: true,
      page,
      price: { $lte: maxPrice },
    };

    if (sortOption === "featured") {
      params.is_featured = true;
    } else if (sortOption === "latest") {
      params.sort = "-createdAt";
    } else if (sortOption === "oldest") {
      params.sort = "createdAt";
    }

    getProducts({ params })
      .then(({ data }) => {
        setProducts(data.data.docs);
        setPages({ ...data.data.pages });
      })
      .catch((err) => console.log(err));
  }, [keyword, maxPrice, sortOption, limitOption, page]);

  return (
    <>
      <div className="products">
        <div id="search-result">
          Kết quả tìm kiếm với sản phẩm <span>{keyword}</span> với <span>{pages.total}</span> sản phẩm
        </div>
        <div className="d-flex flex-column gap-2 mb-2">
          <form onSubmit={handleFilterSubmit}>
            <div className="d-flex">
              <div className="range-container">
                <label htmlFor="priceRange" className="form-label"></label>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="100000000"
                  step="5000000"
                  id="priceRange"
                  value={formMaxPrice}
                  onChange={handlePriceChange}
                />
                <div className="range-value">
                  Giá tối đa: <span>{formatPriceVND(formMaxPrice)}</span>
                </div>
              </div>

              <div className="d-flex-column">
                <select className="custom-select" value={formSortOption} onChange={handleSortChange}>
                  <option value="">Lọc theo</option>
                  <option value="featured">Nổi bật</option>
                  <option value="latest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                </select>

                <select className="custom-select" value={formLimitOption} onChange={handleLimitChange}>
                  <option value="9">9</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                </select>
              </div>

              <button className="button-sort" type="submit">
                Lọc
              </button>
            </div>
          </form>
        </div>

        <div className="product-list card-deck">
          {products?.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>

      <div id="pagination">
        <Pagination pages={pages} />
      </div>
    </>
  );
}

export default Search;
