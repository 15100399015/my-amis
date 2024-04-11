import React from 'react';
import type {ReactElement} from 'react';
// 组件 map
export class ComponentMap {
  private readonly map = new Map<string, React.ComponentType>();
  public register(name: string, element: React.ComponentType) {
    if (!this.map.has(name)) this.map.set(name.toLowerCase(), element);
  }
  public getComponent(name: string) {
    return this.map.get(name);
  }
  public hasComponent(name: string) {
    return this.map.has(name);
  }
}
export const componentMap = new ComponentMap();

export const EmptyComponent = () => null;

type RendererProps = {
  schema: any;
  /**
   * 上下文数据
   */
  contextData: any;
  /**
   * 事件
   */
  events: Record<string, Function>;
};
type RendererState = {
  element: any;
};

/**
 * 是否文本组件
 * @param item
 * @returns
 */
const isText = (item: any) => item.type === 'base-text';

/**
 * 渲染能力组件
 */
export class Rnederer extends React.PureComponent<
  RendererProps,
  RendererState
> {
  state: Readonly<RendererState> = {
    element: null
  };

  constructor(props: RendererProps) {
    super(props);
  }

  componentDidUpdate(
    prevProps: Readonly<RendererProps>,
    prevState: Readonly<RendererState>,
    snapshot?: any
  ): void {
    // schema 更新
    if (prevProps.schema !== this.props.schema) {
      this.setState({element: this.getReactElementTree()});
    }
  }

  private getReactElementTree() {
    return mapElement(this.props.schema);
  }

  render(): React.ReactNode {
    const {element} = this.state;
    return <>{element}</>;
  }
}

function mapElement(schema: any): any {
  // 如
  if (!Array.isArray(schema) || schema.length === 0) return null;
  return schema.map((item, index) => {
    const el = componentMap.getComponent(item.type);
    if (!el) return null;
    return React.createElement(
      el,
      {...item, key: index, body: null},
      isText(item) ? item.content : mapElement(item.body)
    );
  });
}
