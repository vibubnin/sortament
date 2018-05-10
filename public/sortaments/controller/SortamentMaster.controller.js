sap.ui.define([
  "sap/ui/core/mvc/Controller",
  'sap/ui/model/json/JSONModel'
], function (Controller, JSONModel) {
  "use strict";
  return Controller.extend("sortament.sortaments.controller.SortamentMaster", {
    onInit: function () {
      this.mParamModel = new JSONModel();
      this.getView().setModel(this.mParamModel, 'mParam');
    },

    _setCreateParam: function() {
      this.mParamModel.setData({
        name: '', 
        var_name: '', 
        var_index: '', 
        unit_fraction: false,
        unit_numerator_name: '',
        unit_numerator_degree: '',
        unit_denominator_name: '',
        unit_denominator_degree: ''
      });
    },

    onSetUnitFraction: function(oEvent) {
      var bSelected = oEvent.getParameter('selected');
      if (!bSelected) {
        this.mParamModel.setProperty('/unit_denominator_name', '');
        this.mParamModel.setProperty('/unit_denominator_degree', '');
      }
    },

    onNavToParamsList: function() {
      this.byId('paramsNavCon').back();
    },

    onNavToEditParam: function(oEvent) {
      var oParam = oEvent.getSource().getBindingContext('gParams').getObject();
      this.mParamModel.setData(oParam);
      var oParamsNavCon = this.byId('paramsNavCon');
      oParamsNavCon.to(this.byId('paramFormPage'));
    },

    onSelectSortament: function (oEvent) {
    	var oItem = oEvent.getParameter('listItem');
    	var sPath = oItem.getBindingContext('sortaments').getPath();
    	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("selectedSortament", {
				sortPath: sPath.substr(1)
			});
    },

    onOpenParamsDialog: function() {
      var oView = this.getView();
      var oDialog = oView.byId("paramsDialog");

      if (!oDialog) {
        oDialog = sap.ui.xmlfragment(oView.getId(), "sortament.sortaments.view.Params", this);
        oDialog.addStyleClass(this.getOwnerComponent().getContentDensityClass());
        oView.addDependent(oDialog);
      }

      oDialog.open();
    },

    onCloseParamsDialog: function() {
      this.getView().byId("paramsDialog").close();
    },
  });
});