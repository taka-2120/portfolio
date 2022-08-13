const controller = new ScrollMagic.Controller();
const tl = new TimelineMax();
tl.to(".app-icon", 1, {scale:4})
  .to(".app-top", 1, {opacity:0}, "-=1")
  .to(".app-sc", 1, {opacity:1, delay: 0.5}, "-=1");

const scene = new ScrollMagic.Scene({
  triggerElement: ".app-height",
  duration: "200%",
  triggerHook: 0
})
.setPin(".app-height")
.setTween(tl)
.addIndicators()
.addTo(controller);