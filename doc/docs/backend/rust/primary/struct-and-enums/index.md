---
title: 结构体
detail: 结构体虽然知识点非常多，不过全部都是一笔带过的，结构体是一个非常简单的数据类型，也是非常常见的数据类型，更重要的是 impl 块。
---

结构体是 Rust 中最常见的一个类型，就比如我们刚刚学到的 `String` 字符串，它就是一个结构体。结构体用于将其它数据结合起来存储，在其他语言中也可能会出现类似的数据类型，
例如 `record`、`object` 等等。

## 定义结构体

在 Rust 中，结构体的语法是：

```rust
struct <StructName> {
  <label>: <type>,
}
```

例如：

```rust
struct BankAccount {
  id: String,
  balance: f32,
}
```

## 使用结构体

使用结构体的语法就是 `<StructName> { /* values here */ }`，例如：

```rust
struct BankAccount {
  id: String,
  balance: f32,
}

fn main() {
  let account: BankAccount = BankAccount {
    id: String::from("123"),
    balance: 123.12,
  }; // 注意分号！
}
```

## 访问结构体字段

```rust
struct BankAccount {
  id: String,
  balance: f32,
}

fn main() {
  let mut account: BankAccount = BankAccount {
    id: String::from("123"),
    balance: 123.12,
  };
  
  account.balance -= 15.0; // [!code focus]
}
```

## 结构体更新语法

结构体更新语法 (Struct Update Syntax) 允许你通过 `..<struct>` 的语法来展开一个结构体，并且更新另一个结构体中未定义的内容：

```rust
struct User {
  active: bool,
  username: String,
  email: String,
  sign_in_count: u64,
}

fn main() {
  let user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someuser123"),
    active: true,
    sign_in_count: 1,
  };

  // 使用结构体更新语法创建新实例
  let user2 = User {
    email: String::from("another@example.com"),
    ..user1 // 剩余字段从 user1 中获取
  };
    
  // 注意：此时 user1 的 username 字段所有权已移至 user2！
  // user1.username ❌
}
```

这个语法必须放在初始化列表的最后使用，而且两者必须是同一种类型。

## 结构体字段初始化简写

结构体字段初始化简写 (Struct Field Init Shorthand) 允许你在变量名和结构字段相同的时候，进行简写而不用填入值：

```rust
struct User {
  username: String,
  email: String,
}

fn build_user(email: String, username: String) -> User {
  User {
    email: email,       // 重复书写 // [!code --]
    username: username, // 重复书写 // [!code --]
    email,       // [!code ++]
    username, // [!code ++]
  }
}
```

## 结构体解构

我们可以通过下面这个语法解构一个结构体：

```rust
struct User {
  username: String,
  email: String,
}

fn main() {
  let user = User {
    email: String::from("demo@example.com"),
    username: String::from("demo")
  };
  
  let User { email, username } = user; // [!code focus]
}
```

## 元组结构体

元组结构体的值是一个元组类型：

```rust
struct Color(u8, u8, u8);

fn main() {
  let color: Color = Color(255, 255, 255);
}
```

主要的作用是为元组提供统一的名称，访问值的方法（点访问、解构）和元组一样。

## 单元结构体

单元结构体不包含任何值：

```rust
struct UnitStruct;
```

单元结构体通常与 `impl` 块一起出现，下一节课，我们就学习 `impl` 块 —— 为结构体实现行为。