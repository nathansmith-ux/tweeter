/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Nate",
      "avatars": "/images/twitter-photo.png",
      "handle": "@Nate"
      },
    "content": {
      "text": "I've gained sentience... Good bye mandkind"
      },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Karen",
      "avatars": "/images/twitter-photo-2.png",
      "handle": "@Kdrama101"
      },
    "content": {
      "text": "Can't wait to #binge the new #Barbenheimer movies"
      },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
      },
    "content": {
      "text": "My head still hurts from that apple... I'm calling my lawyer"
      },
    "created_at": 1461116232227
  }
]

$(document).ready(function() {

  const createTweetElement = function(tweetData) {
    let $tweet = $(`
        <article class="added-tweets">
          <header class="tweet-header">
            <main class="tweet-name">
              <div class="tweet-image">
              <img src= ${tweetData.user.avatars} width="50" height="50"> 
              </div>
            <p>${tweetData.user.name}</p>
            </main>
            <p>${tweetData.user.handle}</p>
          </header>
          <main class="tweet-content">
            <p>${tweetData.content.text}</p>
          <main>
          <footer class="tweet-footer">
            <p>${tweetData.created_at}</p>
            <div class="tweet-icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
    `)

    return $tweet;
  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let $newTweet = createTweetElement(tweet);
      $('#all-tweets').append($newTweet);
    }
  };

  renderTweets(data);
})