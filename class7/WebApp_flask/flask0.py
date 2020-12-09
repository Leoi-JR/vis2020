# 1. 路由

#导入flask扩展
from flask import Flask, render_template, request, jsonify,flash,url_for,escape

#创建flask应用程序实例 传入 __name__确定资源所在路径
app = Flask(__name__)
app.secret_key = 'jiami'

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
         flash('Please Enter')
      elif Password != Password2:
         flash('error')
      else:
         flash ('success')
   return render_template('index.html')
#启动程序
if __name__ == '__main__':
   #运行在简易服务器，用于测试
   app.run(debug=True)
   # app.run(host='127.0.0.1',port=8080)
