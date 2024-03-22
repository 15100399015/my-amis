import {renderersMap, Renderer} from '../factory';
import {OptionsControl} from './Options';
import FormItem from './Item';

declare const window: Window & {
  MdesCustomRenderers: {
    [props: string]: any;
  };
};

/**
 * 提供两种特殊的注册渲染器的方式
 * 1、自动加载预先注册的自定义渲染器：自动加载并注册 window.MdesCustomRenderers 中的渲染器
 * 2、通过 postMessage 告知 mdes 注册一个新的渲染器：间接注册渲染器，无需直接依赖 mdes。
 */

// 自动加载预先注册的自定义渲染器
export function autoPreRegisterMdesCustomRenderers() {
  if (window.MdesCustomRenderers) {
    Object.keys(window.MdesCustomRenderers).forEach(rendererType => {
      if (renderersMap[rendererType]) {
        console.warn(
          `[mdes-core]：预注册渲染器失败，当前已存在重名渲染器（${rendererType}）。`
        );
      } else {
        const curMdesRenderer = window.MdesCustomRenderers[rendererType];
        if (curMdesRenderer) {
          registerMdesRendererByUsage(rendererType, curMdesRenderer);
        }
      }
    });
  }
}

// 自动加载并注册 window.MdesCustomRenderers 中的渲染器
autoPreRegisterMdesCustomRenderers();

// postMessage 渲染器动态注册机制
window.addEventListener(
  'message',
  (event: any) => {
    if (!event.data) {
      return;
    }
    if (
      event.data?.type === 'mdes-renderer-register-event' &&
      event.data?.mdesRenderer &&
      event.data.mdesRenderer.type
    ) {
      const curMdesRenderer = event.data?.mdesRenderer;
      const curUsage = curMdesRenderer?.usage || 'renderer';
      if (renderersMap[curMdesRenderer.type]) {
        console.warn(
          `[mdes-core]：动态注册渲染器失败，当前已存在重名渲染器（${curMdesRenderer.type}）。`
        );
      } else {
        console.info(
          '[mdes-core]响应动态注册渲染器事件：',
          curMdesRenderer.type
        );
        registerMdesRendererByUsage(curUsage, curMdesRenderer);
      }
    }
  },
  false
);

// 根据类型（usage）进行注册 mdes渲染器
function registerMdesRendererByUsage(curUsage: string, curMdesRenderer: any) {
  // 当前支持注册的渲染器类型
  const registerMap: {
    [props: string]: Function;
  } = {
    renderer: Renderer,
    formitem: FormItem,
    options: OptionsControl
  };
  let curMdesRendererComponent = curMdesRenderer.component;
  if (
    !curMdesRendererComponent &&
    window.MdesCustomRenderers &&
    window.MdesCustomRenderers[curMdesRenderer.type] &&
    window.MdesCustomRenderers[curMdesRenderer.type].component
  ) {
    curMdesRendererComponent =
      window.MdesCustomRenderers[curMdesRenderer.type].component;
  }
  if (
    curMdesRendererComponent &&
    ['renderer', 'formitem', 'options'].includes(curUsage) &&
    registerMap[curUsage]
  ) {
    registerMap[curUsage as keyof typeof registerMap]({
      ...(curMdesRenderer.config || {}),
      type: curMdesRenderer.type,
      weight: curMdesRenderer.weight || 0,
      autoVar: curMdesRenderer.autoVar || false
    })(curMdesRendererComponent);
  }
}
