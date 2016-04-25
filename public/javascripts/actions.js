//bootstrap popover
$(function () {
  $('[data-toggle="popover"]').popover()
})

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

//background scroll
//var windowHeight = $window.height();

$(window).scroll(function() {
  var $window = $(window);
    var windowHeight = $window.height();
  var pos = $window.scrollTop();
  $(".coverImage").css({"transform":"translateY(" +  (pos/3)  + "px)",
    "transition": "transform .1s ease-out"
  });
  //$(".background").css({'backgroundPosition':newPos(0, windowHeight, pos, 400, 0.5)});
});

  //var windowHeight = $window.height();


function newPos(x, windowHeight, pos, adjuster, inertia){
return x + "% " + (-((windowHeight + pos) - adjuster) * inertia)  + "px";
}

function moveScroll(){
  var pos = $window.scrollTop();
}



//list sort
var options = {
    valueNames: [ 'soundName', 'siteCode', 'tags', 'unitCode', 'siteName', 'season' ]
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
      //console.log(item);
      //pass t and item..
      return updateFilters(t, item);

		});//end sounds filter
});//end tags change

  function updateFilters(t, item){
    console.log("UpdateFilters");
    if(activeFilters.length > 0){
      var f;
      activeFilters.forEach(function(i) {
          //console.log("array has "+i);
            if (item.indexOf(i) != -1){
            // console.log("array has "+i);
            //console.log("has! "+item.indexOf(i));
              t = true;
              //console.log("t is "+t)
              //return true;
            }
            //  console.log("t is 2 "+t);
              //return false;

        });
        if(t == true){
          //console.log("true");
          return true;
        }else{
          //  console.log("false");
            return false;

        }

    }else{
        soundsList.filter();
    }

};//end updateFilters


$('#filter-none').click(function() {
  soundsList.filter();
  $('.checkbox').find('input[type=checkbox]:checked').removeAttr('checked');
  activeFilters = [];
  return false;
});


//testing typeahead feature..
/*$('input.typeahead').typeahead({
name: 'typeahead',
remote: 'http://localhost:3000/tsearch?key=%QUERY',
limit: 10
});*/

/*var tsearch = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
   url: 'http://localhost:3000/tsearch?key=%QUERY',
   wildcard: '%QUERY'
 }

});
*/
/*
var substringMatcher = function(strs) {
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


var tags = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
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
},{
  name: 'tags',
  display: 'value',
  source: substringMatcher(tags)
});
*/

var tsearch = new Bloodhound({
    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.Tag); },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
local: [
  {
     Tag:"Jackson Lake Dollar Island"
  },
  {
     Tag:"Lower Berry Cabin"
  },
  {
     Tag:"Moose Wilson Road"
  },
  {
     Tag:"Gros Ventre Campground East"
  },
  {
     Tag:"Jackson Hole Airport Lek"
  },
  {
     Tag:"Grand Teton Summit"
  },
  {
     Tag:"Moose Pond"
  },
  {
     Tag:"Potholes West"
  },
  {
     Tag:"Phelps Lake Jump Rock"
  },
  {
     Tag:"Bechler"
  },
  {
     Tag:"Fountain Paint Pots"
  },
  {
     Tag:"Grant Village Lewis Lake"
  },
  {
     Tag:"Middle Barronette Meadow"
  },
  {
     Tag:"Madison Junction"
  },
  {
     Tag:"Old Faithful Weather Station"
  },
  {
     Tag:"Grand Teton"
  },
  {
     Tag:"Yellowstone"
  },
  {
     Tag:"birds"
  },
  {
     Tag:"wildlife"
  },
  {
     Tag:"storm"
  },
  {
     Tag:"elks"
  },
  {
     Tag:"thunder"
  },
  {
     Tag:"Jackson"
  },
  {
     Tag:"moose"
  },
  {
     Tag:"wolves"
  },
  {
     Tag:"rain"
  },
  {
     Tag:"planes"
  },
  {
     Tag:"summer"
  },
  {
     Tag:"winter"
  },
  {
     Tag:"fall"
  },
  {
     Tag:"spring"
  },
  {
     Tag:"water"
  },
  {
     Tag:"Geyser"
  },
  {
     Tag:"wind"
  },
  {
     Tag:"elk"
  }]
});

// initialize the bloodhound suggestion engine
tsearch.initialize();

// instantiate the typeahead UI
$('#type').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
displayKey: 'Tag',
source: tsearch.ttAdapter()
});


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
