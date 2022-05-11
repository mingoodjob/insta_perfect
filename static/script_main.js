// 바로실행 함수
$(function () {
  $(".serch_box > input").focus(function () {
    $(".serch_box > div").css("display", "none");
  });
  $(".serch_box > input").blur(function () {
    $(".serch_box > div").css("display", "block");
  });

  $(document).mouseup(function (e) {
    if ($(".modal_body").has(e.target).length === 0) {
      $(".modal_body").css("display", "none");
      $("body").removeClass("hidden").off("scroll touchmove mousewheel");
    }
  });

  $("#comment_text").on("propertychange change keyup paste input", function () {
    if ($("#comment_text").val().trim() == "") {
      $(".comment_submit").css("opacity", "0.5");
    } else {
      $(".comment_submit").css("opacity", "1.0");
    }
  });

  $("#pr_upload").change(function () {
    this.form.submit();
  });

  // $("#pr_edit").submit(function(){
  //     var name = $("#hobby").val();
  //     var email = $("#description").val();
  //     return false;
  // }); // end submit()

  //background-color: rgba(47,138,241,0.1)
  //background-color: rgba(0, 0, 0, 0.5);

  $(".photo_box").hover(
    function () {
      $(this).children(".info_feed").css("display", "flex");
      $(this).children(".info_feed").css("background", "rgba(0, 0, 0, 0.4)");
    },
    function () {
      $(this).children(".info_feed").css("display", "none");
    }
  );

  $("#photo_upload").change(function () {
    $(".photo_upload").css("display", "none");
    $(".img_box").css("display", "flex");
    $(".first_title").css("display", "none");
    $(".second_title").css("display", "flex");
    setImageFromFile(this, "#preview");
  });

  function setImageFromFile(input, expression) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $(expression).attr("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  $(document).mouseup((e) => {
    if ($(".feed_info_modal").has(e.target).length === 0) {
      $(".feed_info_modal").css("display", "none");
      $("body").removeClass("hidden").off("scroll touchmove mousewheel");
    }
  });
});
//바로 실행 함수 종료

function feed_upload() {
  $(".modal_body").css("display", "flex");
}
function pr_upload() {
  $("#pr_upload").click();
}

function photo_upload() {
  $("#photo_upload").click();
}

function content_get() {
  alert("하이");
  let content = $("#content").val();
  alert(content);
}

function cancel() {
  $(".modal_body").css("display", "none");
  window.location.reload();
}

function display_popup() {
  var feed_number = $(this).data("id");
  sessionStorage.setItem("feed_number", feed_number);

  $.ajax({
    type: "POST",
    url: "/feed_number",
    data: { feed_number: feed_number },
    success: function (response) {
      if (response["result"] == "success") {
        write_id = response["write_id"];
        username = response["username"];
        content = response["content"];
        write_pr_photo = response["write_pr_photo"]
        photo = "../static/img_upload/" + response["photo"];
        like_count = response["like_count"];
        comments = response["comment"];
        $('#comment_list').empty();
        if (comments.length > 0) {
          for (cm in comments) {
            console.log(comments[cm].text)
            comment_html = `<div id="comment_desc_box" class="comment_desc_box">
    <div class="comment_pr_photo">
        <img id="pr_photo_comment" src="${comments[cm].pr_photo}" alt="" srcset="">
    </div>
    <div id="comment_desc" class="comment_desc">
        <p><b>${comments[cm].write_id}</b> ${comments[cm].text}</p>
    </div>
    <div class="comment_like">
        <div>
            <i class="fa-regular fa-heart"></i>
        </div>
    </div>
</div>`
            $('#comment_list').append(comment_html)

          }

        }
        like = response["like"];
        uid = response["uid"];
        console.log(like);
        if (like == 1) {
          like_html = `<div class="like_click_on" onclick="heart_click('on')" style="cursor: pointer;"><svg
                    color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48"
                    width="24">
                    <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12
            10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2
            7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z">
                    </path>
                </svg></div>`;
        } else {
          like_html = ` <div onclick="heart_click('off')" class="like_click_off" style="cursor: pointer;"><svg
                    style="width: 24px; height: 24px">
                    <path
                        d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865
            3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0
            014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0
            013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0
            3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174
            0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z">
                    </path>
                </svg></div>`;
        }

        desc = `<p><b>${write_id}</b> ${content}</p>`;

        $("body")
          .addClass("hidden")
          .on("scroll touchmove mousewheel", function (e) {
            e.preventDefault();
          });

        $("#like_count").html(like_count);
        $("#comment_desc").html(desc);
        $("#like_click").html(like_html);
        // $('#comment_list').html(desc);
        $("#pr_feed_photo").attr("src", write_pr_photo);
        $("#photo").attr("src", photo);
        $("#pr_photo_comment").attr("src", write_pr_photo);
        $(".feed_info_modal").css("display", "flex");
        // window.location.reload();

      }
    },
  });
}

function heart_click(click) {
  console.log(click);
  feed_number = sessionStorage.getItem('feed_number')

  if (click == "on") {
    like_html = ` <div onclick="heart_click('off')" class="like_click_off" style="cursor: pointer;"><svg
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
    like = '0'
  } else {
    like_html = `<div class="like_click_on" onclick="heart_click('on')" style="cursor: pointer;"><svg
                    color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48"
                    width="24">
                    <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12
            10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2
            7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z">
                    </path>
                </svg></div>`
    like = '1'
  }


  $("#like_click").html(like_html);

  $.ajax({
    type: "POST",
    url: "/like_count",
    data: { like: like, feed_number: feed_number },
    success: function (response) {
      console.log(response['msg'])
      count = response['count']
      console.log(count)
      $('#like_count').html(count)
    }
  })



}
function pr_edit(name) {
  console.log(name);
  $(".profile_edit").css("display", "flex");
  userid = $("#userid").text();
  console.log(userid);
}

// function heart_click_off(){
//     console.log('하트 뿅뿅')
//     if ($(".like_click_off").css("display") == "none") {
//     $(".like_click_off").css('display','block')
//     $(".like_click_on").css('display', 'none');
//     }
// }

function pr_close() {
  $(".profile_edit").css("display", "none");
}

function comment_up() {
  text = $('#comment_text').val()
  feed_number = sessionStorage.getItem('feed_number')
  $('#comment_text').val('')


  $.ajax({
    type: "POST",
    url: "/comment_up",
    data: { feed_number: feed_number, text: text },
    success: function (response) {
      uid = response["uid"];

      comment_html = `<div id="comment_desc_box" class="comment_desc_box">
    <div class="comment_pr_photo">
        <img id="pr_photo_comment" src="{{user_photo}}" alt="" srcset="">
    </div>
    <div id="comment_desc" class="comment_desc">
        <p><b>${uid}</b> ${text}</p>
    </div>
    <div class="comment_like">
        <div>
            <i class="fa-regular fa-heart"></i>
        </div>
    </div>
</div>`
      $('#comment_list').append(comment_html)

    }
  });

}

function follower() {
  username = $('#userid').text()
  console.log(username)

  $.ajax({
    type: "POST",
    url: "/follower_click",
    data: { username: username },
    success: function (response) {
  
    }

  });

}


function unfollower() {
  username = $('#userid').text()
  console.log(username)

  $.ajax({
    type: "POST",
    url: "/unfollower_click",
    data: { username: username },
    success: function (response) {
  
    }

  });

}