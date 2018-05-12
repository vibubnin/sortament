sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel'
], function (Controller, JSONModel) {
  "use strict";
  return Controller.extend("sortament.sortaments.controller.NewSortament", {
    onInit: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("newSortament").attachPatternMatched(this._onNewSortamentMatched, this);

      this.mHeadersModel = new JSONModel({
        count: 1,
        data: [{ position: 1, remove: false, paramId: "" }]
      });
      this.mSortamentTableModel = new JSONModel({
        columns: [],
        rows: []
      });
      this.getView()
        .setModel(this.mHeadersModel, 'mHeaders')
        .setModel(this.mSortamentTableModel, 'mSortamentTable');
    },

    _onNewSortamentMatched: function (oEvent) {
      this.byId('headersTable').setVisible(false);
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
    },
    
    onAddHeader: function() {
      var oData = this.mHeadersModel.getData();
      oData.count++;
      oData.data.push({ position: oData.count, remove: true, paramId: "" });
      this.mHeadersModel.setData(oData);
    },

    onRemoveHeader: function(oEvent) {
      var oContext = oEvent.getSource().getBindingContext('mHeaders');
      var iIndex = +oContext.sPath.slice(6);
      var oHeader = oContext.getObject();

      var oData = this.mHeadersModel.getData();

      oData.data = oData.data.filter(function(item, i, arr) {
        if (i !== iIndex) {
          return true;
        }
      }, this);

      for (var i = iIndex; i < oData.data.length;  i++) {
        oData.data[i].position--;
      }
      oData.count--;

      this.mHeadersModel.setData(oData);
    },

    onShowTable: function() {
      var aHeaders = this.mHeadersModel.getData().data;
      var gParamsData = this.getView().getModel('gParams').getData();
      var aColumns = [];

      aHeaders.forEach(function(oHeader) {
        aColumns.push(
          gParamsData.find(function(oParam) {
            return oParam._id === oHeader.paramId
          })
        );
      });

      this.mSortamentTableModel.setProperty('/columns', aColumns);
      this.byId('headersTable').setVisible(true);      
    },

    onAddRow: function() {
      var aColumns = this.mSortamentTableModel.getData().columns;
      var aRows = this.mSortamentTableModel.getData().rows;
      var oRow = {};
      aColumns.forEach(function(oColumn) {
        oRow[oColumn._id] = null;
      });
      aRows.push(oRow);
      this.mSortamentTableModel.setProperty('/rows', aRows);
    },

    rowFactory: function(sId, oContext) {
      var oRow = oContext.getObject();
      var aColumns = this.mSortamentTableModel.getData().columns;
      
      var aCells = [];

      aColumns.forEach(function(oColumn) {
        aCells.push(
          new sap.m.Input({ 
            value: '{mSortamentTable>' + oColumn._id + '}',
            valueLiveUpdate: true
          })
        );
      }, this);

      return new sap.m.ColumnListItem({
        cells: aCells
      });
    },

    onDeleteTableRow: function(oEvent) {
      var oContext = oEvent.getParameter('listItem').getBindingContext('mSortamentTable');
      var iIndex = +oContext.sPath.slice(6);
      var aRows = this.mSortamentTableModel.getData().rows;

      var aNewRows = aRows.filter(function(item, i, arr) {
        if (i !== iIndex) {
          return true;
        }
      }, this);

      this.mSortamentTableModel.setProperty('/rows', aNewRows);
    }

  });
});