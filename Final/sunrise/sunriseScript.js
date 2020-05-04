var sunHeight = 60;
var sunX = 40;
var sun = document.getElementById("sun"); var sunHue = 313; var sunSaturation = 100; var sunLightness = 60;
var sky = document.getElementById("sky"); var skyHue = 254; var skySaturation;
var shade = document.getElementById("horizonShade");
var horizon = document.getElementById("horizon"); var horizonBotSaturation = 20; var horizonBotLightness = 10; var horizonBotHue = 120;
var horizonTopHue = 120; var horizonTopSaturation = 30; var horizonTopLightness = 15;

var bgAudio = document.getElementById("bgAudio");
bgAudio.volume = 0.4;
var cockAudio = document.getElementById("cockAudio");
cockAudio.volume = 0.4;

setTimeout(function() { cockAudio.play(); }, 4000);

function sunrise() {
  if (bgAudio.paused || bgAudio.currentTime == 0) bgAudio.play();
  if (sunHeight > 10) {
    sunHeight -= 0.05;
    sunX += 0.007;
    sun.style["top"] = sunHeight + "%";
    sun.style["left"] = sunX + "%";
    if (sunHue <= 47 || sunHue >= 313) {
      if (sunHue >= 360) sunHue = 0;
      sunHue += 0.35;
      sunSaturation -= 0.1;
      horizonTopSaturation += 1.25;
      horizonTopLightness += 0.05;
    }
    if (sunLightness <= 90) {
      sunLightness += 0.05;
    }
    if (horizonBotSaturation <= horizonTopSaturation) horizonBotSaturation += 0.5;
    if (horizonBotLightness <= horizonTopLightness) horizonBotLightness += 0.02;
    horizon.style["background-image"] = "radial-gradient(hsl(" + horizonBotHue + ", " + horizonBotSaturation + "%, " + horizonBotLightness + "%) 20%, hsl(" + horizonTopHue + ", " + horizonTopSaturation + "%, " + horizonTopLightness + "%) 70%)";
    sun.style["background-color"] = "hsl(" + sunHue + ", " + sunSaturation + "%, " + sunLightness + "%)";
    let skyLightness = 70-sunHeight;
    if (sunHeight > 25) {
        skySaturation = -20 + sunHeight * 2;
        skyHue -= 0.1;
    }
    else {
      skySaturation = 55 - sunHeight;
    }
    sky.style["background-color"] = "hsl(" + skyHue + "," + skySaturation + "%," + skyLightness + "%)";
    shade.style["background-image"] = "radial-gradient(hsl(50, 100%, 87%) 40%, hsl(" + skyHue + "," + skySaturation + "%," + skyLightness + "%) 70%)";
    setTimeout(sunrise, 25);
  }
}
sunrise();
