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
      this.mNewSortamentModel = new JSONModel({
        name: '', standart: '', photo: '', columns: [], rows: []
      });
      this.getView()
        .setModel(this.mHeadersModel, 'mHeaders')
        .setModel(this.mNewSortamentModel, 'mNewSortament');
    },

    _onNewSortamentMatched: function (oEvent) {
      this.byId('headersTable').setVisible(false);
      this.mHeadersModel.setData({
        count: 1,
        data: [{ position: 1, remove: false, paramId: "" }]
      });
      this.mNewSortamentModel.setData({
        name: '', standart: '', photo: '', columns: [], rows: []
      });
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

      this.mNewSortamentModel.setProperty('/columns', aColumns);
      this.byId('headersTable').setVisible(true);      
    },

    onAddRow: function() {
      var aColumns = this.mNewSortamentModel.getData().columns;
      var aRows = this.mNewSortamentModel.getData().rows;
      var oRow = {};
      aColumns.forEach(function(oColumn) {
        oRow[oColumn._id] = null;
      });
      aRows.push(oRow);
      this.mNewSortamentModel.setProperty('/rows', aRows);
    },

    rowFactory: function(sId, oContext) {
      var oRow = oContext.getObject();
      var aColumns = this.mNewSortamentModel.getData().columns;
      
      var aCells = [];

      aColumns.forEach(function(oColumn) {
        aCells.push(
          new sap.m.Input({ 
            value: '{mNewSortament>' + oColumn._id + '}',
            valueLiveUpdate: true
          })
        );
      }, this);

      return new sap.m.ColumnListItem({
        cells: aCells
      });
    },

    onDeleteTableRow: function(oEvent) {
      var oContext = oEvent.getParameter('listItem').getBindingContext('mNewSortament');
      var iIndex = +oContext.sPath.slice(6);
      var aRows = this.mNewSortamentModel.getData().rows;

      var aNewRows = aRows.filter(function(item, i, arr) {
        if (i !== iIndex) {
          return true;
        }
      }, this);

      this.mNewSortamentModel.setProperty('/rows', aNewRows);
    },

    onUploadChange: function(oEvent) {
      var FR = new FileReader();
      var aFiles = oEvent.getParameter('files');
      if (aFiles.length) {
        FR.addEventListener('load', function(e) {
          this.mNewSortamentModel.setProperty('/photo', e.target.result);
        }.bind(this));
        FR.readAsDataURL(oEvent.getParameter('files')[0]);
      }
    },

    onRemoveImage: function() {
      this.mNewSortamentModel.setProperty('/photo', '');
      this.getView().byId('sectionFU').setValue('');
    },

    onSaveSortament: function() {
      var oSendData = this.mNewSortamentModel.getData();

      $.ajax({
        type: 'POST',
        url: '/api/sortaments',
        contentType: 'application/json',
        data: JSON.stringify(oSendData),
        success: function(data, textStatus, jqXHR) {
          MessageToast.show('Сортамент успешно создан');
          // this.getView().getModel('').loadData('/api/params');          
        }.bind(this),
        error: function(jqXHR, textStatus, errorThrown) {
          MessageToast.show('Произошла ошибка при создании сортамента');
        }.bind(this),
      });

    }

  });
});