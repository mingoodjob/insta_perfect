$(function () {

    // $(".img_box").mouseover(function(){
    //     $(this).css("opacity", "0.4");
    // })
    // $(".img_box").mouseleave(function(){
    //     // $(this).css("color", "black");
    //     $(this).css("opacity", "1.0");
    // })


    $(window).resize(function () {
        if ($(window).width() < 768) {
            $('.serch_input').addClass('d-none')
        }
        else {
            $('.serch_input').removeClass('d-none');
        }
    });

    $('.serch_text').focus(function () {
        $('.mag').hide()
        $('.serch-box2').show()
    });
    $('.serch_text').blur(function () {
        $('.mag').show()
        $('.serch-box2').hide()
    });

    // $('.comment-heart').click(function(){
    //     var id_check = $(this).val();
    //     console.log(id_check)
    // });


    $('.img_box').click(function () {
        $('.feed_modal').css('display', 'flex')
        $('body').addClass('hidden').on('scroll touchmove mousewheel', function (e) {
            e.preventDefault();
        });
    })

    // $('.feed_modal').click(function(event){
    //     $('.feed_modal').hide()
    //     $('body').removeClass('hidden').off('scroll touchmove mousewheel');
    // })

    // $('.img_box').click(function () {
    //     $('.feed_modal').css("display", "flex");
    //     //스크롤 막기
    //     $('html, body').css({ 'overflow': 'hidden', 'height': '100%' })
    //     $('.feed_modal').on('scroll touchmove mousewheel', function (event) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //         return false;
    //     });
    // });

    // $(".feed_modal").click(function (event) {

    //     $('.feed_modal').hide()
    //     $('body').removeClass('scrollDisable').off('scroll touchmove mousewheel');

    // });

    $(document).mouseup(function (e) {
        if ($(".feed_modal").has(e.target).length === 0) {
            $(".feed_modal").css('display', 'none');
            $('body').removeClass('hidden').off('scroll touchmove mousewheel');
        }
    });

    $("#alpreah_input").keydown(function (key) {
        if (key.keyCode == 13) {
            comment_text = $('#comment_input').val()
            html = `<div class="position-relative d-flex align-items-center mb-1">
            <div class="font-weight col-2">이민기</div>
            <div class="overtext comment_text">${comment_text}</div>
            <div class="position-absolute comment-heart"><i class="fa-regular fa-heart"></i></div>
        </div>`
            $('#comment_input').val('')
            $('#comment_post').append(html)
        }
        // return false
    });

    $('.slider').bxSlider();
})




function likeon() {
    $('.like_button_no_click').hide();
    $('.like_button_click').show();
}

function likeoff() {
    $('.like_button_click').hide();
    $('.like_button_no_click').show();
}







