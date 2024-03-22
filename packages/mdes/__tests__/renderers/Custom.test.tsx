import React = require('react');
import {render} from '@testing-library/react';
import '../../src';
import {render as mdesRender} from '../../src';
import {makeEnv} from '../helper';

test('Renderer:custom', () => {
  const {container} = render(
    mdesRender(
      {
        type: 'custom',
        name: 'myName',
        className: 'mdes-custom-demo',
        html: '<div><h2>hello, world!</h2></div>',
        label: '自定义组件',
        onMount: (dom: HTMLElement, value: any, onChange: any, props: any) => {
          const button = document.createElement('button');
          button.innerText = '点击修改';
          button.onclick = event => {
            event.preventDefault();
          };
          dom.appendChild(button);
        }
      },
      {},
      makeEnv({})
    )
  );

  expect(container).toMatchSnapshot();
});
