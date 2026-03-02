---
title: impl 块
---

impl 块用于实现结构体的**方法 (Method)**，它的语法很简单：

```rust
// 首先你需要一个结构体，它可以是任意类型的结构体
// 通过实现 Debug 特性来格式化输出结构体（可选）
#[derive(Debug)]
struct Point {
  x: i32,
  y: i32,
}

// 通过 impl <StructName> 声明一个 impl 块
impl Point {
  // 定义 method，语法和函数一样，new 可以创建一个构造器
  fn new(x: i32, y: i32) -> Self { // 这里可以写 Self 也可以是 Point
    Self { x, y }                  // 不过推荐写 Self
  }
  
  // 这里的 self 可以获取到其本身（在调用时可以不用传入 self 参数）
  fn move_x(&mut self, x: i32) {
    self.x += x;
  }
}

// 你可以为一个结构体定义多个 impl 块
impl Point {
  fn move_y(&mut self, y: i32) {
    self.y += y;
  }
}

fn main() {
  // 没有 self 参数的方法是一个关联方法，通过 `::` 访问
  let mut p = Point::new(1, 2);
  println!("current : {:?}", p);
  
  p.move_x(4); // 有 self 参数的方法是实例方法，通过实例 + `.` 访问
               // 通过实例访问的话无需传入 self 参数（即 `&mut p`）
               // 当然也可以这么写：Point::move_x(&mut p, 4);
               //                ^ 这个语法被称为完全限定语法 后面会讲
  println!("move x 4: {:?}", p);
  
  p.move_y(4);
  println!("move y 4: {:?}", p);
}
```

这就是 impl 块的所有内容了。当然需要注意的是 `self` 这个参数可以转换为 `self`、`&self`、`&mut self`，请注意其中的区别：

- `self` 会消耗所有权
- `&self` 不可变
- `&mut self` 才可变