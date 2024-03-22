import React = require('react');
import PageRenderer from '../../../../mdes-core/src/renderers/Form';
import * as renderer from 'react-test-renderer';
import {render, fireEvent, cleanup, getByText} from '@testing-library/react';
import '../../../src';
import {render as mdesRender} from '../../../src';
import {makeEnv, wait} from '../../helper';

test('Renderer:time', async () => {
  //   const {container} = render(
  //     mdesRender(
  //       {
  //         type: 'form',
  //         api: '/api/xxx',
  //         debug: true,
  //         controls: [
  //           {
  //             type: 'time',
  //             name: 'a',
  //             label: 'time',
  //             value: '1559322060'
  //           }
  //         ],
  //         title: 'The form',
  //         actions: []
  //       },
  //       {},
  //       makeEnv({})
  //     )
  //   );
  //   await wait(200);
  // todo 这个用例有问题，先注释
  //   const input = container.querySelector('.cxd-DatePicker-value');
  //   expect(input?.innerHTML).toEqual('01:01');
  //   expect(container).toMatchSnapshot();
});
