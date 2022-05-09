// 바로실행 함수
$(function () {

    $('.serch_box > input').focus(function () {
        $('.serch_box > div').css('display', 'none');
    });
    $('.serch_box > input').blur(function () {
        $('.serch_box > div').css('display', 'block');
    });

    $(document).mouseup(function (e) {
        if ($(".modal_body").has(e.target).length === 0) {
            $(".modal_body").css('display', 'none');
            $('body').removeClass('hidden').off('scroll touchmove mousewheel');
        }
    });

    $('#photo_upload').change(function () {
        $('.photo_upload').css('display', 'none');
        $('.img_box').css('display', 'flex');
        $('.first_title').css('display', 'none');
        $('.second_title').css('display', 'flex');
        setImageFromFile(this, '#preview');
    });

    function setImageFromFile(input, expression) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $(expression).attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $(document).mouseup((e) => {
        if ($(".feed_info_modal").has(e.target).length === 0) {
            $(".feed_info_modal").css('display', 'none');
            $('body').removeClass('hidden').off('scroll touchmove mousewheel');
        }
    });


})
//바로 실행 함수 종료

function feed_upload() {
    $('.modal_body').css('display', 'flex');
}

function photo_upload() {
    $('#photo_upload').click()
}

function content_get() {
    alert('하이')
    let content = $('#content').val()
    alert(content)
}

function cancel() {
    $(".modal_body").css('display', 'none');
    window.location.reload()
}

function display_popup() {
    var feed_number = $(this).data("id");

    $.ajax({
        type: 'POST',
        url: '/feed_number',
        data: { feed_number: feed_number },
        success: function (response) {
            if (response["result"] == "success") {
                write_id = response["write_id"];
                username = response["username"];
                content = response["content"];
                photo = "../static/img_upload/" + response["photo"];
                like_count = response["like_count"];
                console.log(feed_number)
                like_click = `<div class="like_click_off" style="cursor: pointer;" onclick="heart_click(${feed_number})"><svg
                style="width: 24px; height: 24px">
                <path
                    d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865
        3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0
        014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0
        013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0
        3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174
        0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z">
                </path>
            </svg></div>`

                desc = `<p><b>${write_id}</b> ${content}</p>`

                $('body').addClass('hidden').on('scroll touchmove mousewheel', function (e) {
                    e.preventDefault();
                });

                $('#like_count').html(like_count)
                $('#comment_desc').html(desc)
                // $('#comment_list').html(desc);
                $("#photo").attr("src", photo);
                $('.feed_info_modal').css('display', 'flex');
                $('#like_click_off').html(like_click)
                // window.location.reload();
            }

        }
    });
}

function heart_click(number) {
    console.log(number)
    $.ajax({
        type: 'POST',
        url: '/like_count',
        data: { number: number },
        success: function (response) {
            if (response["result"] == "success") {
                console.log(response['msg'])
            }

        }
    });
}

// function heart_click_off(){
//     console.log('하트 뿅뿅')
//     if ($(".like_click_off").css("display") == "none") {
//     $(".like_click_off").css('display','block')
//     $(".like_click_on").css('display', 'none');
//     }
// }




