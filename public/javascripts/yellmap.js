var markers;
//load csv files for maps, csv includes both parks
d3.csv("/data/Soundscapes.csv", function(loadedRows) {
  markers = loadedRows;
  markers.forEach(function(d) {
    marker = new L.marker([d.lat, d.lng])
				.bindPopup(d.Site_Name)
        .on("click",function(){
          console.log("Clicked!");
          $.post('/getSite', {site: d.Site_Name}, function(data){
                upDateSite(data);
                console.log(data);
          });
        })
				.addTo(yellMap);
  });

});

function upDateSite(data){
    $(".sitename").text(data.Site_Name)
    $(".sitecode").text(data.Site_Code)
    console.log("Response is "+data.Site_Name);
};


var yellMap = L.map('mapYell', {
    center: [44.47, -110.58],
    zoom: 8
});
L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3']
}).addTo(yellMap);
