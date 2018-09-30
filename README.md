# stack-jwt-demo-server

This repo contains a demo api resource server using JWT auth for its protected apis, implemented with ReactJS, NodeJS, Express, for STACK Developer Conference 2018.

## Setup
- Restore depedencies with `npm install`
- Start running server with `npm start`
- Test the application with `http://localhost:3001`. The app will poll `/api/park/entries` api for updates to show who has successfully completed workshop.

## Structure
- `~/app` contains the React app and frontend assets
- `~/server` contains the express server and its apis

## Exercise
Participants will try to generate a JWT token on their local machines and try to post the token generated to this demo api resource server to access its resources.


To successfully POST to `/api/park/entries` (to gain entry to the amusement park), the attached JWT token (park ticket) must include the following:

    - iss: 'stackconf-auth-service'
    - aud: 'stackconf-api-service'
    - sub: *'your name'*
    - type: *'vip-ticket'*


This exercise aims to showcase an example of a token-based stateless authentication mechanism. All required authorisation and session information are generated and encoded into the JWT medium by an authorisation server. This JWT access token is then sent along with requests to a separate resource server. The resource server verifies the token's signature and expiry and derives the identity of the user and permissions from the tamper-proof token to determine if the request should be fulfilled or rejected.