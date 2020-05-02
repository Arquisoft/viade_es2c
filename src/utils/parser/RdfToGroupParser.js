import FileWriter from "../InOut/FileWriter";
import {errorToaster} from '@utils';
import Group from '../group/Group';
var sparqlFiddle= require ("./fiddle/sparql-fiddle")

let groups = [];

class RdfToGroupParse {
        async addGroups(url, webId, callback) {
            FileWriter.createFolder(url, webId,this, function (url, webId, objet) {
                FileWriter.readFolder(url, objet.multiParse.bind(objet), webId);
                callback(groups);
            });
    }

    multiParse(url, documentos, webID) {
        for (let i = 0; i < documentos.length; i++) {
            FileWriter.handleLoad(url + documentos[i], documentos[i], this.singleParse.bind(this), webID);
        }
    }
    singleParse(fileName, text, webID) {
        let querySparql =
            `PREFIX schema: <http://schema.org/>
            PREFIX viade:<http://arquisoft.github.io/viadeSpec/>
            PREFIX rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  
            SELECT ?name ?description ?iri WHERE {
            ?group a viade:Group;
            schema:name ?name;
            schema:description ?description;
            viade:participants ?participant.
            OPTIONAL {?participant schema:participantUrl ?iri.}
            
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
                let participants = this.getParticipants(results);
                let group = new Group(name,description,participants);
                this.pushGroup(group);
            },
            err =>  errorToaster(err,"Error")
        );
        console.log(groups);

    }
    pushGroup(group) {
        if (!this.containsGroup(group)) {
            groups.push(group);
        }
    }
    containsGroup(group) {
        for (let i = 0; i < groups.length; i++) {
            if (groups[i].name === group.name) {
                return true;
            }
        }
        return false;
    }
    getParticipants(results){
        let participants = [];
        let set = new Set();
        let indice = 0;
        for(let i=0;i<results.length;i++){
            if(results[i]["iri"]!== undefined){
                if(!set.has(results[i]["iri"])){
                    participants[indice]= results[i]["iri"];
                    indice++;
                    set.add(results[i]["iri"]);
                }
            }
        }
        return participants;
    }
}


export default RdfToGroupParse;