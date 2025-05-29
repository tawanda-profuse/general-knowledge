import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import menuBtn from "../assets/menu_white_48dp.svg";
import closeBtn from "../assets/close_white_24dp.svg";
import houseBtn from "../assets/house.svg";

const Sidebar = () => {
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : "https://general-knowledge-eta.vercel.app";
  const [sideMenu, setSideMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const sidebarRef = useRef(null);

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

  // Close sidebar on Escape key or click outside
  useEffect(() => {
    if (!sideMenu) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSideMenu(false);
    };

    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSideMenu(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sideMenu]);

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
        ref={sidebarRef}
      >
        <Link
          className={`absolute cursor-pointer bg-[green] hover:bg-[black] rounded-[3px] text-[1.2rem] text-[white] py-[6px] px-[12px] z-[1111] left-2 ${
            sideMenu ? "block" : "hidden"
          } top-[25px] text-[1.2rem] transition-all duration-[.5s]`}
          onClick={() => setSideMenu(false)}
          title="Go to home"
          to="/"
        >
          <img src={houseBtn} alt="" />
        </Link>
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
            categories?.map((category, index) => {
              const currentPath = decodeURIComponent(location.pathname); // Decode URL-encoded path
              const isActive = currentPath === `/quiz/${category.category}`;

              return (
                <li
                  onClick={() => setSideMenu(false)}
                  key={index}
                  className={`border-t-[1px] border-b-[1px] border-b-[black] border-solid border-[#ffffff1a] ${
                    isActive ? "bg-[green]" : ""
                  } hover:bg-[green]`}
                >
                  <Link
                    key={index}
                    to={`/quiz/${category.category}`}
                    className="flex justify-center text-[1rem] text-[white] text-center w-full py-[1rem] duration-[.4s] hover:-translate-x-[5%]"
                    onClick={() => setSideMenu(false)}
                  >
                    {category.category}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
      <br />
    </>
  );
};

export default Sidebar;
