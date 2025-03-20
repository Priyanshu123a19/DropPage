// images setup
const images = [
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg'
];
// content setup
const texts = [
  ["Elegance ", "Take your vision Fashion as boundless as the cosmos a picture"],
  ["Glow", "Wear the brilliance of a thousand stars."],
  ["Cosmic", "Fashion that transcends time and space."],
  ["Lunar", "A fashion orbit beyond the ordinary."],
  ["Nebula", "Style that’s as infinite as the universe."],
];

// init plugin
rgbKineticSlider = new rgbKineticSlider({
  // images and content sources
  slideImages: images, 
  itemsTitles: texts, 

  // displacement images sources
  backgroundDisplacementSprite: "https://i.ibb.co/N246LxD/map-9.jpg", 
  cursorDisplacementSprite: "https://i.ibb.co/KrVr51f/displace-circle.png", 

  
  cursorImgEffect: true, 
  cursorTextEffect: false, 
  cursorScaleIntensity: 0.65, 
  cursorMomentum: 0.14, 
  
  swipe: true, 
  swipeDistance: window.innerWidth * 0.4, 
  swipeScaleIntensity: 2,

  
  slideTransitionDuration: 1,
  transitionScaleIntensity: 30, 
  transitionScaleAmplitude: 160, 

  
  nav: true, 
  navElement: ".main-nav", 

 
  imagesRgbEffect: true, 
  imagesRgbIntensity: 0.9, 
  navImagesRgbIntensity: 80, 

  
  textsDisplay: true, 
  textsSubTitleDisplay: true, 
  textsTiltEffect: true, 
  googleFonts: ["Josefin Sans:700", "Poppins:400"], 
  buttonMode: false, 
  textsRgbEffect: true, 
  textsRgbIntensity: 0.03, 
  navTextsRgbIntensity: 15, 

  textTitleColor: "#fff", 
  textTitleSize: 125, 
  mobileTextTitleSize: 125, 
  textTitleLetterspacing: 3, 

  textSubTitleColor: "white", 
  textSubTitleSize: 21, 
  mobileTextSubTitleSize: 21, 
  textSubTitleLetterspacing: 2, 
  textSubTitleOffsetTop: 90, 
  mobileTextSubTitleOffsetTop: 90, 
});
