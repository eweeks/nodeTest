//bootstrap popover
$(function () {
  $('[data-toggle="popover"]').popover()
})

//list sort
var options = {
    valueNames: [ 'soundName', 'siteCode', 'tags', 'unitCode', 'siteName' ]
};

var soundsList = new List('soundsList', options);
var activeFilters = [];

//filters for tags
    $('.tags').change(function() {
        var isChecked = this.checked;
        var value = $(this).data("value");

		if(isChecked){
			//  add to list of active filters
			activeFilters.push(value);
		}
		else
		{
			// remove from active filters
			activeFilters.splice(activeFilters.indexOf(value), 1);
		}

		soundsList.filter(function (item) {
    //  console.log(activeFilters);
      var t = false;
      var item = item.values().tags
      item = item.toLowerCase()
      console.log(item);
			if(activeFilters.length > 0){

        var f;
        activeFilters.forEach(function(i) {
            //console.log("array has "+i);
              if (item.indexOf(i) != -1){
               console.log("array has "+i);
              console.log("has! "+item.indexOf(i));
                t = true;
                //console.log("t is "+t)
                //return true;
              }
              //  console.log("t is 2 "+t);
                //return false;

          });
          if(t == true){
            console.log("true");
            return true;
          }else{
              console.log("false");
              return false;

          }

			}else{
          soundsList.filter();
      }

		});
});


$('#filter-none').click(function() {
  soundsList.filter();
  $('.checkbox').find('input[type=checkbox]:checked').removeAttr('checked');
  return false;
});
/*
//this works... but one filter at a time..
$('.tags').change(function() {
  var isChecked = this.checked;
  var value = $(this).data("value")
  console.log(value);
    if(isChecked){
      soundsList.filter(function(item) {
        var item = item.values().tags
        item = item.toLowerCase()
        activeFilters.push(value);
        if (item.indexOf(value) !== -1 ) {
            console.log("True "+ activeFilters.indexOf(value));
            console.log(activeFilters);
          return true;
        } else {
          return false;
        }
      });
      return false;
  }else{
    soundsList.filter();
  }
});

*/
/*
//check box switch
//filter
$('.tags').change(function() {
    //console.log("checked");
    var isChecked = this.checked;
    console.log("checked "+isChecked);
    var value = $(this).data("value");

if(isChecked){
  //  add to list of active filters
    console.log("value is "+value);
    activeFilters.push(value);
}

soundsList.filter(function(item) {
  var item = item.values().tags
  item = item.toLowerCase()
  if (activeFilters.indexOf(value) > -1 ) {
    console.log("value is "+value);
    console.log("active filters are  "+activeFilters);
    console.log("index is  "+activeFilters.indexOf(value));
    return true;
  } else {
    return false;
  }
});
  return false;

});*/
/*soundsList.filter(function (item) {
  console.log("Filters are "+activeFilters);
  if (activeFilters.indexOf(value) !== -1 ) {
    console.log("value is "+value);
    console.log("active filters are  "+activeFilters);
    return true;
  } else {
    return false;
  }
/*  if(activeFilters.length > 0)
  {
    var item = item.values().tags
    item = item.toLowerCase()
    console.log(activeFilters.indexOf('bird'));

    if (item.indexOf(activeFilters) !== -1 ) {
        var f = activeFilters;
        console.log("search for "+f);
    }

    return(activeFilters.indexOf(f)) > -1;
  }*/
/*  return true;
});
 });*/




/*
$('#filter-bird').change(function() {
  var isChecked = this.checked;
    if(isChecked){
      soundsList.filter(function(item) {
        var item = item.values().tags
        item = item.toLowerCase()
        if (item.indexOf("bird") !== -1 ) {
          return true;
        } else {
          return false;
        }
      });
      return false;
  }else{
    soundsList.filter();
  }
});//end bird*/
/*
$('#filter-wildlife').change(function() {
  var isChecked = this.checked;
    if(isChecked){
      soundsList.filter(function(item) {
        var item = item.values().tags
        item = item.toLowerCase()
        if (item.indexOf("wildlife") !== -1 ) {
          return true;
        } else {
          return false;
        }
      });
      return false;
  }else{
    soundsList.filter();
  }
});//end wildlife*/


//testing typeahead feature.. just issues with caching..
/*$('#search').typeahead({
    name: 'typeahead',
    remote: '/searchlist?key=%QUERY',
    limit: 10
});*/

/*
$(document).ready(function(){
$('#type').typeahead([
{
name: 'planets',
local: [ "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune" ]
}

]);
});*/
/*var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

$('#type').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'states',
  source: substringMatcher(states)
}).on('typeahead:select', submitSuggestion)
.on('typeahead:autocomplete', submitSuggestion)
.on('keydown', function (event) {
  if (event.which === 13) {
    $('#getSearch').submit();
  }
})

function submitSuggestion(ev, suggestion) {
      $('#getSearch').submit();    // submit the form
    }*/
