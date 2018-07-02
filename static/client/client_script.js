
$(document).ready(()=>{

  var socket = io.connect('/client');

  socket.on('initial',(preference) => {

    setupColour(preference.colour)

    $('#slide-title').text(` Hey ${ ( preference.name || Person ) }, waiting for admin...`)

  });

  socket.on('reload',(slide) => {
    console.log("Server Sent Current Slide!",slide)
    buildList(slide)
    setupColour(slide.colour)
  })

  socket.on('next',(slide) => {
    console.log("Server Sent Next Slide!",slide)
    buildList(slide)
    setupColour(slide.colour)
  });

  socket.on('previous',(slide) => {
    console.log("Server Sent Previous Slide!",slide)
    buildList(slide)
    setupColour(slide.colour)
  });

  function setupColour(colour){

    switch (colour) {

      case 'red':
        setBaseColour(200,100,100,255);
        break;
      case 'yellow':
        setBaseColour(200,200,200,255);
        break;
      case 'blue':
        setBaseColour(100,100,200,255);
        break;
      case 'green':
        setBaseColour(100,200,100,255);
        break;
      default:
        break;

    }

  }

  function buildList(slide) {

    boostAll();

    // storing reference to title
    var title = $('#slide-title');

    title.fadeOut(200,()=>{

      if(slide.end){
        title.fadeIn().delay(100).text(`Thank You!`)
      } else {
        title.fadeIn().delay(100).text(slide.title)
      }

    })

    // storing reference to points
    var points = $('#slide-list');

    // clearing old points
    points.fadeOut(200,()=>{

      points.empty()

      // iterating over points array in given slide object
      for(var point of slide.points){
        // appending list item with given point
        points.append('<li class="slide-list-item">'+point+'</li>')
      }

      points.fadeIn().delay(100)

    })

  }

})
