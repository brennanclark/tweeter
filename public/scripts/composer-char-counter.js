$(document).ready(function() {

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