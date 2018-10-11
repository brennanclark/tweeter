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

  function postTweet (data){
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
      let data = $('#tweetform').serialize();
      let userText = data.replace("text=","");
      let $error = $('.error')

      if (userText.length === 0) {
        if($error.text() !== 'Tweet too short'){
          $error.slideUp(function(){
            $error.text('Tweet too short').slideDown();
          })
        }
        return;
      }
      if (userText.length > 140 ) {
        if ($error.text() !== 'Tweet too long') {
          $error.slideUp(function(){
            $error.text('Tweet too long').slideDown();
          });

        }

        return;
      }

      $error.slideUp();
      postTweet(data);
    });

  loadTweets();

  $('.compose').on('click', function() {
    let body = $('html, body');
    let tweetContainer = $('.tweet-container').offset().top;
    let navBarHeight = $('#nav-bar').height();

    if (body.scrollTop() === 0){
      body.stop().animate({scrollTop: tweetContainer - navBarHeight}, 200, 'swing')
    } else {
      body.stop().animate({scrollTop: 0}, 200, 'swing', function() {
        $('#tweetText').focus();
      })
    }
  })
});















