import ProductsContainer from "../product/ProductsContainer";

const ItemsOnSale = ({
  products = [],
  editable = false,
  seller,
  seller_image,
  sellerId,
}) => (
  <>
    <div className="w-full mt-[5rem] md:mt-[10rem]">
      <ProductsContainer
        products={products}
        browseMore={false}
        editable={editable}
        seller={seller}
        seller_image={seller_image}
        sellerId={sellerId}
      />
    </div>
  </>
);

export default ItemsOnSale;
