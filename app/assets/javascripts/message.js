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

  function moveToBottom() {
    $('.chat-main').animate({
      scrollTop: $('.messages').height()
    });

  $('.new_message').on('submit', function(e) {
    e.preventDefault();
    console.log(this);
    var formData = new FormData(this);
    var url = $(this).attr('action');
    return false;
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
      $('.input-box__text').val('');
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
  });
});
