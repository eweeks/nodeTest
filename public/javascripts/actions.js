//bootstrap popover
$(function () {
  $('[data-toggle="popover"]').popover()
})

//list sort
var options = {
    valueNames: [ 'soundName', 'siteCode', 'tags' ]
};

var soundsList = new List('soundsList', options);

$('#filter-none').click(function() {
  soundsList.filter();
  return false;
});

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
});

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
});


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
