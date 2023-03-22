import { useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import Edit from "./Edit";
import "./style.css";
const Categories = ({ categories, setCategories }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const addModal = () => {
    setIsAddModalOpen((prev) => !prev);
  };
  const editModal = () => {
    setIsEditModalOpen((prev) => !prev);
  };
  return (
    <ul className="flex md:flex-col gap-4 text-lg">
      {categories.map((item) => (
        <li className="category-item" key={item._id}>
          <span>{item.title}</span>
        </li>
      ))}

      <li
        className="category-item !bg-purple-800 hover:opacity-90"
        onClick={addModal}
      >
        <PlusOutlined className="md:text-2xl" />
      </li>
      <li
        className="category-item !bg-orange-800 hover:opacity-90"
        onClick={editModal}
      >
        <EditOutlined className="md:text-2xl" />
      </li>
      <Add
        addModal={addModal}
        categories={categories}
        isAddModalOpen={isAddModalOpen}
        setCategories={setCategories}
      />
      <Edit
        setCategories={setCategories}
        categories={categories}
        isEditModalOpen={isEditModalOpen}
        editModal={editModal}
      />
    </ul>
  );
};

export default Categories;
