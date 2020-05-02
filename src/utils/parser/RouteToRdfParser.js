import FileWriter from "../InOut/FileWriter";
class RouteToRdfParser {

    constructor (route){
        this.route = route;
    }
    parse(){
        let prefixs = this.getPrefix();
        let information = this.getInformation();
        let viadePoints = this.getViadePoints();
        let comments = this.getComments();
        let media = this.getMedia();
        FileWriter.handleSave(this.route.author.replace("/profile/card#me","/") +"viade/"+this.route.fileName,(String)(prefixs+information+viadePoints+comments+media))
    }

    ovewrite(){
        let prefixs = this.getPrefix();
        let information = this.getInformation();
        let viadePoints = this.getViadePoints();
        let comments = this.getComments();
        let media = this.getMedia();
        FileWriter.overWrite(this.route.author.replace("/profile/card#me","/")+"viade/"+this.route.fileName,(String)(prefixs+information+viadePoints+comments+media))
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
        let comments = "viade:hasComments \"null\" ;\n";
        if(this.route.comments.length !==0){
            let i;
            comments = "";
            for(i = 0; i<this.route.comments.length; i++){
                comments += "viade:hasComments [ \n schema:text \""+this.route.comments[i].comment.text +
                    "\" ; \n schema:publishedDate \""+this.route.comments[i].comment.createdAt+"\" \n ];\n"            }
        }
        return comments;
    }

    getMedia() {
        let media = "viade:hasMediaAttached \"null\" .\n";
        if(this.route.image.length !==0 || this.route.video.length !== 0 ){
            let i;
            media = "";
            for(i = 0; i<this.route.image.length; i++){
                if(i === this.route.image.length-1 && this.route.video.length === 0){
                    media += "viade:hasMediaAttached [ \n schema:contentUrl \""+this.route.image[i] +"\" \n ]."
                }else{
                    media += "viade:hasMediaAttached [ \n schema:contentUrl \""+this.route.image[i] +"\" \n ];\n"
                }
            }
            for(i = 0; i<this.route.video.length; i++){
                if(i === this.route.video.length-1){
                    media += "viade:hasMediaAttached [ \n schema:contentUrl \""+this.route.video[i] +"\" \n ] ."
                }else{
                    media += "viade:hasMediaAttached [ \n schema:contentUrl \""+this.route.video[i] +"\" \n ];\n"
                }
            }

        }
       return media;

    }

}

export default RouteToRdfParser;