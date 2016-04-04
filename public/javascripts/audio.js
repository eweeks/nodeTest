// shim requestAnimFrame for animating playback
window.requestAnimFrame = (function(){
return  window.requestAnimationFrame       ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function( callback ){
  window.setTimeout(callback, 1000 / 60);
};
})();

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var duration;
var canPlay =false;
var currentTime =0;
var progessScale;
var fftSize = 2048;
var height;
var width;
var y =0;

function Spectrogram(filename, selector){

  //Global variables
  var fftSize = 2048;
  var sampleSize = 1024;


  this.width = 3900;
  this.height = 260;
  height = this.height;
  width = this.width;
  this.margin = {top: 20, right: 20, bottom: 30, left: 50};

  //binds selector and filename to the new object
  this.selector = selector;
  this.filename = filename;

//sets up audio instance and audio tag
  var audio = new Audio();
  audio.src = this.filename;
  audio.autoplay = false;
  audio.addEventListener("timeupdate", updateProgress, true);
  audio.id = "audio";
  document.getElementById("player").appendChild(audio);

  //draws progress line
//  drawLine();

  //do I even need all this anymore??
  //creates new audio Context and Analyser
/*  this.context = context = new AudioContext();
  this.analyser = context.createAnalyser();
  this.source = this.context.createMediaElementSource(audio);

  //this.freqs = new Uint8Array(this.analyser.frequencyBinCount);

  // Connect graph
  this.source.connect(this.analyser);
  this.analyser.connect(this.context.destination);
  console.log(this);*/



//sets up listener, when audio is loaded gets duration of file
 audio.oncanplaythrough = function() {
  //console.log("playthrough");
  duration = audio.duration;
  //console.log(duration);
  canPlay=true;
};

//Called when audio updates, this resets the progress bars
audio.ontimeupdate = function(){
    currentTime = audio.currentTime;
    //console.log("current time "+currentTime);
    //calls function progress which updates bars
    progress(currentTime, height, width);
};

//border-right: solid 1px red;


};//end Spectrogram

//draws progress line
/*function drawLine(){
  var progessScale = d3.scale.linear()
    .domain([0, duration])
    .range([0, width])

  var progressLine = d3.select('#svg').append("line")
    .attr("class", "line")
    .attr("id", "line")
    .attr("x1", function() {return progessScale(currentTime);})
    .attr("x2", function() {return progessScale(currentTime);})
    .attr("y1", 0)
    .attr("y2", height)
    .attr("stroke",'red')
    .attr("stroke-width", 2.0);


}*/

//updates progress of progress line, and sets div scroll position
function progress(current, height, width){

  //console.log("progress fired");
  duration = audio.duration;

var progessScale = d3.scale.linear()
  .domain([0, duration])
  .range([0, width]);

var timeRange =[0, duration];
//console.log("Duration is "+duration);
//console.log("current is "+current);
//console.log("width is "+width);

var value = progessScale(current);
//console.log("value is "+value);
var scale = d3.scale.linear()
  .domain(timeRange)
  .range([0, width]);

    $("#progressWrapper").css({'width':value});
    var proWidth = $("#progressWrapper").width();
    //console.log("width "+proWidth);
    var scroll = $('#vis').scrollLeft();
    //console.log("scroll value is"+scroll);

    if(Math.abs(proWidth - scroll)>700){
      //console.log("Fired");
      $('#vis').scrollLeft(value-10);
    }

  /*if((proWidth+100)/800 >=y){
      console.log("Fired");
      $('#vis').scrollLeft(value);
      y++;
  }*/

      //$('#vis').scrollLeft(value);

}

//sets up Play/Pause functions
function togglePlayPause() {
  var playpause = document.getElementById("playpause");
  var audio = document.getElementById("audio");
     if (audio.paused) {
        playpause.title = "pause";
        $("#playbutton").attr('class', 'glyphicon glyphicon-pause');
        //playpause.innerHTML = "Pause";
        audio.play();
     }
     else {
        playpause.title = "play";
        $("#playbutton").attr('class', 'glyphicon glyphicon-play');
      //  playpause.innerHTML = "Play";
        audio.pause();
     }
}

function showVolume(){
    //$("#volume").css("display","inline");
    $("#volume").toggle();
}

//sets volume.. not hooked up yet
function setVolume() {
   var value = document.getElementById('volume').value;
   //console.log("slider is "+value);
   var audio = document.getElementById("audio");
   audio.volume = (value / 100);
}

//updates progress of progress bar for audio
function updateProgress() {
  //console.log("Update");
   var progress = document.getElementById("progress");
   var audio = document.getElementById("audio");
   var value = 0;
   if (audio.currentTime > 0) {
      //value = Math.floor((100 / audio.duration) * audio.currentTime);
      value = 100 * (audio.currentTime / audio.duration);
    //  console.log(value);
   }
   //progress.style.width = value + "%";
   playhead.style.marginLeft = value + "%";
   timeUpdate();
}

//Makes timeline clickable
var timeline = document.getElementById('timeline');
timeline.addEventListener("click", function (event) {
  console.log("time click");
	moveplayhead(event);
  var audio = document.getElementById("audio");
  //console.log("click percent "+clickPercent(event));
	audio.currentTime = audio.duration * clickPercent(event);
}, false);

// returns click as decimal (.77) of the total timelineWidth
function clickPercent(e) {
  var playhead = document.getElementById('playhead');
  var timeline = document.getElementById('timeline');
  var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
  //console.log("time offset width "+timeline.offsetWidth);
  //console.log("timeline width "+timelineWidth);
  //console.log("play offsetwidth "+playhead.offsetWidth);

  var offset = e.pageX - $("#timeline").offset().left;
  //console.log("Offset "+ offset);
  //console.log("returned "+(offset - timeline.offsetLeft) / timelineWidth);
	return (offset) / timelineWidth;
}

//makes playhead draggable
function moveplayhead(e) {
  var timeline = document.getElementById('timeline');
  var playhead = document.getElementById('playhead');
  var offset = e.pageX - $("#timeline").offset().left;
  var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

	var newMargLeft = offset;
  //console.log(newMargLeft);
	if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
    //console.log("moved");
		playhead.style.marginLeft = newMargLeft + "px";
	}
	if (newMargLeft < 0) {
		playhead.style.marginLeft = "0px";
	}
	if (newMargLeft > timelineWidth) {
    //console.log("moved2");
		playhead.style.marginLeft = timelineWidth + "px";
	}

//  var proWidth = $("#progressWrapper").width();
//  if((proWidth+100)/800 >=y){
      //console.log("Fired");
    //  $('#vis').scrollLeft(newMargLeft);
    //  y++;
//  }
  //if(proWidth < 1){
//    y=0;
  //}


}

// timeUpdate
// Synchronizes playhead position with current point in audio
function timeUpdate() {
  var audio = document.getElementById("audio");
  var timeline = document.getElementById('timeline');
  var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
	var playPercent = timelineWidth * (audio.currentTime / audio.duration);
	playhead.style.marginLeft = playPercent + "px";
	if (audio.currentTime == audio.duration) {
		var playpause = document.getElementById("playpause");
    $("#playbutton").attr('class', 'glyphicon glyphicon-play')
    $("#progressWrapper").css({'width':0});


    //d3.select("#wrapper").style("width", 0);
	}
}
