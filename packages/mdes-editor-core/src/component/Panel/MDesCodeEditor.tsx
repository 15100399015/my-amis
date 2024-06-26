import React from 'react';
import {Editor} from 'mdes-ui';
import {
  isObjectShallowModified,
  guid,
  diff,
  filterSchemaForConfig
} from '../../util';
import cx from 'classnames';
import {prompt, toast} from 'mdes';
import debounce from 'lodash/debounce';
import isArray from 'lodash/isArray';
import {parse, stringify} from 'json-ast-comments';
import isPlainObject from 'lodash/isPlainObject';

const internalSchema = /^\/schemas\/(.*).json$/;

const codeErrorWarning = debounce(e => {
  toast.warning(`代码有误，错误的地方是\n ${e.toString().split('\n')[1]}`);
}, 3000);

export interface MDesCodeEditorProps {
  value: any;
  onChange: (value: any, diff: any) => void;
  onPaste?: () => void;
  disabled?: boolean;
  className?: string;
  theme?: string;
}

export default class MDesCodeEditor extends React.Component<MDesCodeEditorProps> {
  state = {
    wrongSchema: '',
    value: this.props.value,
    contents: this.obj2str(this.props.value, this.props)
  };
  lastResult: any;
  toDispose: Array<() => void> = [];
  editor: any;
  monaco: any;
  model: any;
  decorations: any;
  uri = `isuda://schema/${guid()}.json`;

  componentDidUpdate(prevProps: MDesCodeEditorProps) {
    const props = this.props;

    if (
      isObjectShallowModified(props.value, prevProps.value) &&
      isObjectShallowModified(props.value, this.lastResult)
    ) {
      this.lastResult = null;

      this.setState({
        value: props.value,
        contents: this.obj2str(props.value, props)
      });
    }
  }

  obj2str(value: any, props: MDesCodeEditorProps) {
    // 隐藏公共配置
    value = filterSchemaForConfig(value);

    if (!isArray(value)) {
      value = {
        type: value?.type,
        ...value
      };
    }

    if (isArray(value)) {
      return stringify(value);
    } else if (!value.type) {
      delete value.type;
    }

    delete value.$schema;

    return stringify(value);
  }

  str2obj(str: string) {
    try {
      if (str === '') {
        return {};
      }
      const curObj = parse(str);
      if (codeErrorWarning) {
        // 此次代码转换成功后，立即取消上一次的错误提示（避免显示上一次的错误提示）
        codeErrorWarning.cancel();
      }
      return curObj;
    } catch (e) {
      codeErrorWarning(e);
      return null;
    }
  }

  emitChange = debounce(
    () => {
      const {onChange, value} = this.props;
      let ret: any = this.str2obj(this.state.contents);

      if (!ret || (!isPlainObject(ret) && !isArray(ret))) {
        this.setState({
          wrongSchema: this.state.contents
        });
        return;
      }

      this.setState({
        wrongSchema: ''
      });

      delete ret.$schema;

      // 补齐公共配置项目
      ret = filterSchemaForConfig(ret, this.props.value);
      const diffResult = diff(this.lastResult || value, ret);
      this.lastResult = ret;

      onChange(ret, diffResult);
    },
    250,
    {
      trailing: true,
      leading: false
    }
  );

  editorFactory = (
    containerElement: HTMLElement,
    monaco: any,
    options: any
  ) => {
    const modelUri = monaco.Uri.parse(this.uri);
    this.model = monaco.editor.createModel(
      this.state.contents,
      'json',
      modelUri
    );
    return monaco.editor.create(containerElement, {
      autoIndent: true,
      formatOnType: true,
      formatOnPaste: true,
      selectOnLineNumbers: true,
      scrollBeyondLastLine: false,
      folding: true,
      scrollbar: {alwaysConsumeMouseWheel: false}, // 弹窗编辑中的编辑器有时会无法滚动
      minimap: {
        enabled: false
      },
      ...options,
      model: this.model
    });
  };

  editorDidMount = (editor: any, monaco: any) => {
    this.editor = editor;
    this.monaco = monaco;

    this.props.onPaste &&
      this.toDispose.push(this.editor.onDidPaste(this.props.onPaste).dispose);
  };

  editorWillUnmount = (editor: any, monaco: any) => {
    this.toDispose.forEach(fn => fn());
    this.toDispose = [];
  };

  handleChange = (value: string) => {
    this.setState(
      {
        contents: value
      },
      this.emitChange
    );
  };

  handleBlur = async () => {
    const {wrongSchema, value} = this.state;
    if (!wrongSchema) {
      return;
    }
    const result = await prompt(
      [
        {
          className: 'w-full',
          type: 'tpl',
          label: false,
          tpl: '当前有部分已更改数据因为格式不正确尚未保存，您确认要丢弃这部分更改吗？'
        },
        {
          type: 'switch',
          label: false,
          option: '查看更改',
          name: 'diff',
          value: false
        },
        {
          visibleOn: 'this.diff',
          label: false,
          type: 'diff-editor',
          allowFullscreen: true,
          disabled: true,
          name: 'newValue',
          size: 'xxl',
          language: 'json',
          diffValue: '${oldValue}'
        }
      ],
      {
        oldValue: value,
        newValue: wrongSchema
      },
      '请确认'
    );
    if (result) {
      this.setState({wrongSchema: '', contents: stringify(value)});
    } else {
      this.editor.focus();
    }
  };

  render() {
    let {disabled, className, theme} = this.props;

    return (
      // @ts-ignore
      <Editor
        className={cx('mdes-code-editor', className)}
        value={this.state.contents}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        language="json"
        theme={theme}
        editorFactory={this.editorFactory}
        editorDidMount={this.editorDidMount}
        editorWillUnmount={this.editorWillUnmount}
        options={{
          automaticLayout: true,
          lineNumbers: 'off',
          glyphMargin: false,
          tabSize: 2,
          wordWrap: 'on',
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0,
          selectOnLineNumbers: true,
          scrollBeyondLastLine: false,
          folding: true,
          minimap: {
            enabled: false
          },
          readOnly: disabled
        }}
      />
    );
  }
}
