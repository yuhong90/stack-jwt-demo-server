# stack-jwt-demo-server

This repo contains a demo api server using JWT auth for its protected apis, implemented with ReactJS, NodeJS, Express, for STACK Developer Conference 2018.

## Setup
- Restore depedencies with `npm install`
- Start running server with `npm start`
- Test the application quiz UI with `http://localhost:3001`. The app will poll `/api/answer` api for updates to guess attempts.

## Structure
- `~/app` contains the React app and frontend assets
- `~/server` contains the express server and its apis

## Exercise
Answer the quiz riddle with your JWT token in a cookie(named jwt).
- POST your guesses to `/api/answers` with JWT token that includes the following:
    - iss: 'stackconf-auth-service'
    - aud: 'stackconf-api-service'
    - sub: *'your name'*
    - ans: *'your answer'*