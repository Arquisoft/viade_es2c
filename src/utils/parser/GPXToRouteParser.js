class GPXToRouteParser{
    constructor(file) {
        this.file = file;
    }

    parse(){
        try {
            var xmlParser = new DOMParser();
            var xmlDoc = xmlParser.parseFromString(this.file, "text/xml");
            var trk = xmlDoc.getElementsByTagName("trk");
            let markers = [];
            if(trk.length === 1){
                var trkpts = xmlDoc.getElementsByTagName("trkpt");
                for (var i = 0; i < trkpts.length; i++) {
                    let lat = parseFloat(trkpts[i].getAttribute('lat'));
                    let lng = parseFloat(trkpts[i].getAttribute('lon'));
                    markers.push({position: {lat: lat, lng: lng}});
                }
            }
            return markers;

        }catch (e) {
            return [];
        }

    }

}

export default GPXToRouteParser;