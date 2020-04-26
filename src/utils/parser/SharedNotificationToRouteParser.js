import FileWriter from "../InOut/FileWriter";
import RdftoRouteParser from "./RdfToRouteParser";
import {errorToaster} from '@utils';
var sparqlFiddle= require ("./fiddle/sparql-fiddle");

class SharedNotificationToRouteParser {
    constructor(webId) {
        this.user = webId;
    }

    addRoutes(url) {
        url = url.replace("viade", "inbox");
        FileWriter.readFolder(url, this.multiParse.bind(this), this.user);
    }

    compruebaNotificacionValida(results) {
        if(results === undefined ||results[0] === undefined){
            return false;
        }
        if(results[0]["me"] === this.user){
            return true;
        }
        return false;
    }
    compruebaNotificacion(text){
        let tx = text.split("\n");
        if (tx[0] === "@prefix terms: <http://purl.org/dc/terms#>.") {
            return true;
        }
        return false;
    }


    singleParse(fileName, text) {
        if(this.compruebaNotificacion(text)) {
            let querySparql =
                `PREFIX as: <https://www.w3.org/ns/activitystreams#>
      
      SELECT ?url ?me ?friend WHERE {
       ?notification a as:Offer;
        as:target ?me;
        as:object ?url;
        as:actor ?friend.
      }`;
            let fiddle = {
                data: text,
                query: querySparql,
                wanted: "Array"
            };
            sparqlFiddle.run(fiddle).then(
                results => {
                    if (this.compruebaNotificacionValida(results)) {
                        let routeurl = results[0]["url"];
                        let array = routeurl.split("/");
                        let fileName = array[array.length - 1];
                        let parser = new RdftoRouteParser();
                        parser.addRoute(fileName, routeurl,results[0]["friend"]);
                    } else {
                        errorToaster("err", "Error")
                    }
                },
                err => errorToaster(err, "Error")
            );
        }//if
    } // singleParse

    multiParse(url, documentos,webID) {
        for (let i = 0; i < documentos.length; i++) {
            FileWriter.handleLoad(url + documentos[i], documentos[i], this.singleParse.bind(this),webID);
        }
    }
}

export default SharedNotificationToRouteParser;