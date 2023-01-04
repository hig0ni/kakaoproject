import '../styles/Board.scss';
import { Link } from "react-router-dom";
import { React, useState, useEffect } from 'react';
import axios from 'axios';

function Board() {
    const [viewContent, setViewContent] = useState([]);

    useEffect(()=>{
        axios.get("/board_inform/getBoard")
        .then((res)=>{
            console.log(res.data)
            setViewContent(res.data)
        })
    },[])
    
    return (
        <div>        
            <section className="notice">
            <div className="page-title">
                    <div className="container">
                        <h3>공지사항</h3>
                    </div>
                </div>

                <div id="board-search">
                    <div className="container">
                        <div className="search-window">
                            <form action="">
                                <div className="search-wrap">
                                    <input id="search" type="search" name="" placeholder="검색어를 입력해주세요." value=""/>
                                    <button type="submit" className="btn2 btn-dark">검색</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            
                <div id="board-list">
                    <div className="container">
                        <table className="board-table">
                            <thead>
                            <tr>
                                <th scope="col" className="th-num">번호</th>
                                <th scope="col" className="th-title">제목</th>
                                <th scope="col" className="th-date">등록일</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                viewContent.map((v) => {
                                    return (
                                        <tr>
                                            <td id="num">{v[0]}</td>
                                            <th ><a href="#!" id="title">{v[1]}</a></th>
                                            <td id="date">{v[4]}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <Link to="/boardwrite" className="btn2 btnwrite">글쓰기</Link>
                    </div>
                        
                </div>

            </section>
        </div>
    );
}

export default Board;