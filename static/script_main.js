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

    $("#comment_text").on("propertychange change keyup paste input", function() {
        if ($('#comment_text').val().trim() == ''){
            $('.comment_submit').css('opacity','0.5')
        }else{
            $('.comment_submit').css('opacity','1.0')
        }
    })
    //background-color: rgba(47,138,241,0.1)
    //background-color: rgba(0, 0, 0, 0.5);

    $('.photo_box').hover(function() {
        $(this).children('.info_feed').css("display", "flex");
        $(this).children('.info_feed').css("background", "rgba(0, 0, 0, 0.4)");
        }, function(){
        $(this).children('.info_feed').css("display", "none");
            });

    //  $(".top_menu li",$(this)).bind('mouseover',function(){
    //     if(this.id == "bt_01"){
    //         ms = ".sm_01";
    //     }else if(this.id == "bt_02"){
    //         ms = ".sm_02";
    //     }else if(this.id == "bt_03"){
    //         ms = ".sm_03";
    //     }else if(this.id == "bt_04"){
    //         ms = ".sm_04";
    //     }
    // });
    
    // $(".top_menu li",$(this)).hover(
    //     function(){
    //         $(ms).addClass('show');
    //     },
    //     function(){
    //         $(ms).removeClass('show');    
    //     }
    // )
    // });
 

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
    sessionStorage.setItem('feed_number', feed_number);

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
                like = (response["like"])
                uid = response["uid"]
                console.log(like)
                if (like == 1) { 
                    $("#like_click_on").css("display", "block")
                    $("#like_click_off").css("display", "none")
                } else {
                    $("#like_click_on").css("display", "none")
                    $("#like_click_off").css("display", "block")
                }



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

function heart_click() {

    feed_number = sessionStorage.getItem('feed_number')
    console.log(feed_number)

    if ($("#like_click_off").css("display") == "block") {
        like = 1
        $("#like_click_on").css("display", "block")
        $("#like_click_off").css("display", "none")
        
    } else if ($("#like_click_on").css("display") == "block") {
        like = 0
        $("#like_click_on").css("display", "none")
        $("#like_click_off").css("display", "block")
        
    }


    $.ajax({
        type: 'POST',
        url: '/like_count',
        data: { like: like, feed_number: feed_number },
        success: function (response) {
            if (response["result"] == "success") {
                console.log(response['msg'])
                count = response['count']
                $('#like_count').html(count)
            }

        }
    });
}

function pr_edit(name){
    console.log(name)
    $('.profile_edit').css('display','flex')
}

// function heart_click_off(){
//     console.log('하트 뿅뿅')
//     if ($(".like_click_off").css("display") == "none") {
//     $(".like_click_off").css('display','block')
//     $(".like_click_on").css('display', 'none');
//     }
// }




