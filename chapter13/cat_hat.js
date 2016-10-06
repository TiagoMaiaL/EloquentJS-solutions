/**
 * Solutions to Eloquent js exercises.
 *
 * Chapter 13
 * The cat’s hat
 */

/**
 * Animates the given element.
 * @param  NodeElement element
 * @param  float velocity
 * @param  int angle
 * @return void
 */
function animateElement(element, velocity, angle) {
  if (!angle)
    angle = 0;

  var cat = document.querySelector("img");
  var lastTime = null;

  function animate(time) {
    if (lastTime != null)
      angle += (time - lastTime) * -velocity;
    lastTime = time;
    element.style.top = (Math.sin(angle) * 20) + "px";
    element.style.left = (Math.cos(angle) * 200) + "px";
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

var cat = document.querySelector("#cat");
var hat = document.querySelector("#hat");

animateElement(cat, 0.001);
animateElement(hat, 0.001, 180);
