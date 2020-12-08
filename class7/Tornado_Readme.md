

# 1.Tornado是什么

​	Tornado是一种 Web 服务器软件的开源版本。Tornado 和主流Web 服务器框架（包括大多数  Python 的框架）有着明显的区别：它是非阻塞式服务器，而且速度相当快。Tornado 每秒可以处理数以千计的连接，因此 Tornado 是实时 Web 服务的一个 理想框架。

# 2.简单的Web应用

​	**学习资料：**http://demo.pythoner.com/itt2zh/index.html

## 2.1固定端口监听

```python
# ioloop是tornado的关键，是他的最底层。
import tornado.ioloop
#tornado的基础web框架
import tornado.web


# 定义处理类型
class Mainhandler(tornado.web.RequestHandler):
    #必须继承RequestHandler
    # 添加一个处理get请求方式的方法
    def get(self):
        #封装响应信息，写响应信息的一个方法（渲染响应给浏览器的数据）
        self.write('hello tornado')

if __name__ == '__main__':
    #创建一个应用对象app
    # Tornado的每个请求处理程序，我们叫做handler
    app=tornado.web.Application(handlers=[(r'/',Mainhandler),])
    #绑定一个监听端口
    app.listen(8080)
    #启动web程序，开始监听端口的连接（IOLoop.start()才开启了监听）
    tornado.ioloop.IOLoop.instance().start()
```

## 2.2多端口监听

### options配置

```python
from tornado.options import define,options,parse_command_line
#定义默认启动的端口port为8000
define('port',default=8000,type=int)

if __name__ == '__main__':
#解析启动命令 python xxx.py --port=端口号
    parse_command_line()
```

​	你可以在命令行里尝试运行这个程序以测试输出：

```
$ python python文件名.py --port=8080
```

现在你可以在浏览器中打开[http://localhost:8080](http://localhost:8080/)，或者打开另一个终端窗口使用curl测试我们的应用：

```
$ curl http://localhost:8080/
hello tornado
```

## 2.3设置多个请求处理

```python
class Mainhandler(tornado.web.RequestHandler):
    def get(self):
        self.write('hello tornado')

class Main2handler(tornado.web.RequestHandler):
    def get(self):
        #渲染响应给浏览器的数据
        self.write('hello tornado2')
        
if __name__ == '__main__':
    app=tornado.web.Application(handlers=[(r'/',Mainhandler),(r'/1', Main2handler),])
```

## 2.4get请求传参

```python

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        greeting = self.get_argument('greeting', 'Hello')
        self.write(greeting + ', friendly user!')
        
if __name__ == '__main__':
    app=tornado.web.Application(handlers=[(r'/',Mainhandler),(r'/1', Main2handler),(r'/2',IndexHandler)])
```

```
$ curl http://localhost:8000/2?greeting=Salutations
Salutations, friendly user!
```

## 2.5httpserver底层处理

### 2.5.1httpserver监听端口

```
import tornado.httpserver

if __name__ == '__main__':
	http_server=tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
	
```

### 2.5.2httpserver实现多进程操作

```python
    # 多进程操作
    http_server.bind(options.port)
    http_server.start(0)
    # 简单的单进程操作
    http_server.bind(options.port)
    http_server.start(1)
    # 单进程操作简写
    http_server.listen(options.port)
```

## 2.6综合

```python
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

from tornado.options import define, options
define("port", default=8000, help="run on the given port", type=int)

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        greeting = self.get_argument('greeting', 'Hello')
        self.write(greeting + ', friendly user!')

if __name__ == "__main__":
    tornado.options.parse_command_line()
    app = tornado.web.Application(handlers=[(r"/", IndexHandler)])
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
```

## 2.7字符串服务（get、post请求）

```python
import textwrap

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

from tornado.options import define, options
define("port", default=8000, help="run on the given port", type=int)

class ReverseHandler(tornado.web.RequestHandler):
    def get(self, input):
        self.write(input[::-1])

class WrapHandler(tornado.web.RequestHandler):
    def post(self):
        text = self.get_argument('text')
        width = self.get_argument('width', 40)
        self.write(textwrap.fill(text, int(width)))
        
if __name__ == "__main__":
    tornado.options.parse_command_line()
    app = tornado.web.Application(
        handlers=[
            (r"/reverse/(\w+)", ReverseHandler),
            (r"/wrap", WrapHandler)
        ]
    )
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
```

```
$ python string_service.py --port=8000
```

这个程序是一个通用的字符串操作的Web服务端基本框架。到目前为止，你可以用它做两件事情。其一，到`/reverse/string`的GET请求将会返回URL路径中指定字符串的反转形式。

```
$ curl http://localhost:8000/reverse/stressed
desserts
$ curl http://localhost:8000/reverse/slipup
pupils
```

其二，到`/wrap`的POST请求将从参数text中取得指定的文本，并返回按照参数width指定宽度装饰的文本。下面的请求指定一个没有宽度的字符串，所以它的输出宽度被指定为程序中的get_argument的默认值40个字符。

```
$ http://localhost:8000/wrap -d text=Lorem+ipsum+dolor+sit+amet,+consectetuer+adipiscing+elit.
Lorem ipsum dolor sit amet, consectetuer
adipiscing elit.
```

第一个引导Tornado传递路径匹配下面的正则表达式的请求：

```
/reverse/(\w+)
```

正则表达式告诉Tornado匹配任何以字符串/reverse/开始并紧跟着一个或多个字母的路径。

括号的含义是让Tornado保存匹配括号里面表达式的字符串，并将其作为请求方法的一个参数传递给RequestHandler类。

```python
class ReverseHandler(tornado.web.RequestHandler):
    def get(self, input):
        self.write(input[::-1])
```

这里的get方法有一个额外的参数input。这个参数将包含匹配处理函数正则表达式括号里的字符串，作为参数传递进来。

WrapHandler的定义：

```
class WrapHandler(tornado.web.RequestHandler):
    def post(self):
        text = self.get_argument('text')
        width = self.get_argument('width', 40)
        self.write(textwrap.fill(text, int(width)))
```

WrapHandler类处理匹配路径为`/wrap`的请求。这个处理函数定义了一个post方法，也就是说它接收HTTP的POST方法的请求。

我们之前使用RequestHandler对象的get_argument方法来捕获请求查询字符串的的参数。同样，我们也可以使用相同的方法来获得POST请求传递的参数。

一旦我们从POST中获得了文本和宽度的参数，我们使用Python内建的textwrap模块来以指定的宽度装饰文本，并将结果字符串写回到HTTP响应中。

# 3.表单和模板

## 3.1简单示例：Poem Maker Pro

**示例展示如何在一个Web应用中使用render方法传送HTML给浏览器**

Poem Maker Pro这个Web应用有一个让用户填写的HTML表单，然后处理表单的结果。代码清单2-1是它的Python代码。

代码清单2-1 简单表单和模板：poemmaker.py

```
import os.path

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

from tornado.options import define, options
define("port", default=8000, help="run on the given port", type=int)

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('index.html')

class PoemPageHandler(tornado.web.RequestHandler):
    def post(self):
        noun1 = self.get_argument('noun1')
        noun2 = self.get_argument('noun2')
        verb = self.get_argument('verb')
        noun3 = self.get_argument('noun3')
        self.render('poem.html', roads=noun1, wood=noun2, made=verb,
                difference=noun3)

if __name__ == '__main__':
    tornado.options.parse_command_line()
    app = tornado.web.Application(
        handlers=[(r'/', IndexHandler), (r'/poem', PoemPageHandler)],
        template_path=os.path.join(os.path.dirname(__file__), "templates")
    )
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
```

除了*poemmaker.py*，你还需要将代码清单2-2和代码清单2-3中的两个文件加入到*templates*子文件夹中。

代码清单2-2 Poem Maker表单：index.html

```
<!DOCTYPE html>
<html>
    <head><title>Poem Maker Pro</title></head>
    <body>
        <h1>Enter terms below.</h1>
        <form method="post" action="/poem">
        <p>Plural noun<br><input type="text" name="noun1"></p>
        <p>Singular noun<br><input type="text" name="noun2"></p>
        <p>Verb (past tense)<br><input type="text" name="verb"></p>
        <p>Noun<br><input type="text" name="noun3"></p>
        <input type="submit">
        </form>
    </body>
</html>
```

代码清单2-3 Poem Maker模板：poem.html

```
<!DOCTYPE html>
<html>
    <head><title>Poem Maker Pro</title></head>
    <body>
        <h1>Your poem</h1>
        <p>Two {{roads}} diverged in a {{wood}}, and I—<br>
I took the one less travelled by,<br>
And that has {{made}} all the {{difference}}.</p>
    </body>
</html>
```

在浏览器中打开[http://localhost:8000](http://localhost:8000/)。当浏览器请求根目录（/）时，Tornado程序将渲染index.html

这个表单包括多个文本域（命名为noun1、noun2等），其中的内容将在用户点击"Submit"按钮时以POST请求的方式送到`/poem`。

### 3.1.1渲染模板

我们向Application对象的__init__方法传递了一个template_path参数。

```
template_path=os.path.join(os.path.dirname(__file__), "templates")
```

template_path参数告诉Tornado在哪里寻找*模板文件*。

模板是一个允许你嵌入Python代码片段的HTML文件。上面的代码告诉Python在你Tornado应用文件同目录下的*templates*文件夹中寻找模板文件。

一旦我们告诉Tornado在哪里找到模板，我们可以使用RequestHandler类的render方法来告诉Tornado读入模板文件，插入其中的模版代码，并返回结果给浏览器。比如，在IndexHandler中，我们发现了下面的语句：

```
self.render('index.html')
```

这段代码告诉Tornado在*templates*文件夹下找到一个名为*index.html*的文件，读取其中的内容，并且发送给浏览器。

### 3.1.2填充

实际上*index.html*完全不能称之为"模板"，它所包含的完全是已编写好的HTML标记。这可以是模板的一个不错的使用方式，但在更通常的情况下我们希望HTML输出可以结合我们的程序传入给模板的值。模板*poem.html*使用PoemPageHandler渲染，是这种方式的一个很好的例子。

在*poem.html*中，你可以看到模板中有一些被双大括号（{{和}}）括起来的字符串，就像这样：

```
<p>Two {{roads}} diverged in a {{wood}}, and I—<br/>
I took the one less travelled by,<br>
And that has {{made}} all the {{difference}}.</p>
```

在双大括号中的单词是占位符，当我们渲染模板时希望以实际值代替。我们可以使用向render函数中传递关键字参数的方法指定什么值将被填充到HTML文件中的对应位置，其中关键字对应模板文件中占位符的名字。下面是在PoemPageHandler中相应的代码部分：

```
noun1 = self.get_argument('noun1')
noun2 = self.get_argument('noun2')
verb = self.get_argument('verb')
noun3 = self.get_argument('noun3')
self.render('poem.html', roads=noun1, wood=noun2, made=verb, difference=noun3)
```

在这里，我们告诉模板使用变量noun1（该变量是从get_argument方法取得的）作为模板中roads的值，noun2作为模板中wood的值，依此类推。假设用户在表单中按顺序键入了pineapples、grandfather clock、irradiated和supernovae，那么结果HTML将会如下所示：

```
<p>Two pineapples diverged in a grandfather clock, and I—<br>
I took the one less travelled by,<br>
And that has irradiated all the supernovae.</p>
```

## 3.2模板语法

### 3.2.1填充表达式

### 3.2.2控制流语句

你同样可以在Tornado模板中使用Python条件和循环语句。控制语句以{%和%}包围，并以类似下面的形式被使用：

```
{% if page is None %}
```

或

```
{% if len(entries) == 3 %}
```

控制语句的大部分就像对应的Python语句一样工作，支持if、for、while和try。在这些情况下，语句块以{%开始，并以%}结束。

所以这个模板：

```
<html>
    <head>
        <title>{{ title }}</title>
    </head>
    <body>
        <h1>{{ header }}</h1>
        <ul>
            {% for book in books %}
                <li>{{ book }}</li>
            {% end %}
        </ul>
    </body>
</html>
```

当被下面这个处理函数调用时：

```python
class BookHandler(tornado.web.RequestHandler):
    def get(self):
        self.render(
            "book.html",
            title="Home Page",
            header="Books that are great",
            books=[
                "Learning Python",
                "Programming Collective Intelligence",
                "Restful Web Services"
            ]
        )
```

将会渲染得到下面的输出：

```html
<html>
    <head>
        <title>Home Page</title>
    </head>
    <body>
        <h1>Books that are great</h1>
        <ul>
            <li>Learning Python</li>
            <li>Programming Collective Intelligence</li>
            <li>Restful Web Services</li>
        </ul>
    </body>
</html>
```

### 3.2.3自定义函数传递给模板

test.py(自定义函数)

```python
def out_myself(self):
    return "myself_funciton_success！！"
```

poemmaker.py(tornado服务器主文件)

```python
import test

settings ={
    # template_path:"templates",
    # static_path:"static",
    "ui_methods":test,
}
if __name__ == '__main__':
	app = tornado.web.Application(
        handlers=[(r'/', IndexHandler), (r'/poem', PoemPageHandler),(r'/book', BookHandler)],
        template_path=os.path.join(os.path.dirname(__file__), "templates"),**settings)
```

poem,html(模板文件)

```html
<p>{{out_myself()}}</p>
```

## 3.3复杂示例：The Alpha Munger

这个应用包括四个文件：*main.py*（Tornado程序）、*style.css*（CSS样式表文件）、*index.html*和*munged.html*（Tornado模板）。让我们看看代码吧：

代码清单2-4 复杂表单和模板：main.py

```python
import os.path
import random

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

from tornado.options import define, options
define("port", default=8000, help="run on the given port", type=int)

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('index2.html')

class MungedPageHandler(tornado.web.RequestHandler):
    def map_by_first_letter(self, text):
        mapped = dict()
        for line in text.split('\r\n'):
            for word in [x for x in line.split(' ') if len(x) > 0]:
                if word[0] not in mapped: mapped[word[0]] = []
                mapped[word[0]].append(word)
        return mapped

    def post(self):
        source_text = self.get_argument('source')
        text_to_change = self.get_argument('change')
        source_map = self.map_by_first_letter(source_text)
        change_lines = text_to_change.split('\r\n')
        self.render('munged.html', source_map=source_map, change_lines=change_lines,
                choice=random.choice)

if __name__ == '__main__':
    tornado.options.parse_command_line()
    app = tornado.web.Application(
        handlers=[(r'/', IndexHandler), (r'/poem', MungedPageHandler)],
        template_path=os.path.join(os.path.dirname(__file__), "templates"),
        static_path=os.path.join(os.path.dirname(__file__), "static"),
        debug=True
    )
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
```

代码清单2-5 Alpha Munger表单：index2.html

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="{{ static_url("style.css") }}">
        <title>The Alpha Munger</title>
    </head>
    <body>
        <h1>The Alpha Munger</h1>
        <p>Enter two texts below. The replacement text will have its words
            replaced by words beginning with the same letter in the source text.</p>
        <form method="post" action="/poem">
        <p>Source text<br>
            <textarea rows=4 cols=55 name="source"></textarea></p>
        <p>Text for replacement<br>
            <textarea rows=4 cols=55 name="change"></textarea></p>
        <input type="submit">
        </form>
    </body>
</html>
```



代码清单2-6 Alpha Munger模板：munged.html

```
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="{{ static_url("style.css") }}">
        <title>The Alpha Munger</title>
    </head>
    <body>
        <h1>Your text</h1>
        <p>
{% for line in change_lines %}
    {% for word in line.split(' ') %}
        {% if len(word) > 0 and word[0] in source_map %}
            <span class="replaced"
                    title="{{word}}">{{ choice(source_map[word[0]]) }}</span>
        {% else %}
            <span class="unchanged" title="unchanged">{{word}}</span>
        {% end %}
    {% end %}
            <br>
{% end %}
        </p>
    </body>
</html>
```

最后，将代码清单2-7中的内容写到*static*子目录下的*style.css*文件中。

代码清单2-7 Alpha Munger样式表：style.css

```css
body {
    font-family: Helvetica,Arial,sans-serif;
    width: 600px;
    margin: 0 auto;
}
.replaced:hover { color: #00f; }
```

### 3.3.1它如何工作

### 3.3.2debug=True

调用了一个便利的测试模式：tornado.autoreload模块，此时，一旦主要的Python文件被修改，Tornado将会尝试重启服务器，并且在模板改变时会进行刷新。

对于快速改变和实时更新这非常棒，但不要再生产上使用它，因为它将防止Tornado缓存模板！

### 3.3.3提供静态文件

当编写Web应用时，你总希望提供像样式表、JavaScript文件和图像这样不需要为每个文件编写独立处理函数的"静态内容"。Tornado提供了几个有用的捷径来使其变得容易。

#### 3.3.3.1设置静态路径

你可以通过向Application类的构造函数传递一个名为static_path的参数来告诉Tornado从文件系统的一个特定位置提供静态文件。Alpha Munger中的相关代码片段如下：

```python
app = tornado.web.Application(
    handlers=[(r'/', IndexHandler), (r'/poem', MungedPageHandler)],
    template_path=os.path.join(os.path.dirname(__file__), "templates"),
    static_path=os.path.join(os.path.dirname(__file__), "static"),
    debug=True
)
```

在这里，我们设置了一个当前应用目录下名为*static*的子目录作为static_path的参数。现在应用将以读取*static*目录下的*filename.ext*来响应诸如*/static/filename.ext*的请求，并在响应的主体中返回。

#### 3.3.3.2使用static_url生成静态URL

Tornado模板模块提供了一个叫作static_url的函数来生成*static*目录下文件的URL。让我们来看看在*index.html*中static_url的调用的示例代码：

```
<link rel="stylesheet" href="{{ static_url("style.css") }}">
```

传递一张照片

```
<p><img src="{{ static_url("1.jpg") }}"></p>
```