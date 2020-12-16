# MongoDB : 最酷的NoSQL开源数据库

## 一、MongoDB简介

·Mongodb底层是用C++语言编写的。

·一个分布式的文件存储系统（https://baike.baidu.com/item/%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8%E7%B3%BB%E7%BB%9F/6608875?fr=aladdin）

### •主要特点（quote 李晓明老师）

•面向集合存储：易存储对象类型的数据，包括文档内嵌对象及数组。

•模式自由：无需知道存储数据的任何结构定义，支持动态查询、完全索引，可轻易查询文档中内嵌的对象和数组

•文档型：存储在集合中的文档，被存储为键-值对的形式。键用于唯一标识一个文档，为字符串类型，而值则可以是各种复杂的文件类型。

•高效的数据存储：支持二进制数据及大型对象

•支持复制和故障恢复：提供Master-Master、Master-Slave模式的数据复制及服务器之间的数据复制

•自动分片：以支持云级别的伸缩性，支持水平的数据库集群，可动态添加额外的服务器

![image-20201213162622191](C:\Users\15727\AppData\Roaming\Typora\typora-user-images\image-20201213162622191.png)



## 二、MongoDB 安装：

具体安装教程：https://blog.csdn.net/qq_14997473/article/details/89601225?utm_medium=distribute.pc_relevant.none-task-blog-title-6&spm=1001.2101.3001.4242
可视化工具：robo 3：https://robomongo.org/

### 1. 下载和安装：https://www.mongodb.com/download-center#community

### 不要装COMPASS！！！！！！ 不要装COMPASS！！！！！ 不要装COMPASS！！！！！！

![image-20201213134946254](C:\Users\15727\AppData\Roaming\Typora\typora-user-images\image-20201213134946254.png)

#### 可以先建好这两个放文件的地方一个存数据一个存日记，好像它也会自动帮你创建

![img](https://img-blog.csdnimg.cn/20190510092555942.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE0OTk3NDcz,size_16,color_FFFFFF,t_70)

### 2. 配置MongoDB

我们装的是4.4版本 所以只需要打开C:\Program Files\MongoDB\Server\4.4\bin\mongod.cfg文件

在#Security那行下面（其他地方也行）加上下面两行（注意缩进，复制就行）：

![image-20201213140044068](C:\Users\15727\AppData\Roaming\Typora\typora-user-images\image-20201213140044068.png)

```
security:
  authorization: enabled
```

然后Command里面写入下面两条命令配置windows服务：

```
cd C:\Program Files\MongoDB\Server\4.4\bin
```

```
mongod --config "C:\Program Files\MongoDB\Server\4.4\bin\mongod.cfg" --install --serviceName "MongoDB"
```

### 3.检查是否成功

在浏览器输入 http://localhost:27017 （27017是mongodb的端口号）查看，若有如下显示则表示连接成功。

```
It looks like you are trying to access MongoDB over HTTP on the native driver port.
```

## 三、基于Python的MongoDB使用.

详细教程：https://www.cnblogs.com/angle6-liu/p/10480314.html

### 1.安装pymongo

```python
pip install pymongo
```

### 2.确保mongo正在运行

![image-20201213141849113](C:\Users\15727\AppData\Roaming\Typora\typora-user-images\image-20201213141849113.png)

### 3.连接数据库：

```python
import pymongo
#   连接MongoDB我们需要使用PyMongo库里面的MongoClient，一般来说传入MongoDB的IP及端口即可，第一个参数为地址host，第二个参数为端口port，端口如果不传默认是27017。

#方式一：
client=pymongo.MongoClient(host='127.0.0.1',port=27017)
#方式二：
#Client = pymongo.MongoClient('mongodb://localhost:27017/')
```

### 4.指定数据库：

```python
#指定数据库
#特点:找不到数据库,自动创建数据库

db=client.test #数据库名为test 
 
#db = client['test']
```

### 5.指定集合：

```python
#指定集合
#特点:找不到数据库,自动创建集合

collection=db.student#集合名为student

#collection = db['students']
```

### 6.插入数据：

```json
#样例数据
student = {
    '_id': '1',
    'name': 'Kevin',
    'age': 20,
    'gender': 'male'
}

student2 = {
    '_id': '2',
    'name': 'Jordan',
    'age': 30,
    'gender': 'male'
}

student3 = {
    '_id': '3',
    'name': 'Mike',
    'age': 20,
    'gender': 'male'
}

```

```python
#单条插入:
#result=collection.insert(student)
result=collection.insert_one(student) #推荐使用

#多条插入:
#result=collection.insert([student2,student3])
result=collection.insert_many([student2,student3])#推荐使用

#官方推荐使用insert_one()和insert_many()方法将插入单条和多条记录分开。

```

### 7.查询数据

```python
#单条查询:
results = collection.find_one({'age': 20})
print(results)
#返回了多条结果的查询:
result_list=collection.find({'age':20})
print(result_list)
for result in result_list:
    print(result['name'])
```

#### 模糊查询:

```python
'''
符号含义示例
$lt小于{'age': {'$lt': 20}}
$gt大于{'age': {'$gt': 20}}
$lte小于等于{'age': {'$lte': 20}}
$gte大于等于{'age': {'$gte': 20}}
$ne不等于{'age': {'$ne': 20}}
$in在范围内{'age': {'$in': [20, 23]}}
$nin不在范围内{'age': {'$nin': [20, 23]}}
'''

# 如果要查询年龄大于20的数据，则写法如下：
  
results = collection.find({'age': {'$gt': 20}})
```

**其他功能：**

```python
count = collection.find().count() #统计查询返回的数量

#count = collection.count_documents({'age': {'$gte': 20}}) #统计查询返回的数量
#print(count)

results = collection.find().sort([('age',pymongo.ASCENDING),('name', pymongo.ASCENDING)]) #多条件排序
results = collection.find().sort('name', pymongo.ASCENDING).skip(2) #分页提取数据
```

### 8.更新文档：https://www.cnblogs.com/c-x-a/p/9766692.html

```python
#这部分与教程上不一致，版本更新
condition = {'name': 'Mike'}
after ={'name': 'Mike','age':25}
result = collection.replace_one(condition,after)
results = collection.find_one({'age': 25})
```

```python
condition = {'age': {'$gt': 20}}
result = collection.update_one(condition, {'$inc': {'age': 1}})
print(result)
print(result.matched_count, result.modified_count)

# 在这里我们指定查询条件为年龄大于20，然后更新条件为{'$inc': {'age': 1}}，执行之后会讲第一条符合条件的
#数据年龄加1。
```

更新多条数据：

```python
#更新多条数据:.update_many
condition = {'age': {'$gt': 20}}
result = collection.update_many(condition, {'$inc': {'age': 1}})
print(result)
print(result.matched_count, result.modified_count)#找到的 和 修改的
```

### 9.删除文档：

```python
# 另外依然存在两个新的推荐方法，delete_one()和delete_many()方法，示例如下：
  
result = collection.delete_one({'name': 'Jordan'})
print(result)
print(result.deleted_count)
result = collection.delete_many({'age': {'$lt': 25}})
print(result.deleted_count)
```

```python
db.collection.drop()
```

## 四、flask-Mongodb数据传入传出案例

详细教程：https://blog.csdn.net/Louiser_go/article/details/102858328?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control

### 1.搭建工程文件结构如下：

```
|- templates
     |- data.html
     |- file.html
 |- __pycache__
     |- config.cpython-37.pyc
     |- connect.cpython-37.pyc
 |- config.py
 |- connect.py
 |- runserver.py
```

### 2.Config.py

```PYTHOn
 # 此文件用来配置数据库信息
      HOST =  'localhost'
      PORT = 27017
      DATABASE_NAME = 'test'
```

该文件用来进行 mongodb 的配置，把他独立出来的好处在于：当你的项目比较大的时候，如果你的配置信息发生变化，你可以直接在配置文件中修改。(注意缩进)

### 3.connect.py

该文件用来进行 mongodb 的连接。

```python

# 此文档用来连接数据库
from pymongo import MongoClient
import config
import sys
sys.path.append('..')


class Mongo:
        def __init__(self, host=None, port=None, db_name=None):
            '''
            Description:
                构造函数，初始化数据库参数
            Input:
                host: 主机名，默认读取config.HOST
                port：端口号，默认读取config.PORT
                db_name：数据库名称，默认读取config.DATABASE_NAME
            Return:
                Object
            '''
            self.host = host or config.HOST or'127.0.0.1'
            self.port = port or config.PORT or '27017'
            self.db_name = db_name or config.DATABASE_NAME or 'test'

        def connect(self):
            '''
            Description:
                连接到数据库
            Return:
                数据库对象
            Error return:
                None
            '''

            try:
                myclient = MongoClient(self.host, self.port)
                mydb = myclient[self.db_name]
                return mydb

            except Exception as e:
                print(e)
                return None

            else:
                return mydb

```

### 4.runserver.py

该文件用来进行前端请求的处理，将数据存到mongodb以及将数据传回前端页面展示。

```python

from flask import Flask, render_template, request, url_for
import connect
import base64

app = Flask(__name__)
TEMPLATES_AUTO_RELOAD = True
SEND_FILE_MAX_AGE_DEFAULT = 0

mongo = connect.Mongo()
db = mongo.connect()
mycol = db["user"]


@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('file.html')


@app.route('/upload', methods=['POST'])
def upload():
    # upload_file = request.files.get('file')
    # print(upload_file)

    other = request.form["name"]
    print(other)

    mydict = {"id": request.form["id"], "name": request.form["name"],
              "balance": request.form["balance"]}#, "photo": request.form["show"]
    mycol.insert_one(mydict)

    for x in mycol.find():
        print(x)

    return "sucessful"


@app.route('/show', methods=['GET'])
def show():
    return render_template('data.html', mycol=mycol)


if __name__ == '__main__':
    app.run(debug=True)

```

### 5.file.html

```html
<!DOCTYPE html>
<title>传输文件</title>
<form id="form1" enctype="multipart/form-data">
    <p>
        填写id：<input type="text" name="id" id="id">
    </p>
    <p>
        填写name：<input type="text" name="name" id="name">
    </p>
    <p>
        填写balance：<input type="text" name="balance" id="balance">
    </p>
    <p>
        上传photo：<input type="file" name="file" id="file" ><!--onchange="load()"-->
    </p>
    <p style="display: none;">
        photo64编码：<textarea cols="60" rows="15" id="show" name="show"></textarea>
    </p>

    <button onclick="upload()">提交</button>
</form>
<script src="http://cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>

<!-- 当上传文件之后进行的操作 -->
<script type="text/javascript">
    function load() {
        var file = document.getElementById('file').files[0]
        console.log("读取源文件")
        console.log(file)
        
        var reader = new FileReader()
        //将文件以Data URL形式读入页面  
        reader.readAsDataURL(file);
        reader.onload = function() {
            var imgUrlBase64 = this.result
            console.log("转化为img64：")
            console.log(imgUrlBase64)
            document.getElementById('show').value = imgUrlBase64
        }
    }

    function upload() {
        let formData = new FormData($("#form1")[0])
        console.log('点击提交之后，打印FormData中的数据')
        console.log(formData.get('file'))
        $.ajax({
            url: 'http://127.0.0.1:5000/upload',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function(returndata) {
                alert(returndata);
            },
            error: function(error) {
                alert(error);
            }
        })
    }
</script> 
```



### 6.data.html

该页面用来在前端展示接收到的数据。

http://127.0.0.1:5000/show

```html
<!DOCTYPE html>
<title>展示数据</title>
<h1>展示数据</h1>
<style>
    table,
    th,
    td {
        border: 1px solid red;
        height: 30px;
    }
    
    table {
        border-collapse: collapse;
    }
    
    th,
    td {
        width: 300px;
        text-align: center;
    }
    
    .img {
        width: 30px;
        height: 30px;
    }
</style>

<body>


    <table>
        <tr>
            <th>id</th>
            <th>name</th>
            <th>balance</th>
            <th>photo</th>
        </tr>


        {% for x in mycol.find() %}
        <tr>
            <td>{{x.id}}</td>
            <td>{{x.name}}</td>
            <td>{{x.balance}}</td>
            <!-- td><img src={{x.photo}} class="img"></td>-->

        </tr>
        {% endfor %}
    </table>
</body>
```

