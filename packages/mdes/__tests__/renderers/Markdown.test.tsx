import React = require('react');
import {render, waitFor} from '@testing-library/react';

import '../../src';
import {render as mdesRender} from '../../src';
import {makeEnv} from '../helper';

test('Renderer:markdown', async () => {
  const {container, getByTestId} = render(
    mdesRender(
      {
        type: 'markdown',
        value: '# title\n markdown **text**'
      },
      {},
      makeEnv({})
    )
  );

  await waitFor(() => {
    expect(getByTestId('markdown-body')).toBeInTheDocument();
  });
  expect(container).toMatchSnapshot();
});
