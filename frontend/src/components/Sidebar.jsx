import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  const apiUrl = window.location.origin.includes("localhost")
    ? "http://localhost:8000"
    : "https://general-knowledge-eta.vercel.app";
  const [sideMenu, setSideMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      await axios
        .get(`${apiUrl}/categories`)
        .then((response) => {
          setCategories(response.data.categories);
        })
        .catch((error) => {
          console.error("Error: ", error);
          toast.error(error.response.data?.message || error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchCategories();
  }, [categories, apiUrl]);

  return (
    <>
      <input
        type="checkbox"
        id="check"
        className="hidden"
        onChange={() => setSideMenu(!sideMenu)}
      />
      <label htmlFor="check" title="Open/close menu">
        {!sideMenu && (
          <span className="absolute cursor-pointer z-[100] bg-[green] rounded-[3px] left-[40px] top-[25px] text-[2rem] text-[white] py-[6px] px-[12px]">
            <i className="fas fa-bars"></i>
          </span>
        )}
        <span
          className={`absolute cursor-pointer bg-[green] rounded-[3px] text-[1.2rem] text-[white] py-[6px] px-[12px] z-[1111] ${
            sideMenu ? "left-[90%] md:left-[20%]" : "-left-[195px]"
          } top-[25px] text-[1.2rem] transition-all duration-[.5s]`}
        >
          <i className="fas fa-times"></i>
        </span>
      </label>
      <div
        className={`fixed z-[1110] ${
          sideMenu ? "left-0" : "-left-full md:-left-2/4"
        } w-full md:w-1/4 h-screen overflow-y-scroll overflow-x-hidden bg-[tomato]`}
      >
        <Link
          to="/create"
          className="mt-[5rem] flex justify-between w-full text-[1.25rem] text-[white] py-[20px] px-[40px] box-border border-t-[1px] border-b-[1px] border-b-[black] border-solid border-[#ffffff1a] duration-[.4s] hover:pl-[50px] mr-[60px] bg-[orange]"
          onClick={() => setSideMenu(false)}
        >
          Create Quiz
          <i className="fas fa-plus text-[white]"></i>
        </Link>
        <h2 className="text-[1.25rem] text-center text-[green] bg-[black] select-none py-[0.5rem]">
          All Quizzes ({categories?.length || 0})
        </h2>
        <ul>
          {isLoading &&
            new Array(3)
              .fill(null)
              .map((_, index) => (
                <li
                  key={index}
                  className="w-full bg-[#999] animate-pulse rounded-md my-[0.1rem] py-[2rem] border-t-[1px] border-b-[1px] border-b-[black]"
                ></li>
              ))}
          {!isLoading &&
            categories?.map((category, index) => (
              <li
                key={index}
                className={`${
                  window.location.href.includes(category.category) ? "active" : ""
                }`}
              >
                <a
                  key={index}
                  href={`/quiz/${category.category}`}
                  className="flex justify-center text-[1.25rem] text-[white] text-center w-full py-[1rem] border-t-[1px] border-b-[1px] border-b-[black] border-solid border-[#ffffff1a] duration-[.4s] hover:-translate-x-[5%]"
                  onClick={() => setSideMenu(false)}
                >
                  {category.category}
                </a>
              </li>
            ))}
        </ul>
      </div>
      <br />
    </>
  );
};

export default Sidebar;
