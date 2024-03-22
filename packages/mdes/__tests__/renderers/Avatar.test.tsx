import React = require('react');
import {render} from '@testing-library/react';
import '../../src';
import {render as mdesRender} from '../../src';
import {makeEnv} from '../helper';

test('Renderer:avatar test', () => {
  const {container} = render(
    mdesRender(
      {
        type: 'avatar',
        text: 'AM'
      },
      {},
      makeEnv({})
    )
  );
  expect(container).toMatchSnapshot();
});

test('Renderer:avatar icon', () => {
  const {container} = render(
    mdesRender(
      {
        type: 'avatar',
        icon: 'fa fa-user'
      },
      {},
      makeEnv({})
    )
  );

  expect(container).toMatchSnapshot();
});

test('Renderer:avatar var', () => {
  const {container} = render(
    mdesRender(
      {
        data: {
          myAvatar: 'https://suda.cdn.bcebos.com/images/mdes/ai-fake-face.jpg'
        },
        type: 'page',
        body: [
          {
            type: 'avatar',
            icon: 'fa fa-user',
            src: '$myAvatar'
          },
          {
            type: 'avatar',
            icon: 'fa fa-user',
            src: '$other'
          },
          {
            type: 'avatar',
            src: '$other',
            icon: 'fa fa-user',
            text: 'avatar'
          }
        ]
      },
      {},
      makeEnv({})
    )
  );

  expect(container).toMatchSnapshot();
});

test('Renderer:avatar shape', () => {
  const {container} = render(
    mdesRender(
      {
        type: 'page',
        body: [
          {
            type: 'avatar',
            shape: 'square',
            text: 'AM'
          },
          {
            type: 'avatar',
            shape: 'rounded',
            text: 'AM',
            style: {
              marginLeft: '10px'
            }
          }
        ]
      },
      {},
      makeEnv({})
    )
  );

  expect(container).toMatchSnapshot();
});

test('Renderer:avatar size', () => {
  const {container} = render(
    mdesRender(
      {
        type: 'page',
        body: [
          {
            type: 'avatar',
            size: 'large',
            icon: 'fa fa-user'
          },
          {
            type: 'avatar',
            size: 'default',
            icon: 'fa fa-user'
          },
          {
            type: 'avatar',
            size: 'small',
            icon: 'fa fa-user'
          },
          {
            type: 'avatar',
            size: 60,
            src: 'https://suda.cdn.bcebos.com/images/mdes/ai-fake-face.jpg'
          },
          {
            type: 'avatar',
            src: 'https://suda.cdn.bcebos.com/images/mdes/ai-fake-face.jpg'
          },
          {
            type: 'avatar',
            size: 20,
            src: 'https://suda.cdn.bcebos.com/images/mdes/ai-fake-face.jpg'
          }
        ]
      },
      {},
      makeEnv({})
    )
  );

  expect(container).toMatchSnapshot();
});

test('Renderer:avatar gap', () => {
  const {container} = render(
    mdesRender(
      {
        type: 'page',
        body: [
          {
            type: 'avatar',
            text: 'ejson',
            gap: 2
          },
          {
            type: 'avatar',
            text: 'ejson',
            gap: 7
          }
        ]
      },
      {},
      makeEnv({})
    )
  );

  expect(container).toMatchSnapshot();
});

test('Renderer:avatar fit', () => {
  const {container} = render(
    mdesRender(
      {
        type: 'page',
        body: [
          {
            type: 'avatar',
            fit: 'cover',
            src: 'https://suda.cdn.bcebos.com/images/mdes/plumeria.jpeg'
          },
          {
            type: 'avatar',
            fit: 'fill',
            src: 'https://suda.cdn.bcebos.com/images/mdes/plumeria.jpeg'
          },
          {
            type: 'avatar',
            fit: 'contain',
            src: 'https://suda.cdn.bcebos.com/images/mdes/plumeria.jpeg'
          },
          {
            type: 'avatar',
            fit: 'none',
            src: 'https://suda.cdn.bcebos.com/images/mdes/plumeria.jpeg'
          },
          {
            type: 'avatar',
            fit: 'scale-down',
            src: 'https://suda.cdn.bcebos.com/images/mdes/plumeria.jpeg'
          }
        ]
      },
      {},
      makeEnv({})
    )
  );

  expect(container).toMatchSnapshot();
});

test('Renderer:avatar style', () => {
  const {container} = render(
    mdesRender(
      {
        type: 'avatar',
        text: 'AM',
        style: {
          background: '#DB3E35',
          color: '#FFFFFF'
        }
      },
      {},
      makeEnv({})
    )
  );

  expect(container).toMatchSnapshot();
});
