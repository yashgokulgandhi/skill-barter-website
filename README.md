# SkillBarter: A Money-Free Skill Exchange Platform

**Created by:**  
Yash Gokulgandhi, Jenil Barot

---

## Overview

SkillBarter is a collaborative platform that connects users for skill exchange—without the need for monetary transactions. The platform streamlines the process of matching individuals with complementary skills, facilitating a structured, secure, and engaging way to collaborate and exchange expertise.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture & Technologies](#architecture--technologies)
- [Setup & Installation](#setup--installation)
- [Project Planning & Milestones](#project-planning--milestones)
- [Limitations & Future Enhancements](#limitations--future-enhancements)
- [License](#license)
- [Contact](#contact)

---

## Features

- **Skill-Based Matching:** Quickly find individuals with complementary skills.
- **Task Request & Tracking:** Post requests and monitor the status of your tasks.
- **Real-Time Messaging:** Communicate securely and instantly with other users.
- **User Dashboard & Profile Management:** Manage your skills, tasks, and interactions through an intuitive user interface.
- **Dedicated Exchange Section:** Organize and manage your ongoing skill exchange tasks.

---

## Architecture & Technologies

**Frontend:**  
- Built using **React** for a responsive, modular, and dynamic user interface.

**Backend:**  
- Developed with **Spring Boot** to handle RESTful API services and business logic.

**Database:**  
- Utilizes **MySQL** to store user data, task information, and messaging records efficiently.

**Development & Testing Tools:**  
- **VS Code** for frontend development  
- **IntelliJ IDEA** for backend development  
- **MySQL Workbench** for database management  
- **Postman** for API testing

---

## Setup & Installation

### Prerequisites

- **Node.js & npm:** For running the React application.
- **Java JDK:** For Spring Boot.
- **MySQL:** For the database.
- **Maven:** For building the backend.

### Installation Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yashgokulgandhi/skill-barter-website.git
   cd skill-barter-website
   ```

2. **Setting Up the Backend:**

   - Navigate to the backend directory.
   - Update your `application.properties` with your MySQL database credentials.
   - Build and run the Spring Boot application using Maven:

     ```bash
     mvn clean install
     mvn spring-boot:run
     ```

3. **Setting Up the Frontend:**

   - Navigate to the frontend directory.
   - Install the necessary dependencies:

     ```bash
     npm install
     ```

   - Start the React application:

     ```bash
     npm run dev
     ```

4. **Database Setup:**

   - Use MySQL Workbench or your preferred MySQL client to create the database.
   - Run the provided SQL scripts (if available) to set up the necessary tables and seed initial data.

---

## Project Planning & Milestones

The development of SkillBarter was approached using an agile methodology with the following phases:

1. **Requirement Analysis:** Identifying user needs and system requirements.
2. **Design:** Crafting UI/UX designs and defining system architecture.
3. **Frontend & Backend Development:** Simultaneously developing the interface and the server-side logic.
4. **Database Setup:** Structuring the database for optimal data management.
5. **WebSocket Integration:** Implementing real-time chat functionality.
6. **Testing & Deployment:** Conducting both black-box and white-box testing to ensure quality before deployment.

---

## Limitations & Future Enhancements

### Current Limitations

- **Chat Functionality:** Basic real-time messaging without multimedia support.
- **User Verification:** Limited verification mechanisms.
- **Matching Algorithm:** Basic algorithm that could be enhanced.

### Future Enhancements

- **Enhanced Chat:** Incorporate multimedia support and file sharing.
- **Advanced Matching:** Integrate AI-based matching algorithms for improved accuracy.
- **Mobile Application:** Develop native apps for iOS and Android.
- **Multi-language Support:** Expand usability to non-English speaking users.
- **Improved Verification:** Strengthen user verification processes for enhanced security.


---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions, feedback, or contributions, please reach out via:

- **Email:** [yashgokulgandhi6@gmail.com](yashgokulgandhi6@gmail.com)
- **GitHub Issues:** Open an issue in the [GitHub repository](https://github.com/yashgokulgandhi/skill-barter-website/issues).

---

*Thank you for checking out SkillBarter! Let’s build a collaborative, money-free skill exchange community together.*

