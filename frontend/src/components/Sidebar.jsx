import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import menuBtn from "../assets/menu_white_48dp.svg";
import closeBtn from "../assets/close_white_24dp.svg";

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
      {!sideMenu && (
        <button
          className="absolute cursor-pointer z-[100] bg-[green] hover:bg-[orange] rounded-[3px] left-[40px] top-[25px] text-[2rem] text-[white] py-[6px] px-[12px]"
          onClick={() => setSideMenu(true)}
          title="Open menu"
        >
          <img src={menuBtn} alt="" />
        </button>
      )}
      <div
        className={`fixed z-[1110] top-0 transition-all duration-500 ${
          sideMenu ? "left-0" : "-left-full md:-left-2/4"
        } w-4/5 md:w-1/4 h-screen overflow-y-scroll overflow-x-hidden bg-[tomato]`}
      >
        <button
          className={`absolute cursor-pointer bg-[green] hover:bg-[black] rounded-[3px] text-[1.2rem] text-[white] py-[6px] px-[12px] z-[1111] right-2 ${
            sideMenu ? "block" : "hidden"
          } top-[25px] text-[1.2rem] transition-all duration-[.5s]`}
          onClick={() => setSideMenu(false)}
          title="Close menu"
        >
          <img src={closeBtn} alt="" />
        </button>
        <Link
          to="/create"
          className="mt-[5rem] flex justify-evenly w-full text-[1.25rem] text-[white] py-[20px] px-[40px] box-border border-t-[1px] border-b-[1px] border-b-[black] border-solid border-[#ffffff1a] hover:underline bg-[orange]"
          onClick={() => setSideMenu(false)}
        >
          Create Quiz
          <i className="fas fa-plus font-bold text-[1.2rem] text-[white]"></i>
        </Link>
        <h2 className="text-[1.25rem] text-center text-[green] bg-[black] select-none py-[20px]">
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
                onClick={() => setSideMenu(false)}
                key={index}
                className="border-t-[1px] border-b-[1px] border-b-[black] border-solid border-[#ffffff1a] hover:bg-[green]"
              >
                <a
                  key={index}
                  href={`/quiz/${category.category}`}
                  className="flex justify-center text-[1rem] text-[white] text-center w-full py-[1rem] duration-[.4s] hover:-translate-x-[5%]"
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
