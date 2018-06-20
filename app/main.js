define(["require", "exports", "esri/Map", "esri/views/MapView", "esri/geometry/Point", "esri/layers/FeatureLayer", "esri/widgets/ScaleBar", "app/xyzWidget.js"], function (require, exports, EsriMap, MapView, Point, FeatureLayer, ScaleBar, XYZ) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var map = new EsriMap({
        basemap: "streets",
        ground: "world-elevation"
    });
    var view = new MapView({
        map: map,
        container: "viewDiv",
        center: [-100, 40],
        zoom: 4,
    });
    view.when(function () {
        var graphics = [];
        // let graphics = new Collection();
        var layer = new FeatureLayer({
            fields: [
                {
                    name: "ObjectID",
                    alias: "ObjectID",
                    type: "oid"
                },
                // {
                //   name: "type",
                //   alias: "Type",
                //   type: "string"
                // },
                {
                    name: "Name",
                    alias: "Name",
                    type: "string"
                },
            ],
            objectIdField: "ObjectID",
            geometryType: "point",
            source: graphics,
            spatialReference: {
                wkid: 4326
            },
            // url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/WorldCities/FeatureServer/0",
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'simple-marker',
                    size: 10,
                    color: '#ff4000',
                    outline: {
                        color: [255, 64, 0, 0.4],
                        width: 7
                    }
                }
            }
        });
        map.add(layer);
        view.on('click', function (event) {
            // console.log('map.ground', map.ground.queryElevation(event.mapPoint))
            map.ground.queryElevation(event.mapPoint, {
                returnSampleInfo: true,
                demResolution: 'finest-contiguous'
            })
                .then(function (result) {
                // console.log('result.geometry', result.geometry)
                // console.log('result.sampleInfo', result.sampleInfo)
                var point = {
                    geometry: new Point({
                        x: event.mapPoint.longitude,
                        y: event.mapPoint.latitude,
                        z: result.geometry.z
                    }),
                    attributes: {
                        ObjectID: layer.source.length + 1,
                        type: "thing " + (layer.source.length + 1),
                        name: "test " + (layer.source.length + 1)
                    }
                };
                layer.source.add(point);
                // console.log('point', point);
            });
        });
        var scaleBar = new ScaleBar({
            view: view,
            unit: 'dual'
        });
        view.ui.add(scaleBar, {
            position: "bottom-left"
        });
        var widget = new XYZ({
            view: view,
            layer: layer
        });
        view.ui.add(widget, "bottom-right");
    });
});
//# sourceMappingURL=main.js.map