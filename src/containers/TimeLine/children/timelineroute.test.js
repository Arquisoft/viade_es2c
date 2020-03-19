import React from 'react';
import {cleanup, render} from 'react-testing-library';
import {HashRouter as Router} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import TimeLineRoute from "./TimeLineRoute";

library.add(fas);

const props = {
  title: "Prueba",
  date: "Prueba",
  author: "Prueba",
  description: "Prueba",
  markers : [
    {lat: 43.354831, lng: -5.851303},
    {lat: 43.356440, lng: -5.854693},
    {lat: 43.361836, lng: -5.850547}
  ]
};

describe.only('TimelineRoute', () => {
  afterAll(cleanup);
  const { container, getByTestId } = render(
      <Router>
        <TimeLineRoute {...{ ...props }} />
      </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
