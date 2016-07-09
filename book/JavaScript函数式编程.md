# 函数式编程 - JavaScript

[什么是函数式编程思维](https://www.zhihu.com/question/28292740)

1. 所谓函数，并不是指function，而是数学意义上的函数，即变量的映射，一个函数的值取决于函数参数的值，不依赖其他状态。
2. 在函数中，变量是不可变的，不能多次赋值，没有循环，也就需要用递归(栈)来解决迭代问题。
3. 由于没有可变状态，函数就是引用透明和没有副作用的。不共享状态，也就没有资源争用和锁保护。

## 第1章 简介

### 1.2.3 封装与隐藏

在面向对象的概念中，所谓封装，即一个类包含数据与相应操作方法。

在JavaScript中，闭包用来隐藏数据

### 1.2.6 函数式初试

```
// 区分null、undefined与其它任何对象
function existy(x) { return x != null };

// 判断一个对象是否应该被认为是ture的同义词
function truthy(x) { return (x !== false) && existy(x) };
```

## 第2章 一等函数与Applicative编程

### 2.1 函数是一等公民

函数可以作为变量、数组元素、对象成员变量、函数参数、函数返回值...

### 多种编程方式

1. 命令式编程
2. 面向对象编程(其实也属于命令式)
3. 元编程

### 2.2.3 定义几个Applicative函数

```
var _ = require('underscore');

function existy(x) {
  return x != null
}

function cat() {
  var head = _.first(arguments);
  if(existy(head))
    return head.concat.apply(head, _.rest(arguments));
  else
    return [];
}

function construct(head, tail) {
  return cat([head], _.toArray(tail));
}

function butLast(coll) {
  return _.toArray(coll).slice(0, -1);
}

function mapcat(fun, coll) {
  return cat.apply(null, _.map(coll, fun));
}

function interpose (inter, coll) {
  return butLast(mapcat(function(e) {
    return construct(e, [inter]);
  },
  coll));
}

console.log(interpose(",", [1, 2, 3]));
```

## 变量的作用域和闭包

词法作用域: 变量查找从最内层范围向外扩展

动态作用域: 维护命名绑定栈的全局映射

闭包: 一个函数，捕获作用域的外部绑定（例如:不是自己的参数）。这些绑定是为之后使用（即使在该作用域已结束）而被定义的。

```
function createWeiredScaleFunction(FACTOR) {
  // v = [5, 6, 7]
  return function(v) {
    this['FACTOR'] = FACTOR;
    // captures = this.FACTOR = 10
    var captures = this;
    
    // _.bind 指定function的this
    return _.map(v, _.bind(function(n){
      return (n * this['FACTOR']);
    }, captures);
  };
}

var scale10 = createWeiredScaleFunction(10);
scale10.call({}, [5, 6, 7]);
```

## 第4章 高阶函数

