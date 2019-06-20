$(document).on('turbolinks:load', function(){
  $(function() {
    var search_list = $("#user-search-result");
    var search_append_list = $("#chat-group-users");

    function appendUser(user) {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                  </div>`;
      search_list.append(html);
    }

    function notMatchUser() {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
                  </div>`;
      search_list.append(html);
    }


    function buildUser(id, name) {
     var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                 </div>`;
     search_append_list.append(html);
   }

    $('#user-search-field').on('keyup', function(){
      var input = $('#user-search-field').val();
        $.ajax({
          type: 'GET',
          url: '/users',
          data: { keyword: input },
          dataType: 'json'
        })
        .done(function(users) {
          $("#user-search-result").empty();
          if(users.length !== 0 && input.length !== 0) {
            users.forEach(function(user) {
              appendUser(user);
            });
          }
          else {
            notMatchUser();
          }
        })
        .fail(function() {
          alert('ユーザー検索に失敗しました');
        });
    });

    $(".chat-group-form").on('click', ".user-search-add", function() {
      var id = $(this).data('user-id');
      var name = $(this).data('user-name');
      buildUser(id, name);
      var user = $(this).parent();
      user.remove();
    });

    $(".chat-group-form").on('click', ".user-search-remove", function() {
      var user = $(this).parent();
      user.remove();
    });
  });
});