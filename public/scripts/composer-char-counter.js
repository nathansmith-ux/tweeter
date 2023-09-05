$(document).ready(function() {
  $("#tweet-text").on("input", function(){
    inputValue = $(this).val();
    let remainingChar = 140 - inputValue.length

    if (remainingChar < 0) {
      $(this).next(".below-tweet").find("output").text(remainingChar).css("color", "red");
    } else {
      $(this).next(".below-tweet").find("output").text(remainingChar).css("color", "#545149");
    }
  })
})