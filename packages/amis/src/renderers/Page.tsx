import React from 'react';
import {Renderer, RendererProps, setThemeClassName} from 'amis-core';
import {ServiceStore, IServiceStore} from 'amis-core';
import {Location} from 'amis-core';
import {ScopedContext, IScopedContext} from 'amis-core';
import {SpinnerExtraProps} from 'amis-ui';
import {BaseSchema, SchemaCollection, SchemaName} from '../Schema';

/**
 * css 定义
 */
interface CSSRule {
  [selector: string]:
    | Record<string, string>
    | Record<string, Record<string, string>>; // 定义
}

/**
 * amis Page 渲染器。详情请见：https://aisuda.bce.baidu.com/amis/zh-CN/components/page
 */
export interface PageSchema extends BaseSchema, SpinnerExtraProps {
  /**
   * 指定为 page 渲染器。
   */
  type: 'page';

  /**
   * 页面标题
   */
  title?: string;
  /**
   * 内容区域
   */
  body?: SchemaCollection;

  /**
   * 自定义页面级别样式表
   */
  css?: CSSRule;

  name?: SchemaName;

  /**
   * 自定义样式
   */
  style?: {
    [propName: string]: any;
  };
}

export interface PageProps
  extends RendererProps,
    Omit<PageSchema, 'type' | 'className'> {
  data: any;
  store: IServiceStore;
  location?: Location;
}

export default class Page extends React.Component<PageProps> {
  static defaultProps = {};

  static propsList: Array<keyof PageProps> = [
    'title',
    'bodyClassName',
    'body',
    'messages',
    'style'
  ];

  render() {
    const {
      className,
      store,
      body,
      render,
      classnames: cx,
      style,
      translate: __,
      id
    } = this.props;

    const subProps = {
      pageLoading: store.loading
    };

    return (
      <div
        className={cx(
          `Page`,
          className,
          setThemeClassName({
            name: 'baseControlClassName',
            id,
            themeCss: {},
            ...this.props
          }),
          setThemeClassName({
            name: 'wrapperCustomStyle',
            id,
            themeCss: {},
            ...this.props
          })
        )}
        style={style}
      >
        <div className={cx('Page-content')}>
          <div className={cx('Page-main')}>
            {/* role 用于 editor 定位 Spinner */}
            <div
              className={cx(
                `Page-body`,
                setThemeClassName({
                  ...this.props,
                  name: 'bodyControlClassName',
                  id,
                  themeCss: {}
                })
              )}
            >
              {render('body', body || '', subProps)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

@Renderer({
  type: 'page',
  storeType: ServiceStore.name,
  isolateScope: true
})
export class PageRenderer extends Page {
  static contextType = ScopedContext;

  constructor(props: PageProps, context: IScopedContext) {
    super(props);

    const scoped = context;
    scoped.registerComponent(this);
  }
}
