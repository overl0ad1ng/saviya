---
title: 基础语法
---

每一个 kotlin 文件有一个入口函数：

```kotlin
fun main() {
  // your code here.
}
```

## 输出

在 Kotlin 中，使用 `println` 进行输出，下面是一个输出 Hello World 程序：

```kotlin
fun main() {
  println("Hello, World!")
}
```

- `println` 输出并换行
- `print` 输出但不换行

> [!TIP] 注意
> 
> 在 Kotlin 官方当中，特别标注了代码格式，其中 `indent` 应当为 `4` 个
> Tab，不过这里出于个人习惯、同时也是为了让页面能够容得下较长的代码段，选择使用 `2` 个 Tab。
> 
> 在较为正式的开发环境当中，还是建议遵守官方的代码格式。

## 输入

在 Kotlin 中，使用 `readln` 来读取下一行：

```kotlin
fun main() {
  println("Hello, What's your name?")
  
  val name = readln()
  
  println("Hello, $name")
}
```

- `readln` 读取一行的内容，返回值是 `String`
- `readlnOrNull` 读取一行的内容，返回值是 `String?`（可空类型，在这里如果用户不输入直接按下回车则是 `Null`）

## 变量

Kotlin 有两种声明变量的方法：`val` 和 `var`：

- `val` 用于定义**不可变**变量
- `var` 用于定义**可变**变量

请注意可不可变的区别。

```kotlin
fun main() {
  val mathPI: Double = 3.14;
  var x: Int = 0;
  
  x++;
  
  println("x: $x, PI: $mathPI")
}
```

变量的类型声明写在变量名后面 `: Type`。注意，变量在声明的时候需要使用 `camelCase`

## 函数

函数通过 `fun` 关键字定义，在 `()` 中添加参数，返回值通过 `: Type` 声明：

```kotlin
fun main() {
  val result = add(5, 15)
  
  println(result)
}

fun add(x: Int, y: Int): Int {
  return x + y
}
```

### 显式声明参数名称

在调用函数传入参数的时候，可以显式声明参数名称：

```kotlin
fun main() {
  val result = add(
    x = 5,
    y = 15
  )
  
  // 显式声明参数名称的时候，参数传递顺序不重要：
  /*
   * val result = add(
   *   y = 15, // 调换顺序也没问题
   *   x = 5
   * )
   */
  // 不推荐显式和隐式混合使用，这可能会有意想不到的问题！
  /*
   * 下面这个行
   * val result = add(
   *   x = 15,
   *   5
   * )
   * 
   * 下面这个不行
   * val result = add(
   *   y = 15, // [!code error]
   *   5
   * )
   */
  
  println(result)
}

fun add(x: Int, y: Int): Int {
  return x + y
}
```

### 函数体可以是一个表达式

如果一个函数很简单，可以用一个表达式来确定函数的运行内容，你可以这么写：

```kotlin
fun add(x: Int, y: Int) = x + y
```

这时候你不再需要添加返回值类型，Kotlin 会自动推导。

```kotlin /: Int /
fun add(x: Int, y: Int): Int = x + y
```

当然加上也没问题

### 空返回值

你可以通过 `Unit` 来声明一个函数不返回任何内容：

```kotlin
fun main() {
  printAdd(15, 55)
}

fun printAdd(x: Int, y: Int): Unit {
  println("x + y = $x + $y = ${x + y}")
}
```

当然，`Unit` 类型是默认类型，你可以不用显式声明它：

```kotlin
fun printAdd(x: Int, y: Int): Unit { // [!code --]
fun printAdd(x: Int, y: Int) { // [!code ++]
  println("x + y = $x + $y = ${x + y}")
}
```

## 字符串模板

这个没什么好说的，看一下就行了：

```kotlin
fun main() {
  var a = 1
  val s1 = "a is $a"
  println(s1)

  a = 2
  val s2 = "${s1.replace("is", "was")}, but now is $a"
  println(s2)
}
```

这节课我们先简单学这些。接下来的内容，我们展开来讲讲