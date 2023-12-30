import ProductsContainer from "../product/ProductsContainer";

const ItemsOnSale = ({
  products = [],
  editable = false,
  seller,
  seller_image,
}) => (
  <div className="w-full">
    <ProductsContainer
      products={products}
      browseMore={false}
      editable={editable}
      seller={seller}
      seller_image={seller_image}
    />
  </div>
);

export default ItemsOnSale;
