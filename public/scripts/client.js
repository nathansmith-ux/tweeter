/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  /**
   * Function accepts an object and returns an HTML element with data from this element
   * @param {object} tweetData 
   * @returns An HTML Element
   */
  const createTweetElement = function(tweetData) {
    let formattedTime = timeago.format(tweetData.created_at)
    
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
            <p>${formattedTime}</p>
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

  /**
   * Function creates an HTML element for each object in the array
   * @param {Array of objects} tweets 
   * @returns A series of appended HTML elements
   */
  const renderTweets = function(tweets) {
    $('#all-tweets').empty();

    for (let tweet of tweets) {
      let $newTweet = createTweetElement(tweet);
      $('#all-tweets').prepend($newTweet);
    }
  };

  // Listens for button submit and sends data to server
  $('.tweet-form').on("submit", function(event) {
    event.preventDefault();

    if ( $("#tweet-text").val() === "") {
      return alert("Your tweet cannot be empty");
    } else if ($("#tweet-text").val().length > 140) {
      return alert("Your tweet is too long!");
    }

    const url = "/tweets"
    let serializedData = $(this).serialize();

    $.post("/tweets", serializedData)
    .done(loadTweets)
    .fail((error) => console.log("The data didn't go through", error))

  })

  /**
   * Function requests data from the server and prepends it as an HTML element
   */
  const loadTweets = function() {
    const url = "/tweets"

    $.get(url)
    .done((allTweets) => renderTweets(allTweets))
    .fail((error) => console.log("Unable to get the data from the server", error))
  }

  loadTweets()

})