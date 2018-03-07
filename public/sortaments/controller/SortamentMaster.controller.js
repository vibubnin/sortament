sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";
  return Controller.extend("sortament.sortaments.controller.SortamentMaster", {
    onInit: function () {
    },

    onSelectSortament: function (oEvent) {
    	var oItem = oEvent.getParameter('listItem');
    	var sPath = oItem.getBindingContext('sortaments').getPath();
    	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("selectedSortament", {
				sortPath: sPath.substr(1)
			});
    }
  });
});