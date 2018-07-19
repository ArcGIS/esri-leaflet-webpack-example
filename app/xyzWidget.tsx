/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import {subclass, declared, property} from "esri/core/accessorSupport/decorators";

import Widget = require("esri/widgets/Widget");
// import Collection = require("esri/core/Collection"):
import StoreAdapter = require("dstore/legacy/StoreAdapter");
import Memory = require("dojo/store/Memory");

import OnDemandGrid = require("dgrid/OnDemandGrid");
// import ColumnHider = require("dgrid/extensions/ColumnHider");
// import Selection = require("dgrid/Selection");
// import declare = require("dojo/_base/declare");

import Grid = require('dgrid/Grid');
import { renderable, tsx } from "esri/widgets/support/widget";

const CSS = {
  // base: "esri-hello-world",
  // emphasis: "esri-hello-world--emphasis",
  // xyzTable: "xyzTable",
  // widgetDiv: "widgetDiv"
};

@subclass("esri.widgets.HelloWorld")
class XYZ extends declared(Widget) {

	//----------------------------------
	//  layer
	//----------------------------------

	@property()
	@renderable()
	layer: object = {};

	// Public method
	render() {
		let columns = {
			name: 'Name',
		    y: 'Latitude',
		    x: 'Longitude',
		    z: 'Elevation (m)',
			zf: 'Elevation (ft)',
			e:	'Easting',
			n: 'Northing',
			dems: 'DEM Source',
			demr: 'DEM Resolution'
		}

		// const dataStore = new StoreAdapter({
		// 	objectStore: new Memory({
		// 		// objectId: '_OBJECTID',
		// 		data: this._generateGridData(this.layer.source)
		// 	})
		// })
		//
		// https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=highlight-features-by-geometry

		const grid = new Grid({
			columns: columns,
			// collection: dataStore
		}, 'grid');

		let columns = {
			name: 'Name',
			y: 'Latitude',
			x: 'Longitude',
			z: 'Elevation (m)',
			zf: 'Elevation (ft)',
			e:	'Easting',
			n: 'Northing',
			dems: 'DEM Source',
			demr: 'DEM Resolution'
		};
		let that = this;
		this.layer.source.on('change', function(e){
			// grid.set('store', new Memory({
			// 	data: that._generateGridData(this.layer.source)
			// }))
			// console.log('event', e)
			// console.log("generated grid data", that._generateGridData(this.layer.source)
			// console.log('grid', grid)
			grid.refresh();
			grid.renderArray(that._generateGridData(this.layer.source));
		})

	  	return (
			<div class="widgetContainer">
				<div id="grid"></div>
			</div>
		);
	}

	private _generateGridData(source): object {
		// let dataArray = [];
		// console.log('source', source)
		return source.get('items').map(function(feature){
			// let statePlaneCoords = this._getNorthingAndEasting(feature);
			// console.log('statePlaneCoords', statePlaneCoords)
			console.log('feature', feature)
			return {
				name: feature.get('attributes').name,
			    y: feature.get('geometry').get('y').toFixed(4),
			    x: feature.get('geometry').get('x').toFixed(4),
			    z: Math.floor(feature.get('geometry').get('z')),
				zf: Math.floor(3.28084 * (feature.get('geometry').get('z'))),
				e: feature.get('attributes').easting,
				n: feature.get('attributes').northing,
				dems: 'DEM Source',
				demr: 'DEM Resolution'
			}
			// return featureObject
		})
	}
}

export = XYZ;
