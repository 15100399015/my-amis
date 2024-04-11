/**
 * @file 颜色选择器
 * @description 设置颜色
 */

import React, {useState, useEffect, useRef} from 'react';
import {FormItem, classnames as mdesCx} from 'mdes-core';
import type {FormControlProps} from 'mdes-core';
import cx from 'classnames';
import {SketchPicker} from 'react-color';
import {Icon, NumberInput, Overlay, PopOver} from 'mdes-ui';
import cloneDeep from 'lodash/cloneDeep';

type ColorPickerProps = {
  value?: {colors?: GradientColorsType; range?: number};
  onChange?: any;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
};

type GradientColorSelectProps = {
  value?: {colors?: GradientColorsType; range?: number};
  onChange: any;
};

type GradientColorsType = {color: string; position: number}[];

// 渐变颜色
function GradientColorSelect(props: GradientColorSelectProps) {
  const slider = useRef<HTMLDivElement>(null);
  const {value, onChange} = props;
  const [colors, setColors] = useState<GradientColorsType>([]);
  const [index, setIndex] = useState(0);
  const [range, setRange] = useState<number>(0);
  const [move, setMove] = useState(false);

  let currentIndex = index;

  useEffect(() => {
    const defaultColors: GradientColorsType = [
      {color: '#fff', position: 0},
      {color: '#fff', position: 100}
    ];
    const defaultRange: number = 0;
    if (value) {
      setColors(value.colors || defaultColors);
      setRange(value.range || defaultRange);
    } else {
      setColors(defaultColors);
      setRange(defaultRange);
    }
  }, [value]);

  // 更新渐变值
  function gradientChange(range: number, colors: GradientColorsType) {
    onChange({range, colors});
  }

  // 渐变角度改变
  function rangeChange(value: number) {
    setRange(value);
    gradientChange(value, colors);
  }
  // 添加渐变点
  function handleClickSlider(e: React.MouseEvent) {
    if (move) {
      return;
    }
    const target = e.currentTarget.getBoundingClientRect();
    const itemPosition = Math.round(
      ((e.clientX - target.x) / target.width) * 100
    );
    const tempColors = cloneDeep(colors);
    const len = tempColors.length;
    let index = 0;
    if (tempColors[0].position > itemPosition) {
      tempColors.unshift({
        color: tempColors[0].color,
        position: itemPosition
      });
    } else if (tempColors[len - 1].position < itemPosition) {
      tempColors.push({
        color: tempColors[len - 1].color,
        position: itemPosition
      });
      index = len;
    } else {
      for (let i = 0; i < len; i++) {
        if (
          tempColors[i].position < itemPosition &&
          tempColors[i + 1].position > itemPosition
        ) {
          index = i + 1;
          tempColors.splice(index, 0, {
            color: tempColors[i].color,
            position: itemPosition
          });
          break;
        }
      }
    }
    setColors(tempColors);
    setIndex(index);
    gradientChange(range, tempColors);
  }

  // 按住渐变点
  function handleDownSliderItem(e: React.MouseEvent, i: number) {
    setIndex(i);
    setMove(true);
    currentIndex = i;
    window.addEventListener('mousemove', handleMoveSliderItem);
    window.addEventListener('mouseup', handleUpSliderItem);
  }

  // 移动渐变点
  function handleMoveSliderItem(e: MouseEvent) {
    const target = slider.current!.getBoundingClientRect();
    const itemPosition = Math.round(((e.x - target.x) / target.width) * 100);
    const tempColors = cloneDeep(colors);

    // 渐变点个数大于2，当y轴移动大于30，删除渐变点
    if (Math.abs(e.y - target.y) > 30 && tempColors.length > 2) {
      tempColors.splice(currentIndex, 1);
      setIndex(0);
      setColors(tempColors);
      gradientChange(range, tempColors);
    }
    // 限制不能超过最大、最小值
    else if (itemPosition >= 0 && itemPosition <= 100) {
      tempColors[currentIndex].position = itemPosition;
      // 向前交换渐变点
      if (
        tempColors[currentIndex - 1] &&
        itemPosition < tempColors[currentIndex - 1].position
      ) {
        const temp = cloneDeep(tempColors[currentIndex - 1]);
        tempColors[currentIndex - 1] = cloneDeep(tempColors[currentIndex]);
        tempColors[currentIndex] = temp;
        setIndex(currentIndex - 1);
      }
      // 向后交换渐变点
      else if (
        tempColors[currentIndex + 1] &&
        itemPosition > tempColors[currentIndex + 1].position
      ) {
        const temp = cloneDeep(tempColors[currentIndex + 1]);
        tempColors[currentIndex + 1] = cloneDeep(tempColors[currentIndex]);
        tempColors[currentIndex] = temp;
        setIndex(currentIndex + 1);
      }
      setColors(tempColors);
      gradientChange(range, tempColors);
    }
  }

  // 放开渐变点
  function handleUpSliderItem() {
    window.removeEventListener('mousemove', handleMoveSliderItem);
    window.removeEventListener('mouseup', handleUpSliderItem);
    setTimeout(() => {
      setMove(false);
    }, 0);
  }

  return (
    <div className="ae-GradientColor">
      <div className="ae-GradientColor-slider">
        {/* 渐变值 */}
        <div
          ref={slider}
          className="ae-GradientColor-slider-inner"
          style={{
            backgroundImage: `linear-gradient(to right,${colors
              .map(item => `${item.color} ${item.position}%`)
              .join(',')})`
          }}
          onClick={handleClickSlider}
        >
          {colors.map((item, i) => {
            return (
              <div
                key={i}
                className={cx(
                  'ae-GradientColor-slider-inner-item',
                  i === index && 'ae-GradientColor-slider-inner-item--active'
                )}
                onMouseDown={e => {
                  handleDownSliderItem(e, i);
                }}
                onClick={e => {
                  e.stopPropagation();
                }}
                style={{
                  left: `calc(${item.position}% - 7px)`,
                  backgroundColor: item.color
                }}
              ></div>
            );
          })}
        </div>
        <div className="ae-GradientColor-range">
          <NumberInput
            max={360}
            min={0}
            step={1}
            value={range}
            onChange={rangeChange}
          />
        </div>
      </div>

      <SketchPicker
        width="216px"
        color={colors[index]?.color}
        presetColors={[]}
        onChangeComplete={(value: any) => {
          let color = value.hex;
          if (value.rgb.a !== 1) {
            const rag = value.rgb;
            color = `rgba(${rag.r}, ${rag.g}, ${rag.b}, ${rag.a})`;
          }
          const colorsTemp = cloneDeep(colors);
          colorsTemp[index].color = color;
          setColors(colorsTemp);
          gradientChange(range, colorsTemp);
        }}
      />
    </div>
  );
}

function ColorPickerGradient(props: ColorPickerProps) {
  const {value, onChange, disabled, readOnly} = props;

  const container = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);

  const [show, setShow] = useState(false);

  function colorSelectHandler() {
    !disabled && setShow(!show);
  }

  function handleClean(event: any) {
    onChange(undefined);
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <div
      className={cx(
        'ae-ColorPickerGradient',
        disabled && 'is-disabled',
        readOnly && 'is-readOnly'
      )}
      ref={container}
    >
      <div
        className={cx(
          'ae-ColorPickerGradient',
          'ae-ColorPickerGradient--input'
        )}
        onClick={colorSelectHandler}
        ref={target}
      >
        <div className={cx('ae-ColorPickerGradient-input')}>
          <div>{(value?.colors || []).map(({color}) => color).join(',')}</div>
        </div>
        {value && !disabled && !readOnly ? (
          <span className={mdesCx('Select-clear')} onClick={handleClean}>
            <Icon icon="input-clear" className="icon" />
          </span>
        ) : null}

        <span
          className={cx(
            'ae-ColorPickerGradient-arrow',
            show && 'ae-ColorPickerGradient-arrow--active'
          )}
        >
          <Icon icon="right-arrow-bold" className="icon" />
        </span>
      </div>

      <Overlay
        // @ts-ignore
        container={document.body}
        target={target.current}
        show={show}
        placement="bottom"
      >
        <PopOver overlay onHide={() => setShow(false)}>
          <div className="ae-ColorSelect">
            <div className="ae-ColorSelect-content">
              <GradientColorSelect value={value} onChange={onChange} />
            </div>
          </div>
        </PopOver>
      </Overlay>
    </div>
  );
}

export default ColorPickerGradient;

@FormItem({
  type: 'style-color-picker-gradient',
  strictMode: false,
  renderLabel: true
})
export class ColorPickerGradientRenderer extends React.Component<FormControlProps> {
  render() {
    return <ColorPickerGradient {...this.props} />;
  }
}
