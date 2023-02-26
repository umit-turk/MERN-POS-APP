import { Button, Card, Form, Input, Modal, Select } from "antd";

const CreateBill = ({ setModalOpen, isModalOpen }) => {
  const onFinish = (values) => {
    console.log(values);
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
            name={"phoneNumber"}
            rules={[
              { required: true, message: "You must enter a phone number" },
            ]}
            label="Phone Number"
          >
            <Input placeholder="Please enter a phone number" maxLength={"11"} />
          </Form.Item>
          <Form.Item
            name={"paymentMethod"}
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
              <span>549.00₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>VAT %8</span>
              <span className="text-red-600">43.92₺</span>
            </div>
            <div className="flex justify-between">
              <b>Total</b>
              <b>549.00₺</b>
            </div>
            <div className="flex justify-end">
              <Button className="mt-4" type="primary" htmlType="submit">
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
