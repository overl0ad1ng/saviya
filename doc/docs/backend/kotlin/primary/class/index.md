---
title: 类
---

在 Kotlin 中，使用 `class` 来定义一个类：

```kotlin
class Cat
```

我们可以通过添加 `(..arguments)` 来为一个类提供初始化参数：

```kotlin
class Cat(val name: String, val age: Int)
```

当然，这里的 `val` 是不可变的，也可以是 `var`

我们可以在后面加上 `{}` 来为一个类添加成员：

```kotlin
class Cat(val name: String, val age: Int) {
  fun makeSound() {
    println("Meow!")
  }
}
```

我们可以来使用这个类：

```kotlin
class Cat(val name: String, val age: Int) {
  fun makeSound() {
    println("Meow!")
  }
}

fun main() {
  val myCat: Cat = Cat("Coco", 3)
  
  myCat.makeSound()
}
```

这是类的基本用法。接下来我们来分别讨论如下几个部分：

## 主构造器

我们在 `Cat` 类的类名后面加上了 `(val name: String, val age: Int)` 这样一段代码，
这个是主构造器，它不存在函数体，你可以传入这些参数，在类被创建时，这些参数会作为成员属性，允许被类内部和外部访问：

```kotlin
class Animal {} // 不存在主构造器

class Cat(val name: String) { // 存在主构造器
  fun printInfo() {
    // 可以被内部成员访问
    println("Cat's name is: $name")
  }
}

fun main() {
  val cat: Cat = Cat("Alice")
  
  cat.printInfo()
  
  val name = cat.name; // 也可以在外部访问
}
```

主构造器原来的写法其实是：

```kotlin
class Cat constructor(val name: String)
```

不过，如果你的类没有注解或者可见修饰符，你可以缩写成：

```kotlin
class Cat(val name: String)
```

什么是注解我们后面会讲，可见修饰符我们一会就会了解。

### 主构造器属性的默认值

面对一些参数，我们可以为其提供默认值，在传入的时候就不是必要的了：

```kotlin
class Cat(val name: String, val age: Int = 0) {
  fun printInfo() {
    println("Cat's name is: $name, age: $age")
  }
}

fun main() {
  val cat: Cat = Cat("Coco")
}
```

### 主构造器参数

我们来看下面这段代码：

```kotlin
class Rectangle(height: Int, width: Int) {
  var perimeter = (height + width) * 2
  
  fun printHeight() {
    println(height) // [!code error]
  }
}
```

这段代码报错了，错误的位置在第 5 行，`Unresolved reference 'height'.` 也就是没找到这个 `height`。

这很奇怪。我们之前明明写的代码都没问题，这里唯一的区别就是：在声明参数的时候没有写 `val` 或者 `var`。

其实我们之前在声明参数的时候，通过 `val` / `var` 这两个关键字，**同时声明了一个成员属性**。你可以把它看做是一个语法糖，展开会变成：

```kotlin
class Rectangle(val height: Int, val width: Int)
// 展开：
class Rectangle(height: Int, width: Int) {
  var height: Int = height
  var width: Int = width
}
```

如果我们不写 `val` / `var`，我们在声明时就不会给我加上**成员属性**了，它就只是一个纯粹的主构造器**参数**。参数只会在 `init` 块中或者用于初识其它成员变量：

```kotlin
class Rectangle(height: Int, width: Int) {
  init {
    println("$height, $width") // 不报错
  }
  
  // 一个类可以有多个 init 块
  // 例如我们在 init 块中可以使用 require 对参数进行判断
  init {
    require(height > 0 && width > 0) {
      "'Height' and 'Width' must be greater than or equal to 0"
    }
  }
  
  var perimeter = (height + width) * 2 // 不报错
  
  // fun printInfo() {
  //   println("$height, $width") // 报错! // [!code error]
  // }
}

fun main() {
  val rect = Rectangle(5, 5)
  println(rect.perimeter)
  
  val rect2 = Rectangle(0, 0) // 报错
}
```

## 副构造器

主构造器不提供函数体，我们可以在类之中定义副构造器：

```kotlin
class Cat(var name: String, var age: Int) {
  constructor(name: String, age: String):
          this(name, age.toIntOrNull() ?: 0) {
    println("$name created with converted age: ${this.age}")
  }
}

fun main() {
  Cat("Coco", "8")
  Cat("Mochi", "")
}
```

我们这里使用到了一个语法：`?:` 它用于处理可能为空的值。我们在副构造器中，将 `age` 从 `String` 转换成了 `Int`。
这可以用于将可能的值统一成相同类型的值。我们使用到了一个 `this` 语法。
这个语法叫做**委托调用构造器**，目的是让（副）构造器调用另一个（主）构造器。

在 Kotlin 中，如果你有主、副构造器，那么这是一个必须的语法，所有副构造器都必须间接地调用主构造器。

:::details 这个语法的来源
这个语法最早是来源于 C++，在 C++ 11 标准后引入了委托调用构造器（Delegating Constructors），不过语法和 Kotlin
稍有不同：

```cpp
class User {
public:
  int age;
  std::string name;

  // 主构造函数
  User(std::string n, int a) : name(n), age(a) {}

  // 委托构造函数（对应 Kotlin 的副构造器）
  // 使用 : User(...) 来调用本类的另一个构造函数
  User(std::string n, std::string a_str) : User(n, std::stoi(a_str)) {
    // 执行一些额外的初始化逻辑
  }
};
```

- Kotlin: `this(...)`。
- C++: `类名(...)`。

不过目的都是一样的：减少冗余，实现构造逻辑的重用。
:::

### 副构造器和 init 块的执行顺序

在 Kotlin 中，无论 init 块和副构造器的所处位置有什么样的关联，永远都是先运行 init 块再运行 constructor，init 块从上到下依次运行：

```kotlin
class Demo {
  init {
    println(1)
  }
  
  constructor() {
    println(3)
  }
  
  init {
    println(2)
  }
}

fun main() {
  Demo()
}
```

## 没有构造器的类

有些类，我们可能不需要构造器，例如：

```kotlin
class Person {
  // 没有 constructor
}

fun main() {
  var p = Person()
}
```

没有构造器的话也代表着没有参数需要被传递。

当然还有一种情况，那就是私有化构造器：

```kotlin
class User private constructor(val name: String) {
  // 外部无法直接调用 User("Alice")
}
```
