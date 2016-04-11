var markers;
//load csv files for maps, csv includes both parks
d3.csv("/data/Soundscapes.csv", function(loadedRows) {
  markers = loadedRows;
  markers.forEach(function(d) {
    marker = new L.marker([d.lat, d.lng])
				.bindPopup(d.Site_Name)
        .on("click",function(){
          console.log("Clicked! " + d.Site_Code);
          $.post('/getSite', {site: d.Site_Code}, function(data){
                upDateSite(data);
                $.post('/getSounds', {site: d.Site_Code}, function(data){
                     upDateSpectro(data);
                });
          });

        })
				.addTo(grteMap);
        marker._icon.id="mark"+d.Site_Code
  });

  //marker._leaflet_id['41'].fire('click');
  //marker.fire('click');
});


function upDateSite(data){
  console.log(data);
   $("#photos-holder").empty();
   $(".carousel-indicators").empty();
   if (data.length > -1) {
        $(".sitename").text(data[0].Site_Name)
        $(".sitecode").text(data[0].Site_Code)
        $("div#carousel-example-generic").css('display', 'block');
        //empty photo slider

        $(".site-descript").text(data[0].Site_Description);
        //loops through data, adds photos to slider
        $.each(data, function( key, value ) {
            var images = "images/"+value.Photo_File;
            if(value.Photo_File.length>4){
              $('<div class="item"><img src="'+images+'"><div class="carousel-caption">'+value.Photo_Caption+'</div></div>').appendTo('.carousel-inner');
              $('<li data-target="#carousel-example-generic"></li>').appendTo('.carousel-indicators')
            }
          });
          $('.item').first().addClass('active');
      }else{
        $(".sitename").text("")
        $(".sitecode").text("")
        $(".site-descript").text("No sounds for this site");
      }


}; //end update site



function upDateSpectro(data){
  //console.log("Data passed is "+data);
  //console.log(data);
  $( "#intro" ).css('border-right', 'solid 1px red');
  $( "#intro" ).remove();
  $("#progressWrapper").css({'width':0});
  $('div#progressWrapper').css('border-right', 'solid 1px red');
  $("#buttonGroup").empty();
  var playhead = document.getElementById('playhead');
  playhead.style.marginLeft = "0px";
  $('#vis').scrollLeft(0);

  //get audio
  var source = $('#audio').attr("src");
  var audio = document.getElementById('audio');

  if(data.length != 0){

    $('#audio').attr("src", "/sounds/"+data[0].Sound_File);
    $("#imageColor").attr("src","images/"+data[0].Spectro_File);
    $("#imageGrey").attr("src","images/"+data[0].Grey_File);
    $('.large').css('backgroundImage','url(images/'+data[0].Spectro_File+')');
    var count=1;
    $.each(data, function( key, value ) {
      var info = value
      //console.log(info);
      var b = $('<input />', { type: "radio", name:"options", id:"option1", text:"Sound 1",
       class:"soundButton", autocomplete:"off"})
      $("#buttonGroup").append($('<label />', { text: value.Sound_Name, id: "sound"+count, class: "btn btn-primary" }).on("click",function(){
        $("#progressWrapper").css({'width':0});
        $('#audio').attr("src", "/sounds/"+info.Sound_File);
        $("#imageColor").attr("src","images/"+info.Spectro_File);
        $("#imageGrey").attr("src","images/"+info.Grey_File);
        $('.large').css('backgroundImage','url(images/'+info.Spectro_File+')');
        var playhead = document.getElementById('playhead');
        playhead.style.marginLeft = "0px";
        $('#vis').scrollLeft(0);
        updateMarkers(info.Marker);

      }).append(b));
      if(count ==1){
        $("#sound1").addClass("active");
        updateMarkers(info.Marker);
        count++;
      }
    });
  }


};//end upDateSpectro

//marker function
function updateMarkers(m){
  //width/time = px per sec
  var width =  $("#timeline").width();
  var audio = document.getElementById("audio");

  audio.oncanplaythrough = function() {
  $( "#marker" ).remove();
  var d = audio.duration;
  var ratio = width/d;
  var bookmark = m*60;
  //console.log(d);
  //console.log(audio);
  //console.log("Ratio is"+ratio);
  var moveto = bookmark*ratio;
  //duration is in seconds, so if do markers in minutes, need to multiply
  $("#timeline").append('<div id="marker"><span class="glyphicon glyphicon-asterisk" aria-hidden="true"></span></div>');
  var marker= document.getElementById('marker');
  marker.style.marginLeft = moveto+"px";
}

}


//sets up grte map
var grteMap = L.map('mapGrte', {
    center: [43.79, -110.68],
    zoom: 10
});
L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(grteMap);
