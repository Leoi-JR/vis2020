
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
