# api-admin-cms-july-a

This is part of eshop ecommerce system. This project is the backend api for admin cms.

## How to run

- clone the project and go inside the root folder
- run `npm install`
- run `npm run dev` , please run `npm i nodemon` if you already don't have the nodemon installed.

## APIS

All the api will follow the following path `${rootUrl}/api/v1` ie. http://localhost

### User API

All User api will follow the following endpoint `${rootUrl}/api/v1/user`

| #   | API                   | METHOD | DESCRIPTION                                                                  |
| --- | --------------------- | ------ | ---------------------------------------------------------------------------- |
| 1   | `/`                   | POST   | Expects the user info object and creates user in DB and returns stat message |
| 2   | `/email-verification` | POST   | Expects the user info object and check if the link is valid                  |

### Category API

All Category api will follow the following endpoint `${rootUrl}/api/v1/category`

| #   | API | METHOD | DESCRIPTION                                                                          |
| --- | --- | ------ | ------------------------------------------------------------------------------------ |
| 1   | `/` | POST   | Expects the category info object and creates category in DB and returns stat message |
| 2   | `/` | GET    |                                                                                      |
