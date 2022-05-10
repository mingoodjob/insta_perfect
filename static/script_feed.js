function logout() {
    $.removeCookie('mytoken', {path: '/'});
    window.location.href = '/login';
}
        $().ready(function () {
                $("#logout_id").click(function () {
                    Swal.fire({
                        icon: 'success',
                        title: '로그아웃 중입니다...',
                        text: '로그인 페이지로 돌아갑니다'
                    });

                });
            });
        $().ready(function () {
                $("#follow_id").click(function () {
                    Swal.fire({
                        icon: 'success',
                        title: '사람들과 가까워지는중...',
                        text: '팔로우 가 완료 되었습니다!'
                    });

                });
            });
        $().ready(function () {
                $("#not_follow_id").click(function () {
                    Swal.fire({
                        icon: 'success',
                        title: '사람들과 멀어지는중...',
                        text: '팔로우 가 취소 되었습니다!'
                    });

                });
            });


// 피드 페이지로 이동
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

// 피드 불러오기 /////////////////////////////////////////////
function loadFeed() {
    $.ajax({
        type: "GET",
        url: "/feed",
        data: {},
        success: function (response) {
            console.log('ajax 실행중')
            let pr_photo = response['pr_photo']  // content 작성자 프로필 이미지
            let all_feed = response['content']  // 전체 content
            for (let i = 0; i < all_feed.length; i++) {
                let write_id = all_feed[i]['write_id']
                let content = all_feed[i]['content']
                let like_count = all_feed[i]['like_count']
                let feed_number = all_feed[i]['feed_number']
                let photo = all_feed[i]['photo']
                let all_comment = all_feed[i]['comment']
                let all_comment_count = all_comment.length

                let temp_html = `<div class="container_post">
                                <!------------------------------------------------ 포스트 네임카드 ---------------------------------------------->
                                <div class="container_name_post">
                                    <img class="profile_name_post" onclick="Go_profile()" src="${pr_photo}">
                                    <div class="box_name_post">
                                        <a class="name_post" onclick="Go_profile()">${write_id}</a>
                                    </div>
                                    <svg class="button_option" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                        <circle cx="12" cy="12" r="1.5"></circle>
                                        <circle cx="6" cy="12" r="1.5"></circle>
                                        <circle cx="18" cy="12" r="1.5"></circle>
                                    </svg>
                                </div>
                                <!------------------------------------------------ 사진 슬라이드 ------------------------------------------------>
                                <div class="box_picture_post">
                                    <img src="${photo}" style="width:100%;">
                                </div>
                                <!------------------------------------------------ 상호작용 ---------------------------------------------------->
                                <div class="box_icon_SNS">
                                    <!-- 빨간 하트 아이콘 -->
                                    <svg class="red_heart" style="display: none; opacity: 1;" onclick="empty_heart_show() "
                                         color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24">
                                        <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12
                                        10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2
                                        7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                                    </svg>
                                    <!-- 빈 하트 아이콘 -->
                                    <svg class="empty_heart" onclick="red_heart_show()" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                        <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865
                                        3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0
                                        014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0
                                        013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0
                                        3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174
                                        0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
                                    </svg>
                                    <!-- 댓글 아이콘 -->
                                    <svg class="comment_icon icon_SNS" onclick="show_commentModal(${feed_number})" color="#262626" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24">
                                        <path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                                    </svg>
                                    <!-- 공유 아이콘 -->
                                    <svg class="icon_SNS" color="#262626" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24">
                                        <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
                                        <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
                                    </svg>
                                    <!-- 북마크 아이콘 -->
                                    <svg class="bookmark" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                        <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
                                    </svg>
                                </div>
                                <div class="heart_count">좋아요 <span class="like_cnt">${like_count}</span>개</div>
                                <!------------------------------------------------ 포스팅 내용 -------------------------------------------------->
                                <div class="container_content">
                                    <div class="box_content">
                                        <span class="writer_content" onclick="Go_profile()">${write_id}</span>
                                        <span class="text_content">${content}</span>
                                    </div>
                                    <div class="show_cotent" onclick="show_content()">... 더 보기</div>
                                </div>
                                <!---------------------------------------------------- 댓글 --------------------------------------------------->
                                <div>
                                    <button class="show_comment" onclick="show_commentModal(${feed_number})">댓글 <span>${all_comment_count}</span>개 모두 보기</button>
                                </div>
                                <div class="box_comment"></div>
                                <div class="time_post"><span style="margin:0; padding:0;">13</span>시간 전</div>
                                 <!------------------------------------------------ 댓글 작성 -------------------------------------------------->
                                <div class="box_write">
                                    <button class="emote">
                                        <svg color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                            <path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path>
                                        </svg>
                                    </button>
                                    <input class="write_comment" onkeyup="if(event.keyCode==13){write_button(${feed_number})}" placeholder="댓글 달기...">
                                    <button class="write_button" onclick="write_button(${feed_number})">게시</button>
                                </div>
                            </div>`
                $('.container').append(temp_html)
                for (let i = 0; i < all_comment.length; i++) {
                    let write_id = all_comment[i]['write_id']
                    let text = all_comment[i]['text']
                    let temp_html = `<div class="box_list_comment">
                                    <span class="writer_comment">${write_id}</span>
                                    <span class="comment">${text}</span>
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
            contentHeight();
        }
    })
}
$(document).ready(function() {
    loadFeed();
});

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
const getOptionModal = document.querySelector('.option_body_modal')  // 변수에 모달이 될 영역을 넣음
const getButtonCancel = document.querySelector('#button_cancel')  // 취소 버튼을 변수에 담음
$('.container').on('click', '.button_option', function() {
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

// 댓글 모달 ///////////////////////////////////////////////////////////////////
function show_commentModal(feed_number) {  // 댓글 아이콘, 댓글 모두보기 클릭 시
    $.ajax({
        type: 'POST',
        url: "/feed",
        data: {feed_number: feed_number},
        success: function (response) {
            let find_user = response['find_user']
            let find_feed = response['find_feed']
            let photo = find_feed['photo']
            let pr_photo = find_user['pr_photo']
            let write_id = find_feed['write_id']
            let content = find_feed['content']

            let temp_html = `<img class="commentModal_photo" src="${photo}">
                             <div>
                                <div class="container_name_modal">
                                    <img class="profile_name_post" onclick="Go_profile()" src="${pr_photo}">
                                    <div class="box_name_post">
                                        <a class="name_post" onclick="Go_profile()">${write_id}</a>
                                    </div>
                                    <svg class="button_option_modal" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                        <circle cx="12" cy="12" r="1.5"></circle>
                                        <circle cx="6" cy="12" r="1.5"></circle>
                                        <circle cx="18" cy="12" r="1.5"></circle>
                                    </svg>
                                </div>
                                <section class="box_content_comment_commentModal">
                                    <section class="section_content_commentModal">
                                        <section>
                                            <img class="profileImg_comment_modal" onclick="Go_profile()" src="${pr_photo}">
                                        </section>
                                        <section>
                                            <span class="name_post" onclick="Go_profile()">${write_id}</span>
                                            <span>${content}</span>
                                            <section class="time_post_commentModal">
                                                <div style="font-size:12px; font-weight:400; color:rgb(142, 142, 142)"><span>13</span>시간</div>
                                            </section>
                                        </section>
                                    </section>
                                    <section class="section_comment_commentModal"></section>
                                </section>
                                <div class="box_icon_modal">
                                    <!-- 빨간 하트 아이콘 -->
                                    <svg class="red_heart_modal" style="display: none; opacity: 1;" onclick="empty_heart_show()"
                                         color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24">
                                        <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12
                                        10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2
                                        7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                                    </svg>
                                    <!-- 빈 하트 아이콘 -->
                                    <svg class="empty_heart_modal" onclick="red_heart_show()" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                        <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865
                                        3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0
                                        014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0
                                        013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0
                                        3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174
                                        0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
                                    </svg>
                                    <!-- 댓글 아이콘 -->
                                    <svg class="icon_SNS_modal" color="#262626" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24">
                                        <path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                                    </svg>
                                    <!-- 공유 아이콘 -->
                                    <svg class="icon_SNS_modal" color="#262626" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24">
                                        <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
                                        <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
                                    </svg>
                                    <!-- 북마크 아이콘 -->
                                    <svg class="bookmark_modal" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                        <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
                                    </svg>
                                </div>
                                <section class="text_like_commentModal">
                                    <div class="like_cnt_zero_commentModal">가장 먼저&nbsp;<span style="font-weight: 600">좋아요</span>를 눌러보세요</div>
                                    <div class="like_cnt_commentModal" style="display:none; font-weight: 600;">좋아요 <span class="like_count_commentModal"></span>개</div>
                                </section>
                                <div class="time_post"><span style="margin:0; padding:0;">13</span>시간 전</div>
                                <div class="box_write">
                                    <button class="emote">
                                        <svg color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                            <path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path>
                                        </svg>
                                    </button>
                                    <input class="write_comment" onkeyup="if(event.keyCode==13){write_button(${feed_number})}" placeholder="댓글 달기...">
                                    <button class="write_button_commentModal" onclick="write_button(${feed_number})">게시</button>
                                </div>
                             </div>`
            $('.container_comment_modal').empty()
            $('.container_comment_modal').prepend(temp_html)

            let all_comment = find_feed['comment']
            for(let i = 0; i < all_comment.length; i++) {
                let write_id = all_comment[i]['write_id']

                $.ajax({
                    type: 'POST',
                    url: '/user',
                    data: {give_uid: write_id},
                    success: function (response) {
                        let find_user = response['find_user']
                        let pr_photo = find_user['pr_photo']
                        let text = all_comment[i]['text']
                        let temp_html = `<section class="commentBox_commentModal">
                                            <img class="profileImg_comment_modal" onclick="Go_profile()" src="${pr_photo}">
                                            <section>
                                            <span class="name_post" onclick="Go_profile()">${write_id}</span>
                                            <span>${text}</span>
                                            <section class="time_post_commentModal">
                                                <div style="font-size:12px; font-weight:400; color:rgb(142, 142, 142)"><span>13</span>시간</div>
                                            </section>
                                         </section>
                                         </section>`
                        $('.section_comment_commentModal').append(temp_html)
                    }
                })
            }
        }
    })
}

const getCommentModal = document.querySelector('.comment_modal_body')  // 변수에 모달이 될 영역을 넣음
const getCommentQuit = document.querySelector('.quit_comment_modal')  // 취소 버튼을 변수에 담음

$('.container').on('click', '.comment_icon', function() {
    getCommentModal.classList.toggle('modalToggle')  // modalToggle를 토글시켜줌
    body.style.overflow = 'hidden'  // 스크롤을 막음
})

$('.container').on('click', '.show_comment', function() {
    getCommentModal.classList.toggle('modalToggle')  // modalToggle를 토글시켜줌
    body.style.overflow = 'hidden'  // 스크롤을 막음
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
//             let like_cnt = response['like_count']  // 해당 content의 좋아요 갯수
//             let like_user = response['like_user'][$('.profile_name').text()]
//             console.log(like_cnt)
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
//
// // 좋아요 버튼 입력시
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
//
// // 좋아요 버튼 취소시
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


// 피드 게시글의 내용이 길면 숨김 처리와 더보기 버튼
function contentHeight() {
    let contentHeight = document.querySelector('.text_content').offsetHeight // content 높이 얻기
    console.log(contentHeight)
    if (contentHeight < 20) {
        document.querySelector('.show_cotent').classList.add('hide_btn') // 1줄이하면 버튼 감춤
    } else {
        document.querySelector('.box_content').classList.add('hide_content') // 2줄이상은 숨김
    }
}

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

// 댓글 달기 기능 //////////////////////////////////////////////////////////////////////////////////
function write_button(feed_number) {
    let input_comment = $('.write_comment').val()  // 작성자 코멘트
    if (input_comment !== '') {
        $.ajax({
            type: 'POST',
            url: '/comment',
            data: {give_feed_number: feed_number, give_comment: input_comment},
            success: function (response) {
                let write_id = response['write_id']
                let text = response['text']
                let pr_photo = response['pr_photo']

                // 피드 페이지
                let temp_html = `<div class="box_list_comment">
                                       <span class="writer_comment" onclick="Go_profile()">${write_id}</span>
                                       <span class="comment">${text}</span>
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
                // 댓글 모달
                let commentModal_html = `<section class="commentBox_commentModal">
                                            <img class="profileImg_comment_modal" onclick="Go_profile()" src="${pr_photo}">
                                            <section>
                                            <span class="name_post" onclick="Go_profile()">${write_id}</span>
                                            <span>${text}</span>
                                            <section class="time_post_commentModal">
                                                <div style="font-size:12px; font-weight:400; color:rgb(142, 142, 142)"><span>13</span>시간</div>
                                            </section>
                                         </section>
                                         </section>`
                $('.box_comment').append(temp_html)
                $('.section_comment_commentModal').append(commentModal_html)
                $('.write_comment').val('')
            }
        })
    }

}


function follow() {

    let value = $('#follow_id').val();

    $.ajax({
        type: "POST",
        url: "/follow_check",
        data: {follower: value},
        success: function (response) {

        },
    });
}

const follow_btn = document.querySelector(".link_recommend");
const follow_btn2 = document.querySelector(".link_recommend2")
follow_btn.addEventListener('click', (event) => {
    follow_btn.style.display = "none";
    follow_btn2.style.display = "flex";
follow_btn2.addEventListener('click', (event) => {
    follow_btn.style.display = "flex";
    follow_btn2.style.display = "none";

    });
});

function not_follow() {
        let value = $('#not_follow_id').val();
        $.ajax({
            type: "POST",
            url: "/follow_delete",
            data: {follower: value},
            success: function (response) {

            },
        });
    }

var btn = document.getElementById("profile_btn");
var modal = document.getElementById("profile_modal");
var close = document.getElementById("profile_modal_close");
var mouseover = document.getElementById("mouseover");
var mouseover2 = document.getElementById("mouseover2");
var mouseover3 = document.getElementById("mouseover3");
var mouseover4 = document.getElementById("mouseover4");



//취소 프로필 모달부분 마우스 오버 이벤트
close.addEventListener('mouseover', (event) => {
    close.style.backgroundColor = "#fafafa"
});
close.addEventListener('mouseout', (event) => {
    close.style.backgroundColor = "white"
});
//프로필
mouseover.addEventListener('mouseover', (event) => {
    mouseover.style.backgroundColor = "#fafafa"
});
mouseover.addEventListener('mouseout', (event) => {
    mouseover.style.backgroundColor = "white"
});
//설정
mouseover2.addEventListener('mouseover', (event) => {
    mouseover2.style.backgroundColor = "#fafafa"
});
mouseover2.addEventListener('mouseout', (event) => {
    mouseover2.style.backgroundColor = "white"
});
//계정변환
mouseover3.addEventListener('mouseover', (event) => {
    mouseover3.style.backgroundColor = "#fafafa"
});
mouseover3.addEventListener('mouseout', (event) => {
    mouseover3.style.backgroundColor = "white"
});
//로그아웃
mouseover4.addEventListener('mouseover', (event) => {
    mouseover4.style.backgroundColor = "#fafafa"
});
mouseover4.addEventListener('mouseout', (event) => {
    mouseover4.style.backgroundColor = "white"
});

// 모달부분 hide/show
btn.onclick = function () {
    modal.style.display = "block"
modal.onclick = function () {
    modal.style.display = "none"
}
}


