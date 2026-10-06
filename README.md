# PalmWise Advanced

## Intelligent Decision Support and Sustainability Incentive Platform for Farmers

PalmWise Advanced is a full-stack web application developed to help farmers identify and apply for suitable government agricultural schemes based on their crop, land area, and state.

The system provides a simple farmer interface for viewing eligible schemes, understanding eligibility conditions, submitting applications, and tracking application status. It also includes an officer interface for managing schemes, reviewing applications, and handling outreach tasks.

## Key Features

- Farmer registration and profile management
- Rule-based scheme eligibility evaluation
- Eligibility based on crop, land area, and state
- Display of eligible government schemes
- Detailed eligibility information
- Online scheme application
- Application status tracking
- Officer dashboard and scheme management
- Farmer application review by officers
- Outreach task management
- Tamil and English language support

## Technology Stack

**Frontend**
- React.js
- Vite
- HTML, CSS, JavaScript

**Backend**
- Java 17
- Spring Boot
- Spring Data JDBC
- REST APIs
- Maven

**Database**
- MySQL

**Tools**
- Visual Studio Code
- Git and GitHub
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

The core eligibility system uses an interface-based rule design.

```text
EligibilityRule
      |
      +-- CropEligibilityRule
      |
      +-- LandAreaEligibilityRule
      |
      +-- StateEligibilityRule
```

The farmer's profile is evaluated against these rules to determine which schemes are applicable. This approach also makes it easier to add new eligibility rules in the future.

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

## My Contribution

Developed the core application including the Spring Boot backend, REST APIs, eligibility rule engine, MySQL database integration, farmer and officer workflows, and frontend-backend integration.

## Project Workflow

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

## Academic Project

**Department of Computer Science and Engineering**
**Chennai Institute of Technology, Chennai**

**Developer:** Varun B

## Future Enhancements

* AI-based personalized scheme recommendations
* Voice-based farmer assistance
* Mobile application
* Government API integration
* SMS and notification services
* 
* Advanced analytic
