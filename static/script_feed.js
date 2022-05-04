// 피드 페이지로 이동
function Go_feed() {
    $.ajax({
        type: "get",
        url: "/feed",
        data: {},
        success: function () {
            window.location.href='/feed'
        }
    })
}

// 프로필 페이지로 이동
function Go_profile() {
    $.ajax({
        type: "get",
        url: "/profile",
        data: {},
        success: function () {
            window.location.href='/profile'
        }
    })
}

// 포스트 작동 아이콘 모달 /////////////////////////////////////////
const getPostButton = document.querySelector('#button_post')  // 작성 아이콘 버튼을 변수에 담음
const getPostModal = document.querySelector('.modal_body_post')  // 모달이 될 레이아웃을 변수에 담음(배경 포함)
const body = document.querySelector('body')  // 모달이 보여질때 스크롤이 잠기게 하기위해 바디 전체를 변수에 담음
const getButtonQuit = document.querySelector('.quit_modal_post')  // 취소 버튼을 변수에 담음

getPostButton.addEventListener('click', () => {  // 버튼에 클릭 이벤트가 발생하면
    getPostModal.classList.toggle('modalToggle')  // modalToggle를 토글시켜줌
    // (토글은 지정한 변수(modalToggle)를 사용하여(css에선 .modalToggle) 세부 기능을 껐다 켰다 할 수 있도록함. ex).hide() 혹은 display=none 인 것을 .show() 혹은 반대로 작동)

    if (getPostModal.classList.contains('modalToggle')) {  // getPostModal 에 modalToggle이 활성화 된 상태라면
        body.style.overflow = 'hidden'  // overflow(스크롤기능) 숨김
    }
})

getPostModal.addEventListener('click', (event) => {  // 모달 변수에 클릭 이벤트가 발생되고
    if (event.target === getPostModal) {  // 그게 만약 ===('엄격하게') 모달 변수 위에서 발생한다면 (모달시 실제로 보여지는 영역은 modal_body_post의 자식태그이므로 해당하지않음)
        getPostModal.classList.toggle('modalToggle')  // modalToggle를 다시 토글시켜 사라지게함
        body.style.overflow = 'auto'  // 스크롤을 다시 활성화
    } else if (event.target === getButtonQuit) {  // 혹은 그게 만약 나가기 x버튼 변수 위라면
        getPostModal.classList.toggle('modalToggle')  // modalToggle를 다시 토글시켜 사라지게함
        body.style.overflow = 'auto'  // 스크롤을 다시 활성화
    }
})

// 옵션 버튼 모달 ///////////////////////////////////////////
const getOptionButton = document.querySelector('.button_option')  // 옵션 버튼을 변수에 담음
const getOptionModal = document.querySelector('.option_body_modal')  // 변수에 모달이 될 영역을 넣음
const getButtonCencel = document.querySelector('#button_cencel')  // 취소 버튼을 변수에 담음

getOptionButton.addEventListener('click', () => {  // 버튼에 클릭 이벤트가 발생하면
    getOptionModal.classList.toggle('modalToggle')  // modalToggle를 토글시켜줌

    if (getOptionModal.classList.contains('modalToggle')) {  // getOptionModal 변수에 modalToggle가 활성화됐다면
        body.style.overflow = 'hidden'  // 스크롤을 막음
    }
})

getOptionModal.addEventListener('click', (event) => {  // 모달 변수에 클릭 이벤트가 발생되고
    if (event.target === getOptionModal) {  // 그게 만약 '엄격하게' 모달 변수 위에서 발생한다면 (모달시 실제로 보여지는 영역은 option_body_modal 자식태그이므로 해당하지않음)
        getOptionModal.classList.toggle('modalToggle')  // modalToggle를 다시 토글시켜 사라지게함
        body.style.overflow = 'auto'  // 스크롤을 다시 활성화
    } else if (event.target === getButtonCencel) {  // 혹은 그게 만약 취소 버튼 변수 위라면
        getOptionModal.classList.toggle('modalToggle')  // modalToggle를 다시 토글시켜 사라지게함
        body.style.overflow = 'auto'  // 스크롤을 다시 활성화
    }
})

// 검색창 input 박스에 onfocus 시 돋보기 아이콘 사라짐 기능 //////////////////////
function focus_search() {
    $(".icon_glass").attr("style", "display: none;") // 사라짐
}
function blur_search() {
    $(".icon_glass").attr("style", "display: block;") // 나타남
}

// 이미지 슬라이드 //////////////////////
$(document).ready(function() {
    $('.slider').bxSlider({  // bxslider 라이브러리에 지정된 커스텀 가능한 옵션들
        speed: 300,  // 슬라이드 속도
        infiniteLoop: false,  // 루프 off
        hideControlOnEnd: true,  // 첫 슬라이드의 이전 버튼과 마지막 슬라이드 다음 버튼 제거
        touchEnabled: false  // 터치로 슬라이드 불가능
    })
})

// 좋아요 버튼 ///////////////////////////
function red_heart_show() {  // 좋아요 입력
    $(".red_heart").show()
    $(".empty_heart").hide()
    $(".heart_count").show()
}

function empty_heart_show() {  // 좋아요 취소
    $(".empty_heart").show()
    $(".red_heart").hide()
    $(".heart_count").hide()
}

// // 컨텐츠 로딩 완료 후 높이 기준으로 클래스 재처리
// window.addEventListener('load', function () {
//     let contentHeight = document.querySelector('.box_content > .text_content').offsetHeight; //컨텐츠 높이 얻기
//     if (contentHeight < 20) {
//         console.log('1줄입니다')
//         document.querySelector('.box_show_text').classList.add('hide_btn_open') // 버튼 감춤
//     } else {
//         console.log('두줄 이상입니다')
//         document.querySelector('.text_content').classList.add('limit_box')
//     }
// })

// function btn_click() {
//             console.log('버튼 클릭감지되었습니다')
//             // document.querySelector('.text_content').classList.remove('limit_box')
//             document.querySelector('.box_show_text').classList.add('hide_btn_open')
//         }


// 댓글달기 input 박스에 텍스트 감지 여부에 따라 게시 버튼 스타일 변경 기능 //////////////////////
$(document).ready(function() {
    $(".write_comment").on('input',function() {
        if($('.write_comment').val()=='')
            $('.write_button').attr("style", "opacity: 50%; cursor: auto;");  // 텍스트 감지되지않으면 흐리게, 기본 커서
        else
            $('.write_button').attr("style", "opacity: 100%; cursor: pointer;")  // 텍스트 감지되면 진하게, 포인터 커서
            $('.write_comment').attr("style", "font-size: 14px; padding-bottom: 1px;")  // 텍스트 감지되면 폰트 사이즈 키우고 살짝 위로
    })
})

// 댓글 달기 기능
function write_button() {
    let comment = $('.write_comment').val()
    if (comment != '') {
        let temp_html = `<div class="box_list_comment">
                        <span class="writer_comment" onclick="Go_profile()">댓글 작성자 이름</span>
                        <span class="comment">${comment}</span>
                        <svg class="heart_comment" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12">
                            <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865
                            3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0
                            014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17
                            0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5
                            9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018
                            2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025
                            4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
                        </svg>
                    </div>`
    $('.box_comment').append(temp_html)
    }
}