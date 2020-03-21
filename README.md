# Voice Automated City Services (VACS)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Akeem Seymens’ & Max Stuart’s 2020 Portfolio Project (Holberton School)

VACS is an automated phone line anyone can call to find human services near them, such as free food, legal assistance, non-emergency medical help, and more.

### Contributing, Branching, & Forking

While we actively accept help, as well as encourage you to fork this repo and build it out for your city, we do not take pull requests directly to this repo - please contact us before you plan to do so. Reach out to:

max@sheltertech.org , akeem@sheltertech.org , or apply to be a core sheltertech volunteer at http://apply.sfsg.us/

### SubComponents

![Darcie-VACS Infrastructure Diagram (2020 March 20th)](misc/Darcie%20VACS%20Infrastructure.png)

_(see below headers for more information on each)_

1. Service Orchestration Engine on Google Cloud Platform (GCP) App Engine
2. Extraneous routes on GCP Cloud Functions
3. Nginx & rTail Docker containers running on a CGP Compute Engine VM
4. Frontend Landing Page hosted on GCP Storage Bucket

## 1. Service Orchestration Engine on Google Cloud Platform App Engine

 * `soe/server.js` contains all the NodeJS code that runs on the App Engine Flexible Environment
 * `soe/package.json` defines the Node environment for the App Engine
 * `soe/app.yaml` defines the VM environment for the App Engine

### `server.js` contains the routes:
 * `/event`
 * `wss://.../socket`
 * `/text_sms`

#### It is set up for GCP App Engine or local deployment, either of which require the environmental variables & secrets:
 * `private.key` Nexmo Vonage API key (phone service)
 * `google_creds.json` GCP account credentials
 * `app.yaml` App Engine setup instructions (GCP App Engine DEPLOYMENT ONLY. Sample in `example.app.yaml`)
 * `.env` NodeJS Environment Variables (LOCAL DEPLOYMENT ONLY. Sample in `example.env`)

GCP App Engine deployment is done via console commands `gcloud app deploy` ...more info TK

## 2. Extraneous routes on GCP Cloud Functions
## 3. Nginx & rTail Docker containers running on a CGP Compute Engine VM
## 4. Frontend Landing Page hosted on GCP Storage Bucket

* Visual Frontend Admin Dashboard (rTail + Express)
* Database of State Management & History (Firestore)

## Audio Frontend

#### Phone Connection, Speech-To-Text, & Text-To-Speech

The the non-visual frontend component will:

1. receive phone calls
2. play a welcome message, ask the first question, listen to the spoken response
3. convert the speech to text via google's api
4. send the converted text to the VACS-engine for parsing as well as the VACS-landingpage for display
5. receive text from VACS-engine to play as speech
6. continue to listen and repeat steps 3. through 7.

#### Forked from Nexmo + Google Cloud Speech Transcription Demo

<https://github.com/nexmo-community/voice-google-speechtotext-js>

We used this app as a base to get the transcription of a phone call using Google Speech-to-Text API.

An audio stream is sent via websocket connection to a server and then relayed to the Google streaming interface. Speech recognition is performed and the text returned to the server's console.

#### Google Speech to Text API

You will need to set up a [Google Cloud project and service account](https://cloud.google.com/speech-to-text/docs/quickstart-client-libraries).

Once these steps are completed, you will have a downloaded JSON file to set up the rest of the project.

You will need this gcloud JSON file prior to running the app, so make sure it is saved in the project folder.

## Setting Up the App (w/ your unique Environmental Variables)

In the project folder, you need to fill out:

- `.env` (example provided in `example.env`)

- `google_creds.json` (recieved from setting up the gcloud project & defined in `.env`)

- `private.key` (the key linking your Nexmo-cli to the nexmo app on their server, which recieves the calls. We'll get this from the next step)

### Linking the App to Nexmo

You will need to create a new Nexmo application in order to work with this app:

#### Create a Nexmo Application Using the Command Line Interface

Install the CLI by following [these instructions](https://github.com/Nexmo/nexmo-cli#installation). Then create a new Nexmo application that also sets up your `answer_url` and `event_url` for the app running locally on your machine.

```sh
nexmo app:create google-speech-to-text http://<your_hostname>/ncco http://<your_hostname>/event
```

This will return an application ID. Make a note of it.

Tools like [ngrok](https://ngrok.com/) are great for exposing ports on your local machine to the internet. If you haven't done this before, [check out this guide](https://www.nexmo.com/blog/2017/07/04/local-development-nexmo-ngrok-tunnel-dr/). Then put that hostname in the <your_hostname> parts of the code snippit above.

#### Link the Virtual Number to the Application

Finally, link your new number to the application you created by running:

```sh
nexmo link:app YOUR_NUMBER YOUR_APPLICATION_ID
```

## Running the App

### Using Docker (Recommended)

To run the app using Docker run the following command in your terminal from the project folder:

```sh
docker-compose up --build
```

This will create a new image with all the dependencies and run it at <http://localhost:8000.>

If it worked, you won't see much, but you can double check if the container is running by entering `docker ps`

### Alternative Local Install (using Node & NPM)

To run this on your machine you'll need an up-to-date version of Node. Visit nodejs.org for version for your OS.

First, install the dependencies by executing this from the project folder:

```sh
npm install
```

Then, start the server with:

```sh
node server.js
```

If it worked, you should see `Example app listening on port 8000!` printed to the console.

### Call it

Call the phone number you linked to your Nexmo app. There may be a slight delay the first time you call, but keep talking and if it's setup correctly you'll be watching your spoken words appear on the screen.

## Alternate Languages

If you aren't going to be working in the en-US language then you can change the language to any of the other supported languages listed in the [Google Speech to Text API documentation](https://cloud.google.com/speech-to-text/docs/languages).
