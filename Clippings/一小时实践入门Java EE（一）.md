---
title: "一小时实践入门Java EE（一）"
source: "https://zhuanlan.zhihu.com/p/639059757"
author:
  - "[[知乎专栏]]"
published:
created: 2024-12-06
description: "实践计划要在一小时内学习Java EE的基础，你需要对它的主要组件和使用方式有一个基本的了解。由于时间有限，你应该关注理解Java EE的核心概念和熟悉一些常见的API或框架。以下是你可以采取的一小时学习Java EE的步…"
tags:
  - "clippings"
---
## 实践计划

要在一小时内学习Java EE的基础，你需要对它的主要组件和使用方式有一个基本的了解。由于时间有限，你应该关注理解Java EE的核心概念和熟悉一些常见的API或框架。以下是你可以采取的一小时学习Java EE的步骤。

**前15分钟：理解Java EE概念**

1. 了解Java EE（Enterprise Edition）的基本概念和组件，例如Servlet，JSP，EJB，JPA，JMS，JAX-RS等。
2. 了解MVC（Model-View-Controller）模式，这是Java EE应用程序常用的设计模式。

**接下来的15分钟：创建和运行一个简单的Java EE项目（这一步我花了一个小时 ）**

1. 打开IDEA并创建一个新的Maven项目。添加必要的Java EE依赖，例如servlet-api或者是整合好的Java EE API。
2. 创建一个简单的[Servlet类](https://zhida.zhihu.com/search?content_id=230144301&content_type=Article&match_order=1&q=Servlet%E7%B1%BB&zhida_source=entity)并在web.xml文件中进行配置。这个Servlet应该接收一个请求并返回一个简单的响应。例如，它可以在请求的URL中获取一个参数，然后在响应中返回一个欢迎消息。
3. 运行该项目

**接下来的15分钟：增加数据库交互**

1. 在项目中引入JPA或JDBC，这两个是Java EE中常用的数据库交互工具。引入相关的Maven依赖，例如Hibernate（一个流行的JPA实现）或者mysql-connector-java（MySQL的JDBC驱动）。
2. 创建一个简单的数据库模型类（如果你使用的是JPA，那么就是一个Entity类）。这个类可以很简单，比如只有一个id和一个name属性。
3. 创建一个访问数据库的类，也叫做DAO（Data Access Object）。在这个类中，写一个方法保存你的模型类的一个实例到数据库。
4. 修改 servlet测试数据库连接。

**最后的15分钟：集成前端**

1. 创建一个简单的JSP页面，这个页面有一个表单，用户可以输入一个名字。
2. 这个表单的提交地址指向你之前创建的Servlet，Servlet接收到请求后，获取用户输入的名字，创建一个新的模型类实例并保存到数据库。
3. 最后，Servlet将用户重定向到一个新的JSP页面，显示保存成功的消息。

由于时间有限，这个项目只能覆盖Java EE的一部分内容。学习Java EE是一个持续的过程，建议你在了解基础之后，不断地进行实践，探索Java EE的其他功能。

## 可能遇到的问题及解决方案

## 基础概念

### Java EE

Java EE（Java Enterprise Edition）是一套用于开发企业级应用程序的Java平台。它提供了一系列的标准和规范，用于构建可扩展、可靠、安全和跨平台的企业级应用。

Java EE包含了许多技术和API，涵盖了各个方面的企业应用开发，包括Web应用、分布式应用、消息传递、持久化、安全性等。这些技术和API使得开发人员能够专注于业务逻辑的实现，而无需关注底层的复杂性。

Java EE的核心组件包括：

- Servlet：用于处理Web请求和响应的Java类。
- JavaServer Pages（JSP）：用于生成动态Web内容的Java模板技术。
- Enterprise JavaBeans（EJB）：用于构建分布式应用的服务器端组件。
- Java Persistence API（JPA）：用于对象关系映射（ORM）和数据库访问的API。
- Java Message Service（JMS）：用于构建异步消息传递应用程序的API。
- Java Authentication and Authorization Service（JAAS）：用于身份验证和授权的API。

Java EE还提供了容器（如应用服务器）来管理和执行这些组件，提供了事务管理、安全性、并发处理等基础设施，以支持企业级应用的开发和运行。

总而言之，Java EE是一套用于构建企业级应用程序的Java平台和技术栈，提供了丰富的工具和组件，使开发人员能够高效地开发复杂的企业应用，并满足可伸缩性、可靠性和安全性等要求。

### Servlet

Servlet是Java EE中的一个重要概念。简单来说，Servlet是运行在Web服务器或应用服务器上的程序，它是作为来自Web浏览器或其他HTTP客户端请求和HTTP服务器间的中间层。使用Servlet，你可以收集来自网页表单的用户输入，呈现来自数据库的记录，或者直接生成动态的Web内容。

Servlet通常是由Java语言编写的，并遵循Java Servlet API规范。Servlet API定义了与HTTP请求和响应相关的类和接口，例如HttpServletRequest，HttpServletResponse等。

在Java EE应用程序中，通常会将Servlet用作控制器（Controller）组件，在MVC（Model-View-Controller）模式中接收并处理来自用户的请求，然后将请求转发到适当的视图（View）进行响应。由于Servlet提供了强大而灵活的请求处理机制，因此它是Java EE Web应用开发的核心组成部分。

例如，你可以创建一个Servlet，当用户在你的网站上填写一个表单并提交后，这个Servlet就会接收到一个包含用户输入的HTTP请求。然后Servlet可以处理这个请求，例如，检查用户输入的合法性，保存用户输入到数据库，然后生成一个HTML页面作为HTTP响应发送给用户。这个HTML页面可能是一个包含处理结果的消息，例如"保存成功"，或者是一个显示新数据的列表。

### JSP

JavaServer Pages（JSP）是一个由Sun Microsystems（现为Oracle公司的一部分）为Java EE推出的技术标准。JSP使得开发者可以更方便地编写动态生成HTML、XML或者其他格式文档的应用。

在JSP中，你可以在HTML代码中直接嵌入Java代码片段，这些代码片段在服务器上执行，然后生成动态的Web页面。此外，JSP还支持许多方便的特性，例如表达式语言（Expression Language），用于简单地访问数据，以及自定义标签，用于创建可重用的组件。

在Java EE的MVC（Model-View-Controller）模式中，JSP通常被用作视图（View）。控制器（Controller，通常是一个Servlet）处理用户请求，执行业务逻辑，然后将结果存储在一个或多个属性（Attribute）中。然后，控制器将请求转发（Forward）到JSP页面。JSP页面使用表达式语言从属性中获取数据，并根据这些数据动态生成HTML。

例如，你可以创建一个JSP页面，显示一个商品的列表。这个页面使用一个循环，遍历一个商品对象的列表（这个列表是一个属性），并为每个商品生成一个HTML表格的行。商品的名称、描述和价格等信息都是从商品对象中动态获取的。这就是JSP如何创建动态Web页面的一个例子。

### EJB

EJB（Enterprise JavaBeans）是Java EE中的一种服务器端组件模型，用于构建分布式企业应用程序。它提供了一种标准化的方式来开发和部署企业级应用的业务逻辑。

EJB组件具有以下特点：

1. 分布式：EJB组件可以在分布式环境中部署和执行，允许应用程序的不同部分在不同的机器上运行，并通过网络进行通信。
2. 事务管理：EJB容器提供了事务管理的支持，确保业务逻辑在数据库操作等资源访问时保持一致性和可靠性。
3. 安全性：EJB容器提供了安全性的机制，可以对EJB组件的访问进行权限控制，并提供了认证和授权的功能。
4. 生命周期管理：EJB组件的创建、销毁和状态转换等生命周期管理由EJB容器负责，开发人员可以专注于业务逻辑的实现。
5. 远程访问：EJB组件可以通过远程接口进行访问，允许客户端应用程序在不同的机器上调用远程EJB组件的方法。
6. 容器管理：EJB组件的生命周期、并发处理、线程安全性等都由EJB容器来管理，开发人员无需关注底层的复杂性。

通过使用EJB，开发人员可以以一种标准化的方式开发企业级应用程序，并利用EJB容器提供的基础设施来管理和执行这些组件。EJB可以与其他Java EE技术（如Servlet、JSP、JPA等）结合使用，以构建强大而可扩展的企业应用。

### JPA

JPA（Java Persistence API）是Java EE中用于持久化数据的一种规范。它定义了一套面向对象的持久化编程模型，使开发人员能够以统一的方式访问和操作数据库。

JPA的主要目标是简化数据持久化的开发工作，提供了一种对象关系映射（ORM）的解决方案，将Java对象与数据库表之间的映射关系进行定义和管理。通过JPA，开发人员可以使用面向对象的方式来操作数据库，而不必直接编写原始的SQL语句。

JPA提供了一组注解和API，用于定义实体类、映射关系、查询语言等。开发人员可以使用注解将Java类标记为实体类，并定义属性与数据库表列之间的映射关系。通过JPA的API，可以进行数据的增删改查操作，以及复杂的查询和事务管理等。

JPA的优点包括：

1. 简化开发：使用JPA，开发人员可以通过对象来操作数据库，无需直接处理SQL语句，减少了开发的复杂性和错误的可能性。
2. 数据库无关性：JPA提供了对不同数据库的支持，开发人员可以在不同的数据库系统之间切换，而无需修改代码。
3. 高度抽象：JPA提供了一套高度抽象的持久化编程模型，隐藏了底层的数据库细节，使开发人员能够更专注于业务逻辑的实现。
4. 查询灵活性：JPA提供了一种面向对象的查询语言（JPQL），可以通过对象属性进行查询，使得查询操作更加灵活和直观。
5. 可移植性：由于JPA是Java EE的标准规范，可以在不同的Java EE应用服务器上运行，实现应用程序的可移植性和平台无关性。

总之，JPA为开发人员提供了一种方便、高效和标准化的方式来处理数据持久化，使得开发企业级应用程序更加简化和可靠。

### JMS

JMS（Java Message Service）是Java EE中的一种消息传递规范，用于在分布式应用程序中进行异步通信。它提供了一种可靠的、异步的、基于消息的通信机制，允许应用程序在分布式环境中进行解耦和协同工作。

JMS定义了一套标准的API，使开发人员能够使用消息中间件来发送、接收和处理消息。消息中间件是一种软件组件，用于在应用程序之间传递消息，并提供一些高级功能，如消息持久化、消息路由、消息过滤等。

JMS中的核心概念包括以下几个部分：

1. 消息：消息是JMS中的基本单位，可以是文本、字节流、对象等形式的数据。它由消息生产者发送到消息目的地，并由消息消费者接收和处理。
2. 消息生产者：消息生产者是应用程序的一部分，负责创建和发送消息到消息目的地。它使用JMS API提供的方法将消息发送到指定的队列或主题。
3. 消息目的地：消息目的地是消息的接收者，可以是队列（Queue）或主题（Topic）。队列用于点对点通信，消息只能被一个消费者接收；主题用于发布-订阅模式，消息可以被多个订阅者接收。
4. 消息消费者：消息消费者是应用程序的一部分，负责从消息目的地接收消息并进行处理。它使用JMS API提供的方法订阅指定的队列或主题，并接收从消息生产者发送的消息。

JMS的优点包括：

1. 可靠性：JMS提供了一种可靠的消息传递机制，确保消息在发送和接收过程中的可靠性和一致性。
2. 异步通信：JMS支持异步通信，允许应用程序发送和接收消息时不需要立即进行响应，从而提高系统的并发性和吞吐量。
3. 解耦和可扩展性：通过使用JMS，应用程序可以解耦消息发送方和接收方之间的关系，使得系统更加灵活和可扩展。
4. 可移植性：由于JMS是Java EE的标准规范，可以在不同的Java EE应用服务器上运行，实现应用程序的可移植性和平台无关性。

总之，JMS为开发人员提供了一种方便、可靠和标准化的方式来进行分布式应用程序之间的消息传递和协同工作，使得应用程序更具弹性、可伸缩性和可靠性。

### JAX-RS

JAX-RS（Java API for RESTful Web Services）是Java EE中用于开发和构建RESTful风格的Web服务的一套API。它提供了一种简单、灵活和标准化的方式来创建基于HTTP协议的Web服务。

JAX-RS使开发人员能够使用Java语言编写RESTful Web服务端点，处理HTTP请求和响应，并支持常见的HTTP方法（GET、POST、PUT、DELETE等）。它基于Java的注解机制，使得开发人员可以使用简洁的代码定义RESTful资源和操作。

JAX-RS的核心特性包括：

1. 注解驱动开发：使用JAX-RS注解，可以将Java类和方法映射到特定的URL路径和HTTP方法上，定义RESTful资源和操作。
2. 资源和子资源：JAX-RS支持定义资源（Resource）和子资源（Subresource），通过路径层级关系来组织和访问资源。
3. 请求和响应处理：JAX-RS提供了一套用于处理HTTP请求和响应的API，包括请求参数解析、响应内容生成、HTTP头处理等。
4. 内容协商：JAX-RS支持内容协商机制，可以根据客户端请求的Accept头部和服务器端提供的可接受内容类型，选择合适的响应内容格式。
5. 异常处理：JAX-RS定义了一套异常处理机制，允许开发人员捕获和处理在Web服务中可能发生的异常情况。

JAX-RS可以与其他Java EE技术和框架集成，如Servlet、EJB、CDI等，提供更丰富的功能和扩展性。它也支持使用各种数据格式和协议，如JSON、XML、HTTP等。

总之，JAX-RS是Java EE中用于构建RESTful Web服务的API，提供了一种简单、灵活和标准化的方式来实现基于HTTP协议的Web服务端点。它使开发人员能够轻松创建和部署RESTful Web服务，并与现有的Java EE技术和生态系统集成。

### MVC（Model-View-Controller）

MVC（Model-View-Controller）是一种用于设计用户界面的软件设计模式，尤其是在Web应用程序中。这种模式将应用程序的逻辑分为三个互相关联的组件或角色：

1. **模型（Model）**：模型代表的是应用程序的数据和业务逻辑。通常，模型将负责从数据库中获取数据，对数据进行处理，以及执行所有与数据相关的业务规则和操作。
2. **视图（View）**：视图是用户看到和与之交互的界面。在Web应用中，这通常是HTML页面。视图的作用是显示模型中的数据给用户，并获取用户的输入。
3. **控制器（Controller）**：控制器是模型和视图之间的协调者。它接收用户的输入，通过模型处理用户的输入，然后将结果显示在视图上。控制器处理用户请求，然后决定使用哪个模型来处理请求，并确定应该显示哪个视图给用户。

MVC设计模式的主要目标是将应用程序的业务逻辑（Model）与用户界面（View）分离，这样可以更易于修改和维护代码，同时还能提高可重用性和灵活性。例如，在Java EE应用程序中，Servlets通常扮演控制器角色，JavaBeans或者数据库实体扮演模型角色，而JSP则是视图。

让我们通过一个在线书店应用的实现来详细了解MVC（Model-View-Controller）模式。

假设我们要创建一个功能，用户可以通过它在书店搜索并查看图书详情。

**Model（模型）**

在这个场景中，我们可以有一个`Book`类，它代表了书的模型。它有一些属性，比如`id`，`title`（标题），`author`（作者）和`description`（描述）等。

```java
public class Book {
    private Integer id;
    private String title;
    private String author;
    private String description;
    // getters and setters
} 
```

此外，我们还需要一个`BookDAO`类来处理数据库操作，比如获取图书详情。

```java
public class BookDAO {
    public Book getBook(int id) {
        // 这里是获取图书详情的代码，返回一个Book对象
    }
}
```

**View（视图）**

我们需要一个JSP页面来显示图书详情。这个页面使用表达式语言（EL）从请求属性中获取图书对象，并显示其信息。

```html
<html>
<body>
<h1>${book.title}</h1>
<p>Author: ${book.author}</p>
<p>${book.description}</p>
</body>
</html>
```

**Controller（控制器）**

在这个场景中，我们需要一个Servlet来作为控制器。这个Servlet接收包含图书ID的请求，使用`BookDAO`获取图书详情，然后将图书对象存储在请求属性中，最后转发请求到JSP页面。

```java
@WebServlet("/bookDetail")
public class BookDetailServlet extends HttpServlet {
    private BookDAO bookDAO = new BookDAO();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int id = Integer.parseInt(request.getParameter("id"));
        Book book = bookDAO.getBook(id);
        request.setAttribute("book", book);
        request.getRequestDispatcher("/bookDetail.jsp").forward(request, response);
    }
}
```

在这个案例中，当用户访问/bookDetail?id=1时，`BookDetailServlet`会使用`BookDAO`获取ID为1的图书，然后将图书对象存储在请求属性中，最后转发请求到`bookDetail.jsp`页面。在页面中，使用表达式语言从请求属性中获取图书对象，并显示其信息。这就是一个典型的MVC模式的运行过程。

### 添加依赖示例

在你的 Maven 项目中，你可以通过编辑 `pom.xml` 文件来添加必要的 Java EE 依赖。以下是一个示例，展示如何添加 Servlet API，JPA，Hibernate 和 MySQL JDBC 驱动的依赖：

```text
<project xmlns="http://maven.apache.org/POM/4.0.0" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
                      http://maven.apache.org/maven-v4_0_0.xsd">
  
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>javaee-demo</artifactId>
  <packaging>war</packaging>
  <version>1.0-SNAPSHOT</version>

  <dependencies>
    <!-- Servlet API -->
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>4.0.1</version>
      <scope>provided</scope>
    </dependency>
    
    <!-- JPA API -->
    <dependency>
      <groupId>jakarta.persistence</groupId>
      <artifactId>jakarta.persistence-api</artifactId>
      <version>2.2.3</version>
    </dependency>
    
    <!-- Hibernate -->
    <dependency>
      <groupId>org.hibernate</groupId>
      <artifactId>hibernate-core</artifactId>
      <version>5.4.27.Final</version>
    </dependency>

    <!-- MySQL JDBC Driver -->
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>8.0.21</version>
    </dependency>
  </dependencies>

  <build>
    <finalName>javaee-demo</finalName>
  </build>

</project>
```

注意，`<scope>provided</scope>` 表示这个依赖在运行时将由容器（例如 Tomcat 或者 WildFly）提供，而不是包含在你的应用程序的 WAR 包中。

添加这些依赖后，你就可以开始按照之前的步骤来创建你的 Java EE 项目了。

还需要注意的是，这里的版本号可能不是最新的，你可能需要根据你的实际需求和环境来选择合适的版本。你可以在 [Maven Central](https://link.zhihu.com/?target=https%3A//search.maven.org/) 上搜索相关的依赖来获取最新的版本号。

### 创建一个简单的Servlet类以及web.xml 示例

在IDEA中创建一个简单的Servlet类很直接。在src/main/java目录下创建一个新的类，名为HelloServlet，代码如下：

```text
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;

public class HelloServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String name = request.getParameter("name");
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>Hello, " + name + "!</h1>");
        out.println("</body></html>");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
```

在这个Servlet中，我们在doGet方法中获取请求的"name"参数，然后在响应中返回一个简单的欢迎消息。

然后我们需要在web.xml文件中配置这个Servlet，使得当我们访问某个URL时，服务器知道要转发请求到这个Servlet。web.xml文件通常位于src/main/webapp/WEB-INF目录下，内容如下：

```text
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
         http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <servlet>
        <servlet-name>HelloServlet</servlet-name>
        <servlet-class>HelloServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>HelloServlet</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
</web-app>
```

在这个配置文件中，我们创建了一个名为HelloServlet的Servlet，并将其映射到/hello的URL路径上。

这样，当你在浏览器中访问[http://localhost:8080/yourAppName/hello?name=John](https://link.zhihu.com/?target=http%3A//localhost%3A8080/yourAppName/hello%3Fname%3DJohn)时（请将yourAppName替换为你的应用程序名称），你将看到页面显示“Hello, John!”。

### 无法解析符号 'servlet'

当你遇到这样的问题时，你可以尝试以下步骤来解决：

1. 确保你的Maven项目已经被正确地导入到IDEA中。通常，当你打开一个Maven项目时，IDEA会自动识别并导入Maven依赖。如果没有，你可以在"Project"视图中右键点击`pom.xml`文件，然后选择"Maven" -> "Reimport"。
2. 检查你的IDEA是否正确地设置了Maven。在"Settings" -> "Build, Execution, Deployment" -> "Build Tools" -> "Maven"中，你应该看到一个有效的"Maven home directory"和"User settings file"。
3. 你的IDEA可能需要一些时间来下载和解析Maven依赖。在下载完成之前，你可能会看到"Cannot resolve symbol"的错误。你可以等待一段时间，然后看看错误是否消失。
4. 如果以上步骤都不能解决问题，你可以尝试重启IDEA。有时候，重启IDEA可以解决一些奇怪的问题。

如果你的Maven和IDEA都设置正确，你的Servlet类应该能正确地识别和使用`javax.servlet`包中的类。

### src/main/webapp/WEB-INF/web.xml

在Java EE和Maven的项目结构中，通常确实需要手动创建`src/main/webapp/WEB-INF/`目录和`web.xml`文件。在某些情况下，如使用某些特定的项目模板或框架，这些目录和文件可能会自动被创建，但在一个基本的Java EE Maven项目中，你需要手动创建它们。

步骤如下：

1. 在IDEA中，展开你的项目结构，找到`src/main`。
2. 右键点击`src/main`，选择`New -> Directory`，创建名为`webapp`的新目录。
3. 再在`webapp`目录下创建`WEB-INF`目录。
4. 最后，在`WEB-INF`目录下创建`web.xml`文件。

创建完成后，你就可以在`web.xml`中编写你的Servlet配置了。如果你没有看到`src/main/webapp`目录，可能是因为你当前在`Project`窗口的`View`模式设置为了`Packages`，你可以改为`Project`模式来查看。

这是Java EE的标准项目结构，`web.xml`文件是用来配置Servlet、Filter和Listener等Web组件的。如果你想用更现代和灵活的方式来配置你的Web应用，可以考虑使用Spring Boot等框架，这些框架提供了基于Java的配置和自动配置的功能，可以让你不需要手动创建和编辑`web.xml`文件。

### URI 未注册(设置 | 语言和框架 | 架构和 DTD)

这是 IntelliJ IDEA 在处理 XML 文件时可能会出现的一个普遍问题，尤其是在处理 web.xml 或其他配置文件时。它是因为 IDEA 在你的项目中没有找到相关的 XML 架构定义（XSD 文件）。

虽然这是一个警告，但它通常不会影响到你的程序的编译和运行，因为这些 XML 配置文件是在运行时由 Servlet 容器（如 Tomcat）解析的，而不是在编译时由 IDEA 解析的。

你可以尝试以下方法来解决这个警告：

1. 在文件的右上角点击 "Setup namespaces" 或者是 "Fetch external resource"。IDEA 将尝试从网络上下载相关的 XSD 文件。请注意，这需要你的电脑能够访问到这些网络地址。
2. 手动下载 XSD 文件，然后在 IDEA 的设置中指定其位置。你可以从以下地址下载 web-app\_4\_0.xsd 文件： [http://xmlns.jcp.org/xml/ns/javaee/web-app\_4\_0.xsd](https://link.zhihu.com/?target=http%3A//xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd) 。然后在 IDEA 中，去 "Settings" -> "Languages & Frameworks" -> "Schemas and DTDs" 中添加你下载的 XSD 文件。
3. 忽略这个警告。如我前面所说，这个警告不会影响到你的程序的运行，你可以选择忽略它。你可以在编辑器中右键点击警告，然后选择 "Suppress for tag" 来关闭这个警告。

如果你正在创建一个新的 Java EE 项目，我会建议你使用更现代的方法，如使用 Spring Boot 和 Thymeleaf。这些工具不需要使用 web.xml 文件，你可以用更简单和灵活的方式来创建你的 Web 应用。

### 如何运行

你创建了Servlet类并配置了web.xml之后，下一步就是部署和运行你的应用。对于Java EE应用来说，我们需要一个支持Java EE的Servlet容器或应用服务器，例如Tomcat、Jetty或WildFly等。在IDEA中，你可以方便地配置并运行一个本地的应用服务器。

以下是在IDEA中配置和运行Tomcat服务器的步骤：

1. 首先，你需要下载和安装Tomcat。你可以从Apache Tomcat的官方网站下载：[https://tomcat.apache.org/](https://link.zhihu.com/?target=https%3A//tomcat.apache.org/)
2. 打开IDEA，点击上方工具栏的 "Run" -> "Edit Configurations"。
3. 在弹出的对话框中，点击左上角的"+"，然后选择"Tomcat Server" -> "Local"。
4. 在右边的"Configuration"标签页中，设置"Application Server"为你刚才安装的Tomcat的位置。
5. 在"Deployment"标签页中，点击"+"，然后选择"Artifact"。在弹出的对话框中，选择你的项目的war文件。这个war文件是Maven项目的输出，通常可以在"target"目录下找到。
6. 点击"OK"保存你的配置。
7. 现在你可以点击IDEA工具栏上的绿色箭头来运行你的项目了。IDEA会自动编译你的项目，打包成war文件，部署到Tomcat，并启动Tomcat服务器。
8. 启动成功后，你可以在浏览器中输入"[http://localhost:8080"（如果你没有改变Tomcat的默认端口的话）来访问你的应用。](https://link.zhihu.com/?target=http%3A//localhost%3A8080%2522%25EF%25BC%2588%25E5%25A6%2582%25E6%259E%259C%25E4%25BD%25A0%25E6%25B2%25A1%25E6%259C%2589%25E6%2594%25B9%25E5%258F%2598Tomcat%25E7%259A%2584%25E9%25BB%2598%25E8%25AE%25A4%25E7%25AB%25AF%25E5%258F%25A3%25E7%259A%2584%25E8%25AF%259D%25EF%25BC%2589%25E6%259D%25A5%25E8%25AE%25BF%25E9%2597%25AE%25E4%25BD%25A0%25E7%259A%2584%25E5%25BA%2594%25E7%2594%25A8%25E3%2580%2582/)

以上是基本的配置和运行步骤。在实际的开发过程中，你可能需要根据你的项目的具体需求来调整这些配置。例如，你可能需要配置JNDI资源，或者设置环境变量等。你可以在"Run/Debug Configurations"对话框中的其他标签页中进行这些配置。

### idea的"Run" -> "Edit Configurations" 左上角的"+"，没有"Tomcat Server"

如果你在 IntelliJ IDEA 中无法看到 "Tomcat Server" 选项，这可能是因为你正在使用 IntelliJ IDEA 的 Community 版本。IntelliJ IDEA 的 Community 版本不包含对 Tomcat 和其他 Java EE 服务器的支持。这个功能仅在 IntelliJ IDEA Ultimate 版本中可用。

如果你希望在 IDEA 中直接运行和调试 Java EE 应用，你需要购买 IDEA Ultimate 版本或者使用它的免费试用版。

另外一个解决方案是手动在系统命令行中运行 Tomcat。你可以将你的 Maven 项目打包成 war 文件，然后将这个 war 文件复制到 Tomcat 的 webapps 目录下，然后运行 Tomcat。这个过程需要手动操作，没有 IDEA Ultimate 版本那么方便。

如果你只是希望学习 Java EE 的基础知识，还有一个简单的选择是使用 Spring Boot。Spring Boot 是一个流行的 Java 框架，它内置了 Tomcat 服务器，你可以很方便地创建和运行 Web 应用，而不需要额外安装和配置服务器。并且，Spring Boot 是完全免费的，无论是在 IDEA Community 版本还是 Ultimate 版本中都可以使用。

### Tomcat 应该下载哪一个

根据提供的选项，如果你想下载适用于 Windows 11 的 Apache Tomcat，你可以选择以下其中一个二进制发行版：

- 64-bit Windows zip：适用于 64 位的 Windows 操作系统。
- 32-bit/64-bit Windows Service Installer：适用于 32 位和 64 位的 Windows 操作系统。

这两个选项都是针对 Windows 平台的，并提供了不同的压缩格式供下载，包括 zip 和 Service Installer。

另外，如果你对 Apache Tomcat 的完整文档也感兴趣，你可以选择下载 Full documentation 发行版，它提供了关于 Apache Tomcat 的详细文档。

对于[源代码](https://zhida.zhihu.com/search?content_id=230144301&content_type=Article&match_order=1&q=%E6%BA%90%E4%BB%A3%E7%A0%81&zhida_source=entity)发行版，如果你有兴趣查看 Tomcat 的源代码或进行自定义构建，你可以选择下载相应的 tar.gz 或 zip 格式的源代码发行版。

请根据你的需求和操作系统架构选择适当的发行版进行下载。如果你需要更多信息，可以查看 README 文件，该文件会解释每个发行版包含的内容。

### 怎么安装使用Tomcat

安装和使用 Apache Tomcat 的步骤如下：

1. 下载适用于你的操作系统的二进制发行版（zip 或 Service Installer）或源代码发行版（tar.gz 或 zip）。
2. 解压缩下载的文件到你选择的目录中。如果你下载的是 zip 文件，你可以使用解压缩工具（如 WinRAR 或 7-Zip）来解压缩。如果你下载的是 Service Installer，运行安装程序并按照指示进行安装。
3. 打开解压缩后的目录，你会看到包含许多文件和文件夹的目录结构。
4. 打开 bin 目录，你会找到用于启动和停止 Tomcat 服务器的脚本（例如，startup.bat 或 startup.sh 和 shutdown.bat 或 shutdown.sh）。
5. 根据你的操作系统，在命令行终端中切换到 bin 目录。
6. 启动 Tomcat 服务器。在命令行中运行启动脚本（例如，运行 startup.bat 或 ./startup.sh）。
7. 等待几秒钟，你会看到一些日志输出，表示 Tomcat 服务器已成功启动。
8. 打开你的浏览器，并访问 `http://localhost:8080`，这是 Tomcat 默认的访问地址和端口。
9. 如果一切正常，你将看到 Tomcat 的欢迎页面。

至此，你已经成功安装并启动了 Apache Tomcat 服务器。你可以在 Tomcat 的目录结构中的其他文件夹中放置你的 Web 应用程序（如 webapps 文件夹），并访问它们。

请注意，这只是一个基本的安装和启动过程。如果你需要进一步的配置和使用说明，你可以参考官方的文档和用户指南，其中提供了详细的信息和示例。你也可以在互联网上找到很多关于 Apache Tomcat 的教程和指南，以帮助你更深入地了解和使用它。

### 手动在系统命令行中运行 Tomcat的具体步骤

当然，以下是使用命令行手动运行Tomcat的具体步骤：

**步骤一：Maven打包**

你需要将你的Maven项目打包成一个war文件。在你的项目根目录下打开命令行，运行以下命令：

```text
bashCopy code
mvn clean package
```

这个命令会清理你的项目，然后编译、测试并打包你的项目。如果一切顺利，你的项目会被打包成一个war文件，这个文件会被放在target目录下。

**步骤二：复制war文件**

将你的war文件复制到Tomcat的webapps目录下。例如，如果你的Tomcat安装在`C:\tomcat`，那么你需要将war文件复制到`C:\tomcat\webapps`。你可以使用以下命令：

```text
cp target/your-project.war C:/tomcat/webapps/ 
```

请将上述命令中的路径替换为你的实际路径。

**步骤三：启动Tomcat**

最后，你需要启动Tomcat。在Tomcat的bin目录下，有一个叫做catalina的脚本，你可以运行这个脚本来启动Tomcat。例如：

```text
C:/tomcat/bin/catalina.sh run 
```

或者在Windows中：

```text
C:\tomcat\bin\catalina.bat run 
```

启动后，你可以在浏览器中输入"[http://localhost:8080/your-project"来访问你的应用。请将上述URL中的"your-project"替换为你的实际项目名。项目名通常是你的war文件的名字，不包含".war"后缀。](https://link.zhihu.com/?target=http%3A//localhost%3A8080/your-project%2522%25E6%259D%25A5%25E8%25AE%25BF%25E9%2597%25AE%25E4%25BD%25A0%25E7%259A%2584%25E5%25BA%2594%25E7%2594%25A8%25E3%2580%2582%25E8%25AF%25B7%25E5%25B0%2586%25E4%25B8%258A%25E8%25BF%25B0URL%25E4%25B8%25AD%25E7%259A%2584%2522your-project%2522%25E6%259B%25BF%25E6%258D%25A2%25E4%25B8%25BA%25E4%25BD%25A0%25E7%259A%2584%25E5%25AE%259E%25E9%2599%2585%25E9%25A1%25B9%25E7%259B%25AE%25E5%2590%258D%25E3%2580%2582%25E9%25A1%25B9%25E7%259B%25AE%25E5%2590%258D%25E9%2580%259A%25E5%25B8%25B8%25E6%2598%25AF%25E4%25BD%25A0%25E7%259A%2584war%25E6%2596%2587%25E4%25BB%25B6%25E7%259A%2584%25E5%2590%258D%25E5%25AD%2597%25EF%25BC%258C%25E4%25B8%258D%25E5%258C%2585%25E5%2590%25AB%2522.war%2522%25E5%2590%258E%25E7%25BC%2580%25E3%2580%2582)

以上步骤适用于基本的Tomcat配置和运行情况。根据你的实际需求，你可能需要对Tomcat进行额外的配置，例如配置JNDI资源、SSL证书、端口号等。你可以在Tomcat的官方文档中找到详细的配置指南：[https://tomcat.apache.org/tomcat-9.0-doc/index.html。](https://link.zhihu.com/?target=https%3A//tomcat.apache.org/tomcat-9.0-doc/index.html%25E3%2580%2582)

### IDEA 怎么打包war

在 IntelliJ IDEA 中进行 Maven 项目打包操作的步骤如下：

1. 打开 IntelliJ IDEA，打开你的 Maven 项目。
2. 在右侧的 Maven 工具窗口中，展开你的项目，找到 "Lifecycle"。
3. 在 "Lifecycle" 下，双击执行 "clean" 目标，等待清理操作完成。
4. 双击执行 "package" 目标，等待编译、测试和打包操作完成。
5. 打开你的项目目录，找到 target 目录。
6. 在 target 目录中，你会找到生成的 war 文件。

通过以上步骤，你就成功地将你的 Maven 项目打包成了一个 war 文件，并可以在 target 目录中找到它。请确保在执行打包之前，你的项目已经通过编译和测试，并且没有错误或失败的情况。

注意：上述步骤是基于 IntelliJ IDEA 的默认配置和 Maven 插件的假设。如果你的项目有特殊的配置或需要其他操作，请参考相关的文档或配置文件进行调整。

### target目录是jar，不是war

如果你的 Maven 项目最终生成的是一个 JAR 文件而不是 WAR 文件，那么可能是因为你的项目是一个普通的 Java 应用程序，而不是一个 Java Web 应用程序。

在 Maven 中，WAR 文件通常用于打包和部署 Java Web 应用程序，而 JAR 文件用于打包和分发普通的 Java 应用程序。因此，如果你的项目是一个普通的 Java 应用程序，并不需要生成 WAR 文件。

如果你确实需要将你的项目打包成 WAR 文件，确保你的项目是一个 Java Web 应用程序，并且包含了正确的 Maven 插件配置。你可以在项目的 pom.xml 文件中查看是否有以下配置：

```text
xmlCopy code
<packaging>war</packaging>
```

这个配置指定了打包类型为 WAR。如果没有这个配置，或者配置为其他类型（例如 JAR），则会生成相应的打包文件。

请确认你的项目的类型和配置是否正确，并且使用正确的 Maven 插件来生成你需要的打包文件。

### 这一行要加到pom.xml 的哪里 <packaging>war</packaging>

在 pom.xml 文件中，`<packaging>` 元素应该放置在 `<project>` 元素的直接子元素之一。通常情况下，它会放在 `<groupId>`、`<artifactId>` 和 `<version>` 元素的后面。

以下是一个示例的 pom.xml 文件结构，包含了 `<packaging>` 元素：

```text
xmlCopy code
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>my-webapp</artifactId>
    <version>1.0.0</version>
    <packaging>war</packaging>

    <!-- ...其他配置... -->

</project>
```

确保将 `<packaging>` 元素放置在正确的位置，并与其他元素对齐。这样 Maven 就会将项目打包成 WAR 文件。

### war文件是直接放到这个同级目录下吗

是的，WAR 文件通常需要部署到应用服务器（如Tomcat）的特定目录中，以便服务器能够识别和运行该应用程序。

在你的示例中，你的 Tomcat 目录结构如下：

```text
makefileCopy code
D:\Tomcat 10.1\webapps
├── docs
├── manager
└── ROOT
```

你可以将 WAR 文件直接放到 `webapps` 目录下，或者在 `webapps` 目录下创建一个新的文件夹，然后将 WAR 文件放入其中。例如，你可以创建一个名为 `my-webapp` 的文件夹，并将 WAR 文件放入其中：

```text
makefileCopy code
D:\Tomcat 10.1\webapps
├── docs
├── manager
├── ROOT
└── my-webapp.war
```

当 Tomcat 启动时，它会检测 `webapps` 目录中的 WAR 文件，并自动解压并部署应用程序。在上述示例中，你可以通过访问 `http://localhost:8080/my-webapp` 来访问部署的应用程序。

请注意，确保你的 Tomcat 配置正确，以便能够访问并运行部署的应用程序。

### Neither the JAVA\_HOME nor the JRE\_HOME environment variable is defined

D:\\Tomcat 10.1\\bin>catalina.bat run Neither the JAVA\_HOME nor the JRE\_HOME environment variable is defined At least one of these environment variable is needed to run this program

这个错误提示说明你没有设置 `JAVA_HOME` 或 `JRE_HOME` 环境变量。

在 Windows 上设置这些环境变量的步骤如下：

1. 打开 "控制面板" 并进入 "系统和安全" -> "系统"。
2. 点击 "高级系统设置"。
3. 在弹出的 "系统属性" 窗口中，点击 "环境变量" 按钮。
4. 在 "系统变量" 部分，点击 "新建"。
5. 输入变量名为 `JAVA_HOME`，变量值为你的 JDK 安装路径（例如 `C:\Program Files\Java\jdk1.8.0_271`）。
6. 点击 "确定" 保存设置。

确保你设置的路径正确指向你的 JDK 安装目录。如果你的 JDK 安装路径不同，需要相应地修改。

设置完 `JAVA_HOME` 后，你需要重启电脑或重新打开命令行窗口，以使环境变量生效。

如果你已经设置了 `JAVA_HOME`，但仍然遇到相同的错误，请确保路径设置正确，并检查是否有任何拼写错误。

一旦设置了正确的环境变量，你应该能够成功运行 `catalina.bat run` 命令来启动 Tomcat 服务器。

### Error: A fatal exception has occurred. Program will exit.

> D:\\Tomcat 10.1\\bin>catalina.bat run Using CATALINA\_BASE: "D:\\Tomcat 10.1" Using CATALINA\_HOME: "D:\\Tomcat 10.1" Using CATALINA\_TMPDIR: "D:\\Tomcat 10.1\\temp" Using JRE\_HOME: "D:\\jdk8" Using CLASSPATH: "D:\\Tomcat 10.1\\bin\\bootstrap.jar;D:\\Tomcat 10.1\\bin\\tomcat-juli.jar" Using CATALINA\_OPTS: "" Unrecognized option: --add-opens=java.base/java.lang=ALL-UNNAMED Error: Could not create the Java Virtual Machine. Error: A fatal exception has occurred. Program will exit.

这个错误提示说明在启动 Tomcat 时遇到了一个不被识别的选项 `--add-opens=java.base/java.lang=ALL-UNNAMED`。

这个问题可能是由于使用的 Java 版本不兼容导致的。在你的命令行中，`JAVA_HOME` 指向的是 `D:\jdk8`，但是根据错误信息来看，这个 Java 版本可能不支持 `--add-opens` 选项。

解决方法是确保你的 Tomcat 和 Java 版本兼容。建议使用 Tomcat 10.1 版本所需的 Java 版本，比如 Java 11 或更高版本。请根据你所使用的 Tomcat 版本的要求，安装相应版本的 Java，并将 `JAVA_HOME` 环境变量设置为该路径。

如果你希望继续使用 Java 8，你可以尝试修改 Tomcat 的启动配置文件，将 `--add-opens` 选项移除或注释掉。启动配置文件通常是 `catalina.bat` 或 `catalina.sh` 文件，在其中找到启动命令并进行相应的修改。

请注意，在修改 Tomcat 的启动配置文件之前，备份该文件以防止意外错误。同时，确保你的 Java 安装正确，并且 Java 的路径已正确设置。

如果问题仍然存在，请提供更多关于你所使用的 Tomcat 版本和 Java 版本的详细信息，以便我能够提供更准确的帮助。

### java 8 支持哪个版本的tomcat

Java 8 支持的 Tomcat 版本范围是 Tomcat 7.x 到 Tomcat 8.5.x。这意味着你可以选择安装任何在此范围内的 Tomcat 版本，以与 Java 8 兼容。

以下是一些常见的 Java 8 和 Tomcat 版本的对应关系：

- Java 8 + Tomcat 7.x：Java 8 支持 Tomcat 7.0.x 和 7.0.x 的所有修订版本。
- Java 8 + Tomcat 8.x：Java 8 支持 Tomcat 8.0.x、8.5.x 的所有修订版本。

请注意，这只是一般的兼容性指南，具体的兼容性可能取决于你的具体环境和应用程序要求。在选择 Tomcat 版本时，建议查阅相关的文档和发布说明，以确保你选择的 Tomcat 版本与你的 Java 8 版本兼容。

另外，建议使用最新的 Tomcat 版本，以获得更好的性能、安全性和功能。你可以从 Tomcat 官方网站（[https://tomcat.apache.org/）下载最新版本的](https://link.zhihu.com/?target=https%3A//tomcat.apache.org/%25EF%25BC%2589%25E4%25B8%258B%25E8%25BD%25BD%25E6%259C%2580%25E6%2596%25B0%25E7%2589%2588%25E6%259C%25AC%25E7%259A%2584) Tomcat。

### tomcat 怎么卸载，或者从版本11降为版本8

  
Tomcat的卸载和安装过程非常直接，因为它实际上是一个独立的应用，而不是一个需要通过安装程序安装的软件。

**卸载Tomcat**

1. 如果Tomcat正在运行，你需要首先停止它。你可以在Tomcat的bin目录下找到名为`shutdown.sh`（Linux）或`shutdown.bat`（Windows）的脚本，并执行它来关闭Tomcat。
2. 删除Tomcat的整个目录。Tomcat的所有文件都存储在同一个目录中，因此你只需要删除这个目录就可以彻底卸载Tomcat。

如果你在操作系统级别安装了Tomcat（例如，作为Windows服务或Linux的系统服务），则需要额外的步骤来停止服务并从系统中删除它。具体步骤可能因操作系统和你的具体安装方式而异。

**安装Tomcat 8**

1. 前往Apache Tomcat官方网站的下载页面：[https://tomcat.apache.org/download-80.cgi](https://link.zhihu.com/?target=https%3A//tomcat.apache.org/download-80.cgi)
2. 在"Binary Distributions"部分，选择适合你的操作系统的压缩包（`.zip`对于Windows，`.tar.gz`对于Linux和Mac）。
3. 下载压缩包并解压到你希望安装Tomcat的目录。
4. 验证安装是否成功。打开命令行，导航到Tomcat的bin目录，然后运行`startup.sh`（Linux）或`startup.bat`（Windows）。如果你在浏览器中访问`http://localhost:8080`并看到Tomcat的欢迎页面，那么说明你的Tomcat已经成功安装并运行。

这样你就成功地从Tomcat 11降级到了Tomcat 8。

### 请求的资源\[/javaee-demo/\]不可用

类型 状态报告 消息 请求的资源\[/javaee-demo/\]不可用 描述 源服务器未能找到目标资源的表示或者是不愿公开一个已经存在的资源表示。

出现“请求的资源\[/javaee-demo/\]不可用”的错误通常表示Tomcat服务器无法找到或访问你的应用。这可能有几个原因：

1. **应用未正确部署**：你应该确保在Tomcat的`webapps`目录下有一个名为`javaee-demo`的文件夹，这个文件夹应该包含你的应用的所有文件。这个文件夹是由Tomcat自动从`javaee-demo.war`文件解压出来的。如果没有这个文件夹，或者文件夹为空，那可能就是部署出了问题。
2. **应用启动失败**：你的应用在启动时可能出现了错误，导致Tomcat不能正常运行它。你可以查看Tomcat的日志来找出可能的错误。Tomcat的日志通常位于`logs`目录下，你应该查看`catalina.out`或者名为`localhost.xxx.log`的日志文件。
3. **URL错误**：如果你的应用正确部署并启动，那么你可能输入了错误的URL。请确保你是访问`http://localhost:8080/javaee-demo/`，而不是其他的地址。如果你的应用在web.xml中定义了特定的servlet映射，那么你可能需要包含这个映射路径在你的URL中。
4. **其他配置问题**：其他的配置问题，例如你的应用使用了不支持的Java版本，或者你的应用依赖的其他库没有正确配置，都可能导致应用无法正常运行。

你可以通过查看Tomcat的日志，检查你的部署和配置，以及尝试简单的应用（例如一个只包含一个简单servlet的应用）来逐步排查问题。

### URL错误：如果你的应用正确部署并启动，那么你可能输入了错误的URL。

```text
<servlet-mapping>         
<servlet-name>HelloServlet</servlet-name>         
<url-pattern>/hello</url-pattern>     
</servlet-mapping>
```

这段代码是一个简单的 JavaEE Web 应用的 web.xml 配置示例。它定义了一个名为 "HelloServlet" 的 Servlet，并将它映射到 "/hello" 的 URL 路径上。

如果你在本地启动了这个应用，并且想要访问该 Servlet，确保你的应用已经正确部署并启动，并且你输入的 URL 是正确的。在这个示例中，你应该尝试访问 "[http://localhost:8080/javaee-demo/hello"，其中](https://link.zhihu.com/?target=http%3A//localhost%3A8080/javaee-demo/hello%2522%25EF%25BC%258C%25E5%2585%25B6%25E4%25B8%25AD) "javaee-demo" 是你的应用的上下文路径，而 "/hello" 是 Servlet 的映射路径。

请注意，上面的 web.xml 示例使用了 JavaEE 4.0 的命名空间和模式定义。如果你在使用不同版本的 JavaEE 或其他相关规范，你需要相应地更新命名空间和模式定义。

如果你仍然遇到问题，请确保你的应用已经正确部署，并且查看应用服务器的日志文件以获取更多的错误信息和调试信息。

### 服务器遇到一个意外的情况，阻止它完成请求。

异常报告 消息 实例化Servlet类\\\[HelloServlet\\\]异常 描述 服务器遇到一个意外的情况，阻止它完成请求。 例外情况 javax.servlet.ServletException: 实例化Servlet类\\\[HelloServlet\\\]异常 org.apache.catalina.authenticator.AuthenticatorBase.invoke([AuthenticatorBase.java:483](https://link.zhihu.com/?target=http%3A//authenticatorbase.java%3A483/)) org.apache.catalina.valves.ErrorReportValve.invoke([ErrorReportValve.java:93](https://link.zhihu.com/?target=http%3A//errorreportvalve.java%3A93/)) org.apache.catalina.valves.AbstractAccessLogValve.invoke([AbstractAccessLogValve.java:682](https://link.zhihu.com/?target=http%3A//abstractaccesslogvalve.java%3A682/)) org.apache.catalina.connector.CoyoteAdapter.service([CoyoteAdapter.java:343](https://link.zhihu.com/?target=http%3A//coyoteadapter.java%3A343/)) org.apache.coyote.http11.Http11Processor.service([Http11Processor.java:617](https://link.zhihu.com/?target=http%3A//http11processor.java%3A617/)) org.apache.coyote.AbstractProcessorLight.process([AbstractProcessorLight.java:63](https://link.zhihu.com/?target=http%3A//abstractprocessorlight.java%3A63/)) org.apache.coyote.AbstractProtocol$ConnectionHandler.process([AbstractProtocol.java:932](https://link.zhihu.com/?target=http%3A//abstractprotocol.java%3A932/)) org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun([NioEndpoint.java:1695](https://link.zhihu.com/?target=http%3A//nioendpoint.java%3A1695/)) [org.apache.tomcat.util.net.SocketProcessorBase.run](https://link.zhihu.com/?target=http%3A//org.apache.tomcat.util.net.socketprocessorbase.run/)([SocketProcessorBase.java:52](https://link.zhihu.com/?target=http%3A//socketprocessorbase.java%3A52/)) org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker([ThreadPoolExecutor.java:1191](https://link.zhihu.com/?target=http%3A//threadpoolexecutor.java%3A1191/)) [org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run](https://link.zhihu.com/?target=http%3A//org.apache.tomcat.util.threads.threadpoolexecutor%2524worker.run/)([ThreadPoolExecutor.java:659](https://link.zhihu.com/?target=http%3A//threadpoolexecutor.java%3A659/)) [org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run](https://link.zhihu.com/?target=http%3A//org.apache.tomcat.util.threads.taskthread%2524wrappingrunnable.run/)([TaskThread.java:61](https://link.zhihu.com/?target=http%3A//taskthread.java%3A61/)) [java.lang.Thread.run](https://link.zhihu.com/?target=http%3A//java.lang.thread.run/)([Thread.java:750](https://link.zhihu.com/?target=http%3A//thread.java%3A750/)) 根本原因。 java.lang.ClassNotFoundException: HelloServlet org.apache.catalina.loader.WebappClassLoaderBase.loadClass([WebappClassLoaderBase.java:1420](https://link.zhihu.com/?target=http%3A//webappclassloaderbase.java%3A1420/)) org.apache.catalina.loader.WebappClassLoaderBase.loadClass([WebappClassLoaderBase.java:1228](https://link.zhihu.com/?target=http%3A//webappclassloaderbase.java%3A1228/)) org.apache.catalina.authenticator.AuthenticatorBase.invoke([AuthenticatorBase.java:483](https://link.zhihu.com/?target=http%3A//authenticatorbase.java%3A483/)) org.apache.catalina.valves.ErrorReportValve.invoke([ErrorReportValve.java:93](https://link.zhihu.com/?target=http%3A//errorreportvalve.java%3A93/)) org.apache.catalina.valves.AbstractAccessLogValve.invoke([AbstractAccessLogValve.java:682](https://link.zhihu.com/?target=http%3A//abstractaccesslogvalve.java%3A682/)) org.apache.catalina.connector.CoyoteAdapter.service([CoyoteAdapter.java:343](https://link.zhihu.com/?target=http%3A//coyoteadapter.java%3A343/)) org.apache.coyote.http11.Http11Processor.service([Http11Processor.java:617](https://link.zhihu.com/?target=http%3A//http11processor.java%3A617/)) org.apache.coyote.AbstractProcessorLight.process([AbstractProcessorLight.java:63](https://link.zhihu.com/?target=http%3A//abstractprocessorlight.java%3A63/)) org.apache.coyote.AbstractProtocol$ConnectionHandler.process([AbstractProtocol.java:932](https://link.zhihu.com/?target=http%3A//abstractprotocol.java%3A932/)) org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun([NioEndpoint.java:1695](https://link.zhihu.com/?target=http%3A//nioendpoint.java%3A1695/)) [org.apache.tomcat.util.net.SocketProcessorBase.run](https://link.zhihu.com/?target=http%3A//org.apache.tomcat.util.net.socketprocessorbase.run/)([SocketProcessorBase.java:52](https://link.zhihu.com/?target=http%3A//socketprocessorbase.java%3A52/)) org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker([ThreadPoolExecutor.java:1191](https://link.zhihu.com/?target=http%3A//threadpoolexecutor.java%3A1191/)) [org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run](https://link.zhihu.com/?target=http%3A//org.apache.tomcat.util.threads.threadpoolexecutor%2524worker.run/)([ThreadPoolExecutor.java:659](https://link.zhihu.com/?target=http%3A//threadpoolexecutor.java%3A659/)) [org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run](https://link.zhihu.com/?target=http%3A//org.apache.tomcat.util.threads.taskthread%2524wrappingrunnable.run/)([TaskThread.java:61](https://link.zhihu.com/?target=http%3A//taskthread.java%3A61/)) [java.lang.Thread.run](https://link.zhihu.com/?target=http%3A//java.lang.thread.run/)([Thread.java:750](https://link.zhihu.com/?target=http%3A//thread.java%3A750/)) ):注意 主要问题的全部 stack 信息可以在 server logs 里查看

这个异常报告显示了一个名为 "HelloServlet" 的 Servlet 类实例化异常，并且抛出了一个 `ClassNotFoundException`。这意味着应用服务器无法找到名为 "HelloServlet" 的类。

出现这种情况可能有以下几个原因：

1. 缺少或错误的部署：请确保你的应用已经正确部署到应用服务器，并且部署路径与你访问的 URL 路径匹配。
2. 类路径问题：请检查你的应用的类路径是否正确配置，并且 Servlet 类 "HelloServlet" 在类路径中可访问。确保类的包名、文件路径和类名都正确。
3. 缺少依赖：如果你的应用依赖于其他库或框架，确保这些依赖项已经正确添加到应用的类路径中。

请检查以上可能的原因，并确保你的应用服务器上存在名为 "HelloServlet" 的类，并且它可以被正确加载和实例化。如果问题仍然存在，请查看应用服务器的日志文件，以获取更详细的错误信息和调试信息，这将有助于确定问题的根本原因。

从你提供的web.xml配置文件来看，问题可能就出在这里。

在<servlet-class>标签中，你需要指定HelloServlet的完整类名（包括包名）。而你现在只是指定了"HelloServlet"，这样Tomcat会在默认的包（也就是没有包）下寻找这个类，显然这是错误的。

比如，如果你的HelloServlet位于`com.example`包下，那么你应该这样写：

```text
xmlCopy code
<servlet>
    <servlet-name>HelloServlet</servlet-name>
    <servlet-class>com.example.HelloServlet</servlet-class>
</servlet>
```

请修改你的web.xml文件，然后重新部署试试看是否可以解决问题。

### 界面显示 Hello, null!，这个参数怎么输入

在访问 [http://localhost:8080/javaee-demo/hello](https://link.zhihu.com/?target=http%3A//localhost%3A8080/javaee-demo/hello) 时，你可以在 URL 的查询参数中输入参数值。在你的代码中，你使用了 `request.getParameter("name")` 来获取名为 "name" 的查询参数的值。

例如，要输入参数值 "John"，你可以将 URL 改为 [http://localhost:8080/javaee-demo/hello?name=John。在这个示例中，"name](https://link.zhihu.com/?target=http%3A//localhost%3A8080/javaee-demo/hello%3Fname%3DJohn%25E3%2580%2582%25E5%259C%25A8%25E8%25BF%2599%25E4%25B8%25AA%25E7%25A4%25BA%25E4%25BE%258B%25E4%25B8%25AD%25EF%25BC%258C%2522name)" 是参数的名称，"John" 是参数的值。当你访问这个 URL 时，Servlet 会从请求中获取名为 "name" 的查询参数，并将其值用于构建响应。

请注意，查询参数是通过在 URL 中使用 "?" 后面的键值对来传递的，多个参数之间使用 "&" 进行分隔。你可以根据你的需求添加更多的查询参数，并在 Servlet 中使用 `request.getParameter()` 方法来获取它们的值。

确保在访问 [http://localhost:8080/javaee-demo/hello](https://link.zhihu.com/?target=http%3A//localhost%3A8080/javaee-demo/hello) 时，输入参数的名称和值正确，并根据你的代码逻辑来构建响应。