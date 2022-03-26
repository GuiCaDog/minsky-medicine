/*
* BrainBrowser: Web-based Neurological Visualization Tools
* (https://brainbrowser.cbrain.mcgill.ca)
*
* Copyright (C) 2011
* The Royal Institution for the Advancement of Learning
* McGill University
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the
* License, or (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
* Author: Tarek Sherif <tsherif@gmail.com> (http://tareksherif.ca/)
* Author: Nicolas Kassis
*/

// This script is meant to be a demonstration of how to
// use most of the functionality available in the
// BrainBrowser Surface Viewer.
$(function() {
  "use strict";

  var THREE = BrainBrowser.SurfaceViewer.THREE;
  var atlas_labels = {};

  // Request variables used to cancel the current request
  // if another request is started.
  var current_request = 0;
  var current_request_name = "";

  // Hide or display loading icon.
  var loading_div = $("#loading");
  function showLoading() { loading_div.show(); }
  function hideLoading() { loading_div.hide(); }


  // Make sure WebGL is available.
  if (!BrainBrowser.WEBGL_ENABLED) {
    $("#brainbrowser").html(BrainBrowser.utils.webGLErrorMessage());
    return;
  }

  $.get("models/atlas-labels.txt", function(data) {
    var lines = data.split("\n");
    var regex = /'(.+)'\s+(\d+)/;

    lines.forEach(function(line) {
      var match = line.match(regex);
      if (match) {
        atlas_labels[match[2]] = match[1];
      }
    });
  });

  /////////////////////////////////////
  // Start running the Surface Viewer
  /////////////////////////////////////
	BrainBrowser.SurfaceViewer.start("brainbrowser1", function(viewer) {

    //Add an event listener.
    viewer.addEventListener("displaymodel", function() {
      console.log("We have a model!");
    });

    // Start rendering the scene.
    viewer.render();

    // Load a model into the scene.
    //viewer.loadModelFromURL("/models/brain_surface.obj");
    viewer.annotations.setMarkerRadius(1);
    viewer.loadModelFromURL("models/brain-surface.obj", {
      format: "mniobj",
      complete: function() {
        $("#vertex-data-wrapper").show();
        $("#pick-value-wrapper").show();
        $("#pick-label-wrapper").show();
      },
      parse: { split: true }
    });

    // Hook viewer behaviour into UI.
    $("#wireframe").change(function(e) {
      viewer.setWireframe($(this).is(":checked"));
    });

  }); 

});

