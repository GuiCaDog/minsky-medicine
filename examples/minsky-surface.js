$(function () {
  "use strict";
  //http://127.0.0.1:5500/examples/minsky-viewer.html?t=nifti1&ov=jose/n_mmni_fcolin27_t1_tal_hires_seg.nii&tov=nifti1&o=jose/n_mmni_fcolin27_t1_tal_hires.nii&sobj=models/brain-surface.obj&ftype=mniobj
  var urlParams = new URLSearchParams(window.location.search);
  var surObj = urlParams.get('sobj');
  var formatType = urlParams.get('ftype');
  //formatType = "mniobj";
  //surObj = "models/brain-surface.obj";
  // Nos aseguramos que WEBGL esté habilitado.
  if (!BrainBrowser.WEBGL_ENABLED) {
    $("#brainbrowser").html(BrainBrowser.utils.webGLErrorMessage());
    return;
  }

  // Iniciamos el visor de superficie.
  BrainBrowser.SurfaceViewer.start(
    "brainbrowser1", // id del div del HTML donde se insertará el viewer.
    function (viewer) {

    // Renderiza el viewer.
    viewer.render();

    // Cargamos el modelo.
    //viewer.annotations.setMarkerRadius(1);
    viewer.loadModelFromURL(surObj, {
      format: formatType,
      complete: function () {
        $("#vertex-data-wrapper").show();
        $("#pick-value-wrapper").show();
        $("#pick-label-wrapper").show();
      },
      parse: { split: true },
    });

    $(window).resize(function () {
      viewer.updateViewport();
    });
  });
});
