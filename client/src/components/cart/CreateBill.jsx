import { Button, Card, Form, Input, Modal, Select, message } from "antd";
import {useSelector, useDispatch} from 'react-redux'
import { clearCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CreateBill = ({ setModalOpen, isModalOpen }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {cartItems, total, tax} = useSelector((state) => state.cart)

  const onFinish = async (values) => {
    try {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/invoices/add-invoice`,{
        method:"POST",
        body: JSON.stringify({
          ...values,
          subTotal:total,
          tax:tax,
          total:(total + (total * tax) / 100).toFixed(2),
          cartItems:cartItems,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
      if(res.status === 200){
        message.success("Invoice created successfully")
        dispatch(clearCart())
        navigate("/invoices")
      }
    } catch (error) {
      message.error("Invoice has not created")
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        title="Invoice Generation"
        open={isModalOpen}
        footer={false}
        onCancel={setModalOpen}
      >
        <Form onFinish={onFinish} layout={"vertical"}>
          <Form.Item
            name={"customerName"}
            rules={[
              { required: true, message: "You must enter a customer name" },
            ]}
            label="Customer Name"
          >
            <Input placeholder="Please enter a customer name" />
          </Form.Item>
          <Form.Item
            name={"customerPhoneNumber"}
            rules={[
              { required: true, message: "You must enter a phone number" },
            ]}
            label="Phone Number"
          >
            <Input placeholder="Please enter a phone number" maxLength={"11"} />
          </Form.Item>
          <Form.Item
            name={"paymentMode"}
            rules={[
              { required: true, message: "You must select a payment method" },
            ]}
            label="Payment Method"
          >
            <Select placeholder="Please choose the payment method">
              <Select.Option value="Cash">Cash</Select.Option>
              <Select.Option value="Bank Card">Bank Card</Select.Option>
            </Select>
          </Form.Item>
          <Card bordered={false}>
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>{(total).toFixed(2)}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>VAT %8</span>
              <span className="text-red-600">{(total * tax) / 100}₺</span>
            </div>
            <div className="flex justify-between">
              <b>Total</b>
              <b>{(total + (total * tax) / 100).toFixed(2)}₺</b>
            </div>
            <div className="flex justify-end">
              <Button  className="mt-4" type="primary" htmlType="submit">
                Order
              </Button>
            </div>
          </Card>
        </Form>
      </Modal>
    </>
  );
};

export default CreateBill;
