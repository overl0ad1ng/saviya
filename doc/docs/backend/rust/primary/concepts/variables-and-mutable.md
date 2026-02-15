---
title: 变量和可变性
---

还记得吗？我们在猜数游戏中，使用了一个语法，声明了一个名为 `secret_number` 的变量，这个语法就是：

```rust
let <variable_name>: <data_type> = <value>;
```

例如：

```rust
fn main() {
  let x: i32 = 15;
  println!("x = {}", x);
}
```

## 显式和隐式声明变量类型

我们在上面一个例子中，在 `x` 的后面加了一个 `: i32`，这是变量类型的**显示声明**，当然还包括隐式声明，那就是让 Rust 编译器去自动推导变量类型：

```rust
let x = 15;
```

如果你有类似于 RustRover 的现代智能编译器，在 `x` 的后面，其实会显示出 `x` 的类型：

![img.png](../../../../../resources/images/backend/rust/primary-concepts-variables-and-mutable-01.png)

## 变量的初始化

初始化指的是变量的**第一次赋值**，我们可以在变量声明的时候进行初始化，也可以先让变量声明，后续再进行初始化操作。

```rust
fn main() {
  let a = 10; // 在声明时进行初始化
  
  let b; // 先不进行初始化
  // 做些什么
  b = 15; // 然后进行初始化
  
  println!("a = {}, b = {}", a, b);
}
```

## 变量的可变性

再进行变量初始化的时候，我们做了一件事情，那就是对变量进行**赋值**。换句话说，我们可以把 “在声明时进行初始化” 这句话用另一种说法来说，那就是：

- 在变量声明的时候进行赋值

在 Rust 中，变量有一个规则，那就是**变量默认不能被赋值两次**，换句话说，变量**默认是不可变的**。

我们来看一个例子：

```rust
fn main() {
  let a = 15; // 初始化了一个变量
  
  a = 20; // 报错
}
```

这段代码会报错，我们看一眼报错的内容：

```text
error[E0384]: cannot assign twice to immutable variable `a`
 --> src\main.rs:4:2
  |
2 |     let a = 15; // 初始化了一个变量
  |         - first assignment to `a`
3 |     
4 |     a = 20; // 报错
  |     ^^^^^^ cannot assign twice to immutable variable
  |
help: consider making this binding mutable
  |
2 |     let mut a = 15; // 初始化了一个变量
  |         +++
```

<code>cannot assign twice to immutable variable \`a`</code>，这句话翻译过来是：**不能对不可变的变量 a 进行两次赋值**。

这就是 Rust 变量的核心特性：默认不可变。

想要让变量变得可变，我们需要添加一个 **mut** 关键字：

```rust
fn main() {
  let **mut** a = 15; // 初始化了一个变量
  
  a = 20; // 不再报错
}
```

## 命名规则

Rust 对于变量存在一个软性的命名规则，那就是所有命名都采用 `snake_case`，例如 `my_name` `my_age`

## 变量遮蔽 (Shadowing)

:::blockquote
暂时不清楚 Shadowing 这个的正确翻译，有说是影子变量的，也有说是覆写、变量隐藏的，不过社区给的翻译是变量遮蔽，我这里也采用这个翻译了。
:::

变量遮蔽可以通过 `let` 关键词重复声明已经存在的变量，它允许你声明一个与现有变量同名的新变量。主要用途是用于修改变量的值和类型：

```rust
let val: bool = true;
let val: i32 = 15; // 不会报错

println!("val = {}", val); // val = 15
```

## 静态变量和常量

我们除了 `let` 能够声明变量，还有两个声明变量的语法，不过目前我们并不会用到它，在后面的课程我们会重点、深入的学习，目前给大家提一嘴，它们分别是：

1. 常量：使用 `const` 关键字声明，大写 eg. `UPPERCASE_NAMING`
2. 静态变量：使用 `static` 关键字声明，大写 eg. `UPPERCASE_NAMING`