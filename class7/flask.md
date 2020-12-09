### 一、flask简介

Flask 用Python语言基于Werkzeug（路由模块）工具箱编写的一个轻量级的Web开发框架。

##### 官网：https://flask.palletsprojects.com/en/1.1.x/

##### 中文网站：https://dormousehole.readthedocs.io/en/latest/index.html

如果有需要，可以配置虚拟环境使用，安装Flask虚拟环境：https://dormousehole.readthedocs.io/en/latest/installation.html#python

此处使用pycharm中anaconda所含的Flask的解释器

(WebApp_flask：新建Pycharm自动生成的简易Flask项目模板)。



### 二、最简单的应用

```
# 1. 路由

#导入flask扩展
from flask import Flask

#创建flask应用程序实例。传入导入名， __name__确定资源所在路径
app = Flask(__name__)

#定义路由及视图函数，告诉Flask触发函数的URL
#route()装饰器，将URL规则'/'绑定到视图函数hello_world()上：
@app.route('/')#'/'根路由
def hello_world():
    return 'Hello, World!'
    
#启动程序
if __name__ == '__main__':
   #运行在简易服务器，是Flask用于测试的服务器
   app.run(debug=True)#debug=True自动更新
   # app.run(host='127.0.0.1',port=8080)

```

第一个参数是应用模块或者包的名称。如果你使用一个单一模块（就像本例），那么应当使用 `__name__` ，因为名称会根据这个模块是按应用方式使用还是作为一个模块导入而发生变化（可能是 ‘__main__’ ， 也可能是实际导入的名称）。这个参数是必需的，这样 Flask才能知道在哪里可以找到模板和静态文件等东西。更多内容详见 [`Flask`](https://dormousehole.readthedocs.io/en/latest/api.html#flask.Flask) 文档。





### 三、路由

使用有意义的 URL ，这样有助于用户记忆，网页会更得到用户的青睐， 提高回头率。

##### 使用 [`route()`](https://dormousehole.readthedocs.io/en/latest/api.html#flask.Flask.route) 装饰器来把不同函数绑定到 URL上:

```
@app.route('/aaa')
def aaa():
   return 'Hello A'
```

http://127.0.0.1:5000/aaa



##### 路由参数处理

通过把 URL 的一部分标记为 `<variable_name>` 就可以在 URL 中添加变量。标记的部分会作为关键字参数传递给函数。

```
# <>定义路由参数，内输入变量名
@app.route('/aaa/<ID>')
def getA(ID):
   # 括号内填入参数名，参数默认为字符串
   return 'Hello %s' % ID
```

对变量类型限定：通过使用 `<converter:variable_name>` ，可以 选择性的加上一个转换器，为变量指定规则。

```
@app.route('/aaa/<int:ID>')
```

-将参数ID转为int，如果成功则进行路由匹配

转换器类型：

| `string` | （缺省值） 接受任何不包含斜杠的文本 |
| -------- | ----------------------------------- |
| `int`    | 接受正整数                          |
| `float`  | 接受正浮点数                        |
| `path`   | 类似 `string` ，但可以包含斜杠      |
| `uuid`   | 接受 UUID 字符串                    |



##### 唯一URL/重定向行为

```
app.route('/result/')
```

/result/:如同访问文件夹

/result:如同访问文件，可以保持URL唯一，添加斜杠会产生404，避免重复索引



##### URL动态构建

[`url_for()`](https://dormousehole.readthedocs.io/en/latest/api.html#flask.url_for) 函数用于构建指定函数的 URL。它把函数名称作为第一个参数。它可以接受任意个关键字参数，每个关键字参数对应 URL 中的变量。未知变量 将添加到 URL 中作为查询参数。

·为什么不在把 URL 写死在模板中，而要使用反转函数 [`url_for()`](https://dormousehole.readthedocs.io/en/latest/api.html#flask.url_for) 动态构建？

1. 反转通常比硬编码 URL 的描述性更好。
2. 你可以只在一个地方改变 URL ，而不用到处乱找。
3. URL 创建会为你处理特殊字符的转义和 Unicode 数据，比较直观。
4. 生产的路径总是绝对路径，可以避免相对路径产生副作用。
5. 如果你的应用是放在 URL 根路径之外的地方（如在 `/myapplication` 中，不在 `/` 中）， [`url_for()`](https://dormousehole.readthedocs.io/en/latest/api.html#flask.url_for) 会为你妥善处理。

```
from flask import Flask, escape, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return 'index'

@app.route('/login')
def login():
    return 'login'

@app.route('/user/<username>')
def profile(username):
    return 'user: %s' % escape(username)

with app.test_request_context():
    print(url_for('index'))
    print(url_for('login'))
    print(url_for('profile', username='John Doe'))
```

其中，test_request_context() 告诉 Flask 正在处理一个请求。



### 四、Jinja2渲染模板



Jinja模板文档：https://jinja.palletsprojects.com/en/2.11.x/templates/

static：存放图片等

templates：存放模板

##### 使用render_template，可以渲染模板

```
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/jinja2')
def index():
   return render_template('test.html')
```



##### 填充数据：

render_template函数第一个参数是模板的文件名，后面为参数的键值对，表示模板中变量对应的真实值。

注释：{# #}

##### 变量代码块：{{}}表示变量名

```
@app.route('/jinja2')
def index():
   test_data='TEST!'
   return render_template('test.html',TEST_DATA=test_data)
   # TEST_DATA:模板中的变量名；test_data:传递给模板的变量，一般情况下保持一致
```

```
@app.route('/jinja2/<test_data>')
def test(test_data=None):#直接用URL内变量填充
```

test.html：

```
<body>
<h1>你好test</h1>
{{TEST_DATA}}
</body>
```



##### 控制代码块：{% %}用于语句

逻辑控制语句中以{% xx%}开头，以{%endxxx%}

```
@app.route('/jinja2/<test_data>')
def test(test_data=None):
   test_list =[1,2,3,4,5]#列表
   test_dict = {
      'name': 'jinja2' ,
      'class': '1'#字典
   }

   return render_template('test.html',TEST_DATA=test_data,test_list=test_list,test_dict=test_dict)
```

for循环：

```
<body>
    <!-- <br />{{ my_str }} -->
    <h1>你好test</h1>
    {{TEST_DATA}}</br>
    {{test_list}}</br>
    {% for number in test_list %}
        {{ number }}</br>
    {% endfor %}
</body>
```

if语句：

```
{% if number >3 %}
  {{ number }}</br>
{% endif %}
```



##### 过滤器：{ 变量名 | 过滤器}

过滤器列表：https://jinja.palletsprojects.com/en/2.11.x/templates/#list-of-builtin-filters

![image-20201208231538581](C:\Users\鱼卷\AppData\Roaming\Typora\typora-user-images\image-20201208231538581.png)

链式调用：

{{ TEST_DATA | reverse | upper}}

```
<h1>{{data_list|join(', ')}}</h1>
```

### 五、请求对象处理表单

request:一个请求对象，可以获取请求方式、数据

```
from flask import Flask, render_template, request
```

##### 请求方式限定：methods，默认GET请求。

（软件Postman模拟请求方式的发送）

![image-20201209125719118](C:\Users\鱼卷\AppData\Roaming\Typora\typora-user-images\image-20201209125719118.png)

```
@app.route('/login', methods=['GET', 'POST'])
```

通过使用 [`method`](https://dormousehole.readthedocs.io/en/latest/api.html#flask.Request.method) 属性可以操作当前请求方法，通过使用 [`form`](https://dormousehole.readthedocs.io/en/latest/api.html#flask.Request.form) 属性处理表单数据（在 `POST` 或者 `PUT` 等请求中传输的数据）。

![image-20201208222202817](C:\Users\鱼卷\AppData\Roaming\Typora\typora-user-images\image-20201208222202817.png)

##### request:获取请求方式和数据

表单实现示例：

```
@app.route('/result',methods=['GET','POST'])
def index():
   #request:请求对象,获取请求方式和数据
   # 1.判断请求方式
   if request.method == 'POST':
      # 2.获取请求的参数
      Name = request.form.get('Name')
      Password = request.form.get('Password')
      Password2 = request.form.get('Password2')
      # print(Name)
      # 3. 判断条件
      if not all([Name, Password, Password2]):
         print('Please Enter')
      elif Password != Password2:
         print('error')
      else:
         return 'success'
   return render_template('index.html')
```

index.html

```
<form action="http://localhost:5000/result" , method="POST">
   <p>Name <input type = "text" name = "Name" /></p>
   <p>Password <input type = "text" name = "Password" /></p>
   <p>Confirm Password <input type = "text" name = "Password2" /></p>
   <p><input type = "submit" value = "submit" /></p>
</form>
```

### 六、flash消息闪现

用于给模板传递消息，用户可以得到反馈。

[`flash()`](https://dormousehole.readthedocs.io/en/latest/api.html#flask.flash) 用于闪现一个消息。在模板中，使用 [`get_flashed_messages()`](https://dormousehole.readthedocs.io/en/latest/api.html#flask.get_flashed_messages) 来操作消息。完整的例子参见 [消息闪现](https://dormousehole.readthedocs.io/en/latest/patterns/flashing.html#message-flashing-pattern) 。

其中，flash需要添加密钥才能实现功能。

```
app.secret_key = 'jiami'
```

```
if not all([Name, Password, Password2]):
   # print('Please Enter')
   flash('Please Enter')#需要中文在''前加u
```

index.html中，使用get_flashed_messages()函数来对消息进行操作：

```
{% for message in get_flashed_messages() %}
   {{ message }}
{% endfor %}
```


