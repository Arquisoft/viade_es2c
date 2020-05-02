import { cleanup } from 'react-testing-library';
import GroupToRdfParser from "./GroupToRdfParser";

afterAll(cleanup);

describe('Route class domain', () => {
    it('class create correctly', () => {
        let parser = new GroupToRdfParser(["prueba"], "Prueba", "Prueba", "Prueba", "Prueba");
        parser.parse();
        expect(parser.fileName !== null);
    });

});
