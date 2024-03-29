import {fireEvent, render, waitFor} from '@testing-library/react';
import '../../../src';
import {render as mdesRender} from '../../../src';
import {makeEnv} from '../../helper';

test('EventAction:container', async () => {
  const notify = jest.fn();
  const {getByText, container}: any = render(
    mdesRender(
      {
        type: 'page',
        body: [
          {
            type: 'container',
            body: '这里是容器内容区',
            onEvent: {
              click: {
                actions: [
                  {
                    actionType: 'toast',
                    args: {
                      msgType: 'info',
                      msg: '派发点击事件'
                    }
                  }
                ]
              },
              mouseenter: {
                actions: [
                  {
                    actionType: 'toast',
                    args: {
                      msgType: 'info',
                      msg: '派发鼠标移入事件'
                    }
                  }
                ]
              },
              mouseleave: {
                actions: [
                  {
                    actionType: 'toast',
                    args: {
                      msgType: 'info',
                      msg: '派发鼠标移出事件'
                    }
                  }
                ]
              }
            }
          }
        ]
      },
      {},
      makeEnv({
        notify
      })
    )
  );

  fireEvent.click(getByText('这里是容器内容区'));
  await waitFor(() => {
    expect(notify).toHaveBeenCalledWith('info', '派发点击事件', {
      msg: '派发点击事件',
      msgType: 'info'
    });
  });
  fireEvent.mouseEnter(getByText('这里是容器内容区'));
  await waitFor(() => {
    expect(notify).toHaveBeenCalledWith('info', '派发鼠标移入事件', {
      msg: '派发鼠标移入事件',
      msgType: 'info'
    });
  });
  fireEvent.mouseLeave(getByText('这里是容器内容区'));
  await waitFor(() => {
    expect(notify).toHaveBeenCalledWith('info', '派发鼠标移出事件', {
      msg: '派发鼠标移出事件',
      msgType: 'info'
    });
  });
});
