/*!
* Start Bootstrap - Simple Sidebar v6.0.5 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            let togglebtn = document.body.querySelector('#sidebarToggle');
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
            if (togglebtn.innerText == '메뉴 숨기기'){
                togglebtn.innerHTML="메뉴 불러오기"
            }else{
                togglebtn.innerHTML="메뉴 숨기기"
            }
        });
    }
});

const loginbtn = document.body.querySelector('#login');
loginbtn.addEventListener("click", e => {
    window.location = 'http://localhost:3000/login';
});

const registerbtn = document.body.querySelector('#register');
registerbtn.addEventListener("click", e => {
    window.location = 'http://localhost:3000/register';
});

const boardbtn = document.body.querySelector('#board');
boardbtn.addEventListener("click", e => {
    window.location = 'http://localhost:3000/board';
});
