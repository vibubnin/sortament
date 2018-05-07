sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel',
  'sap/m/Popover'
], function (Controller, JSONModel, Popover) {
  "use strict";
  return Controller.extend("sortament.sortaments.controller.SortamentDetail", {
    onInit: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("selectedSortament").attachPatternMatched(this._onSortamentDetailMatched, this);

      this.mCatalogSizeModel = new JSONModel();
      this.getView().setModel(this.mCatalogSizeModel, 'mCatalogSize');
    },

    _onSortamentDetailMatched: function (oEvent) {
      this.getView().bindElement({
        path: "/" + oEvent.getParameter("arguments").sortPath,
        model: "sortaments"
      });
    },

    onSortamentDownload: function () {
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
      }
    },

    handleUploadComplete: function(oEvent) {
      var sData = oEvent.getParameter("response");
      
      var aData = sData.split('\n');
      
      var aMeta = aData[0].split(',');
      aMeta[0] = 'Тип##';

      var aRow = aData[1].split(',');

      this.mCatalogSizeModel.setData({
        meta: aMeta,
        row: aRow
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