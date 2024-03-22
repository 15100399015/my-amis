import {render} from '@testing-library/react';
import {render as mdesRender} from '../../src';
import {makeEnv} from '../helper';

let times = 0;

beforeAll(() => {
  // jsdom not implemented: HTMLMediaElement.prototype.load
  // here: https://github.com/jsdom/jsdom/issues/1515
  Object.defineProperty(global.window.HTMLMediaElement.prototype, 'load', {
    get() {
      return () => {
        times++;
      };
    }
  });
});

afterEach(() => {
  times = 0;
});

test('Renderer:audio', () => {
  const {container} = render(
    mdesRender(
      {
        type: 'audio',
        src: '${url}'
      },
      {
        data: {
          url: 'https://example.com/music.mp3'
        }
      },
      makeEnv({})
    )
  );

  expect(container).toMatchSnapshot();
});

test('should not call load method at first render phase', () => {
  render(
    mdesRender(
      {
        type: 'audio',
        src: 'https://example.com/music.mp3'
      },
      {},
      makeEnv({})
    )
  );

  expect(times).toBe(0);
});
