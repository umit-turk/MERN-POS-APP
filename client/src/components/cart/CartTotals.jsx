import { Button, message } from "antd";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, decrease, deleteCart, increase } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CartTotals = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const { cartItems, total, tax } = useSelector((state) => state.cart);

  const deleteItem = (item) => {
    dispatch(deleteCart(item));
  };

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Cart has been removed successfully',
    });
  };

  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      {contextHolder}
      <h2 className="bg-blue-600 text-center py-4 text-white font-bold tracking-wide">
        Cart Products
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 overflow-y-auto py-2">
        {cartItems.length > 0
          ? cartItems.map((item, index) => (
              <li key={index} className="cart-item flex justify-between">
                <div className="flex items-center">
                  <img
                    onClick={() => deleteItem(item)}
                    src={item.img}
                    alt=""
                    className="w-16 h-16 object-cover pt-2 cursor-pointer"
                  />
                  <div className="flex flex-col ml-2">
                    <b>{item.title}</b>
                    <span>
                      {item.price}₺ x {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button
                    icon={<PlusCircleOutlined />}
                    className="w-full flex items-center justify-center !rounded-full"
                    type="primary"
                    size="small"
                    onClick={() => dispatch(increase(item))}
                  />
                  <span className="font-bold w-6 inline-block text-center">{item.quantity}</span>
                  <Button
                    icon={<MinusCircleOutlined />}
                    className="w-full flex items-center justify-center !rounded-full"
                    type="primary"
                    size="small"
                    onClick={() => {
                      if(item.quantity === 1){
                        if(window.confirm("The product is going to remove from cart")){
                          dispatch(decrease(item))
                          message.success("Product Removed From Cart")
                        }
                      }
                      if(item.quantity > 1){
                        dispatch(decrease(item))
                      }
                    }}
                  />
                </div>
              </li>
            )).reverse()
          : "There are no items in the cart"}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Sub Total</b>
            <span>{total}₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>VAT %{tax}</b>
            <span className="text-red-700">{(total * tax) / 100}</span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Total</b>
            <span className="text-xl">
              {(total + (total * tax) / 100).toFixed(2)}₺
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button onClick={() =>navigate("/cart")} disabled={cartItems.length === 0} className="w-full" type="primary" size="large">
            Order
          </Button>
          <Button
            icon={<ClearOutlined />}
            className="w-full mt-2 flex items-center justify-center"
            type="primary"
            danger
            size="large"
            disabled={cartItems.length === 0}
            onClick={() => {
              if(window.confirm("Are you sure?")){
                dispatch(clearCart())
                success();
              }
            }}
          >
            Discard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
