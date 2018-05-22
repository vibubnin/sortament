sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel',
  'sap/m/MessageToast'
], function (Controller, JSONModel, MessageToast) {
  "use strict";
  return Controller.extend("sortament.sortaments.controller.NewSortament", {
    onInit: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("newSortament").attachPatternMatched(this._onNewSortamentMatched, this);
      oRouter.getRoute("editSortament").attachPatternMatched(this._onEditSortamentMatched, this);

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

      this._routerName = '';
      this._sortamentId = '';
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

      this.byId('createSortamentWizard').goToStep(this.byId('commonParamsStep')); 
      this._routerName = 'newSortament';            
    },

    _onEditSortamentMatched: function (oEvent) {
      this._sortamentId = oEvent.getParameter('arguments').id;
      $.ajax({
        type: 'GET',
        url: '/api/sortament?id=' + this._sortamentId,
        contentType: 'application/json',
        success: function(oData, textStatus, jqXHR) {
          var oSortamentData = {
            name: oData.name,
            standart: oData.standart,
            photo: oData.photo,
            columns: oData.params,
            rows: oData.data
          };
          this.mNewSortamentModel.setData(oSortamentData);

          var oHeadersData = {
            count: oData.params.length,
            data: []
          }
          oData.params.forEach(function(oParam, index) {
            if (!index) {
              oHeadersData.data.push({ position: 1, remove: false, paramId: oParam._id });
            } else {
              oHeadersData.data.push({ position: index + 1, remove: true, paramId: oParam._id });
            }
          });
          this.mHeadersModel.setData(oHeadersData);
          this.onShowTable();  
          this.byId('createSortamentWizard').setCurrentStep(this.byId('dataTableStep'));       
        }.bind(this),
        error: function(jqXHR, textStatus, errorThrown) {
          MessageToast.show('Произошла ошибка при получении сортамента');
        }.bind(this),
      });

      this._routerName = 'editSortament'; 
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

    onChangeRequiredInput: function(oEvent) {
      var oInput = oEvent.getSource();
      var sState = oEvent.getParameter('value') ? 'None' : 'Error';
      oInput.setValueState(sState);
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
            valueLiveUpdate: true,
            liveChange: this.onChangeRequiredInput.bind(this),
            valueStateText: "Заполните обязательное поле"
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

      if (this._routerName === 'newSortament') {
        $.ajax({
          type: 'POST',
          url: '/api/sortaments',
          contentType: 'application/json',
          data: JSON.stringify(oSendData),
          success: function(oData, textStatus, jqXHR) {
            MessageToast.show('Сортамент успешно создан');
            this.getView().getModel('gSortaments').loadData('/api/sortaments');
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("editSortament", {
              id: oData._id
            });          
          }.bind(this),
          error: function(jqXHR, textStatus, errorThrown) {
            MessageToast.show('Произошла ошибка при создании сортамента');
          }.bind(this),
        });
      }

      if (this._routerName === 'editSortament') {

        var oSortament = {
          name: oSendData.name,
          standart: oSendData.standart,
          photo: oSendData.photo,
          params: [],
          data: oSendData.rows
        }; 
      
        oSendData.columns.forEach(function(oColumn) {
          oSortament.params.push(oColumn._id);
        });

        oSendData = {
          id: this._sortamentId,
          data: oSortament
        };

        $.ajax({
          type: 'PUT',
          url: '/api/sortaments',
          contentType: 'application/json',
          data: JSON.stringify(oSendData),
          success: function(data, textStatus, jqXHR) {
            MessageToast.show('Сортамент успешно изменен');
            this.getView().getModel('gSortaments').loadData('/api/sortaments');   
          }.bind(this),
          error: function(jqXHR, textStatus, errorThrown) {
            MessageToast.show('Произошла ошибка при изменении сортамента');
          }.bind(this),
        });
      }

    }

  });
});