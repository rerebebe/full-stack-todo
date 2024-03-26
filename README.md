# new-mysql-auth

This is a completed version for to-do list, I used ReactJS, NodeJS,
Express, MySQL to build a basic login/register system, It includes
registering users, inserting data into a DataBase, and reading the
data to allow a login. Once users register/login in their account,
list.

# change for deploying on Heroku

for deploying on Heroku, express-session don't work, cuz heroku can't read property req.session.
so I modified it into :

1. creating session in the browser (Login.js line44)
2. Then pass the value of sesion back to backend (Todo.js line104 and index.js line218)
3. And also end the session on the front end (Todo.js line128)

ps. This method is not safe plz check storing value in the cookie, or get the sessionID not session value

issue memo-
one issue: the password can't match by `bcrypt`, turns out to be data type in MySQL's problem, the hash data was getting chopped by the column size in my db. It's correctly working now
