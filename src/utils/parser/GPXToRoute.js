class GPXToRoute{
    constructor(file) {
        this.file = file;
    }

    parse(){
        let markers = [];
        let xmlParser = new DOMParser();
        let xmlDoc = xmlParser.parseFromString(this.file, "text/xml");
        let trkpts = xmlDoc.getElementsByTagName("trkpt");
        for (let i = 0; i < trkpts.length; i++) {
            let lat = parseFloat(trkpts[i].getAttribute('lat'));
            let lng = parseFloat(trkpts[i].getAttribute('lon'));
            markers.push({position: {lat: lat, lng: lng}});
        }
        return markers;
    }

}

export default GPXToRoute;