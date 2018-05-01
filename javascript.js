// A $( document ).ready() block.
$( document ).ready(function() {

var workInterval;

//if work time changing buttons are pressed adjust time accordingly
  $( "#work-plus" ).click(function() {
    var currentTime = $( "#work-timer" ).text();
    var newTime = AddFiveMinToTime(currentTime);
    $( "#work-timer" ).text(newTime);
});
  $( "#work-minus" ).click(function() {
    var currentTime = $( "#work-timer" ).text();
    var newTime = SubtractFiveMinFromTime(currentTime);
    $( "#work-timer" ).text(newTime);
});



//if play time changing buttons are pressed adjust time accordingly
  $( "#play-plus" ).click(function() {
    var currentTime = $( "#play-timer" ).text();
    var newTime = AddFiveMinToTime(currentTime);
    $( "#play-timer" ).text(newTime);
});
  $( "#play-minus" ).click(function() {
    var currentTime = $( "#play-timer" ).text();
    var newTime = SubtractFiveMinFromTime(currentTime);
    $( "#play-timer" ).text(newTime);
});


//if start button is pressed then start timer
$( "#play" ).click(function() {
    workInterval = setInterval(function(){
    var currentTime = $( "#work-timer" ).text();
    if (currentTime == "0:00") {
      var currentTime = $( "#play-timer" ).text();
      var newTime = SubtractOneSecFromTime(currentTime);
      $( "#play-timer" ).text(newTime);
    }else {
      var newTime = SubtractOneSecFromTime(currentTime);
      $( "#work-timer" ).text(newTime);
    }

  }, 1000);
});
//if reset button is pressed then reset timer to where it started from
$( "#reset" ).click(function() {
  console.log("RESET");
  clearInterval(workInterval);
});




/*
Function to add five minutes to the timer.
*/
function AddFiveMinToTime (currentTime){

  var originalTime = currentTime;
  var currentTimeArray = currentTime.split(":");
  currentTimeArray[0] = (Number(currentTimeArray[0]) + 5).toString();
  if (currentTimeArray[0] <= "0")
    return originalTime;
  console.log(currentTimeArray);
  return currentTimeArray.join(':');

}

/*
Function to subtract five minutes from the timer.
*/
function SubtractFiveMinFromTime (currentTime){

  var originalTime = currentTime;
  var currentTimeArray = currentTime.split(":");
  currentTimeArray[0] = (Number(currentTimeArray[0]) - 5).toString();
  if (currentTimeArray[0] <= "0")
    return originalTime;
  console.log(currentTimeArray);
  return currentTimeArray.join(':');

}

/*
Function to subtract 1 second from the timer.
*/
function SubtractOneSecFromTime (currentTime){

  var originalTime = currentTime;
  var currentTimeArray = currentTime.split(":");
  if (Number(currentTimeArray[1]) - 1 < 0) {
    currentTimeArray[1] = "59"
    currentTimeArray[0] = (Number(currentTimeArray[0]) - 1).toString();
    return currentTimeArray.join(':');
  }else {
    var newNum = (Number(currentTimeArray[1]) - 1).toString()
    if (newNum.length < 2) {
      currentTimeArray[1] = "0" + (Number(currentTimeArray[1]) - 1).toString();
    }else {
      currentTimeArray[1] = (Number(currentTimeArray[1]) - 1).toString();
    }

    return currentTimeArray.join(':');
  }

}

});
