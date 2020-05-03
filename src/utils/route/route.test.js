import { cleanup } from 'react-testing-library';
import Route from "./Route";

afterAll(cleanup);

describe('Route class domain', () => {
  it('class create correctly', () => {
    const markers = [
      {position :{lat: 43.354831, lng: -5.851303}},
      {position :{lat: 43.356440, lng: -5.854693}},
      {position :{lat: 43.361836, lng: -5.850547}}
    ];
    const route = new Route("Prueba", "Prueba", markers,"Prueba" ,null, null, null, "");
    route.name = "Prueba";
    route.description = "Prueba";
    route.points = markers;
    route.author = "Prueba";
    route.comments = "";
    route.image = "";
    route.video = "";
    route.fileName = "";
    expect(route.name === "Prueba");
    expect(route.description === "Prueba");
    expect(route.points === markers);
    expect(route.author === "Prueba");
    expect(route.comments === "");
    expect(route.image === "");
    expect(route.video === "");
    expect(route.fileName === "");
  });

});
