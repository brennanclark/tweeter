/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  function formatDate(unixTime) {
    return new Date(unixTime);
  }

  function iconFactory(className) {
    return $('<i></i>').addClass(className);
  }


  function createTweetElement({ user: { avatars, name, handle }, content, created_at }) {
    const $tweet         = $("<article class='tweet'>");
    const $header        = $('<header></header>');
    const $avatar        = $('<div class="avatar"></div>').appendTo($header);
    const $imgAvtr       = $('<img />').attr('src', avatars.small).appendTo($avatar);
    const $userName      = $('<h2></h2>').text(name).appendTo($header);
    const $handle        = $('<a></a>').text(handle).appendTo($header);
    const $main          = $('<main></main>');
    const $text          = $('<p></p>').text(content.text).appendTo($main);
    const $footer        = $('<footer></footer>');
    const prettyTime     = formatDate(created_at);
    const $date          = $('<p></p>').text(prettyTime).appendTo($footer);
    const icons          = ['far fa-flag', 'fas fa-retweet', 'far fa-heart'].map(ic => iconFactory(ic));
    const $socialButtons = $('<div class="social-buttons"></div>').append(icons).appendTo($footer);

    $tweet.append($header).append($main).append($footer);

    return $tweet;
  }

  const tweetEl = createTweetElement(tweetData);
  $('.tweet-container').append(tweetEl);

});

