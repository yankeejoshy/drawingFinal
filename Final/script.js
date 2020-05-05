var hour1 = document.getElementById("hour1"); var hour2 = document.getElementById("hour2"); var min1 = document.getElementById("min1"); var min2 = document.getElementById("min2");
var h1U = document.getElementById("hour1up"); var h2U = document.getElementById("hour2up"); var h1D = document.getElementById("hour1down"); var h2D = document.getElementById("hour2down");
var m1U = document.getElementById("min1up"); var m2U = document.getElementById("min2up"); var m1D = document.getElementById("min1down"); var m2D = document.getElementById("min2down");
var buttonArr = [h1U, h2U, h1D, h2D, m1U, m2U, m1D, m2D];

var goBtn = document.getElementById("btn");

for (var i = 0; i < buttonArr.length; i++) {
  buttonArr[i].addEventListener("click", function() {
    if (this == h1U) { // increase first hour digit
      if (parseInt(hour1.innerHTML) == 0) {
        hour1.innerHTML = String(parseInt(hour1.innerHTML)+1);
      }
      else if (hour1.innerHTML == 1) { // if first hour digit is 1, cannot increase to 2 if h2 is > 4
        if (parseInt(hour2.innerHTML) < 5) {
          hour1.innerHTML = String(parseInt(hour1.innerHTML)+1);
        }
      }
    }
    else if (this == h1D) {
      if (parseInt(hour1.innerHTML) > 0) hour1.innerHTML = parseInt(hour1.innerHTML)-1;
    }
    else if (this == h2U) {
      // if hour1==2, hour2 cannot > 4
      if (parseInt(hour1.innerHTML) == 2) {
        if (parseInt(hour2.innerHTML) < 3) {
          hour2.innerHTML = String(parseInt(hour2.innerHTML)+1);
        }
      }
      else { // otherwise, if hour2 == 9, hour2 set to 0
        if (parseInt(hour2.innerHTML) == 9) {
          hour2.innerHTML = String(0);
        }
        else {
          hour2.innerHTML = String(parseInt(hour2.innerHTML)+1);
        }
      }
    }
    else if (this == h2D) {
      if (hour2.innerHTML == 0) {
        if (hour1.innerHTML != 2) {
          hour2.innerHTML = 9;
        }
      }
      else {
        hour2.innerHTML = String(parseInt(hour2.innerHTML)-1);
      }
    }
    else if (this == m1U) {
      if (min1.innerHTML == 5) {
        min1.innerHTML = 0;
        carryForwardHour();
      }
      else {
        min1.innerHTML = String(parseInt(min1.innerHTML)+1);
      }
    }
    else if (this == m1D) {
      if (min1.innerHTML == 0) {
        min1.innerHTML = 5;
        fallBackHour();
      }
      else {
        min1.innerHTML = String(parseInt(min1.innerHTML)-1);
      }
    }
    else if (this == m2U) {
      if (min2.innerHTML == 9) {
        min2.innerHTML = 0;
        carryForwardMinute();
      }
      else {
        min2.innerHTML = String(parseInt(min2.innerHTML)+1);
      }
    }
    else if (this == m2D) {
      if (min2.innerHTML == 0) {
        min2.innerHTML = 9;
        fallBackMinute();
      }
      else {
        min2.innerHTML = String(parseInt(min2.innerHTML)-1);
      }
    }
  });
}

function fallBackMinute() {
  if (parseInt(min1.innerHTML) > 0) min1.innerHTML = String(parseInt(min1.innerHTML)-1);
  else {
    fallBackHour();
    min1.innerHTML = 5;
  }
}

function fallBackHour() {
  if (parseInt(hour2.innerHTML) != 0) hour2.innerHTML = String(parseInt(hour2.innerHTML)-1);
  else {
    if (hour2.innerHTML == 0) {
      fallBackDay();
    }
    else hour2.innerHTML = String(parseInt(hour2.innerHTML)-1);
  }
}

function fallBackDay() {
  hour1.innerHTML = 2; hour2.innerHTML = 3; min1.innerHTML = 5; min2.innerHTML = 9;
}

function carryForwardMinute() {
  if (parseInt(min1.innerHTML) < 5) min1.innerHTML = String(parseInt(min1.innerHTML)+1);
  else {
    carryForwardHour();
    min1.innerHTML = 0;
  }
}
function carryForwardHour() {
  if (parseInt(hour1.innerHTML) < 2) {
    if (parseInt(hour2.innerHTML) < 9) hour2.innerHTML = String(parseInt(hour2.innerHTML)+1);
    else {
      hour2.innerHTML = 0;
      hour1.innerHTML = String(parseInt(hour1.innerHTML)+1);
    }
  }
  else {
    if (parseInt(hour2.innerHTML) < 3) {
      hour2.innerHTML = String(parseInt(hour2.innerHTML)+1);
    }
    else {
      carryForwardDay();
    }
  }
}
function carryForwardDay() {
  hour1.innerHTML = 0; hour2.innerHTML = 0; min1.innerHTML = 0; min2.innerHTML = 0;
}

btn.addEventListener("click", function() {
  let hour = parseInt(hour1.innerHTML + hour2.innerHTML);
  if (hour > 4 && hour < 12) window.location.href="sunrise/index.html";
  else if (hour > 12 && hour < 20) window.location.href="rain/index.html";
  else window.location.href="night/index.html";
});
