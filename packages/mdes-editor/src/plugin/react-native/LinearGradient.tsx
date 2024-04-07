import {
  BaseEventContext,
  LayoutBasePlugin,
  RegionConfig,
  getSchemaTpl,
  RendererPluginEvent,
  registerEditorPlugin
} from 'mdes-editor-core';
import {defaultLayoutStyle} from '../../utils';

export class BaseLinearGradientPlugin extends LayoutBasePlugin {
  static scene: string[] = ['layout'];
  static id = 'BaseLinearGradientPlugin';
  // 关联渲染器名字
  rendererName = 'base-lineargradient';
  // 组件名称
  name = '线性渐变';
  isBaseComponent = true;
  description = '一个简单的LinearGradient组件。';
  tags = ['基本组件'];
  order = 6;
  icon = 'fa fa-square-o';
  pluginIcon = 'container-plugin';
  scaffold = {
    type: 'base-lineargradient',
    body: [],
    style: {
      ...defaultLayoutStyle
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

  panelTitle = '线性渐变';

  panelJustify = true;

  // 事件定义
  events: RendererPluginEvent[] = [];

  panelBodyCreator = (context: BaseEventContext) => {
    const curRendererSchema = context?.schema;

    return getSchemaTpl('tabs', [
      {
        title: '属性',
        body: [
          getSchemaTpl('theme:colorPickerGradient', {
            label: '渐变'
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
              getSchemaTpl('layout:flex-setting', {
                direction: curRendererSchema.direction,
                justify: curRendererSchema.justify,
                alignItems: curRendererSchema.alignItems
              }),
              getSchemaTpl('layout:flex-wrap', {
                label: 'flexWrap'
              }),
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
            body: [
              getSchemaTpl('layout:overflow'),
              getSchemaTpl('layout:z-index')
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

registerEditorPlugin(BaseLinearGradientPlugin);
