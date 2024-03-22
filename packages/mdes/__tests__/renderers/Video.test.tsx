import {render} from '@testing-library/react';
import {render as mdesRender} from '../../src';
import {makeEnv} from '../helper';

test('Renderer:alert', () => {
  const {container} = render(
    mdesRender(
      {
        type: 'video',
        src: '${url}'
      },
      {
        data: {
          url: 'https://example.com/video.mp4'
        }
      },
      makeEnv({})
    )
  );

  expect(container).toMatchSnapshot();
});
