import {setSchemaTpl, getSchemaTpl, defaultValue} from 'mdes-editor-core';
import type {SchemaCollection} from 'mdes';
import pick from 'lodash/pick';
import kebabCase from 'lodash/kebabCase';

setSchemaTpl('style:formItem', ({renderer, schema}: any) => {
  return {
    title: '表单项',
    key: 'formItem',
    body: [
      getSchemaTpl('formItemMode'),
      getSchemaTpl('labelHide'),
      getSchemaTpl('horizontal'),
      renderer?.sizeMutable !== false ? getSchemaTpl('formItemSize') : null
      // getSchemaTpl('formItemInline')
    ].concat(schema)
  };
});

setSchemaTpl(
  'style:classNames',
  (config: {
    schema: SchemaCollection;
    isFormItem: boolean;
    unsupportStatic?: boolean;
  }) => {
    const {
      isFormItem = true,
      unsupportStatic = false,
      schema = []
    } = config || {};

    return {
      title: 'CSS 类名',
      body: (isFormItem
        ? [
            getSchemaTpl('className', {
              label: '表单项'
            }),
            getSchemaTpl('className', {
              label: '标签',
              name: 'labelClassName'
            }),
            getSchemaTpl('className', {
              label: '控件',
              name: 'inputClassName'
            }),
            ...(unsupportStatic
              ? []
              : [
                  getSchemaTpl('className', {
                    label: '静态展示',
                    name: 'staticClassName'
                  })
                ])
          ]
        : [
            getSchemaTpl('className', {
              label: '外层'
            })
          ]
      ).concat(schema)
    };
  }
);

setSchemaTpl('style:others', (schemas: any[] = []) => ({
  title: '其他项',
  body: [...schemas]
}));

/**
 * 通用CSS Style控件
 * @param {string | Array<string>} exclude 需要隐藏的配置key
 * @param {string | Array<string>} include 包含的配置key，存在时，优先级高于exclude
 */
setSchemaTpl(
  'style:common',
  (exclude: string[] | string, include: string[] | string) => {
    // key统一转换成Kebab case，eg: boxShadow => bos-shadow
    exclude = (
      exclude ? (Array.isArray(exclude) ? exclude : [exclude]) : []
    ).map((key: string) => kebabCase(key));

    include = (
      include ? (Array.isArray(include) ? include : [include]) : []
    ).map((key: string) => kebabCase(key));

    return [
      {
        header: '布局',
        key: 'layout',
        body: [
          {
            type: 'style-display',
            label: false,
            name: 'style'
          }
        ].filter(comp => !~exclude.indexOf(comp.type.replace(/^style-/i, '')))
      },
      {
        header: '文字',
        key: 'font',
        body: [
          {
            type: 'style-font',
            label: false,
            name: 'style'
          }
        ]
      },
      {
        header: '内外边距',
        key: 'box-model',
        body: [
          {
            type: 'style-box-model',
            label: false,
            name: 'style'
          }
        ]
      },
      {
        header: '背景',
        key: 'background',
        body: [
          {
            type: 'style-background',
            label: false,
            name: 'style'
          }
        ]
      },
      {
        header: '边框',
        key: 'border',
        body: [
          {
            type: 'style-border',
            label: false,
            name: 'style'
          }
        ]
      },
      {
        header: '阴影',
        key: 'box-shadow',
        body: [
          {
            type: 'style-box-shadow',
            label: false,
            name: 'style.boxShadow'
          }
        ]
      },
      {
        header: '变换',
        key: 'transform',
        body: [
          {
            type: 'style-transform',
            label: false,
            name: 'style',
            pipeIn: (value: any) => {
              if (value['transform']) {
                const transform: Record<string, any> = {};
                (value['transform'] || []).forEach((item: any) => {
                  const [key, value] = Object.entries(item)[0];
                  if (key) transform[key] = value;
                });
                return {...value, transform};
              }
              return value;
            },
            pipeOut: (value: any) => {
              const transform = Object.entries(value['transform']).map(
                ([key, value]) => ({
                  [key]: value
                })
              );
              return {...value, transform};
            }
          }
        ]
      },
      {
        header: '其他',
        key: 'other',
        body: [
          {
            label: '透明度',
            name: 'style.opacity',
            min: 0,
            max: 1,
            step: 0.05,
            type: 'input-range',
            pipeIn: defaultValue(1),
            marks: {
              '0%': '0',
              '50%': '0.5',
              '100%': '1'
            }
          }
        ]
      }
    ].filter(item =>
      include.length ? ~include.indexOf(item.key) : !~exclude.indexOf(item.key)
    );
  }
);

/**
 * 宽高配置控件
 * @param {object | undefined} options witdthSchema(宽度控件配置) heightSchema(高度控件配置)
 */
setSchemaTpl('style:widthHeight', (option: any = {}) => {
  const {widthSchema = {}, heightSchema = {}} = option;
  return {
    type: 'container',
    body: [
      {
        type: 'input-number',
        name: 'width',
        label: '宽度',
        unitOptions: ['px', '%', 'rem', 'em', 'vw'],
        ...widthSchema
      },
      {
        type: 'input-number',
        name: 'height',
        label: '高度',
        unitOptions: ['px', '%', 'rem', 'em', 'vh'],
        ...heightSchema
      }
    ]
  };
});

/**
 * 样式相关的属性面板，因为预计会比较多所以拆出来
 */
export const styleTpl = {
  name: 'style',
  type: 'combo',
  label: '',
  noBorder: true,
  multiLine: true,
  items: [
    {
      type: 'fieldSet',
      title: '文字',
      body: [
        {
          type: 'group',
          body: [
            {
              label: '文字大小',
              type: 'input-text',
              name: 'fontSize'
            },
            {
              label: '文字粗细',
              name: 'fontWeight',
              type: 'select',
              options: ['normal', 'bold', 'lighter', 'bolder']
            }
          ]
        },
        {
          type: 'group',
          body: [
            {
              label: '文字颜色',
              type: 'input-color',
              name: 'color'
            },
            {
              label: '对齐方式',
              name: 'textAlign',
              type: 'select',
              options: [
                'left',
                'right',
                'center',
                'justify',
                'justify-all',
                'start',
                'end',
                'match-parent'
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'fieldSet',
      title: '背景',
      body: [
        {
          label: '颜色',
          name: 'backgroundColor',
          type: 'input-color'
        },
        getSchemaTpl('imageUrl', {
          name: 'backgroundImage'
        })
      ]
    },
    {
      type: 'fieldSet',
      title: '边距',
      body: [
        {
          type: 'group',
          label: '外边距',
          body: [
            {
              label: '上',
              name: 'marginTop',
              type: 'input-text'
            },
            {
              label: '右',
              name: 'marginRight',
              type: 'input-text'
            },
            {
              label: '下',
              name: 'marginBottom',
              type: 'input-text'
            },
            {
              label: '左',
              name: 'marginLeft',
              type: 'input-text'
            }
          ]
        },
        {
          type: 'group',
          label: '内边距',
          body: [
            {
              label: '上',
              name: 'paddingTop',
              type: 'input-text'
            },
            {
              label: '右',
              name: 'paddingRight',
              type: 'input-text'
            },
            {
              label: '下',
              name: 'paddingBottom',
              type: 'input-text'
            },
            {
              label: '左',
              name: 'paddingLeft',
              type: 'input-text'
            }
          ]
        }
      ]
    },
    {
      type: 'fieldSet',
      title: '边框',
      body: [
        {
          type: 'group',
          body: [
            {
              label: '样式',
              name: 'borderStyle',
              type: 'select',
              options: ['none', 'solid', 'dotted', 'dashed']
            },
            {
              label: '颜色',
              name: 'borderColor',
              type: 'input-color'
            }
          ]
        },
        {
          type: 'group',
          body: [
            {
              label: '宽度',
              name: 'borderWidth',
              type: 'input-text'
            },
            {
              label: '圆角宽度',
              name: 'borderRadius',
              type: 'input-text'
            }
          ]
        }
      ]
    },
    {
      type: 'fieldSet',
      title: '特效',
      body: [
        {
          label: '透明度',
          name: 'opacity',
          min: 0,
          max: 1,
          step: 0.05,
          type: 'input-range',
          pipeIn: defaultValue(1)
        },
        {
          label: '阴影',
          name: 'boxShadow',
          type: 'input-text'
        }
      ]
    }
  ]
};

/**
 * 新版主题
 */

// form label
setSchemaTpl('theme:form-label', () => {
  return {
    title: 'Label样式',
    body: [
      getSchemaTpl('theme:select', {
        label: '宽度',
        name: 'labelWidth'
      }),
      getSchemaTpl('theme:font', {
        label: '文字',
        name: 'themeCss.labelClassName.font:default',
        editorThemePath: 'form.item.default.label.body.font'
      }),
      getSchemaTpl('theme:paddingAndMargin', {
        name: 'themeCss.labelClassName.padding-and-margin:default'
      })
    ]
  };
});

// form description
setSchemaTpl('theme:form-description', () => {
  return {
    title: '描述样式',
    visibleOn: 'this.description',
    body: [
      getSchemaTpl('theme:font', {
        label: '文字',
        name: 'themeCss.descriptionClassName.font:default',
        editorThemePath: 'form.item.default.description.body.font'
      }),
      getSchemaTpl('theme:paddingAndMargin', {
        name: 'themeCss.descriptionClassName.padding-and-margin:default'
      })
    ]
  };
});

// 带提示的值输入框
setSchemaTpl('theme:select', (option: any = {}) => {
  return {
    mode: 'horizontal',
    type: 'mdes-theme-select',
    label: '大小',
    name: `themeCss.className.select:default`,
    options: '${sizesOptions}',
    ...option
  };
});

// 文字编辑器
setSchemaTpl('theme:font', (option: any = {}) => {
  return {
    mode: 'default',
    type: 'mdes-theme-font-editor',
    label: '文字',
    name: `themeCss.className.font:default`,
    needColorCustom: true,
    ...option
  };
});

// 颜色选择器
setSchemaTpl('theme:colorPicker', (option: any = {}) => {
  return {
    mode: 'default',
    type: 'mdes-theme-color-picker',
    label: '颜色',
    name: `themeCss.className.color:default`,
    needCustom: true,
    ...option
  };
});

// 渐变颜色选择器
setSchemaTpl('theme:colorPickerGradient', (option: any = {}) => {
  return {
    mode: 'vertical',
    type: 'mdes-theme-color-picker-gradient',
    label: '颜色',
    name: `gradient`,
    ...option
  };
});

// 边框选择器
setSchemaTpl('theme:border', (option: any = {}) => {
  return {
    mode: 'default',
    type: 'mdes-theme-border',
    label: '边框',
    name: `themeCss.className.border:default`,
    needColorCustom: true,
    ...option
  };
});

// 边距选择器
setSchemaTpl('theme:paddingAndMargin', (option: any = {}) => {
  return {
    mode: 'default',
    type: 'mdes-theme-padding-and-margin',
    label: '边距',
    name: `themeCss.className.padding-and-margin:default`,
    ...option
  };
});

// 圆角选择器
setSchemaTpl('theme:radius', (option: any = {}) => {
  return {
    mode: 'default',
    type: 'mdes-theme-radius',
    label: '圆角',
    name: `themeCss.className.radius:default`,
    ...option
  };
});

// 阴影选择器
setSchemaTpl('theme:shadow', (option: any = {}) => {
  return {
    type: 'mdes-theme-shadow-editor',
    label: false,
    name: `themeCss.className.boxShadow:default`,
    hasSenior: true,
    ...option
  };
});

// 尺寸选择器
setSchemaTpl('theme:size', (option: any = {}) => {
  return {
    mode: 'default',
    type: 'mdes-theme-size-editor',
    label: false,
    name: `themeCss.className.size:default`,
    options: '${sizesOptions}',
    hideMinWidth: true,
    ...option
  };
});

setSchemaTpl(
  'theme:base',
  (option: {
    collapsed?: boolean;
    extra?: any[];
    classname?: string;
    title?: string;
    hiddenOn?: string;
    hidePaddingAndMargin?: boolean;
  }) => {
    const {
      collapsed = false,
      extra = [],
      classname = 'baseControlClassName',
      title = '基本样式',
      hiddenOn,
      hidePaddingAndMargin
    } = option;
    const curHidePaddingAndMargin = hidePaddingAndMargin ?? false;
    const styleStateFunc = (visibleOn: string, state: string) => {
      return [
        getSchemaTpl('theme:border', {
          visibleOn: visibleOn,
          name: `themeCss.${classname}.border:${state}`
        }),
        getSchemaTpl('theme:radius', {
          visibleOn: visibleOn,
          name: `themeCss.${classname}.radius:${state}`
        }),
        !curHidePaddingAndMargin
          ? getSchemaTpl('theme:paddingAndMargin', {
              visibleOn: visibleOn,
              name: `themeCss.${classname}.padding-and-margin:${state}`
            })
          : null,
        getSchemaTpl('theme:colorPicker', {
          visibleOn: visibleOn,
          name: `themeCss.${classname}.background:${state}`,
          label: '背景',
          needCustom: true,
          needGradient: true,
          needImage: true,
          labelMode: 'input'
        }),
        getSchemaTpl('theme:shadow', {
          visibleOn: visibleOn,
          name: `themeCss.${classname}.boxShadow:${state}`
        })
      ]
        .filter(item => item)
        .concat(
          extra.map(item => {
            return {
              ...item,
              visibleOn: visibleOn,
              name: `${item.name}:${state}`
            };
          })
        );
    };
    const styles = [
      {
        type: 'select',
        name: 'editorState',
        label: '状态',
        selectFirst: true,
        options: [
          {
            label: '常规',
            value: 'default'
          },
          {
            label: '悬浮',
            value: 'hover'
          },
          {
            label: '点击',
            value: 'active'
          }
        ]
      },
      ...styleStateFunc(
        "${editorState == 'default' || !editorState}",
        'default'
      ),
      ...styleStateFunc("${editorState == 'hover'}", 'hover'),
      ...styleStateFunc("${editorState == 'active'}", 'active')
    ];

    return {
      title,
      collapsed,
      body: styles,
      hiddenOn
    };
  }
);

setSchemaTpl(
  'theme:common',
  (option: {
    exclude: string[] | string;
    collapsed?: boolean;
    extra?: any[];
    baseExtra?: any[];
    layoutExtra?: any[];
    classname?: string;
    baseTitle?: string;
    hidePaddingAndMargin?: boolean;
  }) => {
    let {
      exclude,
      collapsed,
      extra = [],
      baseExtra,
      layoutExtra,
      classname,
      baseTitle,
      hidePaddingAndMargin
    } = option || {};

    const curCollapsed = collapsed ?? false; // 默认都展开
    // key统一转换成Kebab case，eg: boxShadow => bos-shadow
    exclude = (
      exclude ? (Array.isArray(exclude) ? exclude : [exclude]) : []
    ).map((key: string) => kebabCase(key));

    return [
      {
        header: '布局',
        key: 'layout',
        collapsed: curCollapsed,
        body: [
          {
            type: 'style-display',
            label: false,
            name: 'style'
          }
        ]
          .filter(comp => !~exclude.indexOf(comp.type.replace(/^style-/i, '')))
          .concat(layoutExtra || [])
      },
      getSchemaTpl('theme:base', {
        collapsed: curCollapsed,
        extra: baseExtra,
        classname,
        title: baseTitle,
        hidePaddingAndMargin
      }),
      ...extra
    ].filter(item => !~exclude.indexOf(item.key || ''));
  }
);
