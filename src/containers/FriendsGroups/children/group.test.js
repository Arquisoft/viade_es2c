import React from 'react';
import {cleanup, render} from 'react-testing-library';
import {HashRouter as Router} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import Group from './Group';

library.add(fas);

describe.only('Group friends', () => {
    afterAll(cleanup);
    const { container } = render(
        <Router>
            <Group />
        </Router>
    );

    test('renders without crashing', () => {
        expect(container).toBeTruthy();
    });


});
