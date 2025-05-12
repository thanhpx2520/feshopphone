import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../../services/Api";
import ProductItem from "../../components/common/product-item";
import Pagination from "../../components/common/pagination";

function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [pages, setPages] = useState({
    total: 0,
    limit: 9,
    currentPage: 1,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  // Đọc giá trị từ URL
  const keyword = searchParams.get("keyword") || "";
  const page = Number(searchParams.get("page")) || 1;
  const maxPrice = Number(searchParams.get("maxPrice")) || 100000000;
  const sortOption = searchParams.get("sortOption") || "";
  const limitOption = Number(searchParams.get("limitOption")) || 9;

  // eslint-disable-next-line no-unused-vars
  const [filters, setFilters] = useState({ maxPrice, sortOption, limitOption });

  // State cho form điều khiển (controlled inputs)
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
    const updatedFilters = {
      maxPrice: formMaxPrice,
      sortOption: formSortOption,
      limitOption: formLimitOption,
    };
    setSearchParams({
      ...updatedFilters,
      page: 1, // reset về trang đầu khi lọc
    });
  };

  useEffect(() => {
    const currentFilters = {
      maxPrice,
      sortOption,
      limitOption,
    };
    setFilters(currentFilters);

    const params = {
      limit: currentFilters.limitOption,
      name: keyword,
      is_stock: true,
      page,
      price: { $lte: currentFilters.maxPrice },
    };

    if (currentFilters.sortOption === "featured") {
      params.is_featured = true;
    } else if (currentFilters.sortOption === "latest") {
      params.sort = "-createdAt";
    } else if (currentFilters.sortOption === "oldest") {
      params.sort = "createdAt";
    }

    getProducts({ params })
      .then(({ data }) => {
        setAllProducts(data.data.docs);
        setPages({ ...data.data.pages });
      })
      .catch((err) => console.log(err));
  }, [keyword, maxPrice, sortOption, limitOption, page]);

  return (
    <>
      <div className="products">
        <div className="d-flex justify-content-between align-items-center mx-2 mb-3">
          <h3>Tất cả {pages.total} sản phẩm</h3>
          <div className="d-flex flex-column gap-2">
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
        </div>

        <div className="product-list card-deck">
          {allProducts?.map((product) => (
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

export default Home;
