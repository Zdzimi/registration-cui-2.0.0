# RegistrationCui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## APPOINTMENT MANAGMENT APPLICATION

This is Angular front-end application that allows you to comunicate with REST API.

## About REST API

REST API allows users to schedule appointments with business representatives. The application is built using Spring Boot and utilizes Spring JPA, Spring Security, and HATEOAS. The schedule is created by specifying the start and end hours of the representative's work on a specific day, place, and duration of the visit. The planner can be created for one day or one month. The application prevents the creation of a schedule in such a way that the representative provides two visits at the same time, and that they use the same place or position. All representatives can view their calendar history through their user account. Users can cancel visits up to two days before the planned start. Additionally, the user can create a new institution with any number of places or positions, under which they can share their schedule, allowing other users to register. To use the application, a user account must be created. The system consists of a graphical interface application available from a web browser written in Angular, a Rest-api server-side application written in Spring https://github.com/Zdzimi/registration-2.0.0, and a relational database (now it working on in memory database with predefined users, representatives and institutions - csv file: https://github.com/Zdzimi/registration-2.0.0/blob/main/controller/src/main/resources/static/data.csv).

## Getting Started

To get started with the application, you'll need to have Java 11 or later installed on your machine.

To try this application run the following command to start the application in your cmd:

git clone https://github.com/Zdzimi/registration-2.0.0.git

cd registration-2.0.0/

mvn install

cd controller/target/

java -jar controller-0.0.1-SNAPSHOT.jar

To get started with the Angular front-end application you'll need to have node.js 12 or later installed on your machine. Run the following command to start the Angular front-end application in your second cmd:

git clone https://github.com/Zdzimi/registration-cui-2.0.0.git

cd registration-cui-2.0.0

npm install @angular-devkit/build-angular

ng serve -o
