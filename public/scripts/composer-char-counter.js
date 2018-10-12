$(document).ready(function() {
//Updates the Chracater counter everytime a new character is input into the text field
//has checks to set a threshhold for when the numbers should turn red.
  $('.new-tweet textArea').on('input', function(event){

    let charMax = 140;
    let charCounter = charMax - $(this).val().length;

    $('.counter').css('color', '#244751')

    if (charCounter < 0) {
      $('.counter').css('color', 'red')
    }

    $('.counter').html(charCounter);
  });
});