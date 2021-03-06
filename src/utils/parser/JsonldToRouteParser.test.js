import { cleanup } from 'react-testing-library';
import JsonldToRouteParser from "./JsonldToRouteParser";

afterAll(cleanup);

describe('Json Ld parser', () => {
    it('class create correctly', () => {
        let json = '{"@context":{"@version":1.1,"comments":{"text": "a", "createdAt": "2020"},"description":{"@id":"schema:description","@type":"xsd:string"},"media":{"@container":"@list","@id":"viade:media"},"name":{"@id":"schema:name","@type":"xsd:string"},"points":{"@container":"@list","@id":"viade:points"},"latitude":{"@id":"schema:latitude","@type":"xsd:double"},"longitude":{"@id":"schema:longitude","@type":"xsd:double"},"elevation":{"@id":"schema:elevation","@type":"xsd:double"},"author":{"@id":"schema:author","@type":"@id"},"date":{"@id":"schema:DateTime","@type":"xsd:dateTime"},"rdf":"http://www.w3.org/1999/02/22-rdf-syntax-ns#","rdfs":"http://www.w3.org/2000/01/rdf-schema#","schema":"http://schema.org/","viade":"http://arquisoft.github.io/viadeSpec/","xsd":"http://www.w3.org/2001/XMLSchema#"},"name":"Route test 1","author":"https://luispresacollada.solid.community/profile/card#me","description":"This is a test to see the output of the JsonLDConversor","comments":[{"comment":{"text": "hola", "createdAt":"2020"}}],"date":"2020-02-25T18:50:22Z","media":[{"@id":"http://inrupt.luispc1998/viade/resources/da34fas749sa3h883j.jpg","name":"MyFoto"},{"@id":"http://inrupt.angelixus/viade/resources/pt92as74234a3h5xb3j.mp4","name":"MyVideo"},{"@id":"http://inrupt.raupemol/viade/resources/da34zas4213sa7b542.png","name":"OtherFoto"},{"@id":"http://inrupt.luispc1998/viade/resources/da345432jtsa7b542e.mp4","name":"OtherVideo"}],"waypoints":[{"name":"Name for the waypoint","description":"Description of the waypoint","latitude":45.123,"longitude":34.121,"elevation":34},{"name":"Computer Science School","description":"Become a good engineer with us","latitude":45.123,"longitude":34.121,"elevation":34}],"points":[{"latitude":45.123,"longitude":34.121,"elevation":34},{"latitude":46.123,"longitude":34.121,"elevation":36},{"latitude":47.123,"longitude":34,"elevation":39},{"latitude":48.123,"longitude":32.121,"elevation":40},{"latitude":49.123,"longitude":34.121,"elevation":43},{"latitude":40.123,"longitude":32.121,"elevation":46},{"latitude":50.123,"longitude":33.121,"elevation":50},{"latitude":53.123,"longitude":34.121,"elevation":55},{"latitude":54.123,"longitude":34.121,"elevation":56},{"latitude":55.123,"longitude":35.121,"elevation":50},{"latitude":55.123,"longitude":34.121,"elevation":45}]}';
        let parser = new JsonldToRouteParser("Prueba", json);
        let parsed = parser.parse();
        expect(parsed !== null);
    });

});
