import { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import Edit from "./Edit";
import "./style.css";
const Categories = ({ categories, setCategories,setFiltered, products, setCategoryTitle, categoryTitle }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  

  const addModal = () => {
    setIsAddModalOpen((prev) => !prev);
  };
  const editModal = () => {
    setIsEditModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if(categoryTitle === "All"){
      setFiltered(products)
    }else{
      setFiltered(products.filter((item) => item.category === categoryTitle))
    }
  },[products, setFiltered, categoryTitle])


  return (
    <ul className="flex md:flex-col gap-4 text-lg">
      <li onClick={() => setCategoryTitle('All')} className={`category-item ${categoryTitle === "All" && "!bg-pink-700"}`}>
        <span>All</span>
      </li>
      {categories.map((item) => (
        <li onClick={() => setCategoryTitle(item?.title)} className={`category-item ${item?.title === categoryTitle && "!bg-pink-700"}`} key={item._id}>
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
