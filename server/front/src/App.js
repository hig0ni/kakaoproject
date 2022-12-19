import {Routes, Route} from 'react-router-dom'
import React from 'react';
import Home from './routes/home';
import Board from './routes/board';
import Login from './routes/login';
import Register from './routes/register';
 
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