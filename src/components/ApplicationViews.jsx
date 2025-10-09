import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../pages/Login.jsx";
import Home from "../pages/Home";
import { RockForm } from "./RockForm.jsx";
import { RockList } from "./RockList.jsx";
import { Register } from "../pages/Register.jsx";

export const ApplicationViews = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [rocksState, setRocksState] = useState([
    {
      id: 1,
      name: "Sample",
      type: {
        id: 1,
        label: "Volcanic",
      },
      user: {
        first_name: "Prometheus",
        last_name: "Vesuvius",
      },
    },
  ]);

  const fetchRocksFromAPI = async (showAll) => {
    let url = `${apiUrl}/rocks`;

    if (showAll !== true) {
      url = `${apiUrl}/rocks?owner=current`;
    }
    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`,
      },
    });
    const rocks = await response.json();
    setRocksState(rocks);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route
            path="/"
            element={
              <div className="container mx-auto max-w-4xl">
                <Home />
              </div>
            }
          />

          <Route
            path="/create"
            element={
              <div className="container mx-auto max-w-2xl">
                <RockForm fetchRocks={fetchRocksFromAPI} />
              </div>
            }
          />

          <Route
            path="/allrocks"
            element={
              <div className="container mx-auto max-w-3xl">
                <RockList rocks={rocksState} fetchRocks={fetchRocksFromAPI} showAll={true} />
              </div>
            }
          />

          <Route
            path="/mine"
            element={
              <div className="container mx-auto max-w-3xl">
                <RockList rocks={rocksState} fetchRocks={fetchRocksFromAPI} showAll={false} />
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
