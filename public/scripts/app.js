$(document).ready(function() {
//--------------------------Utility Functions----------------------------------
//converts the unix time to the elapsed time between the present
//and the time the post was made
  function formatDate(unixTime) {
    return moment(unixTime).fromNow();
  };
//Factry function that accepts an array of classnames and adds them to the <i> tag
  function iconFactory(className) {
    return $('<i></i>').addClass(className);
  };
//--------------------------------------------------------------------------
//-------------------------Render Tweets------------------------------------
//Loops through an array of objects and prepends each one to the previos one.
  function renderTweets(tweets) {
    $('.tweet-container').empty();
    tweets.forEach(function (tweet){
      createTweetElement(tweet).prependTo('.tweet-container');
    });
  };
//--------------------------Post Tweet---------------------------------------
//Uses ajax to make a Post request to /tweets  with the serialized return from
//createTweetElement and if it is successful loads the tweets. On error it returns
//an error.
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
    });
  };
//---------------------------Load tweets-----------------------------------
//Uses ajax to make a get request from the /tweets path and either returns the error on error
//or calls the render tweets function and passes it the tweet objects(result) on success.
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
    });
  };
//---------------------------Create Tweet element--------------------------
//Takes an object as input and assigns its values to the appropriate HTML tags and values
//assembles all the elements together and the returns the newly created element.
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
  };
//--------------------------SUBMIT TWEET---------------------------------
//Takes the input text from the tweet field, validates it and either gives the appropriate
//error resoponse or posts the tweet and then clears the field and resets the
//character counter.
  $('#tweetform').on('submit', function () {
    event.preventDefault();
    let data = $('#tweetform').serialize();
    let userText = data.replace("text=","");
    let $error = $('.error');

    if (userText.length === 0) {
      if($error.text() !== 'Tweet too short'){
        $error.slideUp(function(){
          $error.text('Tweet too short').slideDown();
        });
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
    $('#tweetText').val('');
    $('.counter').text(140);
  });
//--------------------------COMPOSE BUTTON-------------------------------
// When the compose button is clicked the current position of the page is validated and
//it either scrolls up to the input field and focuses on it or it scrolls down to the first
//tweet in the timeline. I am aware that the functionality was supposed to hide
//the tweet field but I prefer this approach for aesthetic reasons.
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
  });
//Calls the loadTweets function.
  loadTweets();
});















