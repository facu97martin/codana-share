// skip this line if you are importing markerjs2 into the global space via the script tag
import * as markerjs2 from 'markerjs2';

// create an instance of MarkerArea and pass the target image reference as a parameter
let markerArea = new markerjs2.MarkerArea(document.getElementById('myimg'));

// register an event listener for when user clicks OK/save in the marker.js UI
markerArea.addEventListener('render', event => {
  // we are setting the markup result to replace our original image on the page
  // but you can set a different image or upload it to your server
  document.getElementById('myimg').src = event.dataUrl;
});

// finally, call the show() method and marker.js UI opens
markerArea.show();