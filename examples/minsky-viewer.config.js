(function() {
    "use strict";
      BrainBrowser.config.set("worker_dir", "js/brainbrowser/workers/");
    
    // Custom configuration for the Volume Viewer demo app.
    BrainBrowser.config.set("color_maps", [
      {
        name: "Spectral",
        url: "color-maps/spectral-brainview.txt",
        cursor_color: "#FFFFFF"
      },
      {
        name: "Thermal",
        url: "color-maps/thermal.txt",
        cursor_color: "#FFFFFF"
      },
      {
        name: "Gray",
        url: "color-maps/gray-scale.txt",
        cursor_color: "#FF0000"
      },
      {
        name: "Blue",
        url: "color-maps/blue.txt",
        cursor_color: "#FFFFFF"
      },
      {
        name: "Green",
        url: "color-maps/green.txt",
        cursor_color: "#FF0000"
      }
    ]);
      
  })();
  