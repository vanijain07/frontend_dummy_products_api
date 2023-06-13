import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Counter from "./components/counter";
import Navbar from "./components/navbar";
import Pagination from "./components/pagination";

const App = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("https://dummyjson.com/products");
  const [limit, setLimit] = useState(30);
  const [skip, setSkip] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const handleCallback = (e) => {
    setUrl("https://dummyjson.com/products/search?q=" + e);
  };

  const changeLimi = (num) => {
    setUrl("https://dummyjson.com/products?limit=" + num + "&skip=" + skip);
  };

  const fetchAPI = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data.products);
        setTotalProducts(data.total);
        setLimit(data.limit);
        setSkip(data.skip);
      });
  };
  useEffect(() => {
    fetchAPI(url);
  }, [url]);

  const paginate = (pageNumber) => {
    setUrl(
      "https://dummyjson.com/products?limit=" +
        limit +
        "&skip=" +
        (pageNumber - 1) * limit
    );
  };

  return (
    <div>
      <Navbar parentCallback={handleCallback} changeLimit={changeLimi} />

      {data.length > 0 ? (
        <Counter data={data} />
      ) : (
        <h2>sorry no such product available</h2>
      )}
      <Pagination
        productsPerPage={limit}
        totalProducts={totalProducts}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
