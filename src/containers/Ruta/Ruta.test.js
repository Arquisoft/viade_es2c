import React from 'react';
import {cleanup, fireEvent, getByTestId, render} from 'react-testing-library';
import Ruta from "./Ruta";
import Route from "../../utils/route/Route"

const markers = [
    {position: {lat: 43.354831, lng: -5.851303}},
    {position: {lat: 43.356440, lng: -5.854693}},
    {position: {lat: 43.361836, lng: -5.850547}}
];

const ruta = new Route("prueba", "prueba", markers, null, null, "https://viades2c.solid.community/viade/resources/image.png","https://viades2c.solid.community/viade/resources/video.mp4");

const props = {
    route: ruta
};

describe.only('Ruta', () => {
    afterAll(cleanup);

    const {container} = render(
        <Ruta {...{...props}}/>
    );

    test('renders without crashing', () => {
        expect(container).toBeTruthy();
    });

    test('renders changing state (true)', () => {
        const button_open = getByTestId(container, 'button-open');

        fireEvent.click(button_open);
    });

    test('renders changing state (false)', () => {
        const button_close = getByTestId(container, 'button-close');

        fireEvent.click(button_close);
    });

    test('renders media', () => {
        const button_media = getByTestId(container, 'button-multimedia');

        fireEvent.click(button_media);
    });

    test('add comment', () => {
        const button_comment = getByTestId(container, 'button-add-comment');
        const input_comment = getByTestId(container, 'input-add-comment');

        fireEvent.change(input_comment, {target: {value: "comentario"}});

        fireEvent.click(button_comment);
    });



});
