# Blog API  , using node js 


## About 
Hello 

APIs are built into this repository that perform token-based authentication.

The strategy is that if the user registers, an email containing a confirmation code will be sent .

This email is even sent for login and the user must use this email to complete the authentication process .

In the APIs, the user can upload his avatar file . 

He can still delete it, (that file will also be deleted on the server) . 



Next, there is a post api that the user can use to create their own posts, which includes the title and content, and can also add its image file. 

Note: Add the file as
Multipart form data


>packages
- express
- express-validator 
- nodemon 
- jsonwebtoken
- multer
- mkdirp 
- sequelize
- mysql2
- ejs
- nodemiler
- bcrypt
- morgan 


## required set config file 

```
   config file here 

{
    "http_port" : "",
    "jwt_key" : "" ,
    "db" : {
        "username" : "" , 
        "password" : "" ,
        "host" : "" ,
        "database" : "" ,
        "port" : ""
    },
    "mail" : {
        "host" : "" ,
        "port" : "", 
        "user" : "" , 
        "pass" : ""
    }
}

```

### Get started 

```
npm install 

npm run dev 

```


### Authentication API 

```

name email and password end to 

POST /api/auth/register 




email password send to

POST /api/auth/login




email verify_code (required) send to

POST /api/auth/verify 


Note : The verification code becomes invalid after a few minutes or seconds


```

### user API 

```
Note : These apis require a header containing the token to proceed 

header :
x-auth-token : The token you received from api verify





GET /api/user  response : user resources 

PUT /api/user  : send name bio or avatar for updated user

DELETE /api/user/avatar  : delete user avatar

GET /api/user/post  response : user posts 

GET /api/user/post/:id  response : get post by id

POST /api/user/post  : create post {title,content,img} (Note:Use multipart/formdata to add the file)

PUT /api/user/post/:id : update post 

DELETE /api/user/post/:id deleted post 

```


### Public API  

```

GET /api/post?search=your-text  response : Posts from users that match your search term


```
