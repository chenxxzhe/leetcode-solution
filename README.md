# leetcode

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Lints and fixes files

```
yarn lint
```

## TODO

- QueryConfig 要加上 testcase 的自定义处理


## 算法性能优化

- 少改变数组,对象 i.e Array.pop ...
- 少变量
- 位运算(不能为了性能牺牲可读性)
- 少递归
- 少用对象的方法 i.e Array.prototype Object.prototype
- 使用高级算法

找东西,用表,用索引

#### number

- 改变数字排序, 尽量使用运算, 而不是变成字符串来处理; (是否提速有待考证...)

#### Array

- 数组相关, 与位置无关的结果, 可以先排序再处理, 要注意不不一定数字才能排序, 字符也可以
- *遍历可以考虑跳过无用的值, 从而提速

