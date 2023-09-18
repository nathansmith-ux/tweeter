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
    let formattedTime = timeago.format(tweetData.created_at);

    /**
     * Function prevents cross site scripting
     * @param {user input string} str
     * @returns A safe HTML paragraph element
     */
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    
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
            <p>${escape(tweetData.content.text)}</p>
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
    `);

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

    /**
     * Function returns an error message based on user input
     * @param {string} message
     * @returns An HTML element with the error message
     */
    let errorMessage = function(message) {
      $('#all-errors').empty();

      let $newError = $(`
      <div class="error-message">
        <i class="fa-solid fa-triangle-exclamation"></i>
          ${message}
        <i class="fa-solid fa-triangle-exclamation"></i>
      </div>
      `);

      // Styles for error message
      $newError.css({
        "border": "3px solid red",
        "color": "red",
        "margin-top": "1em",
        "margin-bottom": "1em",
        "padding": "1em"
      });

      // Styles for error icon
      $newError.find(".fa-solid.fa-triangle-exclamation").css({
        "color": "red"
      });

      return $('#all-errors').append($newError);
    };

    if ($("#tweet-text").val().trim() === "") {
      return $('#all-errors').slideDown(1000, function() {
        errorMessage("You cannot send an empty tweet").show();
      });

    } else if ($("#tweet-text").val().length > 140) {
      return $('#all-errors').slideDown(1000, function() {
        errorMessage("Your tweet must be less than 141 characters").show();
      });
    }

    $('#all-errors').slideUp("slow");

    const url = "/tweets";
    let serializedData = $(this).serialize();

    /**
     * Function resets the tweetForm
     */
    function resetTweetForm() {
      $("#tweet-text").val('');
      $("#tweet-text").next(".below-tweet").find("output").text(140) 
    }    

    $.post(url, serializedData)
      .done(() => {
        loadTweets();
        resetTweetForm();
      })
      .fail((error) => console.log("The data didn't go through", error));

  });

  /**
   * Function requests data from the server and prepends it as an HTML element
   */
  const loadTweets = function() {
    const url = "/tweets";

    $.get(url)
      .done((allTweets) => renderTweets(allTweets))
      .fail((error) => console.log("Unable to get the data from the server", error));
  };

  loadTweets();

});