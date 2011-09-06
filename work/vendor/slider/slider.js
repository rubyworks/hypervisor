$(document).ready(function() {

  // unordered list's left margin
  var ulPadding = 40;

  //Get our elements for faster access and set overlay width
  var sliders = $('div.slider');

  sliders.each(function(index, divElement) {
    //Remove scrollbars
    //div.css({overflow: 'hidden'});

    //ul = div.find('ul.slider');

    //When user move mouse over menu
    $(divElement).mousemove(function(e){



      var div    = $(this);
      var ul     = div.find('ul.slider');
      var lastLi = ul.find('li:last-child');  //Find last container

      //Get menu width
      var divWidth = div.width();

      //As images are loaded ul width increases,
      //so we recalculate it each time
      var ulWidth = lastLi[0].offsetLeft + lastLi.outerWidth();
          //ulWidth = ulWidth + (ulWidth * 0.05);
      //ul.width(ulWidth + ulPadding);

      var left = ((e.pageX - div.offset().left) * ulWidth / divWidth);

      div.scrollLeft(left);
    });

  });

});

