*This is a Work in Progress*

# Motivation
This app is for live streaming music from Youtube onto a mobile hybrid app, in order to play music in the background without buying the Youtube Red service. 
You can try it by installing the sample apk. Keep in mind that you will be sharing the server and API quota limits with whoever else installs the apk and thus may experience performance hits.

# Setup
___
## Prerequisites

- Ionic framework
- Node
- Bower
- Npm
- FFMPEG

## Installation 

The following below is assuming you already have Node and npm installed.

- Follow the Ionic setup instructions on their website at http://ionicframework.com/docs/guide/installation.html

- You need to install the Android dependencies if you don't have it already.

- The config.xml, www, and resources folders can be dropped into the new ionic project directory to completely replace the existing folders.

- You will need to install some cordova plugins. 
  - Cordova InAppBrowser
  - Cordova Toast
  

- Go into the Server folder and run `npm i` in the command line.

- To install ffmpeg, go to https://www.ffmpeg.org/download.html and download and install it for your OS.

- The server is independent from the www folder and must be deployed before you can use the app.

- For Heroku deployment, follow the normal heroku deployment procedure, with the exception that before pushing to heroku master, run `heroku buildpacks:add https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git`.

- After deployment, you will have to put the domain into www/app/socket/socket.js and www/app/player/playerCtrl.js 

- In addition, there is a file called Setkey.js in www/js where you will need to put in your Google Youtube API key for web app. You will need a google account to get this. In addition, you will have to add you client key and secret to www/app/sidemenuCtrl/loginSvc.

- Simply, plug your Android device into your computer and run `ionic run android` in your root Ionic project directory to install and start the app. 


# Possible Features in the Future
___
- Better UI for the player

- Create new playlists

# Issues/Bugs

Please let me know if there are any bugs or features you would like to see. I will try my best to fix them as time allows.
Thanks!


