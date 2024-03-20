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
  // 组件名称
  name = '图片';
  isBaseComponent = true;
  description = '一个简单的Image组件。';
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
    return getSchemaTpl('tabs', [
      {
        title: '属性',
        body: [
          getSchemaTpl('imageUrl', {
            name: 'src',
            label: '图片地址'
          }),
          getSchemaTpl('layout:image-resizeMode', {
            name: 'resizeMode',
            label: '图片平铺模式'
          })
        ]
      },
      {
        title: '布局',
        body: getSchemaTpl('collapseGroup', [
          {
            header: '宽高',
            key: 'Width&Height',
            body: [
              getSchemaTpl('layout:isFixedWidth', {
                onChange: (value: boolean) => {
                  context?.node.setWidthMutable(value);
                }
              }),
              getSchemaTpl('layout:width'),
              getSchemaTpl('layout:max-width'),
              getSchemaTpl('layout:min-width'),

              getSchemaTpl('layout:isFixedHeight', {
                onChange: (value: boolean) => {
                  context?.node.setHeightMutable(value);
                }
              }),
              getSchemaTpl('layout:height'),
              getSchemaTpl('layout:max-height'),
              getSchemaTpl('layout:min-height')
            ]
          },
          {
            header: 'Flex布局',
            key: 'position',
            body: [
              getSchemaTpl('layout:flex', {
                label: 'flex'
              }),
              getSchemaTpl('layout:flex-shrink', {
                label: 'flexShrink'
              }),
              getSchemaTpl('layout:flex-grow', {
                label: 'flexGrow'
              }),
              getSchemaTpl('layout:flex-basis', {
                label: 'flexBasis'
              })
            ]
          },
          {
            header: '定位',
            key: 'position',
            body: [
              getSchemaTpl('layout:position'),
              getSchemaTpl('layout:inset', {
                mode: 'vertical'
              })
            ]
          },
          {
            header: '其他',
            key: 'other',
            body: [getSchemaTpl('layout:z-index')]
          }
        ])
      },
      {
        title: '外观',
        className: 'p-none',
        body: getSchemaTpl('collapseGroup', [
          ...getSchemaTpl('style:common', ['font', 'layout'])
        ])
      }
    ]);
  };
}

registerEditorPlugin(BaseImagePlugin);
