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

function heart_click() {
    console.log('하트 뿅뿅')
    if ($(".like_click_off").css("display") == "block") {
        $(".like_click_off").css('display', 'none')
        $(".like_click_on").css('display', 'block');
    } else if ($(".like_click_off").css("display") == "none") {
        $(".like_click_off").css('display', 'block')
        $(".like_click_on").css('display', 'none');
    }
}

// function heart_click_off(){
//     console.log('하트 뿅뿅')
//     if ($(".like_click_off").css("display") == "none") {
//     $(".like_click_off").css('display','block')
//     $(".like_click_on").css('display', 'none');
//     }
// }




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
                console.log(photo)

                desc = `<p><b>${write_id}</b> ${content}</p>`

                $('body').addClass('hidden').on('scroll touchmove mousewheel', function (e) {
                    e.preventDefault();
                });

                $('#like_count').html(like_count)
                $('#comment_desc').html(desc)
                // $('#comment_list').html(desc);
                $("#photo").attr("src", photo);
                $('.feed_info_modal').css('display', 'flex');
                // window.location.reload();
            }

        }
    });
}