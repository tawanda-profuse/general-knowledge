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
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/quiz/:category" element={<Quiz />} />
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
