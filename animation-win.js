let leftBackground = document.querySelector(".win-container-background-left");
let rightBackground = document.querySelector(".win-container-background-right");


let widthOfLeftBackground = leftBackground.offsetWidth;
let widthOfRightBackground = rightBackground.offsetWidth;

widthOfLeftBackground = (widthOfLeftBackground / 2) * (-1);
widthOfRightBackground = (widthOfRightBackground / 2);

const backgroundSlideOutLeft = [
  { transform: "translateX(0px)" },
  { transform: `translateX(${widthOfLeftBackground}px)` },
];

const backgroundSlideOutLeftTiming = {
  duration: 2000,
  iterations: 1,
};

const backgroundSlideOutRight = [
  { transform: "translateX(0px)" },
  { transform: `translateX(${widthOfRightBackground}px)` },
];

const backgroundSlideOutRightTiming = {
  duration: 2000,
  iterations: 1,
};


let animationLeft = leftBackground.animate(backgroundSlideOutLeft, backgroundSlideOutLeftTiming);
let animationRight = rightBackground.animate(backgroundSlideOutRight, backgroundSlideOutRightTiming);
animationLeft.onfinish = (event) => { leftBackground.style.transform = `translateX(${widthOfLeftBackground}px)` };
animationRight.onfinish = (event) => { rightBackground.style.transform = `translateX(${widthOfRightBackground}px)` };


