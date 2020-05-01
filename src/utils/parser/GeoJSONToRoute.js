class GeoJSONToRoute{
    constructor(file) {
        this.file = file;
    }

    parse(){
        let geoObject = JSON.parse(this.file);
        let markers = [];
        let features = [];
        features = geoObject.features;
        if (features.length === 1) {
            if (features[0].geometry.type === "LineString") {
                let coordinates = features[0].geometry.coordinates;
                for (let i = 0; i < coordinates.length; i++) {
                    markers.push({position: {lat: coordinates[i][0], lng: coordinates[i][1]}});
                }
            }
        }
        return markers;
    }

}

export default GeoJSONToRoute;