import FileWriter from "../InOut/FileWriter";
class RouteToRdfParser {

    constructor (route, webID){
        this.route = route;
        this.webID = webID;
    }
    parse(){
        var prefixs = this.getPrefix();
        var information = this.getInformation();
        var viadePoints = this.getViadePoints();
        var media = this.getMedia();
        FileWriter.handleSave(this.webID+"viade/"+this.route.name,(String)(prefixs+information+viadePoints+media))
    }

    getPrefix(){
        var firstLine = "prefix :   <http://example.org/> \n";
        var viade = "prefix viade:  <http://arquisoft.github.io/viadeSpec/>\n";
        var schema = "prefix schema: <http://schema.org/>\n";
        var rdfs = "prefix rdfs:   <http://www.w3.org/2000/01/rdf-schema#>\n";
        var xsd = "prefix xsd:    <http://www.w3.org/2001/XMLSchema#>\n";
        return (String)(firstLine+viade+schema+rdfs+xsd);
    }
    getInformation(){
        var myRoute = ":myRoute a viade:Route ;\n";
        var name ="schema:name \""+this.route.name+"\" ;\n";
        var description = "schema:description \""+this.route.description+"\" ;\n";
        return (String)(myRoute+name+description);
    }

    getViadePoints(){
        var cabecera = "viade:points (\n";
        var final = " );\n";
        var puntos = "";
        var i;
        for (i = 0; i < this.route.points.length; i++) {
            puntos += "[ schema:latitude "+this.route.points[i].position.lat+" ; schema:longitude "+this.route.points[i].position.lng+" ]\n";
        }

        return (String)(cabecera+puntos+final);
    }

    getMedia(){
        var comments = "viade:hasComments \""+this.route.comments+"\" ;\n";
        return comments;
    }

}

export default RouteToRdfParser;