import { Form, Modal, Table } from "antd";
import React from "react";

const Edit = ({ isEditModalOpen, editModal }) => {
  return (
    <Modal
      title="Category Operations"
      open={isEditModalOpen}
      onCancel={editModal}
    >
      <Form>
        <Table bordered />
      </Form>
    </Modal>
  );
};

export default Edit;
