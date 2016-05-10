function progressClick(e, sound){
  console.log("progress click");
  console.log(e);
  var sound = sound;
  var vis = "visList"+sound;
  var progress ="progressWrapper"+sound
  var image = "imageColor"+sound
  moveImage(e, vis, progress);
  var audio = document.getElementById("audio"+sound);
  audio.currentTime = audio.duration * clickPercentImage(e, progress, image);


}

function moveImage(e, vis, prog){

  var off = $(".listSpectro").offset().left
  var offset = e.pageX - $("#"+vis).offset().left+$("#"+vis).scrollLeft();

  var newMargLeft = offset;
  console.log(newMargLeft);
  $("#"+prog).css({'width':newMargLeft+"px"});

  if (newMargLeft < 0) {
    $("#"+prog).css({'width':0});

  }

}

function clickPercentImage(e, prog, image){
  //var offset = e.pageX - $("#vis").offset().left+$('#vis').scrollLeft();
  var p =  $("#"+prog).width();
  var width = $("#"+image).width();
  //var percent = progress/width;
  //console.log("progress"+p);
  return p / width;
}

function timeUpdate(e, sound){

  var sound = sound;
  var vis = "visList"+sound;
  var progress ="progressWrapper"+sound
  var width = 1950;
  var audio = document.getElementById("audio"+sound);
  var duration = audio.duration;
  var current = audio.currentTime;

    var progessScale = d3.scale.linear()
    .domain([0, duration])
    .range([0, width]);

    var value = progessScale(current);

    $("#"+progress).css({'width':value});

    var proWidth = $("#"+progress).width();
    var scroll = $("#"+vis).scrollLeft();

    if(Math.abs(proWidth - scroll)>700){
      $("#"+vis).scrollLeft(value-10);
    }else{
      //$("#"+vis).scrollLeft(value);
    }



  console.log("time update");
  //moveImage(e, vis, progress);
}
