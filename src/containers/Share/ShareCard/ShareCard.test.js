import React from 'react';
import {cleanup, fireEvent, getByTestId, render} from 'react-testing-library';
import {HashRouter as Router} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import ShareCard from './ShareCard';

library.add(fas);

const props = {
    friendWebID: "https://viades2c.solid.community/",
    WebID: "https://viades2c.solid.community/",
    url: "prueba",
};

describe.only('CreateRoute', () => {
  afterAll(cleanup);
  const { container } = render(
      <Router>
        <ShareCard {...{...props}}/>
      </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('render components', () => {
      const share_card = getByTestId(container, 'share-card');
      const share_card_title = getByTestId(container, 'share-card-title');
      const share_card_share = getByTestId(container, 'share-card-share');
      expect(share_card_share).not.toBe(null);
      expect(share_card_title).not.toBe(null);
      expect(share_card).not.toBe(null);
      fireEvent.click(share_card_share);
  });

});
