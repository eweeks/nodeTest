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
                console.log(data);
          });

        })
				.addTo(grteMap);
  });

});

function upDateSite(data){
    $(".sitename").text(data[0].Site_Name)
    $(".sitecode").text(data[0].Site_Code)
    //empty photo slider
    $("#photos-holder").empty();
    //loops through data, adds photos to slider
    $.each(data, function( key, value ) {
      //  console.log(value.Site_Name);
      //  console.log(value.Photo_File);
        var images = "images/"+value.Photo_File;
        if(value.Photo_File.length>4){
          console.log("Add");
          $('<div class="item"><img src="'+images+'"><div class="carousel-caption"></div></div>').appendTo('.carousel-inner');
          $('<li data-target="#carousel-example-generic"></li>').appendTo('.carousel-indicators')
        }
      });

    console.log("Response is "+data[0].Site_Name);
};

var grteMap = L.map('mapGrte', {
    center: [43.79, -110.68],
    zoom: 10
});
L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(grteMap);
