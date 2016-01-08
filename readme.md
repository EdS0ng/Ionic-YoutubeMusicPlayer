*This is a Work in Progress*

# h1 Motivation
This app is for live streaming music from Youtube onto a mobile hybrid app, in order to play music in the background without buying the Youtube Red service. 

# Setup
___
## Prerequisites

Ionic framework
Node
Bower
Npm
FFMPEG

## Installation

The following below is assuming you already have Node and npm installed.

- Follow the Ionic setup instructions on their website at http://ionicframework.com/docs/guide/installation.html

- You need to install the Android dependencies if you don't have it already.

- The www folder can be dropped into the new ionic project directory to completely replace the existing www folder.

- You will need to install some cordova plugins. 
  - Cordova InAppBrowser
  - Cordova Toast
  

- Go into the Server folder and run `npm i` in the command line.

- To install ffmpeg, go to https://www.ffmpeg.org/download.html and download and install it for your OS.

- The server is independent from the www folder and must be deployed before you can use the app.

- For Heroku deployment, simply follow the normal heroku deployment, the Procfile will take care of installing ffmpeg.

- After deployment, you will have to put the domain into www/app/socket/socket.js and www/app/player/playerCtrl.js 

- In addition, there is a file called Setkey.js in www/js where you will need to put in your Google Youtube API key for web app. You will need a google account to get this.

- Simply, plug your Android device into your computer and run `ionic run android` in your root Ionic project directory to install and start the app. 


# Possible Features in the Future
___
- Better UI for the player

- Create new playlists

# Issues/Bugs

Please let me know if there are any bugs or features you would like to see. I will try my best to fix them as time allows.
Thanks!


