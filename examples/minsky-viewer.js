$(function () {
	"use strict";

	$(".button").button();

	//Inicio del viewer
	BrainBrowser.VolumeViewer.start(
		"brainbrowser",
		function (viewer) {	 
			
			// Set the size of slice display panels.
			$("#brainbrowser-wrapper").css("width", "90%");
			$("#volume-viewer").css("width", "100%");
			$("#brainbrowser").css("width", "100%");
			
			
			// Tamaño inicial por defecto (un medio de la altura de la ventana)
			var height = window.innerHeight / 2.1;
			viewer.setDefaultPanelSize(height, height);

			// Load the default color map.
			// (Second argument is the cursor color to use).
			var color_map_config = BrainBrowser.config.get("color_maps")[0];
			viewer.loadDefaultColorMapFromURL(color_map_config.url, "#FF0000");
			
			// Event listener para resize de la ventana.
			window.addEventListener('resize', () => {
				height = window.innerHeight / 2.1;
				viewer.setPanelSize(height, height, { scale_image: true });
			}, false);

			// Event listener para cuando ha cargado.
			viewer.addEventListener("volumesloaded", function (event) {
				console.log(viewer);
				var d = viewer.volumes[0].display;
				console.log(d);
				//viewer.volumes[0].header.order = ['yspace', 'xspace', 'zspace'];
				//viewer.volumes[0].display.setBrightness(0.0);
				//viewer.volumes[0].display.setPanel("xspace",d.getPanel("yspace"));
				//viewer.volumes[0].display.setPanel('yspace',d.getPanel("zspace"));
				//viewer.volumes[0].display.refreshPanels();
				//console.log(viewer.volumes[0].header.order);
				
				//viewer.redrawVolumes();
				console.log(event);
				//console.log("volume2", volume.display.getPanel("xspace").setPanelSize(1024,1024));
				console.log("Viewer is ready!");
				//viewer.clearVolumes();
				});

			// Renderiza el viewer.
			viewer.render();
			
			// Carga las imagenes
			viewer.loadVolumes({
				volumes: [
				{
				type: "minc",
				header_url: "models/structural1.mnc.header",
				raw_data_url: "models/structural1.mnc.raw",
				template: {
					element_id: "volume-ui-template",
					viewer_insert_class: "volume-viewer-display",
				},
				},
			],
			overlay: {
				template: {
				element_id: "overlay-ui-template",
				viewer_insert_class: "overlay-viewer-display",
				},
			},
			complete: function () {
				//loading_div.hide();
				$("#brainbrowser-wrapper").slideDown({ duration: 600 });
			},
			});

		}
	)
	//var canv= document.getElementById("surface-display");

	
	/*BrainBrowser.VolumeViewer.start(
		"brainbrowser",
		function (viewer) {	 
			
			// Set the size of slice display panels.
			$("#brainbrowser-wrapper").css("width", "90%");
			$("#volume-viewer").css("width", "100%");
			$("#brainbrowser").css("width", "100%");
			
			
			// Tamaño inicial por defecto (un medio de la altura de la ventana)
			var height = window.innerHeight / 2.1;
			viewer.setDefaultPanelSize(height, height);

			// Load the default color map.
			// (Second argument is the cursor color to use).
			var color_map_config = BrainBrowser.config.get("color_maps")[0];
			viewer.loadDefaultColorMapFromURL(color_map_config.url, "#FF0000");
			
			// Event listener para resize de la ventana.
			window.addEventListener('resize', () => {
				height = window.innerHeight / 2.1;
				viewer.setPanelSize(height, height, { scale_image: true });
			}, false);

			// Event listener para cuando ha cargado.
			viewer.addEventListener("volumesloaded", function (event) {
				console.log(viewer);
				var d = viewer.volumes[0].display;
				console.log(d);
				//viewer.volumes[0].header.order = ['yspace', 'xspace', 'zspace'];
				//viewer.volumes[0].display.setBrightness(0.0);
				//viewer.volumes[0].display.setPanel("xspace",d.getPanel("yspace"));
				//viewer.volumes[0].display.setPanel('yspace',d.getPanel("zspace"));
				//viewer.volumes[0].display.refreshPanels();
				//console.log(viewer.volumes[0].header.order);
				
				//viewer.redrawVolumes();
				console.log(event);
				//console.log("volume2", volume.display.getPanel("xspace").setPanelSize(1024,1024));
				console.log("Viewer is ready!");
				//viewer.clearVolumes();
				});

			// Renderiza el viewer.
			viewer.render();
			
			// Carga las imagenes
			viewer.loadVolumes({
				volumes: [
				{
				type: "minc",
				header_url: "models/structural1.mnc.header",
				raw_data_url: "models/structural1.mnc.raw",
				template: {
					element_id: "volume-ui-template",
					viewer_insert_class: "volume-viewer-display",
				},
				},
			],
			overlay: {
				template: {
				element_id: "overlay-ui-template",
				viewer_insert_class: "overlay-viewer-display",
				},
			},
			complete: function () {
				//loading_div.hide();
				$("#brainbrowser-wrapper").slideDown({ duration: 600 });
			},
			});

		}
	); */

});
