import {
  BaseEventContext,
  LayoutBasePlugin,
  RegionConfig,
  getSchemaTpl,
  RendererPluginEvent,
  registerEditorPlugin
} from 'amis-editor-core';

export class BaseTouchableViewPlugin extends LayoutBasePlugin {
  static id = 'BaseTouchableViewPlugin';
  // 关联渲染器名字
  rendererName = 'base-touchableview';
  $schema = '/schemas/ContainerSchema.json';

  // 组件名称
  name = '可触摸容器';
  isBaseComponent = true;
  description = '一个简单的TouchableView组件。';
  docLink = '/amis/zh-CN/components/container';
  tags = ['基本组件'];
  order = 5;
  icon = 'fa fa-square-o';
  pluginIcon = 'container-plugin';
  scaffold = {
    type: 'base-touchableview',
    body: [],
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row'
    }
  };
  previewSchema = {
    ...this.scaffold
  };

  regions: Array<RegionConfig> = [
    {
      key: 'body',
      label: '内容区'
    }
  ];

  panelTitle = '可触摸容器';

  panelJustify = true;

  // 事件定义
  events: RendererPluginEvent[] = [];

  panelBodyCreator = (context: BaseEventContext) => {
    const curRendererSchema = context?.schema;
    const isRowContent =
      curRendererSchema?.direction === 'row' ||
      curRendererSchema?.direction === 'row-reverse';
    // const isFlexContainer = this.manager?.isFlexContainer(context?.id);
    const isFreeContainer = curRendererSchema?.isFreeContainer || false;
    const isFlexItem = this.manager?.isFlexItem(context?.id);
    const isFlexColumnItem = this.manager?.isFlexColumnItem(context?.id);

    return getSchemaTpl('tabs', [
      {
        title: '属性',
        body: getSchemaTpl('collapseGroup', [
          {
            title: '布局',
            body: [
              // 定位
              getSchemaTpl('layout:position', {
                visibleOn: '!data.stickyStatus'
              }),
              //
              getSchemaTpl('layout:originPosition'),
              getSchemaTpl('layout:inset', {
                mode: 'vertical'
              }),

              getSchemaTpl('layout:flex-setting', {
                direction: curRendererSchema.direction,
                justify: curRendererSchema.justify,
                alignItems: curRendererSchema.alignItems
              }),

              getSchemaTpl('layout:flex-wrap', {}),

              getSchemaTpl('layout:flex', {
                isFlexColumnItem,
                label: isFlexColumnItem ? '高度设置' : '宽度设置',
                visibleOn:
                  'data.style && (data.style.position === "static" || data.style.position === "relative")'
              }),
              getSchemaTpl('layout:flex-grow', {
                visibleOn:
                  'data.style && data.style.flex === "1 1 auto" && (data.style.position === "static" || data.style.position === "relative")'
              }),
              getSchemaTpl('layout:flex-basis', {
                label: isFlexColumnItem ? '弹性高度' : '弹性宽度',
                visibleOn:
                  'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "1 1 auto"'
              }),
              getSchemaTpl('layout:flex-basis', {
                label: isFlexColumnItem ? '固定高度' : '固定宽度',
                visibleOn:
                  'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "0 0 150px"'
              }),
              getSchemaTpl('layout:overflow-x', {
                visibleOn: `${
                  isFlexItem && !isFlexColumnItem
                } && data.style.flex === '0 0 150px'`
              }),

              getSchemaTpl('layout:isFixedHeight', {
                visibleOn: `${!isFlexItem || !isFlexColumnItem}`,
                onChange: (value: boolean) => {
                  context?.node.setHeightMutable(value);
                }
              }),
              getSchemaTpl('layout:height', {
                visibleOn: `${!isFlexItem || !isFlexColumnItem}`
              }),
              getSchemaTpl('layout:max-height', {
                visibleOn: `${!isFlexItem || !isFlexColumnItem}`
              }),
              getSchemaTpl('layout:min-height', {
                visibleOn: `${!isFlexItem || !isFlexColumnItem}`
              }),
              getSchemaTpl('layout:overflow-y', {
                visibleOn: `${
                  !isFlexItem || !isFlexColumnItem
                } && (data.isFixedHeight || data.style && data.style.maxHeight) || (${
                  isFlexItem && isFlexColumnItem
                } && data.style.flex === '0 0 150px')`
              }),

              getSchemaTpl('layout:isFixedWidth', {
                visibleOn: `${!isFlexItem || isFlexColumnItem}`,
                onChange: (value: boolean) => {
                  context?.node.setWidthMutable(value);
                }
              }),
              getSchemaTpl('layout:width', {
                visibleOn: `${!isFlexItem || isFlexColumnItem}`
              }),
              getSchemaTpl('layout:max-width', {
                visibleOn: `${
                  !isFlexItem || isFlexColumnItem
                } || ${isFlexItem} && data.style.flex !== '0 0 150px'`
              }),
              getSchemaTpl('layout:min-width', {
                visibleOn: `${
                  !isFlexItem || isFlexColumnItem
                } || ${isFlexItem} && data.style.flex !== '0 0 150px'`
              }),

              getSchemaTpl('layout:overflow-x', {
                visibleOn: `${
                  !isFlexItem || isFlexColumnItem
                } && (data.isFixedWidth || data.style && data.style.maxWidth)`
              }),

              getSchemaTpl('style:opacity', {}),

              !isFlexItem ? getSchemaTpl('layout:margin-center') : null,
              !isFlexItem && !isFreeContainer
                ? getSchemaTpl('layout:textAlign', {
                    name: 'style.textAlign',
                    label: '内部对齐方式',
                    visibleOn:
                      'data.style && data.style.display !== "flex" && data.style.display !== "inline-flex"'
                  })
                : null,
              getSchemaTpl('layout:z-index'),
              getSchemaTpl('layout:sticky', {
                visibleOn:
                  'data.style && (data.style.position !== "fixed" && data.style.position !== "absolute")'
              }),
              getSchemaTpl('layout:stickyPosition')
            ]
          }
        ])
      },
      {
        title: '外观',
        className: 'p-none',
        body: getSchemaTpl('collapseGroup', [
          ...getSchemaTpl('style:common', ['font'])
        ])
      }
    ]);
  };
}

registerEditorPlugin(BaseTouchableViewPlugin);
