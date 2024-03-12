import {setSchemaTpl, defaultValue, tipedLabel} from 'amis-editor-core';

// 默认支持的单位
const LayoutUnitOptions = [
  {
    label: 'px',
    value: ''
  },
  {
    label: '%',
    value: '%'
  }
];

// 定位模式
setSchemaTpl(
  'layout:position',
  (config?: {
    mode?: string;
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string; // 用于控制显示的表达式
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    const configSchema = {
      type: 'select',
      label:
        config?.label || tipedLabel('定位模式', '指定当前容器元素的定位类型'),
      name: config?.name || 'style.position',
      value: config?.value || 'relative',
      visibleOn: config?.visibleOn,
      pipeIn: config?.pipeIn,
      pipeOut: config?.pipeOut,
      onChange: (value: string, oldValue: string, model: any, form: any) => {
        if (value === 'absolute') {
          form.setValueByName('style.zIndex', 1); // 避免被页面其他内容元素遮挡（导致不能选中）
          form.setValueByName('style.left', 'auto');
          form.setValueByName('style.right', 'auto');
          form.setValueByName('style.top', 'auto');
          form.setValueByName('style.bottom', 'auto');
        } else if (value === 'relative') {
          form.setValueByName('style.zIndex', 1);
          form.setValueByName('style.left', 'auto');
          form.setValueByName('style.right', 'auto');
          form.setValueByName('style.top', 'auto');
          form.setValueByName('style.bottom', 'auto');
        }
      },
      options: [
        {
          label: '相对(relative)',
          value: 'relative'
        },
        {
          label: '绝对(absolute)',
          value: 'absolute'
        }
      ]
    };

    if (config?.mode === 'vertical') {
      // 上下展示，可避免 自定义渲染器 出现挤压
      return {
        type: 'group',
        mode: 'vertical',
        visibleOn: config?.visibleOn,
        body: [
          {
            ...configSchema
          }
        ]
      };
    } else {
      // 默认左右展示
      return configSchema;
    }
  }
);

// inset 配置:
setSchemaTpl(
  'layout:inset',
  (config?: {
    mode?: string;
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
  }) => {
    const configSchema = {
      type: 'inset-box-model',
      label:
        config?.label ||
        tipedLabel(
          '布局位置',
          '指定当前容器元素的定位位置，用于配置 top、right、bottom、left。'
        ),
      name: config?.name || 'style',
      value: config?.value || 'auto',
      visibleOn: config?.visibleOn
    };

    if (config?.mode === 'vertical') {
      // 上下展示，可避免 自定义渲染器 出现挤压
      return {
        type: 'group',
        mode: 'vertical',
        visibleOn: config?.visibleOn,
        body: [
          {
            ...configSchema
          }
        ]
      };
    } else {
      // 默认左右展示
      return configSchema;
    }
  }
);

// z-index 配置:
setSchemaTpl(
  'layout:z-index',
  (config?: {
    mode?: string;
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    const configSchema = {
      type: 'input-number',
      label:
        config?.label ||
        tipedLabel(
          '显示层级',
          '指定元素的堆叠顺序，层级高的元素总是会处于较低层级元素的上面。'
        ),
      name: config?.name || 'style.zIndex',
      value: config?.value,
      visibleOn: config?.visibleOn ?? 'data.style && data.style.position',
      pipeIn: config?.pipeIn,
      pipeOut: config?.pipeOut
    };

    if (config?.mode === 'vertical') {
      // 上下展示，可避免 自定义渲染器 出现挤压
      return {
        type: 'group',
        mode: 'vertical',
        visibleOn: config?.visibleOn,
        body: [
          {
            ...configSchema
          }
        ]
      };
    } else {
      // 默认左右展示
      return configSchema;
    }
  }
);

// 主轴排列方向
setSchemaTpl(
  'layout:justifyContent',
  (config?: {
    mode?: string; // 自定义展示默认值，上下展示: vertical, 左右展示: horizontal
    label?: string; // 表单项 label
    name?: string; // 表单项 name
    value?: string;
    options?: any;
    visibleOn?: string; // 用于控制显示的表达式
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    const defaultOptions = [
      {
        label: '起始端对齐',
        value: 'flex-start'
      },
      {
        label: '居中对齐',
        value: 'center'
      },
      {
        label: '末尾端对齐',
        value: 'flex-end'
      },
      {
        label: '均匀分布（首尾留空）',
        value: 'space-around'
      },
      {
        label: '均匀分布（首尾对齐）',
        value: 'space-between'
      },
      {
        label: '均匀分布（元素等间距）',
        value: 'space-evenly'
      },
      {
        label: '均匀分布（自动拉伸）',
        value: 'stretch'
      }
    ];

    const configSchema = {
      type: 'select',
      label:
        config?.label ||
        tipedLabel(`水平对齐方式`, '设置子元素在主轴上的对齐方式'),
      name: config?.name || 'style.justifyContent',
      value: config?.value || 'flex-start',
      visibleOn: config?.visibleOn,
      pipeIn: config?.pipeIn,
      pipeOut: config?.pipeOut,
      options: config?.options || defaultOptions
    };

    if (config?.mode === 'vertical') {
      // 上下展示，可避免 自定义渲染器 出现挤压
      return {
        type: 'group',
        mode: 'vertical',
        visibleOn: config?.visibleOn,
        body: [
          {
            ...configSchema
          }
        ]
      };
    } else {
      // 默认左右展示
      return configSchema;
    }
  }
);

// 交叉轴排列方向
setSchemaTpl(
  'layout:alignItems',
  (config?: {
    mode?: string;
    label?: string;
    name?: string;
    value?: string;
    options?: any;
    visibleOn?: string;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    const defaultOptions = [
      {
        label: '起始端对齐',
        value: 'flex-start'
      },
      {
        label: '居中对齐',
        value: 'center'
      },
      {
        label: '末尾端对齐',
        value: 'flex-end'
      },
      {
        label: '基线对齐',
        value: 'baseline'
      },
      {
        label: '自动拉伸',
        value: 'stretch'
      }
    ];

    const configSchema = {
      type: 'select',
      label:
        config?.label ||
        tipedLabel(`垂直对齐方式`, '设置子元素在交叉轴上的对齐方式'),
      name: config?.name || 'style.alignItems',
      value: config?.value || 'stretch', // 如果项目未设置高度或设为auto，将占满整个容器的高度。
      visibleOn: config?.visibleOn,
      pipeIn: config?.pipeIn,
      pipeOut: config?.pipeOut,
      options: config?.options || defaultOptions
    };

    if (config?.mode === 'vertical') {
      return {
        type: 'group',
        mode: 'vertical',
        visibleOn: config?.visibleOn,
        body: [
          {
            ...configSchema
          }
        ]
      };
    } else {
      return configSchema;
    }
  }
);

// 排列方向
setSchemaTpl(
  'layout:flexDirection',
  (config?: {
    mode?: string;
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    const configSchema = {
      type: 'select',
      label:
        config?.label ||
        tipedLabel(
          '排列方向',
          '设置成水平排列方向，则从左到右放置子项；设置成垂直排列方向，则从上到下放置子项'
        ),
      name: config?.name || 'style.flexDirection',
      value: config?.value || 'row',
      visibleOn: config?.visibleOn,
      pipeIn: config?.pipeIn,
      pipeOut: config?.pipeOut,
      options: [
        {
          label: '水平',
          value: 'row'
        },
        {
          label: '水平（起点在右端）',
          value: 'row-reverse'
        },
        {
          label: '垂直',
          value: 'column'
        },
        {
          label: '垂直（起点在下沿）',
          value: 'column-reverse'
        }
      ]
    };

    if (config?.mode === 'vertical') {
      // 上下展示，可避免 自定义渲染器 出现挤压
      return {
        type: 'group',
        mode: 'vertical',
        visibleOn: config?.visibleOn,
        body: [
          {
            ...configSchema
          }
        ]
      };
    } else {
      // 默认左右展示
      return configSchema;
    }
  }
);

// 如何换行
setSchemaTpl(
  'layout:flex-wrap',
  (config?: {
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      type: 'select',
      label: config?.label || '如何换行',
      name: config?.name || 'style.flexWrap',
      value: config?.value || 'nowrap',
      visibleOn: config?.visibleOn,
      pipeIn: config?.pipeIn,
      pipeOut: config?.pipeOut,
      options: [
        {
          label: '不换行(默认)',
          value: 'nowrap'
        },
        {
          label: '自动换行',
          value: 'wrap'
        },
        {
          label: '自动换行（颠倒）',
          value: 'wrap-reverse'
        }
      ]
    };
  }
);

// 弹性模式
setSchemaTpl(
  'layout:flex',
  (config?: {
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      type: 'input-range',
      max: 12,
      step: 1,
      label: tipedLabel(
        config?.label || '空间分配比例',
        '设置flex值组件尺寸会具有弹性，并根据具体的 flex 值来按比例分配空间'
      ),
      name: config?.name || 'style.flex',
      value: config?.value || 0,
      visibleOn: config?.visibleOn,
      pipeIn: config?.pipeIn,
      pipeOut: config?.pipeOut
    };
  }
);

// 弹性模式
setSchemaTpl(
  'layout:flex-shrink',
  (config?: {
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      type: 'input-range',
      max: 12,
      step: 1,
      label: tipedLabel(
        config?.label || '缩小比例',
        '定义项目的缩小比例，当空间溢出时容器将根据其子容器的flexShrink值来收缩其子容器'
      ),
      name: config?.name || 'style.flexShrink',
      value: config?.value || 0,
      visibleOn: config?.visibleOn,
      pipeIn: config?.pipeIn,
      pipeOut: config?.pipeOut
    };
  }
);

// flex-basis设置
setSchemaTpl(
  'layout:flex-basis',
  (config?: {
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    unitOptions?: Array<string>;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      type: 'input-number',
      label: tipedLabel(
        config?.label || '默认宽度',
        '在分配多余空间之前，其默认占据的主轴空间（main size）'
      ),
      name: config?.name || 'style.flexBasis',
      value: config?.value || 'auto',
      visibleOn: config?.visibleOn,
      clearable: true,
      unitOptions: config?.unitOptions ?? LayoutUnitOptions,
      pipeIn: config?.pipeIn,
      // pipeOut: config?.pipeOut,
      pipeOut: (value: string) => {
        const curValue = parseInt(value);
        if (value === 'auto' || curValue || curValue === 0) {
          return value;
        } else {
          return undefined;
        }
      }
    };
  }
);

// flex-grow 弹性比例
setSchemaTpl(
  'layout:flex-grow',
  (config?: {
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      type: 'input-range',
      max: 12,
      step: 1,
      label:
        config?.label ||
        tipedLabel(
          '弹性比例',
          '定义项目的放大比例，如果设置为0，即使父容器存在剩余空间，也不放大。'
        ),
      name: config?.name || 'style.flexGrow',
      value: config?.value || 0,
      visibleOn: config?.visibleOn,
      pipeIn: config?.pipeIn,
      pipeOut: config?.pipeOut
    };
  }
);

// 是否固定宽度: isFixedWidth 配置:
setSchemaTpl(
  'layout:isFixedWidth',
  (config?: {
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
    onChange?: (value: boolean) => void;
  }) => {
    return {
      type: 'button-group-select',
      label: config?.label || '宽度设置',
      size: 'xs',
      name: config?.name || 'isFixedWidth',
      options: [
        {
          label: '固定',
          value: true
        },
        {
          label: '适配',
          value: false
        }
      ],
      value: config?.value ?? false,
      visibleOn: config?.visibleOn,
      inputClassName: 'inline-flex justify-between',
      pipeIn: config?.pipeIn,
      pipeOut: config?.pipeOut,
      onChange: (value: boolean, oldValue: boolean, model: any, form: any) => {
        if (value) {
          // 固定宽度时，剔除最大宽度、最小宽度
          form.deleteValueByName('style.maxWidth');
          form.deleteValueByName('style.minWidth');
        } else {
          // 非固定宽度时，剔除宽度数值
          form.deleteValueByName('style.width');
        }
        if (config?.onChange) {
          config.onChange(value);
        }
      }
    };
  }
);

// 宽度设置
setSchemaTpl(
  'layout:width',
  (config?: {
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    unitOptions?: Array<string>;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      type: 'input-number',
      label: config?.label || '宽度',
      name: config?.name || 'style.width',
      value: config?.value || '300px',
      visibleOn: config?.visibleOn
        ? `(${config?.visibleOn}) && data.isFixedWidth`
        : 'data.isFixedWidth',
      clearable: true,
      unitOptions: config?.unitOptions ?? LayoutUnitOptions,
      pipeIn: config?.pipeIn,
      // pipeOut: config?.pipeOut,
      pipeOut: (value: string) => {
        const curValue = parseInt(value);
        if (value === 'auto' || curValue || curValue === 0) {
          return value;
        } else {
          return undefined;
        }
      }
    };
  }
);

// 宽度设置(不关联固定宽度配置项)
setSchemaTpl(
  'layout:width:v2',
  (config?: {
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    unitOptions?: Array<string>;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      type: 'input-number',
      label: config?.label || '宽度',
      name: config?.name || 'style.width',
      value: config?.value || '300px',
      visibleOn: config?.visibleOn || true,
      clearable: true,
      unitOptions: config?.unitOptions ?? LayoutUnitOptions,
      pipeIn: config?.pipeIn,
      // pipeOut: config?.pipeOut,
      pipeOut: (value: string) => {
        const curValue = parseInt(value);
        if (value === 'auto' || curValue || curValue === 0) {
          return value;
        } else {
          return undefined;
        }
      }
    };
  }
);

// 最大宽度设置
setSchemaTpl(
  'layout:max-width',
  (config?: {
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    unitOptions?: Array<string>;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      type: 'input-number',
      label:
        config?.label ||
        tipedLabel('最大宽度', '最大宽度即当前元素最大的水平展示区域'),
      name: config?.name || 'style.maxWidth',
      value: config?.value,
      min: '${style.minWidth | toInt}',
      visibleOn: config?.visibleOn
        ? `(${config?.visibleOn}) && !data.isFixedWidth`
        : '!data.isFixedWidth',
      clearable: true,
      unitOptions: config?.unitOptions ?? LayoutUnitOptions,
      pipeIn: config?.pipeIn,
      // pipeOut: config?.pipeOut
      pipeOut: (value: string) => {
        const curValue = parseInt(value);
        if (value === 'auto' || curValue || curValue === 0) {
          return value;
        } else {
          return undefined;
        }
      }
    };
  }
);

// 最小宽度设置
setSchemaTpl(
  'layout:min-width',
  (config?: {
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    unitOptions?: Array<string>;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      type: 'input-number',
      label:
        config?.label ||
        tipedLabel('最小宽度', '最小宽度即当前元素最小的水平展示区域'),
      name: config?.name || 'style.minWidth',
      value: config?.value,
      max: '${style.maxWidth | toInt}',
      visibleOn: config?.visibleOn
        ? `(${config?.visibleOn}) && !data.isFixedWidth`
        : '!data.isFixedWidth',
      clearable: true,
      unitOptions: config?.unitOptions ?? LayoutUnitOptions,
      pipeIn: config?.pipeIn,
      // pipeOut: config?.pipeOut
      pipeOut: (value: string) => {
        const curValue = parseInt(value);
        if (value === 'auto' || curValue || curValue === 0) {
          return value;
        } else {
          return undefined;
        }
      }
    };
  }
);

// 超出显示模式
setSchemaTpl(
  'layout:overflow',
  (config?: {
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      type: 'select',
      label: config?.label || '超出显示模式',
      name: config?.name || 'style.overflow',
      value: config?.value || 'visible',
      visibleOn: config?.visibleOn,
      pipeIn: config?.pipeIn,
      pipeOut: config?.pipeOut,
      options: [
        {
          label: '超出显示',
          value: 'visible'
        },
        {
          label: '超出隐藏',
          value: 'hidden'
        }
      ]
    };
  }
);

// x轴（水平轴）滚动模式
setSchemaTpl(
  'layout:overflow-x',
  (config?: {
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      type: 'select',
      label:
        config?.label ||
        tipedLabel(' x轴滚动模式', '用于设置水平方向的滚动模式'),
      name: config?.name || 'style.overflowX',
      value: config?.value || 'visible',
      visibleOn: config?.visibleOn,
      pipeIn: config?.pipeIn,
      pipeOut: config?.pipeOut,
      options: [
        {
          label: '超出显示',
          value: 'visible'
        },
        {
          label: '超出隐藏',
          value: 'hidden'
        },
        {
          label: '滚动显示',
          value: 'scroll'
        },
        {
          label: '自动适配',
          value: 'auto'
        }
      ]
    };
  }
);

// 是否固定高度: isFixedHeight 配置:
setSchemaTpl(
  'layout:isFixedHeight',
  (config?: {
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
    onChange?: (value: boolean) => void;
  }) => {
    return {
      type: 'button-group-select',
      label: config?.label || '高度设置',
      size: 'xs',
      name: config?.name || 'isFixedHeight',
      options: [
        {
          label: '固定',
          value: true
        },
        {
          label: '适配',
          value: false
        }
      ],
      value: config?.value ?? false,
      visibleOn: config?.visibleOn,
      inputClassName: 'inline-flex justify-between',
      pipeIn: config?.pipeIn,
      pipeOut: config?.pipeOut,
      onChange: (value: boolean, oldValue: boolean, model: any, form: any) => {
        if (value) {
          // 固定高度时，剔除最大高度、最小高度
          form.deleteValueByName('style.maxHeight');
          form.deleteValueByName('style.minHeight');
        } else {
          // 非固定高度时，剔除高度数值
          form.deleteValueByName('style.height');
        }
        if (config?.onChange) {
          config.onChange(value);
        }
      }
    };
  }
);

// 高度设置
setSchemaTpl(
  'layout:height',
  (config?: {
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    unitOptions?: Array<string>;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      type: 'input-number',
      label: config?.label || '高度',
      name: config?.name || 'style.height',
      value: config?.value || '300px',
      visibleOn: config?.visibleOn
        ? `(${config?.visibleOn}) && data.isFixedHeight`
        : 'data.isFixedHeight',
      clearable: true,
      unitOptions: config?.unitOptions ?? LayoutUnitOptions,
      pipeIn: config?.pipeIn,
      // pipeOut: config?.pipeOut
      pipeOut: (value: string) => {
        const curValue = parseInt(value);
        if (value === 'auto' || curValue || curValue === 0) {
          return value;
        } else {
          return undefined;
        }
      }
    };
  }
);

// 最大高度设置
setSchemaTpl(
  'layout:max-height',
  (config?: {
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    unitOptions?: Array<string>;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      type: 'input-number',
      label:
        config?.label ||
        tipedLabel('最大高度', '最大高度即当前元素最多的展示高度'),
      name: config?.name || 'style.maxHeight',
      value: config?.value,
      min: '${style.minHeight | toInt}',
      visibleOn: config?.visibleOn
        ? `(${config?.visibleOn}) && !data.isFixedHeight`
        : '!data.isFixedHeight',
      clearable: true,
      unitOptions: config?.unitOptions ?? LayoutUnitOptions,
      pipeIn: config?.pipeIn,
      // pipeOut: config?.pipeOut
      pipeOut: (value: string) => {
        const curValue = parseInt(value);
        if (value === 'auto' || curValue || curValue === 0) {
          return value;
        } else {
          return undefined;
        }
      }
    };
  }
);

// 最小高度设置
setSchemaTpl(
  'layout:min-height',
  (config?: {
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    unitOptions?: Array<string>;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      type: 'input-number',
      label:
        config?.label ||
        tipedLabel('最小高度', '最小高度即当前元素最小的垂直展示区域'),
      name: config?.name || 'style.minHeight',
      value: config?.value,
      max: '${style.maxHeight | toInt}',
      visibleOn: config?.visibleOn
        ? `(${config?.visibleOn}) && !data.isFixedHeight`
        : '!data.isFixedHeight',
      clearable: true,
      unitOptions: config?.unitOptions ?? LayoutUnitOptions,
      pipeIn: config?.pipeIn,
      // pipeOut: config?.pipeOut
      pipeOut: (value: string) => {
        const curValue = parseInt(value);
        if (value === 'auto' || curValue || curValue === 0) {
          return value;
        } else {
          return undefined;
        }
      }
    };
  }
);

// y轴（交叉轴）滚动模式
setSchemaTpl(
  'layout:overflow-y',
  (config?: {
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      type: 'select',
      label:
        config?.label ||
        tipedLabel(' y轴滚动模式', '用于设置垂直方向的滚动模式'),
      name: config?.name || 'style.overflowY',
      value: config?.value || 'visible',
      visibleOn: config?.visibleOn,
      pipeIn: config?.pipeIn,
      pipeOut: config?.pipeOut,
      options: [
        {
          label: '超出显示',
          value: 'visible'
        },
        {
          label: '超出隐藏',
          value: 'hidden'
        },
        {
          label: '滚动显示',
          value: 'scroll'
        },
        {
          label: '自动适配',
          value: 'auto'
        }
      ]
    };
  }
);

// 对齐方式
setSchemaTpl(
  'layout:margin-center',
  (config?: {
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      type: 'button-group-select',
      size: 'xs',
      label:
        config?.label ||
        tipedLabel(
          '对齐方式',
          '通过 margin 数值来设置对齐方式，其中 margin: 0 auto 用于设置居中对齐'
        ),
      name: config?.name || 'style.margin',
      value: config?.value,
      inputClassName: 'inline-flex justify-between',
      visibleOn:
        config?.visibleOn ??
        'data.isFixedWidth || data.style && data.style.maxWidth',
      options: [
        {
          label: '靠左',
          value: 'auto auto auto 0px'
        },
        {
          label: '居中',
          value: '0px auto'
        },
        {
          label: '靠右',
          value: 'auto 0px auto auto'
        }
      ],
      pipeIn: config?.pipeIn
        ? config?.pipeIn
        : (value: any, data: any) => {
            let themeCssValue =
              data.data?.themeCss?.baseControlClassName?.[
                'padding-and-margin:default'
              ]?.margin;
            return value || themeCssValue;
          },
      pipeOut: config?.pipeOut,
      onChange: (value: string, oldValue: string, model: any, form: any) => {
        if (
          form?.data?.style?.position === 'fixed' ||
          form?.data?.style?.position === 'absolute'
        ) {
          // 吸附容器
          if (value === '0px auto') {
            // 居中
            if (form.data?.sorptionPosition === 'top') {
              // 吸顶
              form.setValueByName('style.inset', '0px auto auto 50%');
            } else if (form.data?.sorptionPosition === 'bottom') {
              // 吸底
              form.setValueByName('style.inset', 'auto auto 0px 50%');
            } else {
              form.setValueByName('style.inset', 'auto auto auto 50%');
            }
            form.setValueByName('style.transform', 'translateX(-50%)');
          } else if (value === 'auto 0px auto auto') {
            // 靠右
            if (form.data?.sorptionPosition === 'top') {
              // 吸顶
              form.setValueByName('style.inset', '0px 0px auto auto');
            } else if (form.data?.sorptionPosition === 'bottom') {
              // 吸底
              form.setValueByName('style.inset', 'auto 0px 0px auto');
            } else {
              form.setValueByName('style.inset', 'auto 0px auto auto');
            }
            form.deleteValueByName('style.transform');
          } else {
            // 靠左
            if (form.data?.sorptionPosition === 'top') {
              // 吸顶
              form.setValueByName('style.inset', '0px auto auto 0px');
            } else if (form.data?.sorptionPosition === 'bottom') {
              // 吸底
              form.setValueByName('style.inset', 'auto auto 0px 0px');
            } else {
              form.setValueByName('style.inset', 'auto auto auto 0px');
            }
            form.deleteValueByName('style.transform');
          }
        } else {
          // 靠左
          form.deleteValueByName('style.transform');
        }
      }
    };
  }
);

//「参考位置」可设置为左上角、右上角、右下角、左下角，默认为“右下角”。
setSchemaTpl(
  'layout:originPosition',
  (config?: {
    mode?: string;
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string | boolean;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    const configSchema = {
      type: 'select',
      label:
        config?.label ||
        tipedLabel(
          '参考位置',
          '可设置为左上角、右上角、右下角、左下角，默认为右下角'
        ),
      name: config?.name || 'originPosition',
      value: config?.value || 'right-bottom',
      visibleOn:
        config?.visibleOn ??
        'data.style && data.style.position && (data.style.position === "fixed" || data.style.position === "absolute")',
      pipeIn: config?.pipeIn,
      pipeOut: config?.pipeOut,
      options: [
        {
          label: '左上角',
          value: 'left-top'
        },
        {
          label: '右上角',
          value: 'right-top'
        },
        {
          label: '右下角(默认)',
          value: 'right-bottom'
        },
        {
          label: '左下角',
          value: 'left-bottom'
        }
      ],
      onChange: (value: string, oldValue: string, model: any, form: any) => {
        if (value === 'right-bottom') {
          // 右下角
          form.setValueByName('style.inset', 'auto 50px 50px auto');
        } else if (value === 'left-top') {
          // 左上角
          form.setValueByName('style.inset', '50px auto auto 50px');
        } else if (value === 'right-top') {
          // 右上角
          form.setValueByName('style.inset', '50px 50px auto auto');
        } else if (value === 'left-bottom') {
          // 左下角
          form.setValueByName('style.inset', 'auto auto 50px 50px');
        }
      }
    };

    if (config?.mode === 'vertical') {
      return {
        type: 'group',
        mode: 'vertical',
        visibleOn: config?.visibleOn,
        body: [
          {
            ...configSchema
          }
        ]
      };
    } else {
      return configSchema;
    }
  }
);

// 吸附位置配置项
setSchemaTpl('layout:sorption', {
  type: 'button-group-select',
  label: '吸附位置',
  size: 'xs',
  name: 'sorptionPosition',
  options: [
    {
      label: '吸顶',
      value: 'top'
    },
    {
      label: '吸底',
      value: 'bottom'
    }
  ],
  onChange: (value: string, oldValue: string, model: any, form: any) => {
    if (value === 'top') {
      form.setValueByName('style.inset', '0 auto auto 0');
    } else if (value === 'bottom') {
      form.setValueByName('style.inset', 'auto auto 0 0');
    }
  }
});

// 滚动吸附配置项
setSchemaTpl('layout:sticky', {
  type: 'switch',
  label: tipedLabel(
    '滚动吸附',
    '开启滚动吸附后，当滚动至父容器上下边沿时会自动开启吸附模式。'
  ),
  name: 'stickyStatus',
  inputClassName: 'inline-flex justify-between',
  onChange: (value: boolean, oldValue: boolean, model: any, form: any) => {
    if (value) {
      form.setValueByName('style.position', 'sticky');
      form.setValueByName('style.inset', '0px auto auto auto');
      form.setValueByName('style.zIndex', 10);
    } else {
      form.setValueByName('style.position', 'static');
      form.deleteValueByName('style.inset');
      form.deleteValueByName('style.zIndex');
    }
  }
});

// 滚动吸附位置配置项
setSchemaTpl('layout:stickyPosition', {
  type: 'button-group-select',
  size: 'xs',
  label: tipedLabel('吸附位置', '用于设置滚动吸附时的位置'),
  name: 'stickyPosition',
  visibleOn: 'data.stickyStatus',
  options: [
    {
      label: '吸顶',
      value: 'top'
    },
    {
      label: '吸底',
      value: 'bottom'
    },
    {
      label: '自动',
      value: 'auto'
    }
  ],
  onChange: (value: string, oldValue: string, model: any, form: any) => {
    if (value === 'top') {
      form.setValueByName('style.inset', '0px auto auto auto');
    } else if (value === 'bottom') {
      form.setValueByName('style.inset', 'auto auto 0px auto');
    } else if (value === 'auto') {
      form.setValueByName('style.inset', '0px auto 0px auto');
    }
  }
});

// 默认内边距配置项
setSchemaTpl(
  'layout:padding',
  (config?: {
    label?: string;
    name?: string;
    mode?: string;
    visibleOn?: string;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      label: config?.label || '默认内间距',
      type: 'button-group-select',
      name: config?.name || 'size',
      size: 'xs',
      mode: config?.mode || 'horizontal', // horizontal、vertical
      visibleOn: config?.visibleOn,
      pipeIn: config?.pipeIn || defaultValue(''),
      pipeOut: config?.pipeOut,
      options: [
        {
          label: '默认',
          value: ''
        },
        {
          label: '极小',
          value: 'xs'
        },
        {
          label: '小',
          value: 'sm'
        },
        {
          label: '中',
          value: 'md'
        },
        {
          label: '大',
          value: 'lg'
        },
        {
          label: '无',
          value: 'none'
        }
      ]
    };
  }
);

// 内部水平对齐方式
setSchemaTpl(
  'layout:textAlign',
  (config?: {
    label?: string;
    name?: string;
    mode?: string;
    visibleOn?: string;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      label: config?.label || '对齐方式',
      type: 'button-group-select',
      name: config?.name || 'textAlign',
      // size: 'xs',
      mode: config?.mode || 'horizontal', // horizontal、vertical
      visibleOn: config?.visibleOn,
      pipeIn: config?.pipeIn || defaultValue(''),
      pipeOut: config?.pipeOut,
      options: [
        {
          label: '',
          value: 'left',
          icon: 'fa fa-align-left'
        },
        {
          label: '',
          value: 'center',
          icon: 'fa fa-align-center'
        },
        {
          label: '',
          value: 'right',
          icon: 'fa fa-align-right'
        },
        {
          label: '',
          value: 'justify',
          icon: 'fa fa-align-justify'
        }
      ]
    };
  }
);

// flex相关配置项（整合版）
setSchemaTpl(
  'layout:flex-setting',
  (config?: {
    name?: string;
    label?: string;
    visibleOn?: string;
    direction?: string;
    justify?: string;
    alignItems?: string;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      type: 'flex-layout-setting',
      name: config?.name || 'style',
      mode: 'vertical', // horizontal、vertical
      label: config?.label ?? false,
      visibleOn: config?.visibleOn,
      direction: config?.direction,
      justify: config?.justify,
      alignItems: config?.alignItems,
      pipeIn: config?.pipeIn,
      pipeOut: config?.pipeOut
    };
  }
);

// 子配置项包裹容器
setSchemaTpl(
  'layout:wrapper-contanier',
  (config: {visibleOn?: string; className?: string; body: Array<any>}) => {
    return {
      type: 'container',
      className: `config-wrapper-contanier ${config.className || ''}`,
      body: config.body,
      visibleOn: config?.visibleOn
    };
  }
);

// 图片平铺模式
setSchemaTpl(
  'layout:image-resizeMode',
  (config?: {
    label?: string;
    name?: string;
    value?: string;
    visibleOn?: string;
    pipeIn?: (value: any, data: any) => void;
    pipeOut?: (value: any, data: any) => void;
  }) => {
    return {
      type: 'select',
      label: config?.label || '图片平铺模式',
      name: config?.name || 'resizeMode',
      value: config?.value || 'center',
      visibleOn: config?.visibleOn,
      pipeIn: config?.pipeIn,
      pipeOut: config?.pipeOut,
      options: [
        {
          label: 'center',
          value: 'center'
        },
        {
          label: 'contain',
          value: 'contain'
        },
        {
          label: 'cover',
          value: 'cover'
        },
        {
          label: 'repeat',
          value: 'repeat'
        },
        {
          label: 'stretch',
          value: 'stretch'
        }
      ]
    };
  }
);
