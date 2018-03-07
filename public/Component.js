sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"
], function(UIComponent, JSONModel) {
	"use strict";

	return UIComponent.extend("sortament.Component", {
		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			var aSortamentsData = [
				{
					id: 1,
					category: 'СТО АСЧМ 20-93',
					name: 'Двутавр широкополочный по СТО АСЧМ 20-93',
					list: [
						{
							type: '20Ш1',
							h: 194,
							b: 150,
							s: 6,
							t: 9,
							R1: 13,
							A: 39.01,
							P: 30.6,
							Ly: 2690,
							Wy: 277.3,
							Sy: 154.3,
							Iy: 8.3,
							Lz: 507.1,
							Wz: 67.6,
							Iz: 36.1
						},
						{
							type: '25Ш1',
							h: 244,
							b: 175,
							s: 7,
							t: 11,
							R1: 16,
							A: 56.24,
							P: 44.1,
							Ly: 6122,
							Wy: 501.8,
							Sy: 279.2,
							Iy: 10.43,
							Lz: 984.3,
							Wz: 112.5,
							Iz: 4.18
						},
						{
							type: '30Ш1',
							h: 294,
							b: 200,
							s: 8,
							t: 12,
							R1: 18,
							A: 72.38,
							P: 56.8,
							Ly: 11339,
							Wy: 771.4,
							Sy: 429.5,
							Iy: 12.52,
							Lz: 1602.9,
							Wz: 160.3,
							Iz: 4.71
						},
						{
							type: '30Ш2',
							h: 300,
							b: 201,
							s: 9,
							t: 15,
							R1: 18,
							A: 87.38,
							P: 68.6,
							Ly: 14210,
							Wy: 947.4,
							Sy: 529.9,
							Iy: 12.75,
							Lz: 2033.8,
							Wz: 202.4,
							Iz: 4.82
						},
						{
							type: '35Ш1',
							h: 334,
							b: 249,
							s: 8,
							t: 11,
							R1: 20,
							A: 83.17,
							P: 63.3,
							Ly: 17108,
							Wy: 1024.4,
							Sy: 563.8,
							Iy: 14.34,
							Lz: 2834.1,
							Wz: 227.6,
							Iz: 5.84
						},
						{
							type: '35Ш2',
							h: 340,
							b: 250,
							s: 9,
							t: 14,
							R1: 20,
							A: 101.51,
							P: 79.7,
							Ly: 21678,
							Wy: 1275.2,
							Sy: 706.1,
							Iy: 14.61,
							Lz: 3650.5,
							Wz: 292,
							Iz: 6
						},
						{
							type: '40Ш1',
							h: 383,
							b: 299,
							s: 9.5,
							t: 12.5,
							R1: 22,
							A: 112.91,
							P: 88.6,
							Ly: 30556,
							Wy: 1595.6,
							Sy: 880.8,
							Iy: 16.45,
							Lz: 5575.4,
							Wz: 372.9,
							Iz: 7.03
						},
						{
							type: '40Ш2',
							h: 390,
							b: 300,
							s: 10,
							t: 16,
							R1: 22,
							A: 135.95,
							P: 106.7,
							Ly: 38676,
							Wy: 1983.4,
							Sy: 1094,
							Iy: 16.87,
							Lz: 7207.1,
							Wz: 480.5,
							Iz: 7.28
						},
						{
							type: '45Ш1',
							h: 440,
							b: 300,
							s: 11,
							t: 18,
							R1: 24,
							A: 157.38,
							P: 123.5,
							Ly: 56072,
							Wy: 2548.7,
							Sy: 1412.5,
							Iy: 18.88,
							Lz: 8110.3,
							Wz: 540.7,
							Iz: 7.18
						},
						{
							type: '50Ш1',
							h: 482,
							b: 300,
							s: 11,
							t: 15,
							R1: 26,
							A: 145.52,
							P: 114.2,
							Ly: 60371,
							Wy: 2505,
							Sy: 1395.7,
							Iy: 20.37,
							Lz: 6762.4,
							Wz: 450.8,
							Iz: 6.82
						},
						{
							type: '50Ш2',
							h: 487,
							b: 300,
							s: 14.5,
							t: 17.5,
							R1: 26,
							A: 176.34,
							P: 138.4,
							Ly: 71867,
							Wy: 2951.4,
							Sy: 1666.7,
							Iy: 20.19,
							Lz: 7896.4,
							Wz: 526.4,
							Iz: 6.69
						},
						{
							type: '50Ш3',
							h: 493,
							b: 300,
							s: 15.5,
							t: 20.5,
							R1: 26,
							A: 198.86,
							P: 156.1,
							Ly: 83441,
							Wy: 3385,
							Sy: 1912.8,
							Iy: 20.48,
							Lz: 9249.7,
							Wz: 616.6,
							Iz: 6.82
						},
						{
							type: '50Ш4',
							h: 499,
							b: 300,
							s: 16.5,
							t: 23.5,
							R1: 26,
							A: 221.38,
							P: 173.8,
							Ly: 95282,
							Wy: 3818.9,
							Sy: 2161.5,
							Iy: 20.75,
							Lz: 10603.4,
							Wz: 706.9,
							Iz: 6.92
						},
					]
				},
				{
					id: 2,
					category: 'СТО АСЧМ 20-93',
					name: 'Двутавр нормальный (Б) по СТО АСЧМ 20-93'
				},
				{
					id: 3,
					category: 'СТО АСЧМ 20-93',
					name: 'Двутавр колонный (К) по СТО АСЧМ 20-93'
				},
				{
					id: 4,
					category: 'СТО АСЧМ 20-93',
					name: 'Двутавр по Р40-93'
				},
				{
					id: 5,
					category: 'СТО АСЧМ 20-93',
					name: 'Специальные двутавры СТО АСЧМ 20-93'
				}
			];
      var oModel = new JSONModel(aSortamentsData);
      this.setModel(oModel, 'sortaments');

      this.getRouter().initialize();
		},

		getContentDensityClass : function() {
      if (!this._sContentDensityClass) {
        if (!sap.ui.Device.support.touch) {
          this._sContentDensityClass = "sapUiSizeCompact";
        } else {
          this._sContentDensityClass = "sapUiSizeCozy";
        }
      }
      return this._sContentDensityClass;
    }
	});
});