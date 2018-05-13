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
			
			/*
			var aSortamentsData = [
				{
					id: 1,
					image: '/img/img-VT53LJ.png',
					category: 'СТО АСЧМ 20-93',
					name: 'Широкополочные двутавры',
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
						{
							type: '60Ш1',
							h: 582,
							b: 300,
							s: 12,
							t: 17,
							R1: 28,
							A: 174.49,
							P: 137,
							Ly: 102717,
							Wy: 3529.8,
							Sy: 1981.5,
							Iy: 24.26,
							Lz: 7668,
							Wz: 511.2,
							Iz: 6.63
						},
						{
							type: '60Ш2',
							h: 589,
							b: 300,
							s: 16,
							t: 20.5,
							R1: 28,
							A: 217.41,
							P: 170.7,
							Ly: 126201,
							Wy: 4285.3,
							Sy: 2439,
							Iy: 24.09,
							Lz: 9257.5,
							Wz: 617.2,
							Iz: 6.53
						},
						{
							type: '60Ш3',
							h: 597,
							b: 300,
							s: 18,
							t: 24.5,
							R1: 28,
							A: 252.37,
							P: 198.1,
							Ly: 150043,
							Wy: 5026.6,
							Sy: 2869.9,
							Iy: 24.38,
							Lz: 11067.3,
							Wz: 737.8,
							Iz: 6.62
						},
						{
							type: '60Ш4',
							h: 605,
							b: 300,
							s: 20,
							t: 28.5,
							R1: 28,
							A: 287.33,
							P: 225.6,
							Ly: 174458,
							Wy: 5767.2,
							Sy: 3306.6,
							Iy: 24.64,
							Lz: 12879.3,
							Wz: 858.6,
							Iz: 6.7
						},
						{
							type: '70Ш1',
							h: 692,
							b: 300,
							s: 13,
							t: 20,
							R1: 28,
							A: 211.49,
							P: 166,
							Ly: 172433,
							Wy: 4983.7,
							Sy: 2814.6,
							Iy: 28.55,
							Lz: 9022.9,
							Wz: 601.5,
							Iz: 6.53
						},
						{
							type: '70Ш2',
							h: 698,
							b: 300,
							s: 15,
							t: 23,
							R1: 28,
							A: 242.53,
							P: 190.4,
							Ly: 198791,
							Wy: 5696,
							Sy: 3233.6,
							Iy: 28.63,
							Lz: 10381.1,
							Wz: 692.1,
							Iz: 6.54
						},
						{
							type: '70Ш3',
							h: 707,
							b: 300,
							s: 18,
							t: 27.5,
							R1: 28,
							A: 289.09,
							P: 226.9,
							Ly: 239032,
							Wy: 6761.9,
							Sy: 3867.2,
							Iy: 28.76,
							Lz: 12422.4,
							Wz: 828.2,
							Iz: 6.56
						},
						{
							type: '70Ш4',
							h: 715,
							b: 300,
							s: 20.5,
							t: 31.5,
							R1: 28,
							A: 329.39,
							P: 258.6,
							Ly: 275138,
							Wy: 7696.2,
							Sy: 4426.7,
							Iy: 28.9,
							Lz: 14240.2,
							Wz: 949.3,
							Iz: 6.58
						},
						{
							type: '70Ш5',
							h: 725,
							b: 300,
							s: 23,
							t: 36.5,
							R1: 28,
							A: 375.69,
							P: 294.9,
							Ly: 319793,
							Wy: 8821.9,
							Sy: 5099.5,
							Iy: 29.18,
							Lz: 16512.3,
							Wz: 1100.8,
							Iz: 6.63
						},
						{
							type: '80Ш1',
							h: 782,
							b: 300,
							s: 13.5,
							t: 17,
							R1: 28,
							A: 209.71,
							P: 164.6,
							Ly: 205458,
							Wy: 5254.7,
							Sy: 3018.9,
							Iy: 31.3,
							Lz: 7676.7,
							Wz: 511.8,
							Iz: 6.05
						},
						{
							type: '80Ш2',
							h: 782,
							b: 300,
							s: 14,
							t: 22,
							R1: 28,
							A: 243.45,
							P: 191.1,
							Ly: 253655,
							Wy: 6405.4,
							Sy: 3644.1,
							Iy: 32.28,
							Lz: 9928.9,
							Wz: 661.9,
							Iz: 6.39
						},
						{
							type: '90Ш1',
							h: 881,
							b: 299,
							s: 15,
							t: 18.5,
							R1: 28,
							A: 243.96,
							P: 191.5,
							Ly: 292583,
							Wy: 6642.1,
							Sy: 3861.2,
							Iy: 34.63,
							Lz: 8278.5,
							Wz: 553.7,
							Iz: 5.83
						},
						{
							type: '90Ш2',
							h: 890,
							b: 299,
							s: 15,
							t: 23,
							R1: 28,
							A: 270.87,
							P: 212.6,
							Ly: 345335,
							Wy: 7760.3,
							Sy: 4457,
							Iy: 35.71,
							Lz: 10283.3,
							Wz: 687.8,
							Iz: 6.16
						},
						{
							type: '100Ш1',
							h: 990,
							b: 320,
							s: 16,
							t: 21,
							R1: 30,
							A: 293.8,
							P: 230.6,
							Ly: 446039,
							Wy: 9010.9,
							Sy: 5234.1,
							Iy: 38.96,
							Lz: 11517.9,
							Wz: 719.9,
							Iz: 6.26
						},
						{
							type: '100Ш2',
							h: 998,
							b: 320,
							s: 17,
							t: 25,
							R1: 30,
							A: 328.88,
							P: 258.2,
							Ly: 516373,
							Wy: 10348.2,
							Sy: 5982.6,
							Iy: 39.62,
							Lz: 13710,
							Wz: 856.9,
							Iz: 6.46
						},
						{
							type: '100Ш3',
							h: 1006,
							b: 320,
							s: 18,
							t: 29,
							R1: 30,
							A: 363.96,
							P: 285.7,
							Ly: 587730,
							Wy: 11684.5,
							Sy: 6736.2,
							Iy: 40.18,
							Lz: 15903,
							Wz: 993.9,
							Iz: 6.61
						},
						{
							type: '100Ш4',
							h: 1013,
							b: 320,
							s: 19.5,
							t: 32.5,
							R1: 30,
							A: 400.58,
							P: 314.5,
							Ly: 655449,
							Wy: 12940.7,
							Sy: 7470,
							Iy: 40.45,
							Lz: 17828.8,
							Wz: 1114.3,
							Iz: 6.67
						}
					]
				},
				{
					id: 2,
					category: 'СТО АСЧМ 20-93',
					name: 'Нормальные двутавры'
				},
				{
					id: 3,
					category: 'СТО АСЧМ 20-93',
					name: 'Колонные двутавры'
				},
				{
					id: 4,
					category: 'СТО АСЧМ 20-93',
					name: 'Специальные двутавры'
				},
				{
					id: 5,
					category: 'ГОСТ 26020-83',
					name: 'Нормальные двутавры'
				},
				{
					id: 6,
					category: 'ГОСТ 26020-83',
					name: 'Широкополочные двутавры'
				},
				{
					id: 7,
					category: 'ГОСТ 26020-83',
					name: 'Колонные двутавры'
				},
				{
					id: 8,
					category: 'ГОСТ 8240-72',
					name: 'Швеллеры с уклоном внутренних граней полок'
				},
				{
					id: 9,
					category: 'ГОСТ 8240-72',
					name: 'Швеллеры с параллельными гранями полок'
				},
				{
					id: 10,
					category: 'ГОСТ 8509-93',
					name: 'Уголоки равнополочные'
				}
			]; 
			*/
			var gSortamentsModel = new JSONModel();
			gSortamentsModel.loadData('/api/sortaments');			

			var gParamsModel = new JSONModel();
			gParamsModel.loadData('/api/params');
			gParamsModel.attachRequestCompleted(function() {
			});

			this
				.setModel(gSortamentsModel, 'gSortaments')
				.setModel(gParamsModel, 'gParams');


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