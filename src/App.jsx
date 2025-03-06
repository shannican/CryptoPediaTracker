import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Compare from "./pages/Compare";
import Watchlist from "./pages/Watchlist";
import CoinInfo from "./pages/CoinInfo";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef } from "react";

const App = () => {
  const cursor = useRef(null);
  const cursorPointer = useRef(null);

  useEffect(() => {
    cursor.current = document.getElementById("cursor");
    cursorPointer.current = document.getElementById("cursor-pointer");

    const handleMouseMove = (e) => {
      cursor.current.style.left = `${e.clientX}px`;
      cursor.current.style.top = `${e.clientY}px`;
      cursorPointer.current.style.left = `${e.clientX}px`;
      cursorPointer.current.style.top = `${e.clientY}px`;
    };

    const handleMouseDown = () => {
      cursor.current.style.height = "0.5rem";
      cursor.current.style.width = "0.5rem";
      cursorPointer.current.style.height = "3rem";
      cursorPointer.current.style.width = "3rem";
    };

    const handleMouseUp = () => {
      cursor.current.style.height = "0.3rem";
      cursor.current.style.width = "0.3rem";
      cursorPointer.current.style.height = "2rem";
      cursorPointer.current.style.width = "2rem";
    };

    document.body.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mousedown", handleMouseDown);
    document.body.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mousedown", handleMouseDown);
      document.body.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("watchlist")) {
      localStorage.setItem("watchlist", JSON.stringify([]));
    }
  }, []);

  return (
    <div>
      <div className="cursor" id="cursor" ref={cursor} />
      <div className="cursor-pointer" id="cursor-pointer" ref={cursorPointer} />
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/coin/:id" element={<CoinInfo />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </div>
  );
};

export default App;
