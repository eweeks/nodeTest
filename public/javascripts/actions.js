//bootstrap popover
$(function () {
  $('[data-toggle="popover"]').popover()
})

//Popover
var elem = '<div id="popText"><p>Spectrograms are visual representations of sounds.</p><p> Time is represented on the x-scale, going left to right, \
and frequency or pitch is shown on the y-scale from low to high pitch. Color on a spectrogram reflects the volume with blue \
being the softest and white being the loudest.</p> \<p onclick="SeeEx();" id="SeeEx">What can you learn from a spectrogram?</p> </div>';

$('#SpectroWhat').popover({animation:true, content:elem, html:true});

function SeeEx() {
  //console.log("click Ex");
  $("#popText").empty();
    $("#popText").append($('<p>Sounds have a unique signature in a spectrogram. \
    Most animals use certain frequencies and patterns in their calls, and even mechanical noises have a specific pattern. Spectrograms are important in soundscape research, because of how easy it is to identify the source. \
    <div class="gallery"><figure><img id=""src="images/FrogsSpet.png" /><figcaption>Frogs</figcaption></figure>  \
    <figure><img id=""  src="images/BirdsSpect.png" /><figcaption>Birds</figcaption></figure>\
    <figure><img src="images/SpectVehicle.png"> <figcaption>Vehicle</figcaption></figure>\
    </br><p onclick="back();" id="back">Back</p>\
</div>    '));
};

function back(){
  $("#popText").empty();
    $("#popText").append($('<div id="popText"><p>Spectrograms are visual representations of sounds.</p><p> Time is represented on the x-scale, going left to right, \
    and frequency or pitch is shown on the y-scale from low to high pitch. Color on a spectrogram reflects the volume with blue \
    being the softest and white being the loudest.</p> \<p onclick="SeeEx();" id="SeeEx">What can you learn from a spectrogram?</p> </div>'));
}

//Index page image modual

$('.pop').on('click', function() {
  $('.imagepreview').attr('src', $(this).find('img').attr('src'));
  $('#imagemodal').modal('show');
});

//accordion
$('.accordion').on('show', function (e) {
      console.log("show");
     $(e.target).prev('.accordion-heading').find('.accordion-toggle').addClass('adding');
});


$('.accordion').on('hidden.bs.collapse', function (e) {

    $(".progressWrapper").css({'width':0});
    var audio = document.getElementsByClassName('audio');

    $('audio').each(function(i, obj) {
        obj.currentTime = 0;
        obj.pause();
    });

    $(".visList").scrollLeft(0);
    //$(e.target).find('.accordion-inner').find('.listSpectro').empty();
    // $(e.target).prev('.accordion-heading').find('.accordion-toggle').addClass('adding');
});

//play/pause on cover sound

$('#audioControl').on('click', function() {
  var yourAudio = document.getElementById('coverAudio'),
      ctrl = document.getElementById('coverSound');

if(ctrl.className == "glyphicon glyphicon-play") {
        ctrl.className="glyphicon glyphicon-pause";
       yourAudio["play"]();
}
else if (ctrl.className == "glyphicon glyphicon-pause"){

     ctrl.className="glyphicon glyphicon-play";
    yourAudio["pause"]();

}
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

$(window).scroll(function() {
  var $window = $(window);
    var windowHeight = $window.height();
  var pos = $window.scrollTop();
  $(".list-holder").css({"transform":"translateY(" +  (pos/1.3)  + "px)",
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
        if($('.tags:checked').length < 1){
            $('#filter-none').prop('checked', true);
        }else{
            $('#filter-none').prop('checked', false);
        }

        //$('li.active').find(".accordion-body").collapse('toggle');
        //$('li.active').removeClass('open').removeClass('active');
        $('a.active').parents().next(".accordion-body").collapse('toggle');
        $('a.active').parents('li').removeClass('open');
        $('a.active').removeClass('active');
        //$('#filter-none').prop('checked', false, $('.tags:checked').length == 0);


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
  $('a.active').parents().next(".accordion-body").collapse('toggle');
  $('a.active').parents('li').removeClass('open');
  $('a.active').removeClass('active');
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
/*$('.accordion-toggle').click(function() {
  console.log('active');
  $(this).toggleClass('active');
  var parent = $(this).parents('li').first();
  parent.toggleClass('open');
  $('a.active').not(this).each(function(){
      //$(this).removeClass('active');
      $(this).removeClass('open');

  });

});*/

//accordion collapse
$('.soundItem').click(function() {
  console.log('active');
  $(this).toggleClass('active');
  $(this).toggleClass('closed');
  var parent = $(this).parents('li').first();
  parent.toggleClass('open');
  $('a.active').not(this).each(function(){
      //$(this).removeClass('active');
      var parent = $(this).parents('li').first();
      parent.removeClass('open');

      var look = $(this).parent().next(".accordion-body");
      look.collapse('toggle');
      $(this).removeClass('active');

  });
  /*$('a.active').not(this).each(function(){
      var look = $(this).next(".accordion-body");
      look.collapse('toggle');
      $(this).removeClass('active');
      //$(this).removeClass('open');

  });*/
});



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
