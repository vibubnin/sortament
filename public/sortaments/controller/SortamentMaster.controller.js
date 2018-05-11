sap.ui.define([
  "sap/ui/core/mvc/Controller",
  'sap/ui/model/json/JSONModel',
  'sap/m/MessageToast',
  'sap/ui/model/Filter'
], function (Controller, JSONModel, MessageToast, Filter) {
  "use strict";
  return Controller.extend("sortament.sortaments.controller.SortamentMaster", {
    onInit: function () {
      this.mParamModel = new JSONModel();
      this.mParamSettingsModel = new JSONModel({
        editMode: false,
        visibleNavBackBtn: false
      });
      this.getView()
        .setModel(this.mParamModel, 'mParam')
        .setModel(this.mParamSettingsModel, 'mParamSettings');
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

    onSearchParam: function(oEvent) {
      var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("name", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var oList = this.byId("paramList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters);
    },

    onSetUnitFraction: function(oEvent) {
      var bSelected = oEvent.getParameter('selected');
      if (!bSelected) {
        this.mParamModel.setProperty('/unit_denominator_name', '');
        this.mParamModel.setProperty('/unit_denominator_degree', '');
      }
    },

    onNavToParamsList: function() {
      this.mParamSettingsModel.setProperty('/visibleNavBackBtn', false);      
      this.byId('paramsNavCon').back();
    },

    onNavToEditParam: function(oEvent) {
      var oParam = oEvent.getSource().getBindingContext('gParams').getObject();
      this.mParamModel.setData(oParam);
      this.mParamSettingsModel.setProperty('/editMode', true);
      this.mParamSettingsModel.setProperty('/visibleNavBackBtn', true);      

      var oParamsNavCon = this.byId('paramsNavCon');
      oParamsNavCon.to(this.byId('paramFormPage'));
    },

    onNavToCreateParam: function() {
      this._setCreateParam();
      this.mParamSettingsModel.setProperty('/editMode', false);
      this.mParamSettingsModel.setProperty('/visibleNavBackBtn', true);
      
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

      var oParamsNavCon = this.byId('paramsNavCon');
      oParamsNavCon.to(this.byId('paramsListPage'));

      this.mParamSettingsModel.setProperty('/visibleNavBackBtn', false);
      this.byId('paramsSearchField').setValue('');
      this.byId("paramList").getBinding('items').filter([]);
    
      oDialog.open();
    },

    onCloseParamsDialog: function() {
      this.getView().byId("paramsDialog").close();
    },

    onUpdateParam: function() {
      var oParamData = this.mParamModel.getData();
      var oSendData = { id: oParamData._id, data: {} }; 
      for (var prop in oParamData) {
        if (prop !== '_id') {
          oSendData.data[prop] = oParamData[prop];
        }
      }

      $.ajax({
        type: 'PUT',
        url: '/api/params',
        contentType: 'application/json',
        data: JSON.stringify(oSendData),
        success: function(data, textStatus, jqXHR) {
          MessageToast.show('Параметр успешно изменен');
          this.getView().getModel('gParams').loadData('/api/params');          
        }.bind(this),
        error: function(jqXHR, textStatus, errorThrown) {
          MessageToast.show('Произошла ошибка при изменении параметра');
        }.bind(this),
      });
    },

    onCreateParam: function() {
      var oSendData = this.mParamModel.getData(); 
  
      $.ajax({
        type: 'POST',
        url: '/api/params',
        contentType: 'application/json',
        data: JSON.stringify(oSendData),
        success: function(data, textStatus, jqXHR) {
          MessageToast.show('Параметр успешно создан');
          this._setCreateParam();
          this.getView().getModel('gParams').loadData('/api/params');          
        }.bind(this),
        error: function(jqXHR, textStatus, errorThrown) {
          MessageToast.show('Произошла ошибка при создании параметра');
        }.bind(this),
      });
    },

    onDeleteParam: function(oEvent) {
      var oRemoveParam = oEvent
        .getParameter('listItem')
        .getBindingContext('gParams')
        .getObject();
      var oSendData = { id: oRemoveParam._id };

        $.ajax({
          type: 'DELETE',
          url: '/api/params',
          contentType: 'application/json',
          data: JSON.stringify(oSendData),
          success: function(data, textStatus, jqXHR) {
            MessageToast.show('Параметр успешно удален');
            this.getView().getModel('gParams').loadData('/api/params');          
          }.bind(this),
          error: function(jqXHR, textStatus, errorThrown) {
            MessageToast.show('Произошла ошибка при удалении параметра');
          }.bind(this),
        });
    }

  });
});