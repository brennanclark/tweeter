/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  function formatDate(unixTime) {
    return moment(unixTime).fromNow();
  }

  function iconFactory(className) {
    return $('<i></i>').addClass(className);
  }


  function createTweetElement({ user: { avatars, name, handle }, content, created_at }) {
    const $tweet         = $("<article class='tweet'>");
    const $header        = $('<header></header>').appendTo($tweet);
    const $avatar        = $('<div class="avatar"></div>').appendTo($header);
    const $imgAvtr       = $('<img />').attr('src', avatars.small).appendTo($avatar);
    const $userName      = $('<h2></h2>').text(name).appendTo($header);
    const $handle        = $('<a></a>').text(handle).appendTo($header);
    const $main          = $('<main></main>').appendTo($tweet);
    const $text          = $('<p></p>').text(content.text).appendTo($main);
    const $footer        = $('<footer></footer>').appendTo($tweet);
    const prettyTime     = formatDate(created_at);
    const $date          = $('<p></p>').text(prettyTime).appendTo($footer);
    const icons          = ['far fa-flag', 'fas fa-retweet', 'far fa-heart'].map(ic => iconFactory(ic));
    const $socialButtons = $('<div class="social-buttons"></div>').append(icons).appendTo($footer);

    return $tweet;
  }

  function renderTweets(tweets) {
    console.log(tweets.length);
    $('.tweet-container').empty();
    tweets.forEach(function (tweet){
      createTweetElement(tweet).prependTo('.tweet-container');
    });
  }

  function loadTweets(){

    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: function(result){
        renderTweets(result);
      },
      error: function(err){
        console.log('error');
      }
    })
  }


    $('#tweetform').on('submit', function () {
      event.preventDefault();
      console.log($('#tweetform').serialize());
      let data = $('#tweetform').serialize();
      let userText = data.replace("text=","");

      if (userText.length === 0 || userText.length > 140 ){
        alert("sorry. need to fix")
      } else{
        $.ajax({
          method: 'POST',
          data: data,
          url: '/tweets',
          success: function(result){
            loadTweets();
          },
          error: function(err){
            console.log('error');
          }
        })
      }
    });

  loadTweets();

});















