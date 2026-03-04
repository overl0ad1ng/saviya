---
title: 数据类
---

在 Kotlin 中，有一种类，它用于存储数据，对于每个数据类，编译器都会自动生成一些额外的成员函数，这些函数允许您将实例打印为可读的输出、比较实例、复制实例等等。

```kotlin
data class Person(val name: String, val age: Int)
```

我们用上面这段代码举例。`data` 关键字会让编译器为你生成如下几个函数：

## `equals` 和 `hashCode`

通过 `equals` 和 `hashCode` 可以让你比较成员变量是否相等，在默认情况下，你对两个 `class` 比较事实上是在比较内存地址而非其中的值：

```kotlin
data class Person(var name: String, var age: Int)

fun main() {
  val p1 = Person("Alice", 18)
  val p2 = Person("Alice", 18)
  
  println(p1 == p2) // true
  
  p2.age = 20;
  
  println(p1 == p2) // false
}
```

> [!TIP]
> 你们可以自己运行这段代码查看结果

## `toString`

`toString` 可以帮助你打印出一段可读的文本内容，它的格式是 `类名(属性名=值, ..N个属性)`：

```kotlin
data class Person(var name: String, var age: Int)

fun main() {
  val p1 = Person("Alice", 18)
  
  println(p1) // Person(name=Alice, age=18)
}
```

## `componentN`

`componentN` (`N` 是具体的数字)，可以用于解构属性：

```kotlin
data class Person(var name: String, var age: Int)

fun main() {
  val p1 = Person("Alice", 18)
  
  val (name, age) = p1
  
  // 也可以是
  // val name = p1.component1()
  // val age = p1.component2()
  // 这两种选择效果相同，前者是语法糖
}
```

## `copy`

`copy` 允许你获得一个新实例，也可以修改其中的值，不会影响原来的那一个实例：

```kotlin
data class Person(var name: String, var age: Int)

fun main() {
  val p1 = Person("Alice", 18)
  
  val p2 = p1.copy(age = 25)
  
  println("p1: $p1, p2: $p2")
  // p1: Person(name=Alice, age=18), p2: Person(name=Alice, age=25)
}
```

但是，`copy` 的实现是浅拷贝，我们看下面这个例子：

```kotlin
data class Employee(val name: String, val role: MutableList<String>)

fun main() {
  val e1 = Employee("Bob", mutableListOf("developer"))
  
  val e2 = e1.copy(name = "Jone")
  
  e2.role.add("ui/ux")
  
  println(e1) // Employee(name=Bob, role=[developer, ui/ux])
  println(e2) // Employee(name=Jone, role=[developer, ui/ux])
}
```

在这个例子中，我们有一个解决方案：

```kotlin
val e2 = e1.copy(name = "Jone") // [!code --]
val e2 = e1.copy(
  name = "Jone",
  role = e1.role.toMutableList() // [!code ++]
)
```

这创建了一个新的 `MutableList`。当然还有很多解决方案，不展开介绍了

