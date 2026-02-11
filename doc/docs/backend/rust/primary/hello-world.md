---
title: 你好，世界！
---

在本节课，我们将通过 cargo 来创建一个最简单的 rust 程序，并且输出 `Hello, World!`！

## 创建项目

我们需要使用 cargo 来创建一个 rust 项目（请自行安装并配置 cargo），我们一起来操作一遍（系统为 Windows 系统）：

- 目标：在当前目录下，创建一个 learn_rust 文件夹，其中包含的是一个基本的 Rust 二进制程序。

:::code-group
```text [使用 cargo new]
~\> cargo new learn_rust
    Creating binary (application) `learn_rust` package
```
```text [使用 cargo init]
~\> mkdir learn_rust

~\> cd learn_rust

~\learn_rust> cargo init
    Creating binary (application) package
```
:::

## 项目结构

接着，我们看一下 learn_rust 文件夹中有哪些东西：

```text
learn_rust/
├─ target/ # 自动生成的文件夹
├─ src/
│  └─ main.rs
├─ Cargo.lock # 自动生成的文件
└─ Cargo.toml
```

learn_rust 是我们的根目录（root directory），我们所有的代码都写在 `main.rs` 这个文件中，`Cargo.toml` 则用来记录项目的详细信息，例如项目的名称、版本、开发者、Rust 版本、依赖等等。

我们看一下两个文件都有什么东西，用 rust-rover 打开 learn_rust 文件夹：

```text
~\> cd learn_rust

~\learn_rust> rustrover .
```

我们看一下两个文件中都有什么：

:::code-group
```toml [Cargo.toml]
[package]
name = "learn_rust"
version = "0.1.0"
edition = "2024"

[dependencies]
```
:::

首先我们看一个 toml 文件，乍一看和 `ini` 文件有点像了，在这个 toml 文件中，有两个节（Section），分别是 `package` 和 `dependencies`，
第一个节 `package` 用于记录项目的信息，在这里，有三个信息： `name`、`version`、`edition`，分别代表：项目名、项目版本、Rust 版本。不同的 edition 有着不同的 Rust 特性。

接着是 `dependencies` 这个节，它是空的，用于记录这个项目的依赖。当然 Cargo.toml 能记录的内容不止这两个，还有很多，我们在后面的章节会学习到的。

---

接着我们来看 `main.rs` 的内容：

:::code-group
```rust [main.rs]
fn main() {
    println!("Hello, world!");
}
```
:::

在创建项目时，cargo 就为我们生成了这三行代码，这是可运行的，我们尝试一下，先用 `rustc` 来编译这个 rs 文件，它会生成一个 .exe 可执行文件，接着我们运行它。

```text
~\learn_rust> rustc src/main.rs
```

这行代码运行后，在 learn_rust 文件夹中，会产出两个文件：

1. `main.exe`：一个可执行的文件
2. `main.pdb`：pdb（Program Database），文件编译时生成的调试数据库

我们可以忽略 pdb 文件，因为我们并不需要它，我们运行这个 `main.exe` 文件，在 Windows 中，只需要在当前目录输入这个文件名就可以运行 .exe 程序。

```text
~\learn_rust> main
Hello, world!
```

运行过后，cmd 上会显示出 8 个字母和两个标点符号，它们共同组成了 —— Hello, World!

那么恭喜你，打开了横跨半个多世纪的科技大门。未来，你可能是渺茫沿海、籍籍无名的其中一份子，也可能是被百科网站所记录的一份子，但无论怎样，请加油。