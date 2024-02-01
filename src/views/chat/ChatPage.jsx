import ChatsList from "../../components/chat/ChatsList";
import Chat from "../../components/chat/Chat";
import OrderDetails from "../../components/chat/OrderDetails";

const seller = {
    "picture": "/images/business.png"
}

const customer = {
    "picture": "/images/customer.png"
}

const ChatPage = () => {
  return (
    <div className="flex flex-row">
      <ChatsList />
      <Chat customer={customer} seller={seller}/>
      <OrderDetails />
    </div>
  );
};


export default ChatPage;