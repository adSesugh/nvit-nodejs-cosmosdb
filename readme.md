## Nodejs and COSMOS DB API
The focus of the API is to demostrate how to create a forgot password with Cosmos DB with a requirement below in mind.

1. Check email if exist then send reset link
2. Otherwise send no account found on the email

Payload
- email

### Usage
1. Clone the repo
2. Change into the root directory and run `npm install`
3. Make copy of `.env` from `.env.example` using `cp .env.example .env`. Ensure your add all the environment variables accordingly. 
4. To start the app, run `npm start` or `npm run dev`
5. Browse `http://localhost:5000/docs` to visit the swagger implementation of the api and interact with there.

