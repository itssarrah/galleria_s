import ChatHeader from "./ChatHeader";
import OrderRequest from "./OrderRequest";
import MessageBubble from "./MessageBubble";

const messages = [
  {
    isOrderRequest: true,
    productName: "Pink Happiness",
    productPicture: "/images/carditem.png",
    productDetails: {
      color: "Red",
      size: "Bento Cake",
    },
    productQty: {
      quantity: 2,
      unitPrice: 2,
    },
    isSeller: false,
    isSeen: true,
  },
  {
    isOrderRequest: false,
    content: "Hello, for when do you want your order shipped?",
    isSeller: true,
    isSeen: true,
  },
  {
    isOrderRequest: false,
    content: "ASAP please",
    isSeller: false,
    isSeen: false
  },
];

const getMessageBubble = (message) => {
  if (message.isOrderRequest) {
    return (
      <OrderRequest
        productName={message.productName}
        productPicture={message.productPicture}
        details={message.productDetails}
        quantity={message.productQty.quantity}
        unitPrice={message.productQty.unitPrice}
      />
    );
  } else {
    return <MessageBubble message={message.content} />;
  }
};

const Chat = ({ seller, customer }) => {
  return (
    <div>
      <ChatHeader />
      <div className="chat--main">
        {
        messages.map((message) => 
        (<div className={`flex w-full {message.isSeller? flex-start: flex-end}`}>
            <img src={message.isSeller? seller.picture: customer.picture} alt="profile" className="rounded-full w-10 h-10" />
            {getMessageBubble(message)}
        </div>)
        )}
      </div>
    </div>
  );
};

export default Chat;
