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
			var color_map_config = BrainBrowser.config.get("color_maps")[2];
			viewer.loadDefaultColorMapFromURL(color_map_config.url, "#FFFFFF");
			
			// Event listener para resize de la ventana.
			window.addEventListener('resize', () => {
				height = window.innerHeight / 2.1;
				viewer.setPanelSize(height, height, { scale_image: true });
			}, false);

			// Event listener para cuando ha cargado.
			viewer.addEventListener("volumesloaded", function (event) {
				//var d = viewer.volumes[0].display;
				console.log("Viewer is ready!");
				$('#container-remove0').remove();
				$('#container-remove1').remove();
				});

			// Renderiza el viewer.
			viewer.render();
			
			// get url parameter called model
			//var model = getUrlParameter('model');

			// Carga las imagenes
			viewer.loadVolumes({
				volumes: [
				{
				//type: "minc",
				type: "nifti1",
				//header_url: "models/structural1.mnc.header",
				//raw_data_url: "models/structural1.mnc.raw",
				nii_url: "jose/n_mmni_fcolin27_t1_tal_hires.nii",
				//nii_url: "jose/n_mmni_fcolin27_t1_tal_hires.nii",
				template: {
					element_id: "volume-ui-template",
					viewer_insert_class: "volume-viewer-display",
				},
				},
				{
				//type: "minc",
				type: "nifti1",
				//header_url: "models/structural1.mnc.header",
				//raw_data_url: "models/structural1.mnc.raw",
				//nii_url: "jose/n_mmni_fcolin27_t1_tal_hires.nii",
				nii_url: "jose/n_mmni_fcolin27_t1_tal_hires_seg.nii",
				template: {
					element_id: "volume-ui-template",
					viewer_insert_class: "volume-viewer-display",
				},
				},
			],

			//Mirar como integrar overlay --- OVERLAY AQUI -----
			overlay: {
				template: {
				element_id: "volume-ui-template",
				viewer_insert_class: "volume-viewer-display",
				},
			},
			complete: function () {
				//loading_div.hide();
				$("#brainbrowser-wrapper").slideDown({ duration: 600 });
			},
			});
			
		}
	);
	
 

});
