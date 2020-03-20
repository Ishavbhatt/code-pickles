# Code Pickle

code pickle is a code sharing platform made for developers.

## Installation

1. clone the repo

```bash
git clone https://github.com/Abinash393/code-pickles.git
```

2. go to the directory

```bash
cd code-pickles
```

3. install the dependency

```bash
npm i
```

or

```bash
yarn install
```

4. create a .env file

```bash
touch .env
```

5. add required data

```bash
PORT=
MONGO=
PRIMARY_JWT_SECRET=
REFRESH_JWT_SECRET=
SALT=
```

- To generate a strong secret string goto node REPL

```bash
require('crypto').randomBytes(64).toString('hex')
```

## API Endpoints Specification

- To register new user.
- Password is minimum 8 character.

```
POST /api/v1/user/signup
```

#### request

```json
body:{
"username":"username",
"password":"password",
"email":"user@mail.io"
}
```

#### response

```json
{
  "success": true,
  "msg": "User successfully registered"
}
```

- To login existing user

```
POST /api/v1/user/login
```

#### request

```json
body:{
"email":"user@mail.io",
"password":"password"
}
```

#### response

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTgwMjQ1NTRiMmYyN2Q1NzQ0MTEwMCIsImlhdCI6MTU4MjgyNjExMn0.2MAcy_WXNHcv1l13o6c9wpd8koi-uULR2-u1cY371rj"
}
```

#### request header

```json
headers: {
"Content-Type": "application/json",
"Authorization": "token"
}
```

- Receive details of the user
- Authorization needed

```
GET /api/v1/user/me
```

#### response

```json
"success": true,
    "user": {
        "name": "User Name",
        "email": "mail@user.io",
        "karma": 0,
        "avatar": ""
    }
```

- To update password

```
PATCH /api/v1/user/password
```

#### request

```json
{
  "password": "password"
}
```

#### response

```json
{ "success": true, "msg": "Password successfully updated" }
```

- Delete the user account permanently
- Authorization needed

```
DELETE /api/v1/user/account
```

* End /user

#### response

```json
{
  "success": true,
  "msg": ""
}
```

- Get list of tag

```
GET /api/v1/tag/list
```

#### response

```json
{
  "success": true,
  "tagList": []
}
```

- Receive questions of that tag
  GET /api/v1/tag/:tagName

#### response

```json
{
  "success": true,
  "questionList": []
}
```

- End /tag

* Get recent post on community
* both skip and limit query required
* limit can not exceed then 50

```
GET /api/v1/community/post?skip=0&limit=20
```

#### response

```json
{
  "success": true,
  "communityPost": []
}
```

- update the community post

```
PUT /api/v1/community/:id
```

#### request

```json

```

#### response

```json
{
  "success": true,
  "msg": "Post successfully updated",
  "updatedPost": {
    "image": "",
    "_id": "5e5e2253d4je4a6b94dcb345",
    "details": "New Post",
    "createdAt": "2020-03-03T09:24:35.088Z",
    "updatedAt": "2020-03-03T09:44:21.370Z"
  }
}
```

- End /community

```
POST /api/v1/question/create
```

#### request

```
{
  "question": "I am trying to connect with mongodb"
}
```

- to up vote a question
- if already up voted then up vote is removed
- authentication required

```json
POST /api/v1/question/upvote/:id
```

- to down vote a question
- if already is down voted the down vote is removed
- authentication required

```json
POST /api/v1/question/downvote/:id
```

- close the question for new response
- authentication required

```
PATCH /api/v1/question/close/:id
```

#### response

```json
{ "success": true, "msg": "The question is closed for new response" }
```

- open the question for new response
- authentication required

```
PATCH /api/v1/question/open/:id
```

#### response

```json
{ "success": true, "msg": "The question is opened for new response" }
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. ## License

[ISC](https://www.isc.org/licenses/)
