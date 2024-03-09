import {
  BaseEventContext,
  LayoutBasePlugin,
  RegionConfig,
  getSchemaTpl,
  RendererPluginEvent,
  registerEditorPlugin
} from 'amis-editor-core';

export class BaseImagePlugin extends LayoutBasePlugin {
  static id = 'BaseImagePlugin';
  // 关联渲染器名字
  rendererName = 'base-image';
  $schema = '/schemas/ContainerSchema.json';

  // 组件名称
  name = '图片';
  isBaseComponent = true;
  description = '一个简单的Image组件。';
  docLink = '/amis/zh-CN/components/container';
  tags = ['基本组件'];
  order = 4;
  icon = 'fa fa-square-o';
  pluginIcon = 'container-plugin';
  scaffold = {
    type: 'base-image',
    body: [],
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      width: '100px',
      height: '100px'
    },
    isFixedHeight: true,
    isFixedWidth: true
  };
  previewSchema = {
    ...this.scaffold
  };

  regions: Array<RegionConfig> = [];

  panelTitle = '图片';

  panelJustify = true;

  // 事件定义
  events: RendererPluginEvent[] = [];

  panelBodyCreator = (context: BaseEventContext) => {
    const curRendererSchema = context?.schema;

    return getSchemaTpl('tabs', [
      {
        title: '属性',
        body: [
          getSchemaTpl('imageUrl', {
            name: 'src',
            label: '图片地址'
          })
        ]
      },
      {
        title: '布局',
        body: [
          getSchemaTpl('layout:position', {
            visibleOn: '!data.stickyStatus'
          }),
          getSchemaTpl('layout:originPosition'),
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
            label: 'flex-wrap'
          }),

          getSchemaTpl('layout:flex', {
            label: 'flex'
          }),
          getSchemaTpl('layout:flex-grow', {
            label: 'flex-grow',
            visibleOn:
              'data.style && data.style.flex === "1 1 auto" && (data.style.position === "static" || data.style.position === "relative")'
          }),
          getSchemaTpl('layout:flex-basis', {
            label: 'flex-basis',
            visibleOn:
              'data.style && data.style.flex === "1 1 auto" && (data.style.position === "static" || data.style.position === "relative")'
          }),

          getSchemaTpl('layout:isFixedWidth', {
            onChange: (value: boolean) => {
              context?.node.setWidthMutable(value);
            }
          }),
          getSchemaTpl('layout:width', {}),
          getSchemaTpl('layout:max-width', {}),
          getSchemaTpl('layout:min-width', {}),

          getSchemaTpl('layout:overflow-x', {}),

          getSchemaTpl('layout:isFixedHeight', {
            onChange: (value: boolean) => {
              context?.node.setHeightMutable(value);
            }
          }),
          getSchemaTpl('layout:height', {}),
          getSchemaTpl('layout:max-height', {}),
          getSchemaTpl('layout:min-height', {}),
          getSchemaTpl('layout:overflow-y', {})
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

registerEditorPlugin(BaseImagePlugin);
