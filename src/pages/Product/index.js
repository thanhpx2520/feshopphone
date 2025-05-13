import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProductDetails, getCommentsOfProduct, postCommentsOfProduct } from "../../services/Api";
import { addToCart } from "../../redux/reducers/CartReducer";
import CommentItem from "../../components/common/comment-item";
import { getPrice, getImageProduct } from "../../utils";
import PaginationComment from "../../components/common/paginationComment";
import ProductItem from "../../components/common/product-item";

function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const pageComment = Number(searchParams.get("pageComment")) || 1;

  const customer = useSelector(({ auth }) => auth.user);
  const inputContent = useRef(null);

  const [pages, setPages] = useState({
    total: 0,
    limit: 5,
    currentPage: 1,
  });
  const [product, setProduct] = useState({});
  const [relate, setRelate] = useState([]);
  const [comments, setComments] = useState([]);
  const [dataComment, setDataComment] = useState({
    full_name: customer?.full_name || "",
    email: customer?.email || "",
    body: "",
  });

  const focusInput = () => {
    if (inputContent.current) {
      inputContent.current.focus();
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDataComment({ ...dataComment, [name]: value });
  };

  const handleSubmit = () => {
    const { full_name, email, body } = dataComment;
    if (full_name && email && body) {
      postCommentsOfProduct(id, dataComment).then(({ data }) => {
        if (data.status === "success") {
          getComments(id, 1); // reset to page 1 after comment
        }
        setDataComment({ ...dataComment, body: "" });
        focusInput();
      });
    }
  };

  const clickAddToCart = (type) => {
    dispatch(
      addToCart({
        _id: id,
        name: product.name,
        image: product.thumbnail,
        price: product.price,
        qty: 1,
      })
    );
    if (type === "buy-now") {
      return navigate("/cart");
    }
  };

  const getComments = (productId, page) => {
    getCommentsOfProduct({ params: { pageComment: page } }, productId)
      .then(({ data }) => {
        setComments(data.data.docs);
        setPages({ ...data.data.pages });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProductDetails({}, id)
      .then(({ data }) => {
        setProduct(data.product);
        setRelate(data.related);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    getComments(id, pageComment);
  }, [id, pageComment]);

  return (
    <>
      <div id="product">
        <div id="product-head" className="row">
          <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
            <img src={getImageProduct(product.thumbnail)} alt="" />
          </div>
          <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
            <h1>{product.name}</h1>
            <ul>
              <li>
                <span>Bảo hành:</span> {product.warranty}
              </li>
              <li>
                <span>Đi kèm:</span> {product.accessories}
              </li>
              <li>
                <span>Tình trạng:</span> {product.status}
              </li>
              <li>
                <span>Khuyến Mại:</span> {product.promotion}
              </li>
              <li id="price">Giá Bán (chưa bao gồm VAT)</li>
              <li id="price-number">{getPrice(product.price)}đ</li>
              <li id="status">Còn hàng</li>
            </ul>
            <div id="add-cart">
              <button onClick={() => clickAddToCart("buy-now")} className="btn btn-warning mr-2">
                Mua ngay
              </button>
              <button onClick={() => clickAddToCart()} className="btn btn-info">
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>

        <div id="product-body" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Đánh giá về {product.name}</h3>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </div>

        <div id="product-body" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Các sản phẩm liên quan {product.name}</h3>
            <div className="d-flex justify-content-around">
              {relate?.map((product, index) => (
                <ProductItem product={product} />
              ))}
            </div>
          </div>
        </div>

        <div id="comment" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Bình luận sản phẩm</h3>
            <form method="post">
              <div className="form-group">
                <label>Tên:</label>
                <input
                  name="full_name"
                  required
                  type="text"
                  className="form-control"
                  onChange={handleInput}
                  value={dataComment.full_name}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  name="email"
                  required
                  type="email"
                  className="form-control"
                  onChange={handleInput}
                  value={dataComment.email}
                />
              </div>
              <div className="form-group">
                <label>Nội dung:</label>
                <textarea
                  name="body"
                  required
                  rows={8}
                  className="form-control"
                  onChange={handleInput}
                  value={dataComment.body}
                  ref={inputContent}
                />
              </div>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                Gửi
              </button>
            </form>
          </div>
        </div>

        <div id="comments-list" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            {comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} />
            ))}
          </div>
        </div>
      </div>

      <div id="pagination">
        <PaginationComment pages={pages} />
      </div>
    </>
  );
}

export default Product;
