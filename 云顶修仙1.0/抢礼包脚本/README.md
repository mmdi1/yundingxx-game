## 多用户抢福利脚本

### 依赖环境

脚本环境基于python 3.6，需要安装requests，windows 使用 `pip install requests` 即可。

### 使用说明

一共三步：

- 配置账号  
任意编辑器（非记事本）打开 volume.py，找到cookies 数组，提前配置你的账号cookie。

- 提取key   
一般发放的礼包码格式为 ` { "content" : "P8b3EKz30urq" } ` ，所以你需要提取这个json 里面content 的属性值

- 执行脚本   
一般情况下，第一轮还是能抢到几个的。
