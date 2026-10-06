````markdown
# PalmWise Advanced

## Intelligent Decision Support and Sustainability Incentive Platform for Farmers

PalmWise Advanced is a full-stack web application developed to help farmers identify and apply for suitable government agricultural schemes based on their crop, land area, and state.

The platform provides a farmer portal for profile management, scheme eligibility, applications, and status tracking, along with an officer portal for scheme management, application review, and outreach task management.

## Key Features

- Farmer registration and login
- Farmer profile management
- Rule-based scheme eligibility evaluation
- Eligibility based on crop, land area, and state
- Display of eligible government schemes
- Detailed eligibility information
- Online scheme application
- Application status tracking
- Officer dashboard
- Government scheme management
- Farmer application review
- Outreach task management
- Tamil and English language support

## Technology Stack

### Frontend
- React.js
- Vite
- HTML
- CSS
- JavaScript

### Backend
- Java 17
- Spring Boot
- Spring Data JDBC
- REST APIs
- Maven

### Database
- MySQL

### Tools
- Visual Studio Code
- Git
- GitHub
- Postman
- MySQL Workbench

## System Architecture

```text
React + Vite
     |
     | REST API
     v
Spring Boot
     |
     v
Controller Layer
     |
     v
Service Layer
     |
     v
Eligibility Rules
     |
     v
Repository Layer
     |
     v
MySQL Database
````

## Eligibility Engine

The eligibility system uses an interface-based rule design:

```text
EligibilityRule
      |
      +-- CropEligibilityRule
      |
      +-- LandAreaEligibilityRule
      |
      +-- StateEligibilityRule
```

The farmer's profile is evaluated against these rules to determine the schemes for which the farmer is eligible. The rule-based design also allows additional eligibility conditions to be added in the future.

## Java Concepts Applied

The project demonstrates practical implementation of:

* Object-Oriented Programming
* Encapsulation
* Abstraction
* Interfaces and Polymorphism
* Constructors and Methods
* Collections and Generics
* Exception Handling
* Stream API
* JDBC and Repository-based data access

## Application Workflow

```text
Farmer Profile
      |
      v
Eligibility Evaluation
      |
      v
Eligible Schemes
      |
      v
Application Submission
      |
      v
Officer Review
      |
      v
Application Status
```

## My Contribution

Developed the core application including the Spring Boot backend, REST APIs, eligibility rule engine, MySQL database integration, farmer and officer workflows, and frontend-backend integration.

## Project Structure

```text
PalmWise_Advanced/
|
+-- frontend/
|   +-- src/
|   +-- public/
|
+-- src/
|   +-- main/
|   |   +-- java/
|   |       +-- controller/
|   |       +-- model/
|   |       +-- repository/
|   |       +-- rules/
|   |       +-- service/
|   |
|   +-- test/
|
+-- pom.xml
+-- mvnw
+-- mvnw.cmd
+-- test.http
+-- README.md
```

## Future Enhancements

* AI-based personalized scheme recommendations
* Voice-based farmer assistance
* Mobile application
* Government API integration
* SMS and notification services
* Advanced analytics

## Academic Project

**Department of Computer Science and Engineering**
**Chennai Institute of Technology, Chennai**

**Developer:** Varun B

```
```
