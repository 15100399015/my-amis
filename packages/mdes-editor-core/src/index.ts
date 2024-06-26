/**
 * @file 总入口
 */
import 'mdes';
import Editor from './component/Editor';
import './component/ClassNameControl';

import './plugin/AvailableRenderers';
import './plugin/BasicToolbar';
import './plugin/Code';
import './plugin/ErrorRenderer';
import './plugin/Outline';
import './plugin/Unknown';

import * as utils from './util';
export * from './util';
export * from './tpl';
export * from './manager';
export * from './plugin';
export * from './icons/index';
export * from './mocker';
import MiniEditor from './component/MiniEditor';
import CodeEditor from './component/Panel/MDesCodeEditor';
import IFramePreview from './component/IFramePreview';
import SearchPanel from './component/base/SearchPanel';
import {VRenderer} from './component/VRenderer';
import {RegionWrapper} from './component/RegionWrapper';
import {mapReactElement} from './component/factory';
import type {EditorNodeType, EditorNodeSnapshot} from './store/node';
import {ContainerWrapper} from './component/ContainerWrapper';
import type {EditorStoreType} from './store/editor';
import {AvailableRenderersPlugin} from './plugin/AvailableRenderers';
import ShortcutKey from './component/base/ShortcutKey';
import WidthDraggableContainer from './component/base/WidthDraggableContainer';
import {SchemaFrom} from './component/base/SchemaForm';

export const version = '__buildVersion';

export default Editor;

export {
  Editor,
  MiniEditor,
  utils,
  mapReactElement,
  CodeEditor,
  VRenderer,
  RegionWrapper,
  IFramePreview as IFrameEditor,
  SearchPanel,
  EditorNodeType,
  EditorNodeSnapshot,
  EditorStoreType,
  ContainerWrapper,
  AvailableRenderersPlugin,
  ShortcutKey,
  SchemaFrom,
  WidthDraggableContainer
};
