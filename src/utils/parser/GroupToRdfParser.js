import FileWriter from "../InOut/FileWriter";

//class for parsing the group into a rdf and saving into the users POD
class GroupToRdfParser{
    constructor(friends,name,description,fileName,author){
        this.friends = friends;
        this.name = name;
        this.description = description;
        this.fileName = fileName;
        this.author = author;
    }
    parse(){   
        let prefixs = this.getPrefix();
        let information = this.getInformation();
        let participants = this.getParticipants();
        FileWriter.handleSave(this.author.replace("/profile/card#me","/") +"viade/groups/"+this.fileName,(String)(prefixs+information+participants));
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
        let myGroup = null;
        let name = null;
        let description = null;
        
        if(this.friends.length > 0){
            myGroup = ":myGroup a viade:Group ;\n";
            name ="schema:name \""+this.name+"\" ;\n";
            description = "schema:description \""+this.description+"\" ;\n";
        }else{
            myGroup = ":myGroup a viade:Group ;\n";
            name ="schema:name \""+this.name+"\" ;\n";
            description = "schema:description \""+this.description+"\" .";
        }
        
        return (String)(myGroup+name+description);
    }

    getParticipants(){
        let participants = "";
        let i;
        for (i = 0; i < this.friends.length; i++) {
            if(i === this.friends.length -1 ){//if its the last
                participants += "viade:participants [ \n schema:participantUrl \"" +this.friends[i] +"\" \n ] .";
            }else{
                participants += "viade:participants [ \n schema:participantUrl \"" +this.friends[i] +"\" \n ];\n";
            }
        }

        return (String)(participants);
    }
}

export default GroupToRdfParser;