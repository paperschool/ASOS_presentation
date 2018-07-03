
var presentation = ( (args) => {

  var slides = [];

  slides.push({
    "index":1,
    "title":"Hi",
    "points":[
      'I\'m Dominic!',
      'Just Graduated :)',
      'Rock Climber',
      'Graphic Designer',
      'Professional Italian'
    ],
    "image":'/1.jpg'
  })

  slides.push({
    "index":2,
    "title":"Initial Thoughts",
    "points":[
      'Look through consumer lense',
      'Identify unique aspects of the platform',
      'Well executed standards',
      'Apply SWOT'
    ],
    "image":'/2.jpg'
  })

  slides.push({
    "index":3,
    "title":"Strengths",
    "points":[
      'Strong consumer Engagement',
      'ASOS as a brand',
      'Why you close sales',
      'Mobile Platform',
      'Unique Selling Point',
    ],
    "image":'/3.jpg'
  })

  slides.push({
    "index":4,
    "title":"Consumer Engagement",
    "points":[
      '5th page on google to find bad PR',
      'Social Media friendly',
      'Publically seen to be a force for good (LGBT)',
    ],
    "image":'/4.jpg'
  })

  slides.push({
    "index":5,
    "title":"ASOS as a brand",
    "points":[
      'Democratising Online Retail',
      'Surpassing Brick & Mortar',
      'Embracing new trends',
      'Pricing balance',
      'Well placed Discounts / Promotional Events',
      'Brand Mixing ( ASOS and Designer )'
    ],
    "image":'/4.jpg'
  })

  slides.push({
    "index":6,
    "title":"Why ASOS Sells Well",
    "points":[
      'Searching 80,000 Products ( search bar )',
      'Navigation of Products ( Categories, Filters, Inspo )',
      'Purchasing ( Catwalk, Product Details )',
      'Buy The Look',
      'Check Out Click Complexity',
      'Social Media Login'
    ],
    "image":'/4.jpg'
  })

  slides.push({
    "index":7,
    "title":"ASOS App",
    "points":[
      'Clean, Accurate and Easy to Navigate',
      'Mirrors Site well ( inspo on homepage )',
      'UI / Spaced Effectively',
      'Sales Link Front and Center',
      'Search by Image ( Potential Idea for this )'
    ],
    "image":'/4.jpg'
  })

  slides.push({
    "index":8,
    "title":"ASOS USP",
    "points":[
      'High Quality Product',
      'Reasonable Prices',
      'Available anywhere using the internet',
      'Can buy entire wardrobe'
    ],
    "image":'/4.jpg'
  })

  slides.push({
    "index":9,
    "title":"Weaknesses",
    "points":[
      'Return Rates',
      'Visualisation of Stock',
      'Overhead from deliveries',
      'Free Shipping cost',
      'Slightly Unapproachable',
    ],
    "image":'/4.jpg'
  })

  slides.push({
    "index":10,
    "title":"Returns",
    "points":[
      'Major return rates 20-40% cited*',
      'Largely due to incorrect sizing',
      'Curbed with education on sizing guides',
      'Potential solutions?'
    ],
    "image":'/4.jpg'
  })

  slides.push({
    "index":11,
    "title":"Visualisation",
    "points":[
      '360* Catwalk feature / Model Poses',
      'Consumer is still guessing',
    ],
    "image":'/4.jpg'
  })

  slides.push({
    "index":12,
    "title":"Deliveries",
    "points":[
      'Costly for packaging / waste overhead',
      'Free shipping can be costly if not matched by sales',
      'Potential solutions? ( recyclables need more PR pushes )',
    ],
    "image":'/4.jpg'
  })

  slides.push({
    "index":13,
    "title":"Approachability",
    "points":[
      'Personal Opinions',
      'Fashion Ignorance',
      'Browsing is difficult ( only searching )',
      'Little guidance',
      'Potential idea here?'
    ],
    "image":'/4.jpg'
  })

  slides.push({
    "index":14,
    "title":"Threats",
    "points":[
      'Growing Ecological Concerns Halting Business',
      'Brexit / Economic Concerns',
      'Which trends to Track',
      'Competition',
      'Depop / vintage / Reselling popularity',
      'Internet Trend Pace'
    ],
    "image":'/4.jpg'
  })

  slides.push({
    "index":15,
    "title":"Opportunities",
    "points":[
      'Stronger Social Media Pushes',
      'Guided Styling ( Site Interactivity ) ',
      'Clothes Sizing Help ( idea )',
      'Roulette Fashion ( idea )',
      'Guerilla Marketing ( idea )'
    ],
    "image":'/4.jpg'
  })


  slides.push({
    "index":16,
    "title":"Thank You!",
    "points":[],
    "image":'/end.png'
  })

  // storing counter of current slide
  var counter = 0;

  // storing max slide count to avoid overflow
  var max = slides.length-1;

  var methods = {}

  methods.getCurrent = () => {

    slides[counter]['end']    = ( max === counter );
    slides[counter]['name']   = null;
    slides[counter]['colour'] = null;

    return slides[counter]
  }

  methods.getNext = () => {

    counter = ++counter >= max ? max : counter

    slides[counter]['end']    = ( max === counter );
    slides[counter]['name']   = null;
    slides[counter]['colour'] = null;

    return slides[counter]
  }

  methods.getPrevious = () => {

    counter = --counter <= 0 ? 0 : counter

    slides[counter]['end']    = ( max === counter );
    slides[counter]['name']   = null;
    slides[counter]['colour'] = null;

    return slides[counter]
  }

  methods.reset = () => {
    counter = 0;
  }

  // returning array of functional methods
  return methods;

})()

module.exports = presentation;
