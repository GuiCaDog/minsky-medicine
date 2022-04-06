$(function () {
	"use strict";

	$(".button").button();

	// Inicio del volume viewer
	BrainBrowser.VolumeViewer.start(
		"brainbrowser", // id del div del HTML donde se insertará el viewer.
		function (viewer) {	 
			
			// Tamaños de los contenedores del visor.
			$("#brainbrowser-wrapper").css("width", "100%");
			$("#volume-viewer").css("width", "100%");
			$("#brainbrowser").css("width", "100%");
			
			// Tamaño por defecto de los paneles 
			// (algo menos un medio de la altura de la ventana)
			var height = window.innerHeight / 2.1;
			viewer.setDefaultPanelSize(height, height);

			// Obtenemos el mapa de color del fichero de configuración del visor. (minsky-viewer.config.js)
			// En este caso usaremos el mapa de color "Gray".
			// Cargamos el mapa de color en el visor. El segundo argumento (#FFFFFF) es el color del cursor.
			var color_map_config = BrainBrowser.config.get("color_maps")[2];
			viewer.loadDefaultColorMapFromURL(color_map_config.url, "#FFFFFF");

			// Event listener para reescalar las imágenes al tamaño de la ventana.
			// Cada vez que se redimensione la ventana, se recalcula el tamaño de los paneles.
			window.addEventListener('resize', () => {
				height = window.innerHeight / 2.1;
				viewer.setPanelSize(height, height, { scale_image: true });
			}, false);

			// Event listener para cuando ha cargado.
			viewer.addEventListener("volumesloaded", function (event) {

				var color_map = BrainBrowser.config.get("color_maps")[0];
        		viewer.loadVolumeColorMapFromURL(1, color_map.url, "#FF0000", function() {
        		  viewer.redrawVolumes();
        		});
				var value = 0.35;
          		viewer.volumes[2].blend_ratios[0] = 1 - value;
          		viewer.volumes[2].blend_ratios[1] = value;
          		viewer.redrawVolumes();
				console.log("Viewer is ready!");
				$('#container-remove0').remove();
				$('#container-remove1').remove();
			});

			// Renderiza el viewer.
			viewer.render();
		
			// Carga las imagenes
			viewer.loadVolumes({
				volumes: [
				{
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
			overlay: {
				template: {
				element_id: "volume-ui-template",
				viewer_insert_class: "volume-viewer-display",
				},
			}
			});
			
		}
	);
	
 

});
