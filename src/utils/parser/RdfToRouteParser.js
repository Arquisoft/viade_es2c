import FileWriter from "../InOut/FileWriter";
import Route from "../route/Route";
import rutas from "../../constants/globals";
import {errorToaster} from '@utils';
var sparqlFiddle= require ("./fiddle/sparql-fiddle")

class RdftoRouteParser {

    addRoute (fileName,url){
        FileWriter.handleLoad(url,fileName,this.singleParse.bind(this));
    }

    addRoutes (url){
        FileWriter.readFolder(url, this.multiParse.bind(this));
    }

    singleParse(fileName,text){

        let querySparql =
            `PREFIX schema: <http://schema.org/>
      PREFIX viade:<http://arquisoft.github.io/viadeSpec/>
      PREFIX rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      
      SELECT ?name ?description ?comments ?iri ?lat ?long WHERE {
       ?route a viade:Route;
       viade:point ?point ;
       schema:name ?name;
       schema:description ?description;
       viade:hasComments ?comments;
       viade:hasMediaAttached ?media.
       OPTIONAL {?media schema:contentUrl ?iri.}
       ?point schema:latitude ?lat ;
              schema:longitude ?long.
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
                let comments = results[0]["comments"];
                let image = this.getImage(results);
                let video = this.getVideo(results);
                let route = new Route(name,description, points,null,comments,image,video,fileName);
                this.pushRoutes(route);
            },
            err =>  errorToaster(err,"Error")
        );



    }

    pushRoutes(route){
        for (let i=0;i<rutas.length;i++){
            if(rutas[i].name === route.name){
                return
            }
        }
        rutas.push(route);
    }

    multiParse(url, documentos){
        for (let i=0;i<documentos.length;i++){
            FileWriter.handleLoad(url + documentos[i],documentos[i],this.singleParse.bind(this));
        }
    }



    getPoints(results){
        let points = [];
        for(let i=0;i<results.length;i++){
            if(results[i]["lat"]!== undefined){
                points[i]={position: {lat:results[i]["lat"],lng:results[i]["long"]}};
            }
        }
        return points;
    }

    getImage(results){
        if(results[0]["iri"]!== undefined && this.notVideo(results[0]["iri"])){
            return results[0]["iri"];
        }
        return null;
    }

    getVideo(results){
        if(results[1]["iri"]!== undefined && results[1]["iri"]!== results[0]["iri"]){
            return results[1]["iri"];
        }else{
            if(results[0]["iri"]!== undefined && !this.notVideo(results[0]["iri"])){
                return results[0]["iri"];
            }
        }
        return null;
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