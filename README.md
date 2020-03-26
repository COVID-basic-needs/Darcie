# Darcie: A Voice Assistant for City Services (VACS)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Akeem Seymens’ & Max Stuart’s 2020 Portfolio Project (Holberton School)

Darcie is an automated phone line anyone can call to find human services near them, such as free food, legal assistance, non-emergency medical help, and more.

Read more and watch a live stream of the conversations at [darcie.me](http://darcie.me)

### COVID-19 Update

Darcie was intended to pull from all services listed in the [SF Service Guide](https://sfserviceguide.org), however in the current times the format of the data in that database (a.k.a. [AskDarcel on github](https://github.com/sheltertechsf/askdarcel-api)) made it hard to keep the information up to date with service hours & offerings changing.

We pivoted Darcie to pull from a seperate Algolia index which consists of all hygiene stations & places handing out food in SF. The dialog & webhook have been adopted accordingly.

### Contributing, Branching, & Forking

While we actively accept help, as well as encourage you to fork this repo and build it out for your city, we do not take pull requests directly to this repo - please contact us before you plan to do so. Reach out to:

max@sheltertech.org , akeem@sheltertech.org , or apply to be a core sheltertech volunteer at [apply.sfsg.us](http://apply.sfsg.us)

# Components & Infrastructure

![Darcie-VACS Infrastructure Diagram (2020 March 20th)](misc/Darcie%20VACS%20Infrastructure.png)

0. [Overall Information Flow](#0-overall-information-flow)
1. [GCP App Engine: Service Orchestration Engine](#1-gcp-app-engine-service-orchestration-engine)
2. [GCP Cloud Functions: Extraneous Routes](#2-gcp-cloud-functions-extraneous-routes)
3. [GCP Compute Engine VM: Nginx & rTail Docker containers](#3-gcp-compute-engine-vm-nginx--rtail-docker-containers)
4. [GCP Storage Bucket: Darcie.me Landing Page](#4-gcp-storage-bucket-darcieme-landing-page)
5. [IBM Watson Dialog](#5-ibm-watson-dialog)
6. [Algolia Index (Temporary COVID-19 Database)](#6-algolia-index-temporary-covid-19-database)

_(GCP = Google Cloud Platform)_

## 0. Overall Information Flow

### A. Audio Frontend

#### Phone Connection > Speech-To-Text > IBM Watson > Text-To-Speech > Phone Connection

0. Someone calls the Vonage Nexmo number
1. the Nexmo API queries the `/ncco` watson_webhook Cloud Function for further instructions
2. the App Engine receives the phone call via websocket
3. the App Engine prompts IBM Watson to start a new conversation session
4. IBM Watson returns the welcome message which includes asking the first question
5. the App Engine sends the text to the Nexmo API to play as speech
6. the App Engine listens to the spoken response
7. the App Engine converts the speech to text via Google's STT API
8. the App Engine sends the text to both IBM Watson for parsing as well as the rTail server for display
  * IBM Watson queries the Watson Webhook Cloud Function at appropriate stages in the conversation
  * if called, the Watson Webhook queries the Algolia Index and Google Maps API for information
9. IBM Watson sends response text to the App Engine
10. the App Engine repeats step 5. and continues to listen & repeat the remaining steps until the user chooses to have a text SMS sent to them, after confirming or collecting the phone number IBM Watson queries the Watson Webhook to format the text message which sends the text to the App Engine for routing to Nexmo.

### B. Landing Page

#### Static Files & rTail Embed

When a user visits [darcie.me](http://darcie.me) the GCP DNS & Load Balancer serve the static content from the Cloud Storage Bucket.

Output from live phone calls is displayed in the rTail web app embedded in that darcie landingpage. The complete rTail web app is viewable at [darcel.rocks](https://darcel.rocks) - the server running it is containerized on a GCP Compute Engine VM along with Nginx to allow for SSL & appropriate routing.

## 1. GCP App Engine: Service Orchestration Engine

 * `soe/server.js` contains all the NodeJS code that runs on the App Engine Flexible Environment
 * `soe/package.json` defines the Node environment for the App Engine
 * `soe/app.yaml` defines the VM environment for the App Engine

### `server.js` contains the routes:
 * `/event`
 * `wss://.../socket`
 * `/text_sms`

#### Forked from Nexmo + Google Cloud Speech Transcription Demo

<https://github.com/nexmo-community/voice-google-speechtotext-js>

We used the demo app as a base to get the transcription of a Nexmo phone call using Google Speech-to-Text API.

An audio stream is sent via websocket connection to the App Engine server and then relayed to the Google streaming interface. Speech recognition is performed and the text returned to the App Engine.

#### Setup for either GCP App Engine or local deployment requires environmental variables & secrets:

* `private.key` Vonage Nexmo API key (phone service)
  * This is the key linking the Nexmo-cli to the nexmo app on their server, which recieves the calls
  * visit https://dashboard.nexmo.com/sign-up and start a trial
  * create a new Nexmo application to get a phone_number, app_id, api_secret, & api_key. if you do so via the dashboard, put the app's `answer_url` (`/ncco`) and `event_url` (`/events`) into the Nexmo dashboard for your application
  * alternatively, if you can set it up via the CLI, [instructions here](https://github.com/nexmo-community/voice-google-speechtotext-js#linking-the-app-to-nexmo)
* `google_creds.json` GCP account credentials
  * You will need to set up a [Google Cloud project and service account](https://cloud.google.com/speech-to-text/docs/quickstart-client-libraries).
  * Once these steps are completed, you will have a downloaded JSON file to set up the rest of the project.
  * You will need this gcloud JSON file prior to running the app, so make sure it is saved in the project folder.
* `app.yaml` App Engine setup instructions
  * GCP App Engine DEPLOYMENT ONLY
  * Sample in `example.app.yaml`
* `.env` NodeJS Environment Variables
  * LOCAL DEPLOYMENT ONLY
  * Sample in `example.env`

__GCP App Engine deployment__ is done via console commands. Ensure you have installed `gcloud` and are logged in as a member of the team with appropriate permissions. Then, from within `soe/`, run `gcloud app deploy`

__Local testing/development deployment__ is done via `npm`. Ensure you have `node` and `npm` installed, then run:

```sh
$ NODE_ENV=development npm install
$ NODE_ENV=development npm start
```

Tools like [ngrok](https://ngrok.com/) are great for exposing ports on your local machine to the internet. If you haven't done this before, [check out Nexmo's ngrok guide](https://www.nexmo.com/blog/2017/07/04/local-development-nexmo-ngrok-tunnel-dr/). Then put that hostname in the corresponding routes in the Nexmo application.

## 2. GCP Cloud Functions: Extraneous Routes

### `soe/ncco.js`

see this file for more info

### `soe/watson_webhook.js`

see this file for more info

## 3. GCP Compute Engine VM: Nginx & rTail Docker containers

Two Docker containers are on one Container-Optimized OS Virtual Machine where [darcel.rocks](https://darcel.rocks) is pointed.

The Nginx Dockerfile is stock from [Docker Hub](https://hub.docker.io), its config is in `nginx.conf`.

The rTail Dockerfile is in `rtail-server/Dockerfile`, its config is setup in the dockerfile.

Contact [Max](mailto:max@sheltertech.org) if you need to know more or adjust that component.

## 4. GCP Storage Bucket: [Darcie.me](http://darcie.me) Landing Page

### Forked from Evelyn landing page template

#### Getting started

* First, ensure that node.js & npm are both installed. If not, choose your OS and installation method from [this page](https://nodejs.org/en/download/package-manager/) and follow the instructions.
* Next, use your command line to enter your project directory.
* This template comes with a ready-to-use package file called `package-sample.json`. You just need to rename it to `package.json`, then run `npm install` to install all of the dependencies into your project.

You're ready to go! Run any task by typing `npm run task` (where "task" is the name of the task in the `"scripts"` object). The most useful task for rapid development is `watch`. It will start a new server, open up a browser and watch for any SCSS or JS changes in the `src` directory; once it compiles those changes, the browser will automatically inject the changed file(s)!

#### Deploying for Darcie.me

Once the updated files have been built locally, you can drag and drop `evelyn/index.html` and `evelyn/dist/` into the GCP Storage Bucket for the project

## 5. IBM Watson Dialog

Two Watson Assistants are on the Holberton School account, the [main one being here](https://us-south.assistant.watson.cloud.ibm.com/us-south/crn:v1:bluemix:public:conversation:us-south:a~2F4b9a11ac9e3a45bfb3895225fc9928bc:f5024ab3-c109-4054-991b-d6c099af72c2::/skills/04953d55-d382-443e-9bdf-7b14234fcc05/build/dialog)

If forking and creating your own you can sign up at https://www.ibm.com/cloud/watson-assistant/

## 6. Algolia Index (Temporary COVID-19 Database)

We currently push JSON data gathered from APIs and web scraping San Francisco services still operating during COVID directly to an Algolia index for the project.

If you'd like to help, contact [Max](mailto:max@sheltertech.org).

If forking and creating your own you can sign up at https://www.algolia.com/users/sign_up

## Wishlist:

* API for pulling from the database of call history (Firestore)
* Visual Frontend Admin Dashboard (GCP Monitoring & call history metrics)

## Running the App

### Connecting Necessary Components

Depending on what part you're testing/changing/developing, you may or may not need to connect everything - pick and choose from the setup instructions in the preceding numbered sections.

### Call it

Call the phone number you linked to your Nexmo app. There may be a slight delay the first time you call, but keep talking and if it's setup correctly you'll be watching your spoken words appear on the screen.

## Alternate Languages

If you aren't going to be working in the en-US language then you can change the language to any of the other supported languages listed in the [Google Speech to Text API documentation](https://cloud.google.com/speech-to-text/docs/languages).
