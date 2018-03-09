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
    }

  });
});