import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Board from './components/Board';
import BoardWrite from './components/BoardWrite';
import LoginState from './components/LoginState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element = {<LoginState/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/register" element = {<Register/>}/>
        <Route path="/board" element = {<Board/>}/>
        <Route path="/boardwrite" element = {<BoardWrite/>}/>

    </Routes>
  </BrowserRouter>
);  