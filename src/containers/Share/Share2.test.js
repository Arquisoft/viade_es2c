import React from 'react';
import {cleanup, fireEvent, getByTestId, render} from 'react-testing-library';
import {HashRouter as Router} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import Share2 from "./Share2";
import Route from "../../utils/route/Route";

library.add(fas);

const markers = [
    {position: {lat: 43.354831, lng: -5.851303}},
    {position: {lat: 43.356440, lng: -5.854693}},
    {position: {lat: 43.361836, lng: -5.850547}}
];

const ruta = new Route("prueba", "prueba", markers, "https://viades2c.solid.community/", [], [],[], "prueba");

const props = {
    route: ruta
};


describe.only('CreateRoute', () => {
  afterAll(cleanup);
  const { container } = render(
      <Router>
        <Share2 {...{...props}}/>
      </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('render components', () => {
      const share_button_open = getByTestId(container, 'share-button-open');
      fireEvent.click(share_button_open);

      setTimeout(function () {
          const share_modal = getByTestId(container, 'share-modal');
          const share_title = getByTestId(container, 'share-title');
          const share_body = getByTestId(container, 'share-body');
          const share_button_close = getByTestId(container, 'share-button-close');
          expect(share_button_open).not.toBe(null);
          expect(share_modal).not.toBe(null);
          expect(share_title).not.toBe(null);
          expect(share_body).not.toBe(null);
          expect(share_button_close).not.toBe(null);
          fireEvent.click(share_button_close);
      }, 1000);
  });

});
