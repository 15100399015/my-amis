import React = require('react');
import {render, fireEvent, waitFor} from '@testing-library/react';
import '../../src';
import {render as mdesRender} from '../../src';
import {makeEnv, wait} from '../helper';
import 'jest-canvas-mock';

test('Renderer:bar-code', async () => {
  const {container} = render(
    mdesRender(
      {
        type: 'page',
        body: {
          type: 'barcode',
          value: 'mdes'
        }
      },
      {},
      makeEnv({})
    )
  );
  await waitFor(() =>
    expect(container.querySelector('.cxd-BarCode')).toBeInTheDocument()
  );

  expect(container).toMatchSnapshot();
});
