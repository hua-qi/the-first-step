# 主函数
import requests
from bs4 import BeautifulSoup
import pandas as pd
import openpyxl
import os

# 定义存储变量
age = []
region = []
maritalStatus = []
height = []
userinfo = []

# 获取10页网页源代码
for i in range(10):
    url = 'http://www.hongniang.com/match?&page' + str(i)
    request = requests.get(url)
    html = request.text
    
    # 解析源代码，提取信息
    soup = BeautifulSoup(html, 'html.parser')
    for info in soup.find_all('li', class_ = 'pin'):
        age.append(info.find_all('span')[1].text)
        region.append(info.find_all('span')[2].text)        
        maritalStatus.append(info.find_all('span')[3].text)        
        height.append(info.find_all('span')[4].text)        
        userinfo.append(info.find_all('div', class_ = 'db')[0].text
                        .replace('\t', '')
                        .replace('\r\n', '')
                        .replace(' ', '')[5:]
                   )

# 创建信息表格
pd.DataFrame({
    '年龄': age,
    '地区': region,
    '婚姻状况': maritalStatus,
    '身高': height,
    '简介': userinfo
})

data = pd.DataFrame({
    '年龄': age,
    '地区': region,
    '婚姻状况': maritalStatus,
    '身高': height,
    '简介': userinfo
})

# 将信息存储在 excel 表中
writer = pd.ExcelWriter('data.xlsx')
data.to_excel(writer, '爬虫数据')
writer.save()

# 获取当前文件路径 
os.getcwd()