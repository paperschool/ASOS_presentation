
$(document).ready(() => {

  var socket = io.connect('/client');

  var colour = null;

  var name = null;

  // when redirect event occurs
  socket.on('redirect',(link) => {
    window.location.href = "/client";

  });

  $('#ready').on('click',() => {

    name = $('#name').val();

    let preferences = {
      'name' : name,
      'colour' : colour
    };

    // sending preferences
    socket.emit("preferences",preferences);

  });

  var red = $('#red');
  var blue = $('#blue');
  var green = $('#green');
  var yellow = $('#yellow');

  var clear = () => {

    red.removeClass('option-active');
    blue.removeClass('option-active');
    green.removeClass('option-active');
    yellow.removeClass('option-active');

  }

  red.on('click touchstart', () => {
    clear();
    red.addClass('option-active');
    colour = 'red';
  });

  blue.on('click touchstart', () => {
    clear();
    blue.addClass('option-active');
    colour = 'blue';
  });

  green.on('click touchstart', () => {
    clear();
    green.addClass('option-active');
    colour = 'green';
  });

  yellow.on('click touchstart', () => {
    clear();
    yellow.addClass('option-active');
    colour = 'yellow';
  });

})
