$(document).on('turbolinks:load', function(){
  $(function() {
    function buildHTML(message) {
    var image = ""
    message.image ? image = `<img src="${message.image}">` : image = ""
    var html = `<div class="message" data-id="${message.id}">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">${message.name}</p>
                    <p class="message__upper-info__date"> ${message.time}</p>
                  </div>
                  <div class="message__lower-info">
                    <p class="message__lower-info__text">${message.body}</p>
                    ${image}
                  </div>
                </div>`;
    return html;
    }
    function moveToBottom() {
      $('.messages').animate({
      scrollTop: $('.messages')[0].scrollHeight
      });
    };

    $('#new_message').on('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('#new_message')[0].reset();
        $(".submit-btn").prop('disabled', false);
        moveToBottom();
      })
      .fail(function(){
        alert('error');
      })
    });
    function autoUpdate() {
      setInterval(function() {
        if($('.message')[0]) {
          var message_id = $('.message:last').data('id');
        } else {
          var message_id = 0;
        }
        $.ajax({
          url: './messages',
          type: 'GET',
          data: {id: message_id},
          dataType: 'json'
        })
        .done(function(data) {
            if(data.length != 0) {
              var html = buildHTML(data);
              $('.messages').append(html);
              moveToBottom();
            }
        })
        .fail(function () {
          alert('error');
        })
      }, 5000);
    };
    if (document.location.href.match("/messages")) {
      autoUpdate();
    }
  });
});