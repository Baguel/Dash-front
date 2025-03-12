import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Login from "./Login";
import Index from "./Index";
import { Private } from "./components/loading";
import { Dashboard } from "./components/Dashboard";
import { Update } from "./components/Update";
import { Register } from "./Register";
import { UserUpdate } from "./components/UpdateUser";
import { Landing } from "./Landing";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Private />}>
            <Route path="/home" element={<Index />} exact></Route>
            <Route path="/apps" element={<Home />} exact></Route>
            <Route path="/dash" element={<Dashboard />} exact></Route>
            <Route path="/admin/update/:id" element={<Update/>} exact></Route>
            <Route path="/update" element={<UserUpdate/>} exact></Route>
        </Route>
        <Route path="/" element={<Landing />} ></Route>
        <Route path="/register" element={<Register />} ></Route>
        <Route path="/login" element={<Login />} ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
