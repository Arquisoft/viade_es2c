class GeojsonToRouteParser{
    constructor(file) {
        this.file = file;
    }

    parse(){
        var geoObject = JSON.parse(this.file);
        var features = [];
        let markers=[];
        features = geoObject.features;
        if (features.length === 1) {
            if (features[0].geometry.type === "LineString") {
                var coordinates = features[0].geometry.coordinates;
                for (var i = 0; i < coordinates.length; i++) {
                    markers.push({position: {lat: coordinates[i][0], lng: coordinates[i][1]}});
                }
            }
        }
        return markers;
    }

}

export default GeojsonToRouteParser;