import '../styles/BoardWrite.scss';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from "react-router-dom";
import {useState} from 'react';
import axios from "axios";

function BoardWrite() {
    const [inputTitle, setinputTitle] = useState("");
    const [inputContent, setinputContent] = useState("");
    //const [viewContent, setViewContent] = useState([]);

    const handleTitle = (e) => {
        setinputTitle(e.target.value);
    };

    const submitContent = (e) => {
        let nickname = window.sessionStorage.getItem("nickname");
        axios.post('/board_inform/onWrite', null,{
            params: {
                title: inputTitle,
                content: inputContent,
                nickname: nickname
            }
        })
        .then(()=>{
            alert('등록 완료!');
            document.location.href = "/board";
        })
    }

    return (
      <div className="BoardWrite">
        <h1 className='notice'>공지사항
            <Link to="/board" className="btn2 backbtn">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg></Link>
        </h1>
        <div className='form-wrapper'>
          <input className="title-input" name='title' type='text' placeholder='제목' onChange={handleTitle}/>
          <CKEditor
            editor={ClassicEditor}
            placeholder="내용"
            data="Hello from CKEditor 5!"
            onReady={editor => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                setinputContent(data)
            }}
          />
        </div>
        <button className="submit-button"
        /* onClick={()=>{setViewContent(viewContent.concat({...inputContent}))}}>입력</button> */
        onClick={submitContent}>입력</button>
      </div>
    );
  }
  
export default BoardWrite;