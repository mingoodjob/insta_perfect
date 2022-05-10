// 피드 페이지로 이동
function logout() {
    $.removeCookie('mytoken', {path: '/'});
    window.location.href = '/login';
}

$().ready(function () {
            $("#logout").click(function () {
                Swal.fire({
                        title: '로그아웃 중입니다...',
                        text: '로그인 페이지로 돌아갑니다'
                });

            });
        });

function Go_feed() {
    $.ajax({
        type: "get",
        url: "/",
        data: {},
        success: function () {
            window.location.href='/'
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

// 유저 정보 가져오기
$(function() {
    $.ajax({
        type: "GET",
        url: "/user",
        data: {},
        success: function (response) {
            let uid = response['user']['uid']  // 유저 uid
            let pr_photo = response['user']['pr_photo']  // 유저 프로필 이미지
            // 네임카드 유저 uid 적용
            $('.profile_name').text(uid)

            // 상단바와 네임카드 유저 프로필 이미지 적용
            $('.profile_nav').attr('src', pr_photo)
            $('.profile_name_card').attr('src', pr_photo)
        }
    })
})

// 이미지 슬라이드 //////////////////////
function road_slider() {
    $('.slider_post').bxSlider({  // bxslider 라이브러리에 지정된 커스텀 가능한 옵션들  // 포스트 박스내 슬라이드
        speed: 300,  // 슬라이드 속도
        infiniteLoop: false,  // 루프 off
        hideControlOnEnd: true,  // 첫 슬라이드의 이전 버튼과 마지막 슬라이드 다음 버튼 제거
        touchEnabled: false,  // 터치로 슬라이드 불가능
        adaptiveHeight: true,  // 사진 높이에 따라 박스 크기 조절
        onSliderLoad: function(){
            $(".slider_post").css("visibility", "visible").animate({opacity:1})
        }
    })
}

// feed 정보 불러오기
$(function() {
    $.ajax({
        type: "GET",
        url: "/feed",
        data: {},
        success: function (response) {
            let pr_photo = response['pr_photo']  // content 작성자 프로필 이미지
            $('.profile_name_post').attr('src', pr_photo)  // 피드페이지
            $('.profileImg_comment_modal').attr('src', pr_photo)  // 댓글 모달창

            let all_feed = response['content']
            for(let i = 0; i < all_feed.length; i++) {
                let write_id = all_feed[i]['write_id']
                let content = all_feed[i]['content']
                let like_count = all_feed[i]['like_count']

                $('.name_post').text(write_id)
                $('.writer_content').text(write_id)
                $('.text_content').text(content)
                $('.like_cnt').text(like_count)
                $('.like_count_commentModal').text(like_count)

                let all_photo = all_feed[i]['photo']

                for(let i = 0; i < all_photo.length; i++) {
                    let photo = all_photo[i]
                    let temp_html = `<img src=${photo}>`
                    $('.slider_post').append(temp_html)

                    let temp_html_commentModal = `<img src=${photo}>`
                    $('.slider_modal').append(temp_html_commentModal)
                }
            }

            setTimeout(function() {  // 슬라이드 로딩 대기를 위해 지연시간을 줌
                road_slider();
            },500);
        }
    })
})

// 포스트 작성 아이콘 모달 /////////////////////////////////////////
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
const getOptionModalButton = document.querySelector('.button_option_modal')  // 모달창의 옵션 버튼을 변수에 담음
const getOptionModal = document.querySelector('.option_body_modal')  // 변수에 모달이 될 영역을 넣음
const getButtonCancel = document.querySelector('#button_cancel')  // 취소 버튼을 변수에 담음

getOptionButton.addEventListener('click', () => {  // 버튼에 클릭 이벤트가 발생하면
    getOptionModal.classList.toggle('modalToggle')  // modalToggle를 토글시켜줌

    if (getOptionModal.classList.contains('modalToggle')) {  // getOptionModal 변수에 modalToggle가 활성화됐다면
        body.style.overflow = 'hidden'  // 스크롤을 막음
    }
})

getOptionModalButton.addEventListener('click', () => {  // 버튼에 클릭 이벤트가 발생하면
    getOptionModal.classList.toggle('modalToggle')  // modalToggle를 토글시켜줌

    if (getOptionModal.classList.contains('modalToggle')) {  // getOptionModal 변수에 modalToggle가 활성화됐다면
        body.style.overflow = 'hidden'  // 스크롤을 막음
    }
})

getOptionModal.addEventListener('click', (event) => {  // 모달 변수에 클릭 이벤트가 발생되고
    if (event.target === getOptionModal) {  // 그게 만약 '엄격하게' 모달 변수 위에서 발생한다면 (모달시 실제로 보여지는 영역은 option_body_modal 자식태그이므로 해당하지않음)
        getOptionModal.classList.toggle('modalToggle')  // modalToggle를 다시 토글시켜 사라지게함
        if (getCommentModal.classList.contains('modalToggle')) {  // 만약 comment 모달이 있는 상태라면
            body.style.overflow = 'hidden'  // 스크롤을 막음
        } else {
                body.style.overflow = 'auto'  // 스크롤을 다시 활성화
            }
    } else if (event.target === getButtonCancel) {  // 혹은 그게 만약 취소 버튼 변수 위라면
        getOptionModal.classList.toggle('modalToggle')  // modalToggle를 다시 토글시켜 사라지게함
        if (getCommentModal.classList.contains('modalToggle')) {  // 만약 comment 모달이 있는 상태라면
            body.style.overflow = 'hidden'  // 스크롤을 막음
        } else {
                body.style.overflow = 'auto'  // 스크롤을 다시 활성화
            }
    }
})

// 댓글 모달 ///////////////////////////////////////////
var modalslide = ''

    $(document).ready(function() {
        modalslide = $('.slider_modal').bxSlider()
    })

const getCommentButton = document.querySelector('.comment_icon')  // 댓글 아이콘을 변수에 담음
const getCommentShowButton = document.querySelector('.show_comment')  // 댓글 모두보기 버튼을 변수에 담음
const getCommentModal = document.querySelector('.comment_modal_body')  // 변수에 모달이 될 영역을 넣음
const getCommentQuit = document.querySelector('.quit_comment_modal')  // 취소 버튼을 변수에 담음

getCommentButton.addEventListener('click', () => {  // 댓글 아이콘에 클릭 이벤트가 발생하면
    getCommentModal.classList.toggle('modalToggle')  // modalToggle를 토글시켜줌

    modalslide.reloadSlider({
        speed: 300,  // 슬라이드 속도
        infiniteLoop: false,  // 루프 off
        hideControlOnEnd: true,  // 첫 슬라이드의 이전 버튼과 마지막 슬라이드 다음 버튼 제거
        touchEnabled: false,  // 터치로 슬라이드 불가능
        adaptiveHeight: true,  // 사진 높이에 따라 박스 크기 조절
        onSliderLoad: function() {
            $(".box_slider").css("visibility", "visible").animate({opacity: 1})
        }
    });
// }

    if (getCommentModal.classList.contains('modalToggle')) {  // getCommentModal 변수에 modalToggle가 활성화됐다면
        body.style.overflow = 'hidden'  // 스크롤을 막음
    }
})

getCommentShowButton.addEventListener('click', () => {  // 댓글 모두보기 버튼에 클릭 이벤트가 발생하면
    getCommentModal.classList.toggle('modalToggle')  // modalToggle를 토글시켜줌

    modalslide.reloadSlider({
        speed: 300,  // 슬라이드 속도
        infiniteLoop: false,  // 루프 off
        hideControlOnEnd: true,  // 첫 슬라이드의 이전 버튼과 마지막 슬라이드 다음 버튼 제거
        touchEnabled: false,  // 터치로 슬라이드 불가능
        adaptiveHeight: true,  // 사진 높이에 따라 박스 크기 조절
        onSliderLoad: function() {
            $(".box_slider").css("visibility", "visible").animate({opacity: 1})
        }
    });

    if (getCommentModal.classList.contains('modalToggle')) {  // getCommentModal 변수에 modalToggle가 활성화됐다면
        body.style.overflow = 'hidden'  // 스크롤을 막음
    }
})

getCommentModal.addEventListener('click', (event) => {  // 모달 변수에 클릭 이벤트가 발생되고
    if (event.target === getCommentModal) {  // 그게 만약 '엄격하게' 모달 변수 위에서 발생한다면 (모달시 실제로 보여지는 영역은 comment_modal_body 자식태그이므로 해당하지않음)
        getCommentModal.classList.toggle('modalToggle')  // modalToggle를 다시 토글시켜 사라지게함
        body.style.overflow = 'auto'  // 스크롤을 다시 활성화
    } else if (event.target === getCommentQuit) {  // 혹은 그게 만약 취소 버튼 변수 위라면
        getCommentModal.classList.toggle('modalToggle')  // modalToggle를 다시 토글시켜 사라지게함
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

// 좋아요 갯수에 따른 좋아요 텍스트와 아이콘 노출 (페이지 처음 로드시)
// $(function() {
//     $.ajax({
//         type: 'GET',
//         url: '/feed',
//         data: {},
//         success: function (response) {
//             let content = response['content']
//             let like_cnt = response['like_count']  // 해당 content의 좋아요 갯수
//             let like_user = response['like_user'][$('.profile_name').text()]  // 현재 로그인한 유저가 좋아요 눌렀다면=true, 아니면 false
//             if (like_cnt != 0) {
//                 $('.heart_count').show()
//                 $('.like_cnt_zero_commentModal').hide()
//                 $('.like_cnt_commentModal').show()
//             }
//             if (like_user == true) {
//                 $('.empty_heart').hide()
//                 $('.empty_heart_modal').hide()
//                 $('.red_heart').show()
//                 $('.red_heart_modal').show()
//             }
//         }
//     })
// })

// 좋아요 버튼 입력시
// function red_heart_show() {
//     click_like = true
//
//     $.ajax({
//         type: 'POST',
//         url: '/feed',
//         data: {click_like:click_like},
//         success: function (response) {
//             console.log(response['msg'])
//             $('.empty_heart').hide()
//             $('.empty_heart_modal').hide()
//             $('.like_cnt_zero_commentModal').hide()
//             $('.red_heart').show()
//             $('.red_heart_modal').show()
//             $('.heart_count').show()
//             $('.like_cnt_commentModal').show()
//         }
//     })
// }

// 좋아요 버튼 취소시
// function empty_heart_show() {
//     click_like = false
//
//     $.ajax({
//         type: 'POST',
//         url: '/feed',
//         data: {click_like: click_like},
//         success: function (response) {
//             console.log(response['msg'])
//             $('.red_heart').hide()
//             $('.red_heart_modal').hide()
//             $('.heart_count').hide()
//             $('.like_cnt_commentModal').hide()
//             $('.empty_heart').show()
//             $('.empty_heart_modal').show()
//             $('.like_cnt_zero_commentModal').show()
//         }
//     })
// }


// content 내용이 길면 숨김 처리와 더보기 버튼
window.addEventListener('load', function () {
    let contentHeight = document.querySelector('.text_content').offsetHeight // content 높이 얻기
    if (contentHeight < 20) {
        document.querySelector('.show_cotent').classList.add('hide_btn') // 1줄이하면 버튼 감춤
    } else {
        document.querySelector('.box_content').classList.add('hide_content') // 2줄이상은 숨김
    }
})

function show_content() {  // 더 보기 버튼 클릭시
    document.querySelector('.box_content').classList.remove('hide_content') // 텍스트 숨김처리 취소
    document.querySelector('.show_cotent').classList.add('hide_btn') // 버튼 숨김
}

// 댓글달기 input 박스에 텍스트 감지 여부에 따라 게시 버튼 스타일 변경 기능 //////////////////////
$(document).ready(function() {
    $(".write_comment").on('input',function() {
        if($('.write_comment').val() == '')
            $('.write_button').attr("style", "opacity: 50%; cursor: auto;");  // 텍스트 감지되지않으면 흐리게, 기본 커서
        else
            $('.write_button').attr("style", "opacity: 100%; cursor: pointer;")  // 텍스트 감지되면 진하게, 포인터 커서
            $('.write_comment').attr("style", "font-size: 14px; padding-bottom: 1px;")  // 텍스트 감지되면 폰트 사이즈 키우고 살짝 위로
    })
    $(".write_comment_commentModal").on('input',function() {
        if($('.write_comment_commentModal').val() == '')
            $('.write_button_commentModal').attr("style", "opacity: 50%; cursor: auto;");  // 텍스트 감지되지않으면 흐리게, 기본 커서
        else
            $('.write_button_commentModal').attr("style", "opacity: 100%; cursor: pointer;")  // 텍스트 감지되면 진하게, 포인터 커서
            $('.write_comment_commentModal').attr("style", "font-size: 14px; padding-bottom: 1px;")  // 텍스트 감지되면 폰트 사이즈 키우고 살짝 위로
    })
})

// 포스트 박스 댓글 달기 기능
function write_button() {
    let profileImg = $('.profile_name_card').attr('src')  // 작성자 프로필 이미지
    let writer_comment = $('.profile_name').text()  // 작성자 닉네임
    let comment = $('.write_comment').val()  // 작성자 코멘트
    if (comment !== '') {
        // 포스트 박스 div
        let post_temp_html = `<div class="box_list_comment">
                                    <span class="writer_comment" onclick="Go_profile()">${writer_comment}</span>
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
        // 모달 박스 div
        let modal_temp_html = `<section class="section_comment_commentModal">
                                        <section>
                                        <img class="profileImg_comment_modal" onclick="Go_profile()"
                                             src=${profileImg}>
                                        </section>
                                        <section>
                                            <span class="name_post" onclick="Go_profile()">${writer_comment}</span>
                                            <span>${comment}</span>
                                            <section class="time_post_commentModal">
                                                <div style="font-size:12px; font-weight:400; color:rgb(142, 142, 142)"><span>13</span>시간
                                                </div>
                                            </section>
                                        </section>
                               </section>`
        $('.box_comment').append(post_temp_html)
        $('.box_content_comment_commentModal').append(modal_temp_html)
        $('.write_comment').val('')
    }
}

// 코멘트 모달 댓글 달기 기능
function write_button_commentModal() {
    let profileImg = $('.profile_name_card').attr('src')  // 작성자 프로필 이미지
    let writer_comment = $('.profile_name').text()  // 작성자 닉네임
    let comment = $('.write_comment_commentModal').val()  // 작성자 코멘트
    if (comment !== '') {
        // 포스트 박스 div
        let post_temp_html = `<div class="box_list_comment">
                                    <span class="writer_comment" onclick="Go_profile()">${writer_comment}</span>
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
        // 모달 박스 div
        let modal_temp_html = `<section class="section_comment_commentModal">
                                        <section>
                                        <img class="profileImg_comment_modal" onclick="Go_profile()"
                                             src=${profileImg}>
                                        </section>
                                        <section>
                                            <span class="name_post" onclick="Go_profile()">${writer_comment}</span>
                                            <span>${comment}</span>
                                            <section class="time_post_commentModal">
                                                <div style="font-size:12px; font-weight:400; color:rgb(142, 142, 142)"><span>13</span>시간
                                                </div>
                                            </section>
                                        </section>
                               </section>`
        $('.box_comment').append(post_temp_html)
        $('.box_content_comment_commentModal').append(modal_temp_html)
        $('.write_comment_commentModal').val('')
    }
}

