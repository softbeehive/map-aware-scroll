$(function() {
  var geo = function() {
    // initialize map
    var map;
    var init = function() {
      L.mapbox.accessToken = 'pk.eyJ1Ijoic29mdGJlZWhpdmUiLCJhIjoiY2ltZmk0YWNxMDA1N3Z6a2tuMDFxZmZ6YiJ9.uI1vI4UsOTjFGYR5EQuI3w';
      map = L.mapbox.map('awesome-map', 'mapbox.streets').setView([40, -74.50], 9);
    };

    // There is a common issue when scrolling page with map that translates
    // scroll into zoom once cursor reaches the map element. This is pretty
    // confusing for the user and causes significant traffic leaks.

    // This solution deactivates map zoom on scroll if there is ongoing page
    // scroll. It waits n miliseconds (pause) and then enables zoom on scroll.
    // Why 600 ms? Avg. human reaction time is ~200 ms. So reaction on page
    // movement ~200 ms + cursor position correction ~200ms + reaction on click
    // or tap ~200 ms. This approximation does not cover all cases but based on
    // common behavour pattern.
    var mapAwareScroll = function() {
      var pause = 600,
          times = 0,
          timer;

      // Post timer callback, enable scrollWheelZoom
      function scrollStoped() {
        map.scrollWheelZoom.enable();
        times = 0;
      }

      // Scroll listener
      $(window).on('scroll', function() {
        times++;
        clearTimeout(timer);
        timer = setTimeout(scrollStoped, pause);
        // Disable scrollWheelZoom once scroll started
        // One disable per scrolling cycle
        if (times === 1) {
          map.scrollWheelZoom.disable();
        }
      });
    };

    // geo public methods
    return {
      init: init,
      mapAwareScroll: mapAwareScroll
    };
  }();

  geo.init();
  geo.mapAwareScroll();
});
