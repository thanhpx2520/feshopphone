import { Link } from "react-router-dom";
import { getImageProduct, getPrice } from "../../utils";

function ProductItem({ product }) {
  return (
    <Link to={`/product-${product._id}`} className="product-item card text-center">
      <Link to={`/product-${product._id}`}>
        <img src={getImageProduct(product.thumbnail)} alt={product.name} />
      </Link>
      <h4>
        <Link to={`/product-${product._id}`}>{product.name}</Link>
      </h4>
      <p>
        Giá Bán: <span>{getPrice(product.price)}đ</span>
      </p>
    </Link>
  );
}

export default ProductItem;
