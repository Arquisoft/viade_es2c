import FileWriter from "../InOut/FileWriter";
import Route from "../route/Route";
import rutasGlobales from "../../constants/rutasGlobales";
import {errorToaster} from '@utils';

var sparqlFiddle = require("./fiddle/sparql-fiddle")

class RdftoRouteParser {

    addRoute(fileName, url, webId) {
        FileWriter.handleLoad(url, fileName, this.singleParse.bind(this), webId);
    }

    addRoutes(url, webId) {
        FileWriter.readFolder(url, this.multiParse.bind(this), webId);
    }

    singleParse(fileName, text, webID) {
        let querySparql =
            `PREFIX schema: <http://schema.org/>
      PREFIX viade:<http://arquisoft.github.io/viadeSpec/>
      PREFIX rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      
      SELECT ?name ?description ?commentText ?createdAt ?iri ?lat ?long WHERE {
       ?route a viade:Route;
       viade:point ?point ;
       schema:name ?name;
       schema:description ?description;
       viade:hasComments ?comment;
       viade:hasMediaAttached ?media.
       OPTIONAL {?media schema:contentUrl ?iri.}
       ?point schema:latitude ?lat ;
              schema:longitude ?long.
        OPTIONAL {?comment schema:text ?commentText;
                           schema:publishedDate ?createdAt.}
      }`;
        let fiddle = {
            data: text,
            query: querySparql,
            wanted: "Array"
        };
        sparqlFiddle.run(fiddle).then(
            results => {
                let name = results[0]["name"];
                let description = results[0]["description"];
                let points = this.getPoints(results);
                let comments = this.getComments(results);
                let image = this.getImage(results);
                let video = this.getVideo(results);
                let route = new Route(name, description, points, webID, comments, image, video, fileName);
                this.pushRoutes(route);
            },
            err => errorToaster(err, "Error")
        );
    }

    pushRoutes(route) {
        for (let i = 0; i < rutasGlobales.length; i++) {
            if (rutasGlobales[i].name === route.name) {
                return
            }
        }
        rutasGlobales.push(route);
    }

    multiParse(url, documentos, webID) {
        for (let i = 0; i < documentos.length; i++) {
            FileWriter.handleLoad(url + documentos[i], documentos[i], this.singleParse.bind(this), webID);
        }
    }


    getPoints(results) {
        let points = [];
        for (let i = 0; i < results.length; i++) {
            if (results[i]["lat"] !== undefined) {
                points[i] = {position: {lat: results[i]["lat"], lng: results[i]["long"]}};
            }
        }
        return points;
    }

    getComments(results) {
        let comments = [];
        let set = new Set();
        let indice = 0;
        for (let i = 0; i < results.length; i++) {
            if (results[i]["commentText"] !== undefined) {
                if (!set.has(results[i]["commentText"] + ", " + results[i]["createdAt"])) {
                    comments[indice] = {comment: {text: results[i]["commentText"], createdAt: results[i]["createdAt"]}};
                    indice++;
                    set.add(results[i]["commentText"] + ", " + results[i]["createdAt"]);
                }
            }
        }
        return comments;
    }

    getImage(results) {
        let images = [];
        let set = new Set();
        let indice = 0;
        for (let i = 0; i < results.length; i++) {
            if (results[i]["iri"] !== undefined) {
                if (!set.has(results[i]["iri"]) && this.notVideo(results[i]["iri"])) {
                    images[indice] = results[i]["iri"];
                    indice++;
                    set.add(results[i]["iri"]);
                }
            }
        }
        return images
    }

    getVideo(results) {
        let videos = [];
        let set = new Set();
        let indice = 0;
        for (let i = 0; i < results.length; i++) {
            if (results[i]["iri"] !== undefined) {
                if (!set.has(results[i]["iri"]) && !this.notVideo(results[i]["iri"])) {
                    videos[indice] = results[i]["iri"];
                    indice++;
                    set.add(results[i]["iri"]);
                }
            }
        }
        return videos
    }

    notVideo(image) {
        let array = image.split(".");
        let extension = array[array.length - 1];
        if (extension === "mp4" || extension === "avi") {
            return false;
        }
        return true;
    }

}

export default RdftoRouteParser;