import { useTranslation } from "react-i18next";

const OrderRequest = ({
  productName,
  productPicture,
  details,
  quantity,
  unitPrice,
}) => {
  const { t } = useTranslation("common");

  return (
    <div className="order-request max-w-md max-h-sm bg-white rounded-xl p-4 pr-10">
      <h1 className="w-full m-auto text-center font-bold font-jost">{t("order_request")}</h1>
      <div className="flex flex-row gap-5">
        <img src={productPicture} alt="product" className="max-w-[10rem] max-h-[10rem]" />
        <div className="flex flex-col gap-2">
          <h2 className="font-sofia text-[#744638] text-lg">{productName}</h2>
          <div>
            {Object.entries(details).map(([k, v], i) => (
              <div key={i} className="text-black/[.35] capitalize font-sunflower">{`${k}: ${v}`}</div>
            ))}
          </div>
          <div>
            <div className="font-sunflower flex justify-between">Quantity: <span className="font-bold">x{quantity}</span></div>
            <div className="font-sunflower flex justify-between">Total: <span className="font-bold">{quantity * unitPrice} {t("dzd")}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderRequest;
