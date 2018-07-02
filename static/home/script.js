
$(document).ready(() => {

  var socket = io.connect('/client');

  var colour = null;

  var name = ''

  // when redirect event occurs
  socket.on('redirect',(link) => {
    socket.disconnect();
    window.location.href = "/client";
  });


  $('#name').on('keyup',()=>{
    name = $('#name').val();
  })

  $('#ready').on('click',() => {

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
  var orange = $('#orange');
  var pink = $('#pink');

  var clear = () => {

    red.removeClass('option-active');
    blue.removeClass('option-active');
    green.removeClass('option-active');
    yellow.removeClass('option-active');
    pink.removeClass('option-active');
    orange.removeClass('option-active');

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

  pink.on('click touchstart', () => {
    clear();
    pink.addClass('option-active');
    colour = 'pink';
  });

  orange.on('click touchstart', () => {
    clear();
    orange.addClass('option-active');
    colour = 'orange';
  });



})
