$(function () {
  "use strict";

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
    viewer.loadModelFromURL("models/brain-surface.obj", {
      format: "mniobj",
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
