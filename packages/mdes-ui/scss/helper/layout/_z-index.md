---
title: Z-Index
---

Utilities for controlling the stack order of an element.

| Class  | Properties    |
| ------ | ------------- |
| z-0    | z-index: 0    |
| z-10   | z-index: 10   |
| z-20   | z-index: 20   |
| z-30   | z-index: 30   |
| z-40   | z-index: 40   |
| z-50   | z-index: 50   |
| z-auto | z-index: auto |

## 用法

```html
<div
  class="flex ... justify-center relative h-28 text-center transform translate-x-12"
>
  <div
    class="z-40 ... relative w-20 h-20 bg-purple-500 border-r border-opacity-50 border-purple-600 rounded-md shadow-md flex justify-center items-center text-white text-2xl font-extrabold"
  >
    5
  </div>
  <div
    class="z-30 ... relative w-20 h-20 -left-6 top-2 bg-purple-500 border-r border-opacity-50 border-purple-600 rounded-md shadow-md flex justify-center items-center text-white text-2xl font-extrabold"
  >
    4
  </div>
  <div
    class="z-20 ... relative w-20 h-20 -left-12 top-4 bg-purple-500 border-r border-opacity-50 border-purple-600 rounded-md shadow-md flex justify-center items-center text-white text-2xl font-extrabold"
  >
    3
  </div>
  <div
    class="z-10 ... relative w-20 h-20 -left-18 top-6 bg-purple-500 border-r border-opacity-50 border-purple-600 rounded-md shadow-md flex justify-center items-center text-white text-2xl font-extrabold"
  >
    2
  </div>
  <div
    class="z-0 ... relative w-20 h-20 -left-24 top-8 bg-purple-500 rounded-md shadow-md flex justify-center items-center text-white text-2xl font-extrabold"
  >
    1
  </div>
</div>
```

# 响应式设计

支持通过添加设备前缀 `m:` 或者 `pc:` 来分别针对「手机端」或者「pc 端」设置样式，更多说明请前往[「响应式设计」](../../../docs/style/responsive-design.md)。

## 状态前缀

不支持[「状态前缀」](../../../docs/style/state.md)，有需求请提 [issue](https://github.com/baidu/mdes/issues)。
