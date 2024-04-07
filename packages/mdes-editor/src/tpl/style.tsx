import {setSchemaTpl, defaultValue} from 'mdes-editor-core';
import kebabCase from 'lodash/kebabCase';

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

setSchemaTpl('style:others', (schemas: any[] = []) => ({
  title: '其他项',
  body: [...schemas]
}));
