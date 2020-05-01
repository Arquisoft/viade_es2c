import React from 'react';
import {cleanup, render} from 'react-testing-library';
import {HashRouter as Router} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import TimeLineRoute from "./TimeLineRoute";
import Route from "../../../utils/route/Route";

library.add(fas);

const markers = [
    {position: {lat: 43.354831, lng: -5.851303}},
    {position: {lat: 43.356440, lng: -5.854693}},
    {position: {lat: 43.361836, lng: -5.850547}}
];

const ruta = new Route("prueba", "prueba", markers, "https://viades2c.solid.community/profile/card#me", null, null, null, "hola");

const props = {
    route: ruta
};

describe.only('TimelineRoute', () => {
    afterAll(cleanup);
    const {container} = render(
        <Router>
            <TimeLineRoute {...{...props}} />
        </Router>
    );

    test('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});
