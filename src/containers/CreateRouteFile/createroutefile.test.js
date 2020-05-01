import React from 'react';
import {cleanup, fireEvent, getByTestId, render} from 'react-testing-library';
import {HashRouter as Router} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import CreateRouteFile from "./CreateRouteGeoJSON";

library.add(fas);

const props = {
    webId: 'https://elmer.solid.community/',
    test: true
};

describe.only('CreateRouteGeoJSON', () => {
    afterAll(cleanup);
    const {container} = render(
        <Router>
            <CreateRouteFile {...{...props}} />
        </Router>
    );

    test('renders without crashing', () => {
        expect(container).toBeTruthy();
    });

    test('renders with styled components', () => {
        const route_wrapper = getByTestId(container, 'route-wrapper');
        const route_header = getByTestId(container, 'route-header');
        const input_title = getByTestId(container, 'input-title');
        const input_description = getByTestId(container, 'input-description');
        const input_file = getByTestId(container, 'input-file');
        const button_save = getByTestId(container, 'button-save');
        const input_img = getByTestId(container, 'input-img');
        const input_video = getByTestId(container, 'input-video');

        expect(route_wrapper).not.toBe(null);
        expect(route_header).not.toBe(null);
        expect(input_title).not.toBe(null);
        expect(input_description).not.toBe(null);
        expect(input_file).not.toBe(null);
        expect(button_save).not.toBe(null);
        expect(input_img).not.toBe(null);
        expect(input_video).not.toBe(null);

    });

    test('test inputs', () => {
        const input_title = getByTestId(container, 'input-title');
        const input_description = getByTestId(container, 'input-description');
        const input_file = getByTestId(container, 'input-file');
        const button_save = getByTestId(container, 'button-save');
        const json = '{"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {}, "geometry": {"type": "LineString", "coordinates": [[28.67431640625, 51.74743863117572], [28.037109375, 50.33844888725473], [30.684814453125004, 50.00067775723633], [30.223388671874996, 51.303145259199056], [29.68505859375, 49.1888842152458], [26.400146484375, 51.31688050404585]]}}]}'
        const file = new File([json], "track.geojson");
        fireEvent.change(input_title, {target: {value: "prueba"}});
        fireEvent.change(input_description, {target: {value: "prueba"}});
        Object.defineProperty(input_file, "files", {
            value: [file]
        });
        fireEvent.change(input_file);
        expect(input_title.value).toEqual("prueba");
        expect(input_description.value).toEqual("prueba");

        const input_img = getByTestId(container, 'input-img');
        const input_video = getByTestId(container, 'input-video');

        const img = new File(["(⌐□_□)"], "img.png", {
            type: "image/png"
        });

        const video = new File(["(⌐□_□)"], "video.mp4", {
            type: "video/mp4"
        });
        Object.defineProperty(input_img, "files", {
            value: [img]
        });
        fireEvent.change(input_img);

        Object.defineProperty(input_video, "files", {
            value: [video]
        });
        fireEvent.change(input_video);

        fireEvent.click(button_save);
    });
});
