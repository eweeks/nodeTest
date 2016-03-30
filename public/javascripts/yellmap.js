var NPMap = {
 center: {
   lat: 44.47,
   lng: -110.58
 },
 div: 'mapYell',
 overlays: [{
   events: [{
   fn: function() {
     var site = '{{Site_Name}}'
     console.log(site);
     $.post('/getSite', {site: site}, function(data){
             upDateSite(data);
             console.log(data);
       });
   },
   type: 'click'
 }],
   styles: {
      point: {
        'marker-color': '#5e9fd5',
        'marker-size': 'medium',
      }
    },
   popup: {
     title: '{{Site_Name}}'
   },
   type: 'csv',
   url: '/data/Soundscapes.csv'
 }],
 zoom: 9
};

(function () {
 var s = document.createElement('script');
 s.src = 'http://www.nps.gov/lib/npmap.js/2.0.0/npmap-bootstrap.js';
 document.body.appendChild(s);
})();

function upDateSite(data){
  console.log(data);
    $(".sitename").text(data.Site_Name)
    $(".sitecode").text(data.Site_Code)
    console.log("Response is "+data.Site_Name);
};


/*var markers;
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
}).addTo(yellMap);*/
