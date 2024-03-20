import {ContainerWrapper, RegionConfig} from 'amis-editor-core';
import {registerEditorPlugin} from 'amis-editor-core';
import {BaseEventContext, BasePlugin, getSchemaTpl} from 'amis-editor-core';
import type {SchemaObject} from 'amis';

export class PagePlugin extends BasePlugin {
  static id = 'PagePlugin';
  // 关联渲染器名字
  rendererName = 'page';
  $schema = '/schemas/PageSchema.json';

  // 组件名称
  name = '页面';
  isBaseComponent = true;
  // 只有顶级才会用到这个page组件
  disabledRendererPlugin = true;
  description = '页面渲染器，页面的顶级入口。';
  tags = '容器';
  icon = 'fa fa-desktop';
  // pluginIcon = 'page-plugin'; // 暂无新 icon
  scaffold: SchemaObject = {
    type: 'page',
    body: []
  };
  previewSchema: SchemaObject = {
    type: 'page',
    body: []
  };

  // 普通容器类渲染器配置
  wrapper = ContainerWrapper;

  regions: Array<RegionConfig> = [
    {
      key: 'body',
      label: '内容区'
    }
  ];

  panelTitle = '页面';
  panelJustify = true;

  panelBodyCreator = (context: BaseEventContext) => {
    return [
      getSchemaTpl('tabs', [
        {
          title: '属性',
          body: [
            getSchemaTpl('collapseGroup', [
              {
                title: '基本',
                body: [getSchemaTpl('pageTitle')]
              }
            ])
          ]
        }
      ])
    ];
  };
}

registerEditorPlugin(PagePlugin);
