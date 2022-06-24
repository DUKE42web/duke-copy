---
cover: ../.gitbook/assets/Screen Shot 2022-01-26 at 8.58.58 AM.png
coverY: 417.192082111437
---

# ⚙ SETUP

This section outlines getting the application (for the JSS public site) setup for development.

1.  Get the repo
    1. cd to where you keep your repos
    2. clone the project from https:
       //bitbucketp.duke-energy.com/scm/deux/dxt-jss-public-playground.git 1. In your terminal (command line), run `git clone https: //bitbucketp.duke-energy.com/scm/deux/dxt-jss-public-playground.git`
2.  Install dependencies
    1. Use node -v `14+`
    2. Set npm registry to Nexus (prod)\* 1. run `npm config set registry https: //nexus.duke-energy.com/repository/duke-cne-npm/` on the command line
    3. Run `npm install` on the command line
3.  Setup .jssconfig and .env

    1.  Add `scjssconfig.json` file (or rename scjssconfig-sample.json → scjssconfig.json)

              1. Add:

                 ```
                 {
                   "sitecore": {
                     "instancePath": "",
                     "apiKey": "{9F777224-3275-4D56-BD29-371FB3C00821}",
                     "deploySecret": "",
                     "deployUrl": "",
                     "layoutServiceHost": "https:

        //scjsstest.duke-energy.com"
        }
        }

        ```

        ```

4.  Add `.env` file (or rename `.env-sample` → .env)

    1.  Add:

              ```
              HTTPS=true
              ```

              This will allow you to use `https:

        //` for development so that jurisdiction cookies will work properly.

5.  Setup your `.hosts` file
    1. We need to set the local IP to `local.duke-energy.com` so we can use cookies set by the `.duke-energy.com` domain.
    2. On the command line, run `sudo vim /etc/hosts`
    3. Add a new line and enter `127.0.0.1 local.duke-energy.com`
    4. Press `Esc` key and then `:x` to save and exit
6.  Start the project for development.
    1. Inside the project, run `npm run start:connected` on the command line.
    2. After the app successfully starts up, change the URL to `https: //local.duke-energy.com:3000/home`.
7.  Do some cool stuff

**\*Why are we using Nexus rather than npm for package installs?**

@de-electron is a scoped npm package for [Electron Design System](https:
//electron.duke-energy.com) dependencies which lives in Nexus, Duke Energy's private internal package repository. You can use Nexus to install all necessary npm packages for the project.
