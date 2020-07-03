# -*- coding: UTF-8 -*-

import requests
import time
import os
import json
import sys

#定义post函数
def starts(url, params, cookie):
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': cookie,
        'Host': 'joucks.cn:3344',
        'Origin': 'http://joucks.cn:3344',
        'Referer': 'http://joucks.cn:3344/',
        'Connection': 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'Connection':'keep-alive'
    }
    try:
        resp = requests.post(url, headers=headers, data=params, timeout=15)
        return json.loads(resp.text)
    except Exception as e:
        return '503 error'

#定义get函数
def gets(url, params, cookie):
        headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': cookie,
        'Host': 'joucks.cn:3344',
        'Origin': 'http://joucks.cn:3344',
        'Referer': 'http://joucks.cn:3344/',
        'Connection': 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'Connection':'keep-alive'
    }
        try:
            resp = requests.get(url, headers=headers, data=params, timeout=15)
            return json.loads(resp.text)
        except Exception as e:
            return '503 error'

#定义 单人 监视帮会任务
#自变量 cookie 用户名 任务列表
def checkFationtask(cookie,username,fation_task_fliter):
	url = 'http://joucks.cn:3344/api/getUserTask'
	params = {}  
	#发起get
	res = gets(url,params,cookie)
	if res == '503 error':
	    print('503超时,请重试')
	    return '超时'
	elif res['code'] == 200:
		for x in range(len(res['data'])):
			if res['data'][x]['task']['task_type'] == 4:
				#设定名单，in 是白名单模式，not in 是黑名单模式
				if res['data'][x]['task']['name'] in fation_task_fliter:
				#if res['data'][x]['task']['name'] not in fation_task_fliter:
					m = 0
					for i in range(len(res['data'][x]['needGoods'])):
						if res['data'][x]['needGoods'][i]['have_count'] < res['data'][x]['needGoods'][i]['need_count']:
							m = 1
							pass
						pass
					if m == 0:
						pay_task(cookie, username,res['data'][x]['utid'],res['data'][x]['task']['name'])
					else:
						closeUserTask(cookie, username,res['data'][x]['utid'],res['data'][x]['task']['name'])
						pass
					pass
				else:
					print('过滤不喜欢的任务，任务名为：'+res['data'][x]['task']['name'])
					closeUserTask(cookie, username,res['data'][x]['utid'],res['data'][x]['task']['name'])
				pass
			pass
	pass

#定义完成任务函数
#自变量 cookie 用户名
def pay_task(cookie,username,task_code,task_name):
    url = 'http://joucks.cn:3344/api/payUserTask'
    params = {
        'utid': task_code
    }  
    #发起post
    res = starts(url, params, cookie)
    #返回超时
    if res == '503 error':
        print(res)
        print('503错误，超时请等待重试')
        return '超时'
    elif res['code'] == 200:
        print(username+'任务完成，任务名为：'+task_name)
        return '任务完成'
    elif res['code'] == 400:
        print('不满足任务条件，无法完成任务')
        print(res['msg'])
        return '任务失败'
    else:
        print(res)
        exit()
    pass

#定义放弃任务 closeUserTask
#自变量 cookie 用户名 任务id
def closeUserTask(cookie, username,task_code,task_name):
    url = 'http://joucks.cn:3344/api/closeUserTask'
    params = {
        'tid': task_code
    }  
    #发起post
    res = starts(url, params, cookie)
    #返回超时
    if res == '503 error':
        print(res)
        print('503错误，超时请等待重试')
        return '超时'
    elif res['code'] == 200:
        print(username+'成功放弃任务，任务名为：'+task_name)
        return '任务完成'
    elif res['code'] == 400:
    	print(username+'活力不足5点，无法放弃任务~')
    	return '活力不足'
    else:
        print(res)
        exit()
    pass

#自定义接取班会任务
#自变量 cookie username 
def getFationTask(cookie, username):
    url = 'http://joucks.cn:3344/api/getFationTask'
    params = {}
    #发起get
    res = gets(url,params,cookie)
    #返回超时
    if res == '503 error':
        print(res)
        print('503错误，超时请等待重试')
        return '超时'
    elif res['code'] == 200:
        print(username+'成功领取帮派')
        return '任务完成'
    elif res['code'] == 304:
    	print(username+'已达到领取上限')
    	return '领取上限'
    elif res['code'] == 404:
	    print('没有帮派任务啦')
	    return '需要刷新帮派任务！'
    else:
        print(res)
        exit()
    pass

#定位文件位置
dir = os.path.dirname(os.path.abspath(__file__))

#读取cookie函数
cookies_f = open(dir+'/task_cookies.txt', 'rb')
cookies = cookies_f.read()
cookies_f.close() 
cookies = json.loads(cookies) 

fation_task_fliter = [
'奇珍异兽的皮毛',
'武器库储备',
#'寻找帮派所需物品',
'奇珍异兽蛋',
'寻物',
#'寻找帮派所需物品',
'寻找蜥血',
'兽皮的市场',
'孔雀的羽毛',
]



#战斗前准备，统计账号数量，设置计数，设置默认地图
cookie_len = len(cookies)
print('总共有%d个账号在运行' %(cookie_len))
time.sleep(2)
cookie_count = 0
fation_task_id = [0]*cookie_len
fation_task_count = [0]*cookie_len

while 0 in fation_task_id:
	if cookie_count >= cookie_len:
		cookie_count = 0
		pass
	cookie = cookies[cookie_count][1]
	username = cookies[cookie_count][0]
	if fation_task_id[cookie_count] == 0:
		print('-----------------------')
		get_FationTask = getFationTask(cookie,username)
		if get_FationTask == '超时':
		    time.sleep(1)
		    continue
		elif get_FationTask == '需要刷新帮派任务！' or :
			fation_task_id[cookie_count] = 1
		elif get_FationTask == '领取上限':
			fation_task_id[cookie_count] = 1
			pass
		time.sleep(1)
		check_Fationtask = checkFationtask(cookie,username,fation_task_fliter)
		if check_Fationtask == '超时':
			continue
		elif check_Fationtask == '活力不足':
			fation_task_id[cookie_count] = 1
		time.sleep(1)
		print('-----------------------')
		pass
	cookie_count += 1
	pass
