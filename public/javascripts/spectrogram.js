//Keep in mind loading sound here but loading sound data in seperate js.. would be best to
//change and have filename passed.

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

function Spectrogram(filename, selector, options){

  if (!options) {
    options = {};
  }
  this.options = options;

  //Global variables
  var fftSize = 2048;
  var sampleSize = 1024;
  var mySampleRate;
  this.data = [];
  this.count = 0;
  this.curSec = 0;
  this.maxCount;
  this.isLoaded = false;
  this.isPlaying = false;
  this.startTime = 0;
  this.startOffset = 0;
  //unsure about this and if needed... or what should be..
  this.sampleRate = options.sampleSize || 512;

//  var audio;
  //this.duration;

  //just for testing..
  this.decRange = [-80.0, 80.0];

  this.width = 800;
  this.height = 256;
  this.margin = {top: 20, right: 20, bottom: 30, left: 50};

  //binds selector and filename to the new object
  this.selector = selector;
  this.filename = filename;

//sets up audio playing controls
  //var canPlay =false;
  var audio = new Audio();
  audio.src = this.filename;
//  audio.controls = true;
  audio.autoplay = false;
  audio.addEventListener("timeupdate", updateProgress, true);
  audio.id = "audio";
  document.getElementById("player").appendChild(audio);


//sets up listener, when audio is loaded gets duration of file
 audio.oncanplaythrough = function() {
  //console.log("playthrough");
  duration = audio.duration;
  //console.log(duration);
  canPlay=true;
};
height = this.height;
width = this.width;
audio.ontimeupdate = function(){
//console.log(audio.currentTime);
currentTime = audio.currentTime;
//console.log(currentTime);
progress(currentTime, height, width);
//this.progressLine = this.svg.append("line");

};
currentTime = audio.currentTime;
//requestAnimFrame(progress);
//()"document.getElementById('tracktime').innerHTML = audio.currentTime;";

  //creates new audio Context and Analyser
  this.context = context = new AudioContext();
  this.analyser = context.createAnalyser();
  this.source = this.context.createMediaElementSource(audio);

  this.freqs = new Uint8Array(this.analyser.frequencyBinCount);

  // Connect graph
  this.source.connect(this.analyser);
  this.analyser.connect(this.context.destination);
  console.log(this);
  //load data file, and connect to object
  loadStats(this, this.draw.bind(this));



};//end Spectrogram

Spectrogram.prototype.draw = function(obj){
console.log("draw!");
//console.log("this data "+ this.data);

//if sound is loaded, does this;
if (canPlay){
  console.log("Can play");
  this.duration=duration;
//  console.log(this);
};

// setting up frame..
this.timeRange = [0, this.duration];
var maxFrequency = this.options.maxFrequency || this.getBinFrequency(this.analyser.frequencyBinCount / 2);
//var maxFrequency = 60;
//var freq = this.getFrequency(10);
//console.log(this.analyser.frequencyBinCount);
var minFrequency = this.options.minFrequency || this.getBinFrequency(0);
//this.freqRange = [minFrequency, maxFrequency];
//console.log(maxFrequency);
//console.log(this.getBinFrequency(this.analyser.frequencyBinCount/2));
//JUST FOR TRIAL
//var freq = this.getBinFrequency(370);
//console.log(freq);
this.freqRange = [0, 360];
this.maxCount = (this.context.sampleRate / this.sampleRate) * duration;

var progessScale = d3.scale.linear()
  .domain([0, duration])
  .range([0, width])

//start drawing image
this.svg = d3.select(this.selector).append("svg")
.attr("width", this.width) //could add margin here
.attr("height", this.height)
.append("g")

//left out a transform here.. needed?

this.canvas = d3.select(this.selector).append("canvas")
  .attr("class", "vis_canvas")
  .attr("width", this.width)
  .attr("height", this.height)

  this.progressLine = this.svg.append("line")
    .attr("class", "line")
    .attr("id", "line")
    .attr("x1", function() {return progessScale(currentTime);})
    .attr("x2", function() {return progessScale(currentTime);})
    .attr("y1", 0)
    .attr("y2", height)
    .attr("stroke",'red')
    .attr("stroke-width", 2.0);

//  ctx = $(".vis_canvas").get()[0].getContext("2d");
//  colorScale = new chroma.scale(['blue', 'orange', 'yellow', 'white']).out('hex');



  this.xScale = d3.scale.linear()
    .domain(this.timeRange)
    .range([0, this.width]);

  this.yScale = d3.scale.linear()
    .domain(this.freqRange)
    .range([this.height,0]);

    //currently setting color..
    this.zScale = d3.scale.linear()
      .domain(this.decRange)
      .range(["blue", "white"])
      .interpolate(d3.interpolateLab);

    this.colorScale = d3.scale.linear()
      .domain(this.decRange)
      .range(['blue', 'yellow', 'white'])//original had orange in it..
      //.interpolate(d3.interpolateLab);

            //maybe also don't need..
            var that = this;

            column = 0;

            var min = d3.min(this.data, function(d) { return d3.min(d.values)});
            var max = d3.max(this.data, function(d) { return d3.max(d.values)});
            this.zScale.domain([min + 20, max - 20]);//original says +20..
            this.colorScale.domain([min, max]);//new color scale

            this.dotWidth = this.width / this.maxCount;
            this.dotHeight = this.height / 370;
            console.log("dot W "+this.dotWidth);
            console.log("dot H "+this.dotHeight);
            console.log("Max Count "+this.maxCount);
            console.log("width "+this.width);
            console.log("min "+ min);
            console.log("max "+ max);
            var visContext = d3.select(this.selector).select(".vis_canvas")[0][0].getContext('2d');

            var maxf=0;

            visContext.clearRect( 0, 0, this.width + this.margin.left, this.height );
            // display as canvas here.
            this.data.forEach(function(d) {
              length = Object.keys(d.values).length;
              //console.log(d.key);
              for(var i = 0; i < length - 1; i++) {
                //console.log(that.getBinFrequency(i));
                //console.log(d.values);
              //  if(d.values[i] > maxf){
                  //console.log("higher");
                //  maxf = d.values[i];
                  //console.log(i);
                //}
                var v = d.values[i];
                var x = that.xScale(d.key);
                var y = that.yScale(i);
                visContext.fillStyle = that.colorScale(v);
                visContext.fillRect(x,y,that.dotWidth+4, that.dotHeight);
              }
            });
          //  console.log(this);
            // display as canvas here.
            //this.data.forEach(function(d) {
              //length = Object.keys(d.values).length;
            //  console.log(d);
              //for(var i = 0; i < d.values.length - 1; i++) {
              //for(var i = 0; i < length - 1; i++) {
              //for(key in d.values){
              //  var v = d.values[i];
                //console.log(column);
                //var x = column;
                //var y = that.yScale(that.getBinFrequency(i));
                //visContext.fillStyle = that.zScale(v);
                //visContext.fillRect(x,y,that.dotWidth, that.dotHeight);
                      //  var v = d.values[key];
                //console.log(column);
                //var v = d.values;
                //console.log(d.values);
                      //ctx.fillStyle = colorScale(v / 256.0); //from other spectro..
                      //ctx.fillRect(column, that.height - key, 1, 1);
                /*  var x = that.xScale(key);
                  var y = that.yScale(that.getBinFrequency(key));
                  visContext.fillStyle = that.zScale(v);
                  visContext.fillRect(x,y,that.dotWidth, that.dotHeight);*/
              //}
              //}
            //}
              column ++;
            //});


};//end draw



Spectrogram.prototype.getBinFrequency = function(index) {
  var nyquist = this.sampleRate/2;
  //console.log(nyquist);
  var freq = index / this.freqs.length * nyquist;
  //console.log(freq);
  return freq;

}

function progress(current, height, width){
//that=this;
//console.log("Progress");
//var audio = document.getElementById("audio");
//var current = audio.currentTime;
//var v = 100 * (audio.currentTime / audio.duration);
var progessScale = d3.scale.linear()
  .domain([0, audio.duration])
  .range([0, width]);
var timeRange =[0, duration];
//console.log(this.curDuration);
var value = progessScale(current);
var scale = d3.scale.linear()
  .domain(timeRange)
  .range([0, width]);
  //d3.select(".line")
    //.attr("stroke-width", 5)
    //.attr("stroke", "blue");
    /*var line=document.getElementById("line");
    document.getElementById("line").style.stroke = "blue";
    line.setAttribute("x1", value);
    line.setAttribute("x2", value);*/
    d3.select("#line")
      //.transition()
      .attr("stroke",'green')
      .attr("x1", value)
      .attr("x2", value)

  /*.attr("x1", function() {return progessScale(current);})
  .attr("x2", function() {return progessScale(current);})
  .attr("y1", 0)
  .attr("y2", height)
  .attr("stroke",'red')
  .attr("stroke-width", 5.0);*/
}

//sets up Play/Pause functions
function togglePlayPause() {
  var playpause = document.getElementById("playpause");
  var audio = document.getElementById("audio");
     if (audio.paused) {
        playpause.title = "pause";
        playpause.innerHTML = "Pause";
        audio.play();
     }
     else {
        playpause.title = "play";
        playpause.innerHTML = "Play";
        audio.pause();
     }
}

function setVolume() {
   var volume = document.getElementById("volume");
   var audio = document.getElementById("audio");
   audio.volume = volume.value;
}

function toggleMute() {
  var audio = document.getElementById("audio");
  audio.muted = !audio.muted;
}

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
	moveplayhead(event);
  var audio = document.getElementById("audio");
	audio.currentTime = audio.duration * clickPercent(event);
}, false);

// returns click as decimal (.77) of the total timelineWidth
function clickPercent(e) {
  var playhead = document.getElementById('playhead');
  var timeline = document.getElementById('timeline');
  var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
	return (e.pageX - timeline.offsetLeft) / timelineWidth;
}

function moveplayhead(e) {
  var timeline = document.getElementById('timeline');
  var playhead = document.getElementById('playhead');
  var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
	var newMargLeft = e.pageX - timeline.offsetLeft;

	if (newMargLeft = 0 && newMargLeft <= timelineWidth) {
		playhead.style.marginLeft = newMargLeft + "px";
	}
	if (newMargLeft < 0) {
		playhead.style.marginLeft = "0px";
	}
	if (newMargLeft < timelineWidth) {
		playhead.style.marginLeft = timelineWidth + "px";
	}
}

// timeUpdate
// Synchronizes playhead position with current point in audio
//can also make draggable but isn't right now...
function timeUpdate() {
  //console.log("updates");
  var audio = document.getElementById("audio");
  var timeline = document.getElementById('timeline');
  var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
	var playPercent = timelineWidth * (audio.currentTime / audio.duration);
	playhead.style.marginLeft = playPercent + "px";
	if (audio.currentTime == audio.duration) {
		var playpause = document.getElementById("playpause");
    playpause.innerHTML = "Play";
    d3.select("#line")
    .attr("x1", 0)
    .attr("x2", 0)
	}
}

Spectrogram.prototype.getFrequency = function(index) {
  //var nyquist = this.context.sampleRate/2;
  //var freq = index / this.freqs.length * nyquist;
  //freq = bin * sr / fft
  //15888 = x * sr/fft
  var fft = 1024;
  var bin = 370;
  var calc = bin * this.context.sampleRate/fft;

//  var x = 15888/(rate*fftSize)
  var x = 15888*fft/this.context.sampleRate;

  var reverse = x *this.context.sampleRate/fft;
  console.log(x);
  console.log(reverse);
  console.log("sample rate "+ this.context.sampleRate);
  console.log("fft "+ fft);
  console.log("calc. "+ calc);


  var freq = index * this.context.sampleRate/fftSize;
  return freq;

  }
