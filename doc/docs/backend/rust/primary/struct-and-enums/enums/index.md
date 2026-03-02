---
title: 枚举
---

这节课，我们来学习枚举，顾名思义，枚举定义一个可能的选项组，通过 `enum` 关键字来定义，语法和 `sturt` 差不多：

## 定义枚举

```rust
enum Fruit {
  Apple,
  Banana,
  Orange,
}
```

## 访问枚举的项

我们通过 `::` 来访问枚举中的某一个值：

```rust
enum Fruit {
  Apple,
  Banana,
  Orange,
}

fn main() {
  let apple = Fruit::Apple;
  let banana = Fruit::Banana;
}
```

## 枚举项的值

当然，你可以为枚举的某一项添加一个值：

```rust
enum Message {
  Quit,
  Move { x: i32, y: i32 },
  Write(String),
  ChangeColor(i32, i32, i32),
}

fn main() {
  let m1 = Message::Quit;
  let m2 = Message::Move{ x: 1, y: 1};
  let m3 = Message::ChangeColor(255, 255, 0);
}
```

它可以是任何类型的值。

我们也可以在结构体中定义一个值为枚举、为枚举定义 impl 块。总而言之，枚举和 `struct` 在很多方面的确很相似，那我们为什么需要枚举呢？

## 为什么需要枚举

最核心的就是他们两者表达的项关系不同：`sturct` 需要你每一个项都存在值，而 `enum` 是选择其中一项。

而通过这个特性衍生出来的语法就是 —— 模式匹配。