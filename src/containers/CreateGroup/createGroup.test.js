import React from 'react';
import {cleanup, fireEvent, getByTestId, render} from 'react-testing-library';
import {HashRouter as Router} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import CreateGroup from "./CreateGroup";

library.add(fas);

describe.only('Create group', () => {
    afterAll(cleanup);
    const {container} = render(
        <Router>
            <CreateGroup/>
        </Router>
    );

    test('renders without crashing', () => {
        expect(container).toBeTruthy();
    });

    test('renders', () => {
        const input_nombre = getByTestId(container, 'input-nombre');
        const input_descripcion = getByTestId(container, 'input-descripcion');
        const buttonsubmit = getByTestId(container, 'buttonsubmit');
        expect(input_nombre).not.toBe(null);
        expect(input_descripcion).not.toBe(null);
        expect(buttonsubmit).not.toBe(null);
    });

    test('create new group', () => {
        const input_nombre = getByTestId(container, 'input-nombre');
        const input_descripcion = getByTestId(container, 'input-descripcion');
        const buttonsubmit = getByTestId(container, 'buttonsubmit');
        fireEvent.change(input_descripcion, {target: {value: "prueba"}});
        fireEvent.change(input_nombre, {target: {value: "prueba"}});
        fireEvent.click(buttonsubmit);
    });




});
