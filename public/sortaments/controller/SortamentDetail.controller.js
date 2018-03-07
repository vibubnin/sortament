sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";
  return Controller.extend("sortament.sortaments.controller.SortamentDetail", {
    onInit: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("selectedSortament").attachPatternMatched(this._onSortamentDetailMatched, this)
    },

    _onSortamentDetailMatched: function (oEvent) {
      this.getView().bindElement({
        path: "/" + oEvent.getParameter("arguments").sortPath,
        model: "sortaments"
      });
    },

    onSortamentDownload: function () {
      var text = 'Привет';
      var filename = 'Сортамент';
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element)
    }

  });
});