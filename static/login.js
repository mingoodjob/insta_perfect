$(document).ready(function () {
    $('.bxslider').bxSlider({
        controls: false,
        speed: 2000,
        auto: true,
        pager: false,
        mode: 'fade',
        pause: 3000,
    });
    let idValue = login_input.value;
    let pwValue = login_input2.value;

    if (
        (idValue && pwValue) &&
        (pwValue.length >= 5) &&
        (idValue.length >= 1)
    ) {
        login_btn.style.opacity = 1;
    } else {
        login_btn.style.opacity = .3;
    }

});

// 로그인 input 입력시 글자이동 //
const login_input = document.querySelector(".login_input");
const login_input_text = document.querySelector(".login_input_text");
login_input.addEventListener('keydown', (event) => {
    login_input_text.style.fontSize = "5px";
    login_input_text.style.lineHeight = "1px";
    login_input.style.padding = "7px 0 1px 4px";
})

const login_input2 = document.querySelector(".login_input2");
const login_input_text2 = document.querySelector(".login_input_text2");
const login_hide_pwd = document.querySelector(".login_hide_pwd");
const login_btn = document.querySelector(".login_btn");

login_input2.addEventListener('keydown', (event) => {
    login_input_text2.style.fontSize = "5px";
    login_input_text2.style.lineHeight = "1px";
    login_hide_pwd.style.display = "flex";
    login_input2.style.padding = "7px 0 1px 4px";

    //비밀번호 숨기기 기능
    login_hide_pwd.addEventListener('click', (event) => {
        $('.login_input2').prop("type", "text");

        login_hide_pwd.addEventListener('click', (event) => {
            $('.login_input2').prop("type", "password");
        })
    })
    // 아이디 비밀번호 입력시 게시글 버튼 활성화 //
    let idValue = login_input.value;
    let pwValue = login_input2.value;

    if (
        (idValue && pwValue) &&
        (pwValue.length >= 5) &&
        (idValue.length >= 1)
    ) {
        login_btn.style.opacity = 1;
    } else {
        login_btn.style.opacity = .3;
    }

});
//로그인 ajax 콜
function login() {
        let uid = $('#uid').val()
        let pwd = $('#pwd').val()

        $.ajax({
            type: "POST",
            url: "/login_check",
            data: {uid_give:uid, pwd_give:pwd},
            success: function (response) {
                if (response['result'] == 'success') {
                    $.cookie('mytoken', response['token'], {path:'/'});
                    window.location.href = '/'
                } else {
                    alert('아아디,비밀번호를 확인하세요!')
                }
            },
        });


    }
// 엔터키로 로그인 가능하게
$('#uid, #pwd').on('keypress', function(e){
        if(e.keyCode == '13'){
            $('.login_btn').click();
        }
    });



// function logout(){
//         $.removeCookie('mytoken');
//         alert('로그아웃!')
//         window.location.href='/login'
//       }
