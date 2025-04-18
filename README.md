# Configuration Guide  

## 🔑 Environment Variables (.env)  

Add the following environment variables to a `.env` file located at the **top level** of the backend folder (same level as `app.js`):  

```js
   JWT_KEY=****;
   EXPRESS_SESSION_SECRET=*****
```


## 🗄️ Database Configuration  

To configure MongoDB, navigate to:  


Edit the file and update your MongoDB connection string:  

```json
{
    "MONGODB_URI": "mongodb://127.0.0.1:27017/your-db-name" //add your connections string
}
```
Let me know if you need any modifications! 🚀
