import ProductsContainer from "../product/ProductsContainer";

const ItemsOnSale = ({ products = [] }) => (
  <div className="w-full">
    <ProductsContainer products={products} browseMore={false} />
  </div>
);

export default ItemsOnSale;
