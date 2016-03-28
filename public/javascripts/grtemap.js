var markers;
//load csv files for maps, csv includes both parks
d3.csv("/data/Soundscapes.csv", function(loadedRows) {
  markers = loadedRows;
  markers.forEach(function(d) {
    marker = new L.marker([d.lat, d.lng])
				.bindPopup(d.Site_Name)
        .on("click",function(){
          console.log("Clicked! " + d.Site_Name);
          $.post('/getSite', {site: d.Site_Name}, function(data){
                upDateSite(data);
                console.log(data);
          });

        })
				.addTo(grteMap);
  });

});

function upDateSite(data){
    $(".sitename").text(data.Site_Name)
    console.log("Response is "+data.Site_Name);
};

var grteMap = L.map('mapGrte', {
    center: [43.79, -110.68],
    zoom: 10
});
L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(grteMap);
