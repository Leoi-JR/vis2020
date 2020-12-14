import pymongo
# 1.连接MongoDB我们需要使用PyMongo库里面的MongoClient，一般来说传入MongoDB的IP及端口即可，第一个参数为地址host，
#第二个参数为端口port，端口如果不传默认是27017。
#方式一：   
client=pymongo.MongoClient(host='127.0.0.1',port=27017)
#方式二：
#Client = pymongo.MongoClient('mongodb://localhost:27017/')

#2.指定数据库
#特点:找不到数据库,自动创建数据库

db=client.test #数据库名为test 
 
#db = client['test']

#3.指定集合
#特点:找不到数据库,自动创建集合

#collection=db.student#集合名为student

#collection = db['students']

#4.插入数据

#样例数据：
student = {
    'id': '20170101',
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

""" #单条插入:
#result=collection.insert(student)
result=collection.insert_one(student) #推荐使用

#多条插入:
result=collection.insert([student2,student3])
#result=collection.insert_many([student2,student3])#推荐使用

#官方推荐使用insert_one()和insert_many()方法将插入单条和多条记录分开。
 """
#5.查询

#单条查询:
""" results = collection.find_one({'age': 20})
print(results) """

#返回了多条结果的查询:
""" results=collection.find({'age':20})

 """

#6.模糊查询
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
  
""" results = collection.find({'age': {'$gt': 20}}) """


""" 
#查询板块的其他功能
count = collection.find().count() #统计查询返回的数量
results = collection.find().sort([('age',pymongo.ASCENDING),('name', pymongo.ASCENDING)]) #多条件排序
#results = collection.find().sort('name', pymongo.ASCENDING).skip(2) #分页提取数据

print(count)
for result in results:
    print(result['name'])
"""
#7.文档更新
""" condition = {'name': 'Mike'}
after ={'name': 'Mike','age':25}
result = collection.replace_one(condition,after)
results = collection.find_one({'age': 25})#查一下看看改了没
print(results) """

""" condition = {'age': {'$gt': 20}}
result = collection.update_one(condition, {'$inc': {'age': 1}})
print(result)
print(result.matched_count, result.modified_count)
# 在这里我们指定查询条件为年龄大于20，然后更新条件为{'$inc': {'age': 1}}，执行之后会讲第一条符合条件的
#数据年龄加1。
 """
#更新多条数据
""" condition = {'age': {'$gt': 20}}
result = collection.update_many(condition, {'$inc': {'age': 1}})
print(result)
print(result.matched_count, result.modified_count)
 """
#8.删除文档：
# 另外依然存在两个新的推荐方法，delete_one()和delete_many()方法，示例如下：
  
""" result = collection.delete_one({'name': 'Jordan'})
print(result)
print(result.deleted_count)
result = collection.delete_many({'age': {'$lt': 25}})
print(result.deleted_count)
 """
#db.collection.drop()

db.command("dropDatabase")