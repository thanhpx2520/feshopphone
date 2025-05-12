import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { getNameOfCategory, getProductsOfCategory } from "../../services/Api";
import ProductItem from "../../components/common/product-item";
import Pagination from "../../components/common/pagination";

function Category() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const maxPrice = Number(searchParams.get("maxPrice")) || 100000000;
  const sortOption = searchParams.get("sortOption") || "";
  const limitOption = Number(searchParams.get("limitOption")) || 9;

  const [nameCategory, setNameCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState({
    total: 0,
    limit: limitOption,
    currentPage: page,
  });

  // Form state
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
      page: 1,
      maxPrice: formMaxPrice,
      sortOption: formSortOption,
      limitOption: formLimitOption,
    });
  };

  useEffect(() => {
    getNameOfCategory({}, id)
      .then(({ data }) => setNameCategory(data.data.title))
      .catch((err) => console.log(err));

    const params = {
      limit: limitOption,
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

    getProductsOfCategory({ params }, id)
      .then(({ data }) => {
        setProducts(data.data.docs);
        setPages(data.data.pages);
      })
      .catch((err) => console.log(err));
  }, [id, page, maxPrice, sortOption, limitOption]);

  return (
    <>
      <div className="products">
        <div className="d-flex justify-content-between align-items-center mx-2 mb-3">
          <h3>
            {nameCategory} (Tổng: {pages.total} sản phẩm)
          </h3>

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
          {products.map((product) => (
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

export default Category;
