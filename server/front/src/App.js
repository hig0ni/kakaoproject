import {Routes, Route} from 'react-router-dom'
import React from 'react';
import Home from './routes/Home';
import Board from './routes/Board';
import Login from './routes/Login';
import Register from './routes/Register';
 
function App() {
  return (
    <Routes> 
        <Route path='/' element={<Home/>} /> 
        <Route path='board' element={<Board/>} />
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
    </Routes>
  );
}
 
export default App;