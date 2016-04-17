//loadStats();
var completeDataSet;
var max =0;
function loadStats(obj, callback) {

	d3.json("/sounds/LowerBerry_5minShort.mp3.json", function(error, data){
		completeDataSet= data;
		//console.log(completeDataSet);
		//sets keys, array of station names
	//	keys = Object.keys(data);
	//	keys.forEach(function(d, i){
			//console.log("testing");
			//console.log(d.i);
			//if data has info
		//	if(data[d].length>=1){
				//gets max sum for all stations
				//if(data[d][0].sum > max){
			//		max=data[d][0].sum;
			//	}
			//}
		//});
		//console.log("LoadStats");
    //console.log(completeDataSet);
    //return completeDataSet;
    //call function here to set up visual?
    doSomething(completeDataSet, obj);
    if (callback) {
      callback();
    }
	});
  //console.log(obj);
  //return completeDataSet;

}

function doSomething(dataSet, obj){
  //console.log("Something");
//  console.log(dataSet);
  dataSet.forEach(function(d) {
    //for(var i = 0; i < dataSet.length - 1; i++) {
      //var v = d.values[i];
			var arr = $.map(d.values, function(el) { return el });
      //console.log(d);
			d.values = arr;
		//	console.log(d.values);
      //var d = {'values': new Uint8Array(v)};
      obj.data.push(d);

    //}
    //console.log(dataSet.length);//length 501
  });
  //console.log(obj);
}

/*function do2(d){
  console.log("Something");
  console.log(d);
}*/
