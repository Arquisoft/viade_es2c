import React from 'react';
import {cleanup, getByTestId, render} from 'react-testing-library';
import {HashRouter as Router} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import FriendsGroups from './FriendsGroups';
import {fireEvent} from "@testing-library/react/dist/@testing-library/react.pure.esm";

library.add(fas);

describe.only('Create route',() =>{
    afterAll(cleanup);
    const {container} = render(
        <Router>
            <FriendsGroups/>
        </Router>
    );

    test('renders without crashing',() => {
        expect(container).toBeTruthy();
    });

    test('create group',() => {
        const createGroup = getByTestId(container, 'createGroup');
        fireEvent.click(createGroup);
    });
});