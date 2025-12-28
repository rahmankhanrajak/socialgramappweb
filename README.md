Project Overview:

This frontend application consumes a backend service that provides:

User Authentication (JWT),

Creating & Reading Posts,
Real-time Broadcast Chat (Socket.IO).

The frontend is built using React.js and communicates with the backend through REST APIs and WebSockets.

Tech Stack (Frontend):

React.js,

Axios (API requests),

Socket.IO Client,

Context API (Authentication state).

Purpose:

Secure API access using JWT (JSON Web Token).

Authentication Flow:

User logs in with email & password,

Backend validates credentials,

JWT token is returned,

Token is stored on client,

Token is sent in Authorization header for protected requests.

Posts Module:
Description:

Authenticated users can create and read posts.

