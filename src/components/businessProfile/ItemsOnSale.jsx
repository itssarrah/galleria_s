import ProductsContainer from "../product/ProductsContainer";

const ItemsOnSale = ({ products = [], editable = false }) => (
  <div className="w-full">
    <ProductsContainer
      products={products}
      browseMore={false}
      editable={editable}
    />
  </div>
);

export default ItemsOnSale;
