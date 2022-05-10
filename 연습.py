from pymongo import MongoClient
import certifi
import math 
from datetime import datetime, timedelta



client = MongoClient('mongodb+srv://test:sparta@cluster0.avef3.mongodb.net/Cluster0?retryWrites=true&w=majority',tlsCAFile=certifi.where())
db = client.instaperfect

col = db.feed

doc = {
    'comment' : [{

     'write_id' : 'id',
        'text' : 'text'
    },

    {

     'write_id' : 'id',
        'text' : 'text'
    },

    {

     'write_id' : 'id',
        'text' : 'text'
    },

    ]
}

col.insert_one(doc)

# #카운트 세기
# col_count = col.count_documents({})

# print(col_count)
# like_list = dict(col.find_one({'feed_number': 20}))
# db.feed.update_one({'feed_number': 20}, {'$push': {'like_list': 'where'}}, upsert=True)

# likelist = like_list['like_list']

# if 'asdf' in likelist:
#     print('True')
# else:
#     print('False')

# uid = 'test451'
# cnt = col.find_one({"uid": uid})

# try:
#     _id = cnt['uid']
#     print('아이디중복')
# except:
#     print('아이디 중복 아님')

# # if cnt > 0:
# #     print('중복된 아이디 입니다.')



#시간 계산 해보기

time2 = datetime.now()
time1 = datetime(2022, 5, 9, 12, 11, 5)
print(time1) # 2018-07-13 21:40:05
print(time2) # 2018-07-23 20:58:59.666626

print(time2-time1) # 9 days, 23:18:54.666626
print(type(time2-time1)) # <class 'datetime.timedelta'>

print('두 날짜의 차')
print((time2-time1).days, '일') # 9 일
print((time2-time1).seconds, '초') # 83934 초

print(math.trunc((time2-time1).seconds / 60), '분 전')

print(time1.second, '초')
# print((time2 - time1).minute, '분')

times = time1.second
if times > 60:
    print((time2-time1).seconds, '초 전')
else:
    print(f'{math.trunc((time2-time1).seconds / 3600)} 시간 전')