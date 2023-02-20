import { Button } from "antd";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
const CartTotals = () => {
  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="bg-blue-600 text-center py-4 text-white font-bold tracking-wide">
        Cart Products
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 overflow-y-auto py-2">
        <li className="cart-item flex justify-between">
          <div className="flex items-center">
            <img
              src="https://i.lezzet.com.tr/images-xxlarge-secondary/elma-nasil-yenir-221135ca-f383-474c-a4f5-ad02a45db978.jpg"
              alt=""
              className="w-16 h-16 object-cover pt-2"
            />
            <div className="flex flex-col ml-2">
              <b>Apple</b>
              <span>12₺ x 2</span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              icon={<PlusCircleOutlined />}
              className="w-full flex items-center justify-center !rounded-full"
              type="primary"
              size="small"
            />
            <span className="inline-block">1</span>
            <Button
              icon={<MinusCircleOutlined />}
              className="w-full flex items-center justify-center !rounded-full"
              type="primary"
              size="small"
            />
          </div>
        </li>
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Sub Total</b>
            <span>99₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>VAT</b>
            <span className="text-red-700">+7.92%</span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Total</b>
            <span className="text-xl">99₺</span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button className="w-full" type="primary" size="large">
            Order
          </Button>
          <Button
            icon={<ClearOutlined />}
            className="w-full mt-2 flex items-center justify-center"
            type="primary"
            danger
            size="large"
          >
            Discard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
