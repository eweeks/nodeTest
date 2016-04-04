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
                //upDateSpectro(data);
                //console.log(data);
                $.post('/getSounds', {site: d.Site_Code}, function(data){
                     console.log("hit post");
                     upDateSpectro(data);
                     console.log(data);
                });
          });

        })
				.addTo(grteMap);
  });

});

function upDateSite(data){
   console.log(data);
   $("#photos-holder").empty();
   $(".carousel-indicators").empty();
   if (data.length > 1) {
        $(".sitename").text(data[0].Site_Name)
        $(".sitecode").text(data[0].Site_Code)
        //empty photo slider

        //console.log(data[0].Site_Description);
        $(".site-descript").text(data[0].Site_Description);
        //loops through data, adds photos to slider
        $.each(data, function( key, value ) {
          //  console.log(value.Photo_File); .site-descript
            var images = "images/"+value.Photo_File;
            if(value.Photo_File.length>4){
              console.log("Add");
              $('<div class="item"><img src="'+images+'"><div class="carousel-caption">'+value.Photo_Caption+'</div></div>').appendTo('.carousel-inner');
              $('<li data-target="#carousel-example-generic"></li>').appendTo('.carousel-indicators')
            }
          });
          $('.item').first().addClass('active');
          console.log("Response is "+data[0].Site_Name);
      }else{
        $(".sitename").text("")
        $(".sitecode").text("")
        $(".site-descript").text("No sounds for this site");
      }


}; //end update site

function upDateSpectro(data){
  console.log("Data passed is "+data);
  console.log(data);

  $("#progressWrapper").css({'width':0});
  $("#buttonGroup").empty();
  var playhead = document.getElementById('playhead');
  playhead.style.marginLeft = "0px";
  $('#vis').scrollLeft(2);

  //get audio
  var source = $('#audio').attr("src");
  var audio = document.getElementById('audio');
  //var source = audio.src;
  console.log(audio);
  console.log(source);
  if(data.length > 1){
    console.log("I have data");
    console.log(data[0].Sound_File);
    $('#audio').attr("src", "/sounds/"+data[0].Sound_File);
    $("#imageColor").attr("src","images/"+data[0].Spectro_File);
    $("#imageGrey").attr("src","images/"+data[0].Grey_File);
    var count=1;
    $.each(data, function( key, value ) {
      var info = value
      console.log(info);
      var b = $('<input />', { type: "radio", name:"options", id:"option1", text:"Sound 1",
       class:"soundButton", autocomplete:"off"})
      $("#buttonGroup").append($('<label />', { text: value.Sound_Name, id: "sound"+count, class: "btn btn-primary" }).on("click",function(){
        console.log("clicked button");
        console.log(info.Sound_File);
        $("#progressWrapper").css({'width':0});
        $('#audio').attr("src", "/sounds/"+info.Sound_File);
        $("#imageColor").attr("src","images/"+info.Spectro_File);
        $("#imageGrey").attr("src","images/"+info.Grey_File);

      }).append(b));
      if(count ==1){
        $("#sound1").addClass("active");
        count++;
      }
    });
  }

};//end upDateSpectro

//sets up grte map
var grteMap = L.map('mapGrte', {
    center: [43.79, -110.68],
    zoom: 10
});
L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(grteMap);
