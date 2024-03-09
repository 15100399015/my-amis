import {
  BaseEventContext,
  LayoutBasePlugin,
  RegionConfig,
  getSchemaTpl,
  RendererPluginEvent,
  registerEditorPlugin
} from 'amis-editor-core';

export class BaseViewPlugin extends LayoutBasePlugin {
  static id = 'BaseViewPlugin';
  // 关联渲染器名字
  rendererName = 'base-view';
  $schema = '/schemas/ContainerSchema.json';

  // 组件名称
  name = '容器';
  isBaseComponent = true;
  description = '一个简单的View组件。';
  docLink = '/amis/zh-CN/components/container';
  tags = ['基本组件'];
  order = 1;
  icon = 'fa fa-square-o';
  pluginIcon = 'container-plugin';
  scaffold = {
    type: 'base-view',
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

  panelTitle = '容器';

  panelJustify = true;

  // 事件定义
  events: RendererPluginEvent[] = [];

  panelBodyCreator = (context: BaseEventContext) => {
    const curRendererSchema = context?.schema;

    return getSchemaTpl('tabs', [
      {
        title: '属性',
        body: []
      },
      {
        title: '布局',
        body: [
          getSchemaTpl('layout:position'),
          getSchemaTpl('layout:inset', {
            mode: 'vertical'
          }),
          getSchemaTpl('layout:z-index'),

          getSchemaTpl('layout:flex-setting', {
            direction: curRendererSchema.direction,
            justify: curRendererSchema.justify,
            alignItems: curRendererSchema.alignItems
          }),

          getSchemaTpl('layout:flex-wrap', {
            label: '换行'
          }),

          getSchemaTpl('layout:flex', {
            label: 'flex'
          }),
          getSchemaTpl('layout:flex-grow', {
            label: '扩大系数',
            visibleOn:
              'data.style && data.style.flex === "1 1 auto" && (data.style.position === "relative")'
          }),
          getSchemaTpl('layout:flex-basis', {
            label: 'flex宽度',
            visibleOn:
              'data.style && data.style.flex === "1 1 auto" && (data.style.position === "relative")'
          }),

          getSchemaTpl('layout:isFixedWidth', {
            onChange: (value: boolean) => {
              context?.node.setWidthMutable(value);
            }
          }),
          getSchemaTpl('layout:width', {}),
          getSchemaTpl('layout:max-width', {}),
          getSchemaTpl('layout:min-width', {}),

          getSchemaTpl('layout:isFixedHeight', {
            onChange: (value: boolean) => {
              context?.node.setHeightMutable(value);
            }
          }),
          getSchemaTpl('layout:height', {}),
          getSchemaTpl('layout:max-height', {}),
          getSchemaTpl('layout:min-height', {}),

          getSchemaTpl('layout:overflow', {})
        ]
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

registerEditorPlugin(BaseViewPlugin);
