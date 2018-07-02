
var presentation = ( (args) => {

  var slides = [];

  slides.push({
    "index":1,
    "title":"Introduction",
    "points":['test point 1','test point 1','test point 1'],
    "image":'/1.jpg'
  })

  slides.push({
    "index":2,
    "title":"test2",
    "points":['Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','test point 2','test point 2'],
    "image":'/2.jpg'
  })

  slides.push({
    "index":3,
    "title":"test3",
    "points":['test point 3','test point 3','test point 3'],
    "image":'/3.jpg'
  })

  slides.push({
    "index":4,
    "title":"test4",
    "points":['test point 4','test point 4','test point 4'],
    "image":'/4.jpg'
  })

  slides.push({
    "index":5,
    "title":"Thank You!",
    "points":['thank you','thank you','thank you','thank you'],
    "image":'/end.png'
  })

  // storing counter of current slide
  var counter = 0;

  // storing max slide count to avoid overflow
  var max = slides.length-1;

  var methods = {}

  methods.getCurrent = () => {
    return slides[counter]
  }

  methods.getNext = () => {
    counter = ++counter >= max ? max : counter
    return slides[counter]
  }

  methods.getPrevious = () => {
    counter = --counter <= 0 ? 0 : counter
    return slides[counter]
  }

  // returning array of functional methods
  return methods;

})()

module.exports = presentation;
