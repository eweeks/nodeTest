//bootstrap popover
$(function () {
  $('[data-toggle="popover"]').popover()
})

//Index page image modual
/*$("#popYellMap").on("click", function() {
   $('#imagepreview').attr('src', $('#imageYellMap').attr('src')); // here asign the image to the modal when the user click the enlarge link
   $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
});*/
$('.pop').on('click', function() {
  $('.imagepreview').attr('src', $(this).find('img').attr('src'));
  $('#imagemodal').modal('show');
});	


//background scroll on cover page

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
    valueNames: [ 'soundName', 'siteCode', 'tags', 'siteName', 'season' ]
};

var soundsList = new List('soundsList', options);
var activeFilters = [];

//filters for tags
    $('.tags').change(function() {
        var isChecked = this.checked;
        var value = $(this).data("value");
        //$('input.example').not(this).prop('checked', false);
        $('#filter-none').prop('checked', false);
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
      //console.log("active filters");
      //console.log(item);
      var t = false;
      var item = item.values().tags
      item = item.toLowerCase()
      //console.log(item);
      //pass t and item..
      return updateFilters(t, item);

		});//end sounds filter
});//end tags change

  function updateFilters(t, item){
    //console.log("UpdateFilters");
    //console.log("active filters");
    //console.log(item);
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


/*filter-none').click(function() {
  soundsList.filter();
  $('.checkbox').find('input[type=checkbox]:checked').removeAttr('checked');
  activeFilters = [];
  return false;
});*/

$('#filter-none').change(function() {
  console.log("changed");
  var isChecked = this.checked;
  //var value = $(this).data("value");
    if(isChecked){
      soundsList.filter();
      $('.checkbox').find('input[type=checkbox]:checked').removeAttr('checked');
      activeFilters = [];
      return false;
    }else{
      //soundsList.filter();
      console.log('not checked');
      var value = $(this).data("value");
      activeFilters.push(value);
      soundsList.filter(function (item) {
      console.log("Filtering");
        var t = false;
        var item = item.values().tags
        item = item.toLowerCase()
        console.log(item);
        //pass t and item..
        return updateFilters(t, item);

      });
      //soundsList.filter();
      //updateFilters(false, item)
      //$('.tags').trigger("change");
      //return true;
      //return updateFilters(true, 'none');
    }
});

//accordion collapse
$('.soundItem').click(function() {
  console.log('active');
  $(this).toggleClass('active');
  $(this).toggleClass('closed');
  $('li.active').not(this).each(function(){
      var look = $(this).find(".accordion-body");
      look.collapse('toggle');
      $(this).toggleClass('active');
  });
});

function toggleAccord(){

};


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
     Tag:"elk"
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
     Tag:"geyser"
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
