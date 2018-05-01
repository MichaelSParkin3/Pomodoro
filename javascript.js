// A $( document ).ready() block.
$( document ).ready(function() {

var workInterval;
var originalPlayTime;
var originalWorkTime;
var playMusicSilent = true;

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
  document.getElementById("work-plus").disabled = true;
  document.getElementById("work-minus").disabled = true;
  document.getElementById("play-plus").disabled = true;
  document.getElementById("play-minus").disabled = true;
  document.getElementById("play").disabled = true;

  originalWorkTime = $( "#work-timer" ).text();
  console.log("orign"+originalWorkTime);
  originalPlayTime = $( "#play-timer" ).text();

  var orignalWorkTimeArray = originalWorkTime.split(":");
  if (orignalWorkTimeArray[0]=="0") {
    var prop = "arrow "+orignalWorkTimeArray[1]+"s";
  }else {
    var prop = "arrow "+orignalWorkTimeArray[0]*60+"s";
  }
  console.log(prop);
  $( "#arrow" ).addClass( "arrow-anim" );
  $('.arrow-anim').css({"animation":prop});


    workInterval = setInterval(function(){
    var currentTime = $( "#work-timer" ).text();
    //if work time is finished then start the play time
    if (currentTime == "0:00") {
      if (playMusicSilent) {
        playMusicSilent = false;
        var audio = new Audio('pop.mp3');
        audio.play();
        $( "#balloon" ).addClass( "zoomOutUp" );
        var audio = new Audio('flute.mp3');
        audio.play();
      }
      var currentTime = $( "#play-timer" ).text();
      if (currentTime == "0:00") {
        var audio = new Audio('flute.mp3');
        audio.play();
        clearInterval(workInterval);
      }
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
  playMusicSilent = true;
  $( "#work-timer" ).text(originalWorkTime);
  $( "#play-timer" ).text(originalPlayTime);
  document.getElementById("play").disabled = false;
  document.getElementById("work-plus").disabled = false;
  document.getElementById("work-minus").disabled = false;
  document.getElementById("play-plus").disabled = false;
  document.getElementById("play-minus").disabled = false;
  $( "#balloon" ).removeClass( "zoomOutUp" )
  $('.arrow-anim').css({"animation":""});
  $( "#arrow" ).removeClass( "arrow-anim" )
  // restart animation
  var elm = document.getElementById("#balloon");
var newone = elm.cloneNode(true);
elm.parentNode.replaceChild(newone, elm);
// restart animation
var elm = document.getElementById("#arrow");
var newone = elm.cloneNode(true);
elm.parentNode.replaceChild(newone, elm);
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
