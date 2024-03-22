import React = require('react');
import {render} from '@testing-library/react';
import '../../src';
import {render as mdesRender} from '../../src';
import {makeEnv} from '../helper';

test('Renderer:mdesRender test', () => {
  const {container} = render(
    mdesRender(
      {
        type: 'mdes',
        value: {
          type: 'tpl',
          tpl: 'hello world'
        }
      },
      {},
      makeEnv({})
    )
  );
  expect(container).toMatchSnapshot();
});
