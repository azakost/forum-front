# Front-end application for Alem Community Forum

TODO:

- [x] Adaptive layout
- [x] Hash-based router setup
- [x] Registration
- [x] Login-logout
- [x] Posts view
- [x] Write short post
- [x] Write long post (+image attach)
- [x] Single post view
- [x] Post reactions
- [x] Comment post
- [x] Comment reactions
- [x] Post edit/delete
- [ ] Post report modal window
- [ ] Profile Edit (profile pic, sex, age, social links)
- [ ] Notification page
- [ ] User profile view
- [ ] User Karma
- [ ] Ranking users by karma
- [ ] Rightbar panels:
- [ ] - Posts filtering & search (when viewing Questions page)
- [ ] - Authors main stats page & recent questions (when viewing post)
- [ ] - Styling settings (when viewing self profile)
- [ ] - Forum rules (when writing/updaing post)

## forum

### Objectives

This project consists in creating a web forum that allows :

- [x] communication between users.
- [x] associating categories to posts.
- [x] liking and disliking posts and comments.
- [ ] filtering posts.

#### SQLite

- [x] You must use at least one SELECT, one CREATE and one INSERT queries.

#### Authentication

- [x] In this segment the client must be able to `register` as a new user on the forum, by inputting their credentials.
- [x] you also have to create a `login session` to access the forum and be able to add posts and comments.
- [x] You should use cookies to allow each user to have only one opened session. Each of this sessions must contain an expiration date. It is up to you to decide how long the cookie stays "alive".

Instructions for user registration:

- [x] Must ask for email
- [x] When the email is already taken return an error response.
- [x] Must ask for username
- [x] Must ask for password
- [x] The password must be encrypted when stored

- [x] The forum must be able to check if the email provided is present in the database and if all credentials are correct.
- [x] It will check if the password is the same with the one provided and, if the password is not the same, it will return an error response.

#### Communication

- [x] In order for users to communicate between each other, they will have to be able to create posts and comments.
- [x] Only registered users will be able to create posts and comments.
- [x] When registered users are creating a post they can associate one or more categories to it.
- [x] The implementation and choice of the categories is up to you.
- [x] The posts and comments should be visible to all users (registered or not).
- [x] Non-registered users will only be able to see posts and comments.

#### Likes and Dislikes

- [x] Only registered users will be able to like or dislike posts and comments.

- [x] The number of likes and dislikes should be visible by all users (registered or not).

#### Filter

You need to implement a filter mechanism, that will allow users to filter the displayed posts by :

- [ ] categories
- [ ] created posts
- [ ] liked posts

You can look at filtering by categories as subforums. A subforum is a section of an online forum dedicated to a specific topic.

Note that the last two are only available for registered users and must refer to the logged in user.

#### Docker

- [ ] For the forum project you must use Docker. You can see all about docker basics on the [ascii-art-web-dockerize](https://public.01-edu.org/subjects/ascii-art-web/dockerize/) subject.

### Instructions

- [x] You must use **SQLite**.
- [x] You must handle website errors, HTTP status.
- [x] You must handle all sort of technical errors.
- [x] The code must respect the [**good practices**](https://public.01-edu.org/subjects/good-practices/).

### Allowed packages

- [x] All [standard go](https://golang.org/pkg/) packages are allowed.
- [x] github.com/mattn/go-sqlite3
- [x] golang.org/x/crypto/bcrypt
