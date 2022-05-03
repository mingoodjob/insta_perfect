# 14조 협업 프로젝트

### 기억해조 Team

# 프로젝트명

### Insta Perfect

## 기간

2022-05-03 ~ 2022-05-11 (7일)

## 팀구성

* 최재완: 프론트엔드, 백엔드
* 백선영: 프론트엔드, 디자인, 백엔드
* 김하진: 프론트엔드, 디자인, 백엔드
* 이민기: 백엔드, 배포

# 팀 목표

### 인스타그램 완벽하게 클론코딩 하는걸 목표로 한다. 

# 기능

### **회원 가입 페이지**

* 회원가입
* 이메일 / 아이디 / 비밀번호 수집
* DB저장

### _**로그인 페이지**_

* 로그인 기능(세션 관리)
* 서버에서 세션을 저장하여, 해당 아이디가 로그인 되었음을 확인

### _홈 화면 게시물 피드_

#### 이미지 슬라이드
* 이미지가 여러개일 경우 슬라이드를 하여 다음 이미지를 볼수 있음

#### 댓글 기능
* 댓글을 작성하면, 댓글 카운터가 올라가고 댓글리스트가 업데이트 됨

#### 좋아요 기능
* 좋아요를 누를 경우, 좋아요 하트의 색깔이 변경되고 좋아요의 카운터가 올라감

#### 게시글 내용 더보기 기능
* 글자가 오버 되었을 경우 일부분만 노출되고 나머지는 더보기 기능으로 볼수 있음

#### 모두보기 기능
* 댓글 모두보기를 누를경우 홈화면에 피드 내용이 모달 창으로 팝업

#### 북마크 기능 (추가)
* 북마크를 하게되면 색상이 검은색 으로 변경되고 해당 아이디 저장페이지에 피드 사진이 저장됨

#### 스크롤을 이벤트 (추가)
* 홈화면에서 스크롤을 내리게 되면 일정 리스트만 보이고 다시 스크롤시 피드 db에서 재 로딩

#### DM기능 (추가)
* 회원간 DM을 보낼수 있는 기능

#### 검색 기능 (추가)
* 해시태그가 등록된 게시물을 검색창에서 검색할수 있는 기능
* 유저도 검색이 가능


# _프로필 게시물 페이지_

#### 피드 이미지 업로드 기능
* 이미지를 해당 로컬에서 파일을 선택하여 업로드 할수 있는 기능
* 이미지가 업로드 되면 해당 피드 리스트에 목록 업데이트

#### 피드 선택후 모달 기능
* 피드를 선택하여 클릭했을경우 해당 내용이 모달창으로 팝업
* 피드를 마우스 오버 했을시 좋아요 및 댓글 카운터가 보임

#### 프로필 편집 기능 (추가)
* 프로필 편집에서 아이디를 변경할수 있음
* 프로필 사진 이미지를 변경할수 있음

#### 백엔드 API (FLASK)

| 기능  | 메소드 | URL | request | respone |
| ------------- | ------------- | ----- | ---- | ---- |
| 회원가입 | POST  | /join | {'uid' : uid , 'e_mail' : e_mail , 'pswd' : pswd , 'profile_img' : profile_img | 아이디 비밀번호 이메일 프로필 사진 저장 |
| 로그인 | GET  | /login | {'uid' : uid , 'pswd' : pswd , 'profile_img' : profile_img | 아이디 비밀번호 프로필 사진 아이디는 세션에 저장 |
| 피드 이미지 목록 불러오기  | GET  | /feed_list |  | 모든 이미지 , 모든 댓글 카운트 및 내용 , 좋아요 카운트 , 좋아요 클릭 아이디 |
| 이미지 저장  | POST  | /feed_save | { 'title' : title ,  'desc' : desc , 'img' : img } | 작성된 제목 이미지 내용 |
| 좋아요 카운팅 및 아이디 | POST  | /like_click | { 'like_count' : like_count , 'like_id' : session_id } | 해당 게시물 좋아요 갯수 및 아이디 저장 |
| 좋아요 카운팅 및 아이디 | GET  | /like | | 해당 피드 좋아요 카운팅 및 클릭 아이디  |
| 댓글 저장 | POST  | /comment_list | { 'comment' : comment } | 해당 피드 댓글 내용 저장 |

## 기술

1. HTML5
2. CSS3
3. Javascript
4. JQuery
5. Python
6. Flask
7. MongoDB
8. Amazon AWS

# 와이어 프레임
