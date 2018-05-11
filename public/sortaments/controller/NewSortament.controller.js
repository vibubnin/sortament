sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel'
], function (Controller, JSONModel) {
  "use strict";
  return Controller.extend("sortament.sortaments.controller.NewSortament", {
    onInit: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("newSortament").attachPatternMatched(this._onNewSortamentMatched, this);

      this.mHeadersModel = new JSONModel([
        {label: 'Заголовок 1'},
        {label: 'Заголовок 2'}
      ]);
      this.getView().setModel(this.mHeadersModel, 'mHeaders');
    },

    _onNewSortamentMatched: function (oEvent) {
      // this.getView().bindElement({
      //   path: "/" + oEvent.getParameter("arguments").sortPath,
      //   model: "sortaments"
      // });
    },


    onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("beginSortament", {}, true);
			}
		}

  });
});