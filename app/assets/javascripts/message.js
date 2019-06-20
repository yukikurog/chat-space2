$(function() {
  function buildHTML(message) {
  message.image ? image = `<img src="${message.image}">` : image = ""
  var html = `<div class="main-content__chat--contents">
                <div class="chat-message">
                  <p class="chat-message--name">${message.name}</p>
                  <p class="chat-message--time"> ${message.time}</p>
                </div>
                <div class="chat-message--comment">
                  <p class="lower-message__content>${message.text}</p>
                  <p class="lower-message__image> image
                </div>`
  return html;
  }

//   function moveToBottom() {
//     $('.chat-main').animate({
//       scrollTop: $('.messages').height()
//     });

//   $('.new_message').on('submit', function(e) {
//     e.preventDefault();
//     console.log(this);
//     var formData = new FormData(this);
//     var url = $(this).attr('action');
//     return false;
//     $.ajax({
//       url: url,
//       type: 'POST',
//       data: formData,
//       dataType: 'json',
//       processData: false,
//       contentType: false
//     })
//     .done(function(data){
//       var html = buildHTML(data);
//       $('.messages').append(html);
//       $('#new_message')[0].reset();
//     })
//     .fail(function(){
//       alert('error');
//     })
//   });
// });

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