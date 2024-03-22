import React = require('react');
import {render} from '@testing-library/react';
import '../../src';
import {render as mdesRender} from '../../src';
import {makeEnv} from '../helper';

test('Renderer:sparkline', () => {
  const {container} = render(
    mdesRender(
      {
        type: 'sparkline',
        height: 30,
        value: [3, 5, 2, 4, 1, 8, 3, 7]
      },
      {},
      makeEnv({})
    )
  );

  expect(container).toMatchSnapshot();
});
