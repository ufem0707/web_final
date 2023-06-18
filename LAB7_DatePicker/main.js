var ctx, ctx2, thisImage, thisImage2, countdownInterval;

$(function() {
  $("[type='date']").on("change", showDate);
  ctx = $("#myCanvas")[0].getContext("2d");
  
  ctx2 = $("#myCanvas2")[0].getContext("2d");
  
  $("#pickColor").on("change", function() {
    var selectedColor = this.value;
    document.body.style.backgroundColor = selectedColor;
  });
  
  $("#countDown").on("change", startCountdown);
  startCountdown();
});

function showDate() {
  var thisDate = this.value;
  thisDate = thisDate.replace(/-/g, "");
  thisImage = new Image();
  thisImage.src = "flipClockNumbers.png";
  thisImage.onload = function() {
    for (var x = 0; x < thisDate.length; x++) {
      ctx.drawImage(thisImage, thisDate[x] * 80, 0, 90, 130, 60 * x, 0, 60, 100);
    }
  };
}

function startCountdown() {
  clearInterval(countdownInterval); // Clear previous countdown interval if any
  $('#boom').hide()
  var countdownValue = parseInt($('#countDown').val(), 10);
  
  // Draw initial countdown value on canvas
  drawCountdown(countdownValue);
  
  // Start the countdown
  countdownInterval = setInterval(function() {
    countdownValue--;
    drawCountdown(countdownValue);
    
    if (countdownValue <= 0) {
        $('#boom').show();
      clearInterval(countdownInterval); // Stop the countdown when it reaches 0
    }
  }, 1000);
}

function drawCountdown(countdownValue) {
  ctx2.clearRect(0, 0, $("#myCanvas2")[0].width, $("#myCanvas2")[0].height); // Clear canvas before drawing
  
  var countdownString = countdownValue.toString().padStart(5, '0');
  thisImage2 = new Image();
  thisImage2.src = "flipClockNumbers.png";
  thisImage2.onload = function() {
    for (var x = 0; x < countdownString.length; x++) {
      ctx2.drawImage(thisImage2, countdownString[x] * 80, 0, 90, 130, 50 * x, 0, 60, 100);
    }
  };
}
