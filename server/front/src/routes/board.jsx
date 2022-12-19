/*import React,{ useState } from 'react';
 
function Data() {
    const [data,setData] = useState({});
    fetch('/data')
    .then(res => res.json())
    .then(data => setData(data),()=>{
        console.log('data read : ' , data);
    })

    return (
        <div>
          {data.lastname} {data.firstname}
        </div>
      );
}
     
export default Data;*/

import React, { useState } from "react";

const Board = () => {
    const [data, setData] = useState({});
    fetch('/board')
    .then((res) => res.json())
    .then((data) => setData(data),() => {
        console.log('data read : ' , data);            
    })

    return (
        <div>
            {JSON.stringify(data)}
        </div>
        );
}

export default Board;