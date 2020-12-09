
# 导入flask扩展
from flask import Flask

# 创建flask应用程序实例 传入 __name__确定资源所在路径
app = Flask(__name__)


# 定义路由及视图函数 装饰器，告诉Flask触发函数的URL
@app.route('/')  # '/'根路由
def hello_world():
    return 'Hello, World!'
@app.route('/aa')
def a():
    return 'a'

# 启动程序
if __name__ == '__main__':
    # 运行在简易服务器，用于测试
    app.run(debug=True)  # debug=True自动更新