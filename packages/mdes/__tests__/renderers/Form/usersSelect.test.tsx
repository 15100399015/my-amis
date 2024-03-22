import React = require('react');
import {render, cleanup} from '@testing-library/react';
import '../../../src';
import {render as mdesRender} from '../../../src';
import {makeEnv} from '../../helper';

test('Renderer:usersselect', async () => {
  const {container} = render(
    mdesRender(
      {
        type: 'form',
        api: '/api/mock2/form/saveForm',
        controls: [
          {
            type: 'users-select',
            name: 'usersselect',
            label: '人员选择',
            source: '/mdes/api/mock2/form/departUser',
            deferApi: '/mdes/api/mock2/form/departUser?ref=${ref}&dep=${value}',
            searchApi: '',
            isRef: true,
            isDep: false
          }
        ],
        title: 'The form',
        actions: []
      },
      {},
      makeEnv()
    )
  );
  expect(container).toMatchSnapshot();
});
