$(function() {
  var search_list = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                   <p class="chat-group-user__name">${user.name}</p>
                   <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                 </div>`;
    search_list.append(html);
       }
  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val();
    console.log(input);

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if(users.length !== 0) {
       users.forEach(function(user) {
         appendUser(user);
       });
      }
      else {
        console.log("一致するユーザはいません");
      }
    })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      });
  });
});