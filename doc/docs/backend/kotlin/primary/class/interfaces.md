---
title: 接口
---

在 Kotlin 中，你可以定义一个接口，让类实现某一个结构中的成员函数或者成员变量，例如：

```kotlin
interface IBase {
  val foo: String
  
  fun bar()
}

class Base: IBase {
  override val foo = "Hello World"
  
  override fun bar() {
    println(foo)
  }
}

fun main() {
  Base().bar()
}
```

上面是基础的用法，我们拆开来看看：

## 接口中的属性

在接口中，我们可以通过 `val` / `var` 定义一个成员属性：

```kotlin
interface IBase {
  // 这是一个抽象属性，子类需要提供 prop 的值
  val prop: Int;
  
  // 你也可以为成员属性提供 getter，子类就不需要提供 prop2 的值
  val prop2: String
        get() = "Hello"
        
  // 子类需要提供 method 的实现
  fun method()        

  // 子类不需要提供 method2 的实现
  fun method2() {
    // do something
  }
}
```

## 接口可以继承

```kotlin
interface IBase1 {
  val prop1: String
}

interface IBase2: IBase1 {
  val prop2: Int
  
  fun method() {
    println("p1: $prop1, p2: $prop2")
  }
}
```

子接口可以访问父接口的成员。

如果一个成员提供了值 / 实现，我们通过 `super` 访问它：

```kotlin
interface IBase {
  fun foo() {
    println("foo")
  }
}

class Base: IBase {
  override fun foo() {
    super.foo()
    println("Base foo")
  }
}

fun main() {
  Base().foo()
}
```

## 接口冲突

一个类 / 接口可以继承多个接口，如果在每个接口中都有相同的成员，那么在实现的过程中，如何区分它们呢？

```kotlin
interface A {
  fun foo() {
    println("A")
  }
}

interface B {
  fun foo() {
    println("B")
  }
}

class C: A, B {
  override fun foo() {
    super<A>.foo()
    super<B>.foo()
    println("C")
  }
}

fun main() {
  C().foo()
}
```

## 委托

委托（Delegation）是一种设计模式。例如下面这段代码：

```kotlin
interface Printer {
  fun printMessage(message: String): Unit
}

class PrinterImpl: Printer {
  override fun printMessage(message: String): Unit {
    println("[PrinterImpl]: $message")
  }
}

// 通过 by 关键字将 Printer 实现委托给外部使用
class SmartPrinter(printer: Printer): Printer by printer {
  fun foo() {
    println("foo")
  }
}

fun main() {
  val printer = PrinterImpl()
  val smartPrinter = SmartPrinter(printer)
  
  smartPrinter.printMessage("Hello, World!")
  smartPrinter.foo()
}
```
