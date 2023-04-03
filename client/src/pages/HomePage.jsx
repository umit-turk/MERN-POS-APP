import { useEffect, useState } from "react";
import CartTotals from "../components/cart/CartTotals";
import Categories from "../components/categories/Categories";
import Header from "../components/header/Header";
import Products from "../components/products/Products";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("All");

  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products/get-all");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories/get-all");
      const data = await res.json();
      data &&
        setCategories(
          data.map((item) => {
            return { ...item, value: item.title };
          })
        );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header
        categoryTitle={categoryTitle}
        setCategoryTitle={setCategoryTitle}
        products={products}
        setFiltered={setFiltered}
      />
      <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24 h-screen">
        <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
          <Categories
            products={products}
            categories={categories}
            setCategories={setCategories}
            setFiltered={setFiltered}
            categoryTitle={categoryTitle}
            setCategoryTitle={setCategoryTitle}
          />
        </div>
        <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-auto pb-10 min-h-[500px]">
          <Products
            setProducts={setProducts}
            products={products}
            filtered={filtered}
            categories={categories}
          />
        </div>
        <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
          <CartTotals />
        </div>
      </div>
    </>
  );
};

export default HomePage;
