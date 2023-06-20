# Dev_Net
A networking app made using Rest APIs and React library.

👉 Backend with Rest API is done. Users can do all the functionality provided by API using React on front end.

# Other Enhancement will be done:
- [ ] Add URL for user's profile picture
- [ ] Make people be able to follow other developers
- [ ] Add search functionality to **search** for users

# Tech Stack used
* Backend: `Node.js` as Runtime, `express` for server, `express-validator` for validating user input
* Frontend: `React` Library which runs using `Javascript`. `Redux` is used for state management
* Database: `MongoDB` using `Mongoose` npm package
* Security: `Bcrypt` for hashing password, `JWT` for verifying current user

# How to install:
* Easy way is to use docker. Run the command:
```
docker pull ritish56/devnet
```

* If you want to pull it in your local terminal without docker, run this command to clone the repository:
````
git clone https://github.com/ritish78/Dev_Net.git
````
* Then you need to go inside the cloned repo:
````
cd Dev_Net

npm install
````
* Once, all the dependencies are installed, you need to create a `default.json` file inside where you need to provide URL to your `MongoDB` server.
````
cd client/config
touch default.json
````
* Edit the file using any of the text editor. Fill in `mongoURI` and `jwtSecret`. `jwtSecret` can be any random string
````
{
    "mongoURI": "YOUR_MONGO_DB_URI",
    "jwtSecret": "YOUR_JWT_SECRET"
 }
````
* Then `cd` back to the root directory and run the command:
````
npm run dev
````
* `Concurrently` will start both Node server and React. The server will start on 'http://localhost:3000' for React and 'http://localhost:5000' for API.

# API Endpoint:
* `Users` API endpoint: <br>
![Users and Auth API endpoint](https://github.com/ritish78/Dev_Net/assets/36816476/31f142bd-b6b0-4cd9-8f7b-117ae74ca320)

* `Profile` API endpoint: <br>
![Profile API endpoint](https://github.com/ritish78/Dev_Net/assets/36816476/9de4c987-9aad-4c07-b806-e1933e77243f)

* `Posts` API endpoint: <br>
![Posts API endpoint](https://github.com/ritish78/Dev_Net/assets/36816476/850a5a80-2403-4412-be6f-d468ee7146a4)

# State Management using `Redux`:
Using redux, we can dispatch object actions to the store whenever some action takes place in the app. Below is an example of using Redux to manage the state of Profile.
![Profile State](https://github.com/ritish78/Dev_Net/assets/36816476/59b53f3d-a7c7-4cee-a2f4-8af9d2c561b9)


# Screenshot: 
* Landing Page: <br> ![Landing Page](https://github.com/ritish78/Dev_Net/assets/36816476/d1d5c9e3-74e7-4007-abda-5bb92f641613)
* Clone the repo to see more. 

# API Documentation:

## End-point: Creating new user
### Method: POST
>```
>localhost:5000/api/users
>```
### Body (**raw**)

```json
{
    "name": "Test User",
    "email": "test@email.com",
    "password": "pass123"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Testing auth of first user
### Method: GET
>```
>localhost:5000/api/auth
>```
### Headers

|Content-Type|Value|
|---|---|
|x-auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YTJiNjY1ZGE2NGQ2YmUzNmI3YWY5In0sImlhdCI6MTY4NDY3OTUyNiwiZXhwIjoxNjg1MDM5NTI2fQ.Opzw5YPwJYaRl-9lkxFlRpTbgAzwq3_TvBoXZsxarvI|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Login using user email and password for auth
### Method: POST
>```
>localhost:5000/api/auth
>```
### Body (**raw**)

```json
{
    "email": "test1@email.com",
    "password": "pass123"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete current user, their profile and posts
### Method: DELETE
>```
>localhost:5000/api/users
>```
### Headers

|Content-Type|Value|
|---|---|
|x-auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjhhNzM2Y2U4NjEzMTRkMGI2NThkIn0sImlhdCI6MTY4NDc2OTM5NSwiZXhwIjoxNjg1MTI5Mzk1fQ.HDSmDrvTA9mg52qM_n0dupBm9XASCZS6Lbo3vw6hPzs|


## End-point: Get profile of the user using JWT
### Method: GET
>```
>localhost:5000/api/profile/me
>```
### Headers

|Content-Type|Value|
|---|---|
|x-auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YTJiNjY1ZGE2NGQ2YmUzNmI3YWY5In0sImlhdCI6MTY4NDY4MTYwNSwiZXhwIjoxNjg1MDQxNjA1fQ.DXMrH9vR-XGHwORF6rXmo4ZpZ2r_SZbQKmX1u0UJltc|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Saving user profile info
### Method: POST
>```
>localhost:5000/api/profile
>```
### Headers

|Content-Type|Value|
|---|---|
|x-auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YTJiNjY1ZGE2NGQ2YmUzNmI3YWY5In0sImlhdCI6MTY4NDY4MTYwNSwiZXhwIjoxNjg1MDQxNjA1fQ.DXMrH9vR-XGHwORF6rXmo4ZpZ2r_SZbQKmX1u0UJltc|


### Body (**raw**)

```json
{
    "status": "Developer",
    "skills": "HTML, CSS, JS, Java",
    "company": "Student Ltd",
    "location": "Home, Earth",
    "bio": "Learning backend development",
    "githubusername": "test",
    "twitter": "https://twitter.com/test",
    "facebook": "https://facebook.com/test",
    "youtube": "https://youtube.com/test"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get all profiles
### Method: GET
>```
>localhost:5000/api/profile
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get profile by their user id
### Method: GET
>```
>localhost:5000/api/profile/user/646b03bea90481e9c4f13245
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete profile of a user
### Method: DELETE
>```
>localhost:5000/api/profile
>```
### Headers

|Content-Type|Value|
|---|---|
|x-auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjAzYmVhOTA0ODFlOWM0ZjEzMjQ1In0sImlhdCI6MTY4NDczNDkxMCwiZXhwIjoxNjg1MDk0OTEwfQ.CD-rxlEbFevr_9WmWRiXF_HGlJ4qYYoBNuIv4pV13IA|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Adding experience to a user's profile
### Method: POST
>```
>localhost:5000/api/profile/experience
>```
### Headers

|Content-Type|Value|
|---|---|
|x-auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjFiMTFlZDNmY2U5MWNiMzE0ZGMwIn0sImlhdCI6MTY4NDc0MTI3MSwiZXhwIjoxNjg1MTAxMjcxfQ.9gcSLg2V18k9yH1QIT7LYI3VQHCvUVkWOUzkvR4CIOI|


### Body (**raw**)

```json
{
    "title": "Savior",
    "company": "Disney",
    "location": "Hollywood",
    "from": "10-13-2002",
    "current": true,
    "description": "Leader"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Updating user's experience
### Method: POST
>```
>localhost:5000/api/profile/experience/646b26d396fa4ebd0c290deb
>```
### Headers

|Content-Type|Value|
|---|---|
|x-auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjFiMTFlZDNmY2U5MWNiMzE0ZGMwIn0sImlhdCI6MTY4NDc0MTI3MSwiZXhwIjoxNjg1MTAxMjcxfQ.9gcSLg2V18k9yH1QIT7LYI3VQHCvUVkWOUzkvR4CIOI|


### Body (**raw**)

```json
{
    "title": "Savior",
    "company": "Disney",
    "location": "Hollywood",
    "from": "10-13-2002",
    "current": true,
    "description": "Leader"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete experience by its id
### Method: DELETE
>```
>localhost:5000/api/profile/experience/646b2a3c44876ac985bdaa43
>```
### Headers

|Content-Type|Value|
|---|---|
|x-auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjFiMjNlZDNmY2U5MWNiMzE0ZGMzIn0sImlhdCI6MTY4NDc0NDkzMCwiZXhwIjoxNjg1MTA0OTMwfQ.xvLome9oe5cSoNd_H3juicnV7KpYKs97O-oGSgfVK0w|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Create education record of a user
### Method: POST
>```
>localhost:5000/api/profile/education
>```
### Headers

|Content-Type|Value|
|---|---|
|x-auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjFiMzZlZDNmY2U5MWNiMzE0ZGM2In0sImlhdCI6MTY4NDc0OTgzOCwiZXhwIjoxNjg1MTA5ODM4fQ.JpsoD9lcaijSnTAtNzzfbX-rXLEUAd21gaNtm8ce5wI|


### Body (**raw**)

```json
{
    "school": "Ivy Uni",
    "degree": "Humanitarian Services",
    "fieldOfStudy": "Humanitarian",
    "from": "10-10-2003",
    "to": "01-05-2007",
    "current": false,
    "description": "Studied Humanitarian services at a reputable uni"
}

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update education info
### Method: POST
>```
>localhost:5000/api/profile/education/646b3edc9858c43257fd0098
>```
### Headers

|Content-Type|Value|
|---|---|
|x-auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjFiMzZlZDNmY2U5MWNiMzE0ZGM2In0sImlhdCI6MTY4NDc0OTgzOCwiZXhwIjoxNjg1MTA5ODM4fQ.JpsoD9lcaijSnTAtNzzfbX-rXLEUAd21gaNtm8ce5wI|


### Body (**raw**)

```json
{
    "school": "Ivy Uni",
    "degree": "Humanities Humanities Humanities",
    "fieldOfStudy": "Humanitarian",
    "from": "10-10-2003",
    "to": "01-05-2007",
    "current": false,
    "description": "Studied Humanitarian services at a reputable uni"
}

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete education info by education id
### Method: DELETE
>```
>localhost:5000/api/profile/education/646b3f139858c43257fd009c
>```
### Headers

|Content-Type|Value|
|---|---|
|x-auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjFiMzZlZDNmY2U5MWNiMzE0ZGM2In0sImlhdCI6MTY4NDc0OTgzOCwiZXhwIjoxNjg1MTA5ODM4fQ.JpsoD9lcaijSnTAtNzzfbX-rXLEUAd21gaNtm8ce5wI|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get user's github repo in list
### Method: GET
>```
>localhost:5000/api/profile/github/ritish78
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Creating a post
### Method: POST
>```
>localhost:5000/api/post
>```
### Headers

|Content-Type|Value|
|---|---|
|x-auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjFiMzZlZDNmY2U5MWNiMzE0ZGM2In0sImlhdCI6MTY4NDc0OTgzOCwiZXhwIjoxNjg1MTA5ODM4fQ.JpsoD9lcaijSnTAtNzzfbX-rXLEUAd21gaNtm8ce5wI|


### Body (**raw**)

```json
{
    "text": "Todododoodo"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get all posts
### Method: GET
>```
>localhost:5000/api/post
>```
### Headers

|Content-Type|Value|
|---|---|
|x-auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjFiMTFlZDNmY2U5MWNiMzE0ZGMwIn0sImlhdCI6MTY4NDc1MzE2MiwiZXhwIjoxNjg1MTEzMTYyfQ.W8qTToTNuhmSRuCgU69kedYTTnC3H-E7QbPzxx3MD-0|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Deleting a post by its id
### Method: DELETE
>```
>localhost:5000/api/post/646b4ee1c81f2f12a73a65fd
>```
### Headers

|Content-Type|Value|
|---|---|
|x-auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjFiMTFlZDNmY2U5MWNiMzE0ZGMwIn0sImlhdCI6MTY4NDc1MzE2MiwiZXhwIjoxNjg1MTEzMTYyfQ.W8qTToTNuhmSRuCgU69kedYTTnC3H-E7QbPzxx3MD-0|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get post by its id
### Method: GET
>```
>localhost:5000/api/post/646b69d6a573913296bff410
>```
### Headers

|Content-Type|Value|
|---|---|
|x-auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjFiMTFlZDNmY2U5MWNiMzE0ZGMwIn0sImlhdCI6MTY4NDc2MTE1NCwiZXhwIjoxNjg1MTIxMTU0fQ.d5fN3gfaKna235M4wRvPMDJ5ig6owkbbq29a_KrX1uU|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Like/Unlike Post
### Method: POST
>```
>localhost:5000/api/post/like/646b4abbb7ed8af51614281b
>```
### Headers

|Content-Type|Value|
|---|---|
|x-auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjFiMTFlZDNmY2U5MWNiMzE0ZGMwIn0sImlhdCI6MTY4NDc2MTE1NCwiZXhwIjoxNjg1MTIxMTU0fQ.d5fN3gfaKna235M4wRvPMDJ5ig6owkbbq29a_KrX1uU|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Adding a comment on a post
### Method: POST
>```
>localhost:5000/api/post/comment/646b4abbb7ed8af51614281b
>```
### Headers

|Content-Type|Value|
|---|---|
|x-auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjFiMTFlZDNmY2U5MWNiMzE0ZGMwIn0sImlhdCI6MTY4NDc2MTE1NCwiZXhwIjoxNjg1MTIxMTU0fQ.d5fN3gfaKna235M4wRvPMDJ5ig6owkbbq29a_KrX1uU|


### Body (**raw**)

```json
{
    "text": "Are you fine Keanu?"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Deleting comment by comment id and post id
### Method: DELETE
>```
>localhost:5000/api/post/comment/646b4abbb7ed8af51614281b/646b809d82df7fc6e97fcd7c
>```
### Headers

|Content-Type|Value|
|---|---|
|x-auth-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjFiMTFlZDNmY2U5MWNiMzE0ZGMwIn0sImlhdCI6MTY4NDc2MTE1NCwiZXhwIjoxNjg1MTIxMTU0fQ.d5fN3gfaKna235M4wRvPMDJ5ig6owkbbq29a_KrX1uU|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃







