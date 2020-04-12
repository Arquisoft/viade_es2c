import FileWriter from "../InOut/FileWriter";
class RouteToRdfParser {

    constructor (route, webID){
        this.route = route;
        this.webID = webID;
    }
    parse(){
        let prefixs = this.getPrefix();
        let information = this.getInformation();
        let viadePoints = this.getViadePoints();
        let comments = this.getComments();
        let media = this.getMedia();
        FileWriter.handleSave(this.webID+"viade/"+this.route.fileName,(String)(prefixs+information+viadePoints+comments+media))
    }

    getPrefix(){
        let line = "@prefix :   <http://example.org/>. \n";
        let viade = "@prefix viade:  <http://arquisoft.github.io/viadeSpec/>.\n";
        let schema = "@prefix schema: <http://schema.org/>.\n";
        let rdfs = "@prefix rdfs:   <http://www.w3.org/2000/01/rdf-schema#>.\n";
        let xsd = "@prefix xsd:    <http://www.w3.org/2001/XMLSchema#>.\n";
        return (String)(viade+line+schema+rdfs+xsd);
    }
    getInformation(){
        let myRoute = ":myRoute a viade:Route ;\n";
        let name ="schema:name \""+this.route.name+"\" ;\n";
        let description = "schema:description \""+this.route.description+"\" ;\n";
        return (String)(myRoute+name+description);
    }

    getViadePoints(){
        let puntos = "";
        let i;
        for (i = 0; i < this.route.points.length; i++) {
            puntos += "viade:point [ \n schema:latitude "+this.route.points[i].position.lat+" ;\n schema:longitude "+this.route.points[i].position.lng+" \n ];\n";
        }

        return (String)(puntos);
    }

    getComments(){
        let comments = "viade:hasComments \""+this.route.comments+"\" ;\n";
        return comments;
    }

    getMedia() {
        let imagen = "";
        let video = "";
        let imagenInfo = "";
        let videoInfo = "";
        if (this.route.image != null) {
        imagen = "viade:hasMediaAttached :img ;\n";
        imagenInfo = ":img schema:contentUrl \"" + this.route.image + "\" .\n";
        }
        if(this.route.video!=null){
            video = "viade:hasMediaAttached :video .\n";
            videoInfo = ":video schema:contentUrl \""+this.route.video+"\" .\n"
        }else{
            video = "viade:hasMediaAttached \"null\" .\n"
        }

        return imagen+video+imagenInfo+videoInfo;

    }

}

export default RouteToRdfParser;