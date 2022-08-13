const controller = new ScrollMagic.Controller();
const tl = new TimelineMax();
tl.to(".app-icon", 1, {scale:0.8})
  .to(".app-icon", 1, {scale:4}, "-=0.5")
  .to(".app-top", 1, {opacity:0}, "-=1")
  .to("#sc-1", 3, {opacity:1, delay: 0.5}, "-=1");
tl.to("#desc-1", 3, {opacity:0, delay: 1})
  .to("#sc-2", 3, {opacity:1}, "-=1");
tl.to("#desc-2", 3, {opacity:0, delay: 1})
  .to("#sc-3", 3, {opacity:1}, "-=1");
tl.to("#desc-3", 3, {opacity:0, delay: 1})
  .to("#sc-4", 3, {opacity:1}, "-=1");

const scene = new ScrollMagic.Scene({
  triggerElement: ".app-height",
  duration: "500%",
  triggerHook: 0
})
.setPin(".app-height")
.setTween(tl)
.addTo(controller);