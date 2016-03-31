# Map Aware Page Scroll
**Technique to prevent map zooming when scrolling the page**

There is a common issue when scrolling page with map that translates scroll into zoom once cursor reaches the map element. This is pretty
confusing to user and causes significant traffic leaks.

This technique is overcoming conflict between map zooming and page scroll. It deactivates map zoom on page scroll and activates it again once scroll cycle is over. Current implementation is specific to Mapbox or Leaflet maps.

Having general idea it is so much easier to build absctract implementation.
