# Project 3 - Reverb

## Project Description

Reverb (styled as ReverB) is an upcoming social media app designed for Revature employees that emphasizes personal connectivity by echoing professional growth. Users can create profiles where they can post images and create messages that resonate with their experience and insight. Users can also view and comment on posts from other profiles, and “reverb” (like) posts that reverberate with them.

## Technologies Used

- Java
- Spring Boot
- Spring Data
- Spring Framework
- Firebase Authentication
- React Typescript
- React Redux
- React Bootstrap
- HTML/CSS
- Jenkins
- Docker
- Git
- Maven

## Features

- Users can register and log in
- Users can edit their personal profile including a picture and bio
- Users can create posts on their profile including images and text
- Users can view a feed of posts from other profiles
- Users can comment on posts
- Users can "reverb" (like) comments and posts
- Sessions are managed using Firebase

## Getting Started

- Install JDK 8, Maven, Git, and NPM.
- Create a Firebase account, and a new Firebase project, with no Google Analytics.
- Enable email/password as sign in provider.
- Add a web app to the Firebase project.
- Clone the front-end and back-end using the following commands:
- - git clone https://github.com/Revature-Reverb-2/React-Social-Client
- - git clone https://github.com/Revature-Reverb-2/React-Social-Server
- - DEVIATION: At this point, you need to checkout to the dev branch to run locally. Otherwise, you'll need to launch to an Elastic Beanstalk
- Enter the your Firebase project’s web app’s settings and copy the configuration properties into the front-end’s firebase.ts file.
- In the same settings, on the 'service provider' tab, click on 'generate new private key.' Copy the contents of that key into the back-end’s firebase_config.json file.
- In backend/src/main/resources, edit the applications.property file to have the correct spring.datasource parameters to the desired database.
- Run Maven Update either within an IDE (having imported the back-end as a Maven project) or using the following command in the back-end directory:
- - mvn clean install -U
- Start the back-end as a Spring Boot Application within an IDE or using the following command in the back-end directory:
- - mvn spring-boot:run
- Install front-end dependencies using the command:
- - npm install --legacy-peer-deps
- Setup an S3 bucket for profile picture uploads.
- - Create a user with the add user feature of IAM
- - Check the user's access type 'Programatic access'
- - Add permissions to the user
- - Press 'Attach existing policy directly'
- - Search for 'S3' and choose 'AmazonS3FullAccess'
- - Presss 'next' and 'Create User'
- - Click on 'Download.csv' to get the keys for this user.
- - Place these into a 'application-S3.yml' in the resources directory with the...
- - endpointURL , accessKey , secretKey , and bucketName
- Follow either Local or AWS Deployment instructions.

# Local

- Switch to the dev branch of the client and server using the following command:
- - git checkout dev
- Run the following comamnd in the directory of the server to install your dependencies:
- - mvn clean install -U
- Start the server using the following command in the server directory:
- - mvn spring-boot:run
- Launch the client using the following command inside of the client's directory:
- - npm start

# AWS Deployment

- Back-end
- Setup an Elastic Beanstalk that uses Coretto 8 that will take our jar file and deploy it to an EC2 automatically.
- Source stage for the API needs to take a source from the Reverb server GitHub repo at main.
- In the build stage, use the following build setup. This build setup will give us an artifact that can be deployed in our deploy stage.
- - version: 0.2
- -
- - phases:
- - install:
- -     runtime-versions:
- -
- -       # Correto is basically Amazon's in-house version of Java that they maintain. It is
- -       # compatible with projects built using native Java (match versions).
- -       java: corretto8
- -
- - pre_build:
- -     commands:
- -
- -       # Grab properties file from S3 bucket prior to project build
- -       - aws s3 cp s3://reverb-resources-bucket/application-dev.yml ./src/main/resources/application-dev.yml
- -       - aws s3 cp s3://reverb-resources-bucket/firebase_config.json ./src/main/resources/firebase_config.json
- -
- - build:
- -     commands:
- -
- -       # Build the project
- -       - mvn clean package -Dspring.profiles.active=test
- -
- - post_build:
- -     commands:
- -
- -       - mv target/*.jar ./reverbAPI.jar
- -
- - #Declare build artifacts to be passed to the next stage of the pipeline
- - artifacts:
- - files:
- -     - reverbAPI.jar
- - name: artifact
- In our deploy stage, that jar file we just created is deployed to our Elastic Beanstalk using Coretto 8.
- Note the url that we have here.

- Front-end
- Setup an S3 bucket for the UI side with static web hosting enabled.
- Use a find and replace functionality to find any mention of 'localhost' or 'elasticbeanstalk' and replace those full url's with the appropriate new url for the API you just made.
- Source stage for the UI needs to take a source from the Reverb client GitHub repository at main.
- In the build stage, use the following build setup which should install Node.js, and then uses the command 'nmp install' to install the dependencies needed for the UI side. It then runs npm run-script build which gives us a build folder that gives us an index.html artifact that we will deploy during the deploy stage.
- - version: 0.2
- -
- - phases:
- - install:
- -     runtime-versions:
- -       nodejs: 14
- -
- -     commands:
- -        # install npm
- -         -n 16
- 
- - pre build:
-     commands:
-       -npm install
-       -aws s3 cp s3://reverb-ui-resources/firebase.ts ./src/firebase.ts

- 
- - build:
- -     commands:
- -       # run build script
- -       -npm run build
- -         
- -   
- - artifacts:
- -   files:
-         - "*/"

- - - 
- - base-directory: 'build'
- During the deploy stage, index.html file is deployed to the s3 bucket with static webhosting enabled.
- You should now be able to connect to the UI at the url of your s3 bucket.

## Usage

Using the social media app should be intuitive and easy.
