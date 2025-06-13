import { lazy, Suspense } from "react";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
const Create = lazy(() => import("./components/Create"));
const Quiz = lazy(() => import("./components/Quiz"));

function App() {
  return (
    <>
      <Sidebar />
      <Suspense
        fallback={
          <div className="absolute left-0 top-0 w-screen h-screen text-center z-[200] flex flex-col items-center justify-center bg-[rgba(255,255,255,0.8)]">
            <p className="animate-bounce text-[10rem] font-serif text-[purple]">
              ...
            </p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/quiz/:category" element={<Quiz />} />
        </Routes>
        <ToastContainer
          position="bottom-left"
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
          autoClose={5000}
        />
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
