import {cleanup} from 'react-testing-library';
import Group from "./Group";

afterAll(cleanup);

describe('Group class', () => {
    it('class create correctly', () => {
        const group = new Group("Prueba", "Prueba", ["Prueba"]);
        group.name = "Prueba";
        group.description = "Prueba";
        group.participants = ["group"];
        expect(group.name === "Prueba");
        expect(group.description === "Prueba");
        expect(group.participants.length > 0 );
    });

});
