function animate({ easing, draw, duration }) {
  let start = performance.now();

  return new Promise(resolve => {
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      let progress = easing(timeFraction);

      draw(progress);

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    });
  });
}
