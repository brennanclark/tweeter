/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const data = [
  {
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
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

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
    tweets.forEach(function (tweet){
      createTweetElement(tweet).appendTo('.tweet-container');
    });
  }

  renderTweets(data);
});

