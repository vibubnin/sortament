sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel',
  'sap/m/Popover',
  'sap/m/MessageToast'
], function (Controller, JSONModel, Popover, MessageToast) {
  "use strict";
  return Controller.extend("sortament.sortaments.controller.SortamentDetail", {
    onInit: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("selectedSortament").attachPatternMatched(this._onSortamentDetailMatched, this);

      this.mCatalogSizeModel = new JSONModel();

      this.mSettingsModel = new JSONModel();

      this.getView()
        .setModel(this.mCatalogSizeModel, 'mCatalogSize')
        .setModel(this.mSettingsModel, 'mSettings');
      
      this.oOldObj = {
        data: {},
        index: null
      } 
    },

    _onSortamentDetailMatched: function (oEvent) {
      this.getView().bindElement({
        path: "/" + oEvent.getParameter("arguments").sortPath,
        model: "gSortaments"
      });
      this.mSettingsModel.setData({  
        listMode: 'MultiSelect',
        itemMode: 'Inactive',
        visible: true,
        addBtn: false 
      });
    },

    onSelectMode: function(oEvent) {
      var sType = oEvent.getParameter("selectedItem").getKey();

      switch (sType) {
        case 'multiple':
          this.mSettingsModel.setProperty('/listMode', 'MultiSelect');
          this.mSettingsModel.setProperty('/itemMode', 'Inactive');
          break;
        case 'delete':
          this.mSettingsModel.setProperty('/listMode', 'Delete');
          this.mSettingsModel.setProperty('/itemMode', 'Inactive');
          break;
        case 'edit':
          this.mSettingsModel.setProperty('/listMode', 'None');
          this.mSettingsModel.setProperty('/itemMode', 'Detail');
          break;
      }
    },

    rowFactory: function(sId, oContext) {
      var aColumns = this.getView()
        .getBindingContext('gSortaments').getObject().params;
      
      var aCells = [];

      aColumns.forEach(function(oColumn) {
        aCells.push(
          new sap.m.Input({ 
            value: '{gSortaments>' + oColumn._id + '}',
            editable: false,
            valueLiveUpdate: true,
            addBtn: false 
          })
        );
      }, this);

      return new sap.m.ColumnListItem({
        cells: aCells,
        type: '{mSettings>/itemMode}',
        detailPress: this.onDetailPressRow.bind(this)
      });
    },

    onDetailPressRow: function(oEvent) {
      var oItem = oEvent.getSource();

      oItem.getCells().forEach(function(oInput) {
        oInput.setEditable(true);
      });

      var oContext = oItem.getBindingContext('gSortaments');

      this.oOldObj.index = +oContext.sPath.slice(oContext.sPath.lastIndexOf('/') + 1);
      this.oOldObj.data = $.extend({}, oContext.getObject());

      this.mSettingsModel.setProperty('/visible', false);
      this.mSettingsModel.setProperty('/listMode', 'None');
      this.mSettingsModel.setProperty('/itemMode', 'Inactive');      
      this.mSettingsModel.setProperty('/addBtn', false);      

      debugger
    },

    onDeleteTableRow: function(oEvent) {
      var oContext = oEvent.getParameter('listItem').getBindingContext('gSortaments');
      var iIndex = +oContext.sPath.slice(oContext.sPath.lastIndexOf('/') + 1);
      var oData = this.getView().getBindingContext('gSortaments').getObject();
      oData.data = oData.data.filter(function(item, i) {
        return i !== iIndex;
      });

      this.getView().getModel('gSortaments').updateBindings(true);
    },

    onAddEmptyRow: function() {
      var oSortament = this.getView().getBindingContext('gSortaments').getObject();
      var aColumns = oSortament.params;
      var oNewRow = {};

      aColumns.forEach(function(oColumn) {
        oNewRow[oColumn._id] = '';
      });

      oSortament.data.push(oNewRow);

      this.getView().getModel('gSortaments').updateBindings(true);

      var aItems = this.byId('sortamentDetailTable').getItems();
      var oRow = aItems[aItems.length - 1];
      oRow.getCells().forEach(function(oInput) {
        oInput.setEditable(true);
      });
      
      this.mSettingsModel.setProperty('/visible', false);
      this.mSettingsModel.setProperty('/listMode', 'None');
      this.mSettingsModel.setProperty('/itemMode', 'Inactive');
      this.mSettingsModel.setProperty('/addBtn', true);   
    },

    onCancelAddRow: function() {
      var oSortament = this.getView().getBindingContext('gSortaments').getObject();
      var bCancelAdd = this.mSettingsModel.getProperty('/addBtn');

      if (bCancelAdd) {
        oSortament.data.length = oSortament.data.length - 1;
      } else {
        oSortament.data[this.oOldObj.index] = this.oOldObj.data;
        this.oOldObj.index = null;
        this.oOldObj.data = {};
      }

      this.getView().getModel('gSortaments').updateBindings(true);

      this.mSettingsModel.setData({  
        listMode: 'MultiSelect',
        itemMode: 'Inactive',
        visible: true,
        addBtn: false
      });

      this.byId('detailMode').setSelectedKey('multiple');
    },

    onApplyAddRow: function() {
      var bCancelAdd = this.mSettingsModel.getProperty('/addBtn'); 
      var aItems = this.byId('sortamentDetailTable').getItems();
      var oItem;
          
      if (bCancelAdd) {
        oItem = aItems[aItems.length - 1];

      } else {
        oItem = aItems[this.oOldObj.index];
      }

      oItem.getCells().forEach(function(oInput) {
        oInput.setEditable(false);
      });

      this.mSettingsModel.setData({  
        listMode: 'MultiSelect',
        itemMode: 'Inactive',
        visible: true
      });

      this.byId('detailMode').setSelectedKey('multiple');
    },

    onSaveChanges: function() {
      var oSortament = this.getView().getBindingContext('gSortaments').getObject();
      var oSendData = {
        id: oSortament._id,
        data: { data: oSortament.data }
      };

      $.ajax({
        type: 'PUT',
        url: '/api/sortaments',
        contentType: 'application/json',
        data: JSON.stringify(oSendData),
        success: function(data, textStatus, jqXHR) {
          MessageToast.show('Изменения успешно сохранены');
          this.getView().getModel('gSortaments').loadData('/api/sortaments');          
        }.bind(this),
        error: function(jqXHR, textStatus, errorThrown) {
          MessageToast.show('Произошла ошибка при сохранении изменений');
        }.bind(this)
      });
    },

    onResetChanges: function() {
      this.getView().getModel('gSortaments').loadData('/api/sortaments'); 
    },

    on1SortamentDownload: function () {
      var oTable = this.byId('sortamentTable'),
          aContexts = oTable.getSelectedContexts(),
          oObject,
          sFilename,
          element,
          sTextData = ',Ширина##SECTION_PROPERTY##MILLIMETERS,Толщина ребра жесткости##SECTION_PROPERTY##MILLIMETERS,Толщина полки##SECTION_PROPERTY##MILLIMETERS,Сопряжение ребра жесткости##SECTION_PROPERTY##MILLIMETERS,Название стандарта##OTHER##,Название сечения##OTHER##,Материал несущих конструкций##OTHER##,Горизонтальный центроид##SECTION_PROPERTY##MILLIMETERS,Высота##SECTION_PROPERTY##MILLIMETERS,Вертикальный центроид##SECTION_PROPERTY##MILLIMETERS\n';
      aContexts.forEach(function (oContext) {
        oObject = oContext.getObject();
        sTextData += oObject.type + ','
                   + oObject.b + ','
                   + oObject.s + ','
                   + oObject.t + ','
                   + oObject.R1 + ','
                   + 'Двутавр широкополочный по СТО АСЧМ 20-93' + ','
                   + oObject.type + ','
                   + '<По категории>,'
                   + oObject.b/2 + ','
                   + oObject.h + ','
                   + oObject.h/2 + '\n';
      }, this);

      sFilename = 'Двутавр широкополочный по СТО АСЧМ 20-93';

      element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(sTextData));
      element.setAttribute('download', sFilename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element)
    },

    onChangeFile: function(oEvent) {
      var sValue = oEvent.getParameter('newValue');
      if (sValue) {
        this._sFileName = sValue;
      }
    },

    onDownloadSizeCatalog: function() {
      var oCataloSizeData = this.mCatalogSizeModel.getData();
      var sTarget = oCataloSizeData.firstRow + '\n';

      var aItemContexts = this.byId('sortamentDetailTable').getSelectedContexts(true);
      aItemContexts.forEach(function(oContext) {
        var oObj = oContext.getObject();

        oCataloSizeData.headers.forEach(function(oHeader, iIndex) {
          if (!oHeader.paramId) {
            sTarget += oCataloSizeData.row[iIndex];
          } else {
            sTarget += oObj[oHeader.paramId];
          }

          if (iIndex !== oCataloSizeData.headers.length - 1) {
            sTarget += ','
          }
        });

        sTarget += '\n';
      }, this);

      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(sTarget));
      element.setAttribute('download', oCataloSizeData.fileName);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },

    handleUploadComplete: function(oEvent) {
      var sData = oEvent.getParameter("response");
      
      var aData = sData.split('\n');
      
      var aMeta = aData[0].split(',');
      aMeta[0] = 'Тип##';

      var aRow = aData[1].split(',');
      var aHeaders = [];

      aMeta.forEach(function(sMeta) {
        aHeaders.push({
          fileMeta: sMeta,
          paramId: '' 
        });
      });


      this.mCatalogSizeModel.setData({
        headers: aHeaders,
        firstRow: aData[0],
        row: aRow,
        fileName: this._sFileName
      });
    },
    
    handleLabelFtr: function(sLabel) {
      return sLabel.slice(0,sLabel.indexOf('##'));
    },

		handleUploadPress: function(oEvent) {
			var oFileUploader = this.byId("fileUploader");
			oFileUploader.upload();
    },
    
    onOpenSizeCatalogDialog: function() {
      var oView = this.getView();
      var oDialog = oView.byId("sizeCatalogDialog");

      if (!oDialog) {
        oDialog = sap.ui.xmlfragment(oView.getId(), "sortament.sortaments.view.SizeCatalog", this);
        oDialog.addStyleClass(this.getOwnerComponent().getContentDensityClass());
        oView.addDependent(oDialog);
      }

      oDialog.open();
    },

    onCloseSizeCatalogDialog: function() {
      this.getView().byId("sizeCatalogDialog").close();
    },

    handleMessagePopoverPress: function (oEvent) {
      if (!this._oPopover) {
        this._oPopover = new Popover({
          placement: 'PreferredBottomOrFlip',
          contentWidth: '16rem',
          showHeader: false,
          content: [
            new sap.m.Text({
              text: 'Соотнесите названия заголовков сортамента приложения с заголовками файла каталога типоразмеров в семействе.'
            })
          ]
        });

        this._oPopover.addStyleClass('sapUiContentPadding');

        this.getView().addDependent(this._oPopover);
      }

      this._oPopover.openBy(oEvent.getSource());
    }

  });
});