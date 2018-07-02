
$(document).ready(()=>{

  var socket = io.connect('/client');

  socket.on('next',(slide) => {
    console.log("Server Sent Next Slide!",slide)
    buildList(slide)
  });

  socket.on('previous',(slide) => {
    console.log("Server Sent Previous Slide!",slide)
    buildList(slide)
  });

  socket.on('reload',(slide) => {
    console.log("Server Sent Current Slide!",slide)
    buildList(slide)
  })

  function buildList(slide) {

    // storing reference to title
    var title = $('#slide-title');

    title.fadeOut(200,()=>{
      title.fadeIn().delay(100).text(slide.title)
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