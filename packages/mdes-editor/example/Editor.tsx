/* eslint-disable */
import * as React from 'react';
import {Portal} from 'react-overlays';
import 'mdes';
import {Editor, ShortcutKey, setThemeConfig, Icon} from '../src/index';

setThemeConfig({});

// @ts-ignore
window.enableMDESDebug = true;

const schema = {
  type: 'page',
  title: 'Simple Form Page',
  regions: ['body'],
  body: []
};

const formSchema = {
  type: 'doc-entity',
  fields: []
};

const variableSchemas = {
  type: 'object',
  $id: 'appVariables',
  properties: {
    ProductName: {
      type: 'string',
      title: '产品名称',
      default: '对象存储'
    },
    Banlance: {
      type: 'number',
      title: '账户余额',
      default: '0.00'
    },
    ProductNum: {
      type: 'integer',
      title: '产品数量',
      default: '0.00'
    },
    isOnline: {
      type: 'boolean',
      title: '是否线上环境',
      default: 'false'
    },
    ProductList: {
      type: 'array',
      items: {
        type: 'string',
        title: '产品名称'
      },
      title: '产品列表',
      default: '["BOS", "CFS", "PFS", "CloudFlow", "MongoDB"]'
    },
    PROFILE: {
      type: 'object',
      title: '个人信息',
      properties: {
        FirstName: {
          type: 'string',
          title: '名字'
        },
        Age: {
          type: 'integer',
          title: '年龄'
        },
        Address: {
          type: 'object',
          title: '地址',
          required: ['street', 'postcode'],
          properties: {
            street: {
              type: 'string',
              title: '街道名称'
            },
            postcode: {
              type: 'number',
              title: '邮编'
            }
          }
        }
      }
    }
  },
  default: {
    ProductName: 'BCC',
    Banlance: 1234.888,
    ProductNum: 10,
    isOnline: false,
    ProductList: ['BCC', 'BOS', 'VPC'],
    PROFILE: {
      FirstName: 'Mdes',
      Age: 18,
      Address: {
        street: 'ShangDi',
        postcode: 100001
      }
    }
  }
};

const variableDefaultData = {
  appVariables: {
    ProductName: 'BCC',
    Banlance: 1234.888,
    ProductNum: 10,
    isOnline: false,
    ProductList: ['BCC', 'BOS', 'VPC'],
    PROFILE: {
      FirstName: 'Amis',
      Age: 18,
      Address: {
        street: 'ShangDi',
        postcode: 100001
      }
    }
  }
};

const variables: any = [
  {
    name: 'appVariables',
    title: '内存变量',
    parentId: 'root',
    order: 1,
    schema: variableSchemas
  }
];

const EditorType = {
  EDITOR: 'editor',
  MOBILE: 'mobile',
  FORM: 'form'
};

export default class MDesSchemaEditor extends React.Component<any, any> {
  state: any = {
    preview: localStorage.getItem('editting_preview') ? true : false,
    type: localStorage.getItem('editting_preview_type') || EditorType.EDITOR,
    schema: localStorage.getItem('editting_schema')
      ? JSON.parse(localStorage.getItem('editting_schema')!)
      : schema
  };

  constructor(props: any) {
    super(props);

    const type =
      localStorage.getItem('editting_preview_type') || EditorType.EDITOR;

    this.state.schema = this.getSchema(type);
  }

  getSchema(type: string) {
    if (type === EditorType.FORM) {
      const schema = localStorage.getItem('editting_schema_form');

      if (schema) {
        return JSON.parse(schema);
      }
      return formSchema;
    }

    const lsSchema = localStorage.getItem('editting_schema');

    if (lsSchema) {
      return JSON.parse(lsSchema);
    }

    return schema;
  }

  handleChange = (value: any) => {
    const type = this.state.type;

    if (type === EditorType.FORM) {
      localStorage.setItem('editting_schema_form', JSON.stringify(value));
    } else {
      localStorage.setItem('editting_schema', JSON.stringify(value));
    }

    this.setState({
      schema: value
    });
  };

  onSave = () => {
    const curSchema = this.state.schema;
    localStorage.setItem('editting_schema', JSON.stringify(curSchema));
  };

  onSaveToServer = async () => {
    fetch('http://localhost:3030/save', {
      method: 'POST',
      body: JSON.stringify(this.state.schema),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .then(() => {
        alert('保存成功');
      });
  };

  handlePreviewChange = (preview: any) => {
    localStorage.setItem('editting_preview', preview ? 'true' : '');
    this.setState({
      preview: !!preview
    });
  };

  togglePreview = () => {
    this.handlePreviewChange(!this.state.preview);
  };

  handleTypeChange = (editorType: any) => {
    const type = editorType || EditorType.EDITOR;
    localStorage.setItem('editting_preview_type', type);

    this.setState({
      type: type,
      schema: this.getSchema(type)
    });
  };

  clearCache = () => {
    localStorage.removeItem('editting_schema');
    this.setState({
      schema: schema
    });
  };

  renderEditor() {
    const {theme} = this.props;
    const {preview, type, schema} = this.state;
    const isMobile = type === EditorType.MOBILE;
    const {replaceText} = this.state;

    return (
      <Editor
        preview={preview}
        isMobile={isMobile}
        value={schema}
        // 声明的上下文变量
        variables={variables}
        onChange={this.handleChange}
        onPreview={this.handlePreviewChange}
        onSave={this.onSave}
        className="is-fixed"
        i18nEnabled={false}
        theme={theme || 'cxd'}
        showCustomRenderersPanel={true}
        plugins={[]} // 存放常见布局组件
        actionOptions={{
          showOldEntry: false
        }}
        mdesEnv={
          {
            variable: {
              id: 'appVariables',
              namespace: 'appVariables',
              schema: variableSchemas,
              data: variableDefaultData
            },
            replaceText
          } as any
        }
        ctx={{
          ...variableDefaultData
        }}
      />
    );
  }

  render() {
    const {preview, type} = this.state;
    return (
      <div className="Editor-inner">
        <Portal container={() => document.querySelector('#headerBar') as any}>
          <>
            <div className="Editor-view-mode-group-container">
              <div className="Editor-view-mode-group">
                <div
                  className={`Editor-view-mode-btn ${
                    type === EditorType.EDITOR ? 'is-active' : ''
                  }`}
                  onClick={() => {
                    this.handleTypeChange(EditorType.EDITOR);
                  }}
                >
                  <Icon icon="pc-preview" title="PC模式" />
                </div>
                <div
                  className={`Editor-view-mode-btn ${
                    type === EditorType.MOBILE ? 'is-active' : ''
                  }`}
                  onClick={() => {
                    this.handleTypeChange(EditorType.MOBILE);
                  }}
                >
                  <Icon icon="h5-preview" title="移动模式" />
                </div>
              </div>
            </div>

            <div className="Editor-header-actions">
              <ShortcutKey />
              <div
                className={`header-action-btn ${preview ? 'primary' : ''}`}
                onClick={() => {
                  this.togglePreview();
                }}
              >
                {preview ? '编辑' : '预览'}
              </div>
              <div
                className={`header-action-btn`}
                onClick={() => {
                  this.onSaveToServer();
                }}
              >
                同步至服务器
              </div>
            </div>
          </>
        </Portal>

        {this.renderEditor()}
      </div>
    );
  }
}
