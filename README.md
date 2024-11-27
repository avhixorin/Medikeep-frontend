# 🏥 MediKeep - Healthcare Management System

![MediKeep Logo](https://res.cloudinary.com/avhixorin/image/upload/v1724770946/Logo_kletrg.png)

## Table of Contents
- [🏥 MediKeep - Healthcare Management System](#-medikeep---healthcare-management-system)
  - [Table of Contents](#table-of-contents)
  - [Introduction 🚀](#introduction-)
  - [Features ✨](#features-)
    - [Patient Management 📋](#patient-management-)
    - [Appointment System 🗓️](#appointment-system-️)
    - [Medical Records Management 🩺](#medical-records-management-)
    - [User Authentication 🔐](#user-authentication-)
  - [Prerequisites ✅](#prerequisites-)
  - [Installation 🛠️](#installation-️)
  - [Project Structure](#project-structure)
  - [Technologies](#technologies)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Database](#database)
    - [Authentication](#authentication)
  - [Usage 🖥️](#usage-️)
  - [Security Considerations 🔒](#security-considerations-)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

## Introduction 🚀

Welcome to **MediKeep** 🏥—your all-in-one healthcare management solution! Designed to simplify and secure the way you handle medical records, appointments, and patient data, MediKeep combines cutting-edge technology with ease of use. ✨ 

🔒 **Secure:** Advanced encryption keeps medical histories and sensitive data safe.  
📅 **Effortless Scheduling:** Manage appointments like a pro with just a few clicks.  
👩‍⚕️ **For Everyone:** Seamlessly bridges the gap between patients and healthcare providers.  

With **MediKeep**, healthcare is smarter, faster, and always within reach. Let's transform the way you care! 🌟


## Features ✨

### Patient Management 📋
- Create, update, and delete patient profiles
- Comprehensive medical history tracking
- Secure storage of personal and medical information

### Appointment System 🗓️
- Real-time appointment scheduling
- Automated reminders and notifications
- Calendar integration
- Conflict prevention and management

### Medical Records Management 🩺
- Secure document storage
- Prescription tracking
- Test result management
- Confidential data encryption

### User Authentication 🔐
- Role-based access control
- Multi-tier user permissions
- Secure login mechanisms
- OAuth2 and JWT authentication

## Prerequisites ✅

- Node.js (v16+)
- npm or Yarn
- MongoDB Atlas Account
- Docker (optional)

## Installation 🛠️

1. Clone the repository:
```bash
git clone https://github.com/avhixorin/MediKeep.git
cd MediKeep
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

## Project Structure

```bash
   MediKeep/
    ├── frontend/
    │   ├── public/
    │   │   ├── DNA/
    │   │   └── Images/
    │   └── src/
    │       ├── assets/
    │       │   └── fonts/
    │       ├── components/
    │       │   ├── AboutUs/
    │       │   ├── AdditionalInfo/
    │       │   ├── Back-Button/
    │       │   ├── Dashboard/
    │       │   │   ├── Appointments/
    │       │   │   ├── Chat/
    │       │   │   │   └── ChatBubble/
    │       │   │   ├── HealthProfile/
    │       │   │   │   └── Activity/
    │       │   │   ├── Home/
    │       │   │   ├── LeftSideBar/
    │       │   │   ├── MedicalRecords/
    │       │   │   ├── ParentContainer/
    │       │   │   ├── Profile/
    │       │   │   │   ├── DoctorProfile/
    │       │   │   │   ├── PatientProfile/
    │       │   │   │   └── Upload/
    │       │   │   ├── RightSideBar/
    │       │   │   └── Welcome/
    │       │   ├── ErrorBoundary/
    │       │   ├── Landing-Page/
    │       │   │   ├── Benefits/
    │       │   │   ├── ContactUs/
    │       │   │   ├── Features/
    │       │   │   ├── Footer/
    │       │   │   ├── Hero-Section/
    │       │   │   ├── Navbar/
    │       │   │   └── Pricing/
    │       │   ├── LoadingScreen/
    │       │   ├── Sign-In/
    │       │   ├── Sign-Up/
    │       │   ├── TnC/
    │       │   ├── ui/
    │       │   └── UnauthorizedPage/
    │       ├── constants/
    │       ├── hooks/
    │       ├── lib/
    │       ├── redux/
    │       │   ├── features/
    │       │   ├── store/
    │       │   └── thunks/
    │       ├── types/
    │       └── utils/
    └── backend/
        ├── public/
        │   └── temp/
        └── src/
            ├── constants/
            ├── controllers/
            ├── middlewares/
            ├── models/
            │   ├── doctorModels/
            │   └── patientModels/
            ├── routes/
            ├── types/
            │   ├── doctorTypes/
            │   └── patientTypes/
            └── utils/
```

## Technologies

### Frontend
- React
- TypeScript
- Tailwind CSS
- Socket.io-client
- Redux/Context API

### Backend
- Node.js
- Express.js
- TypeScript
- Mongoose
- Socket.io

### Database
- MongoDB Atlas

### Authentication
- JWT
- OAuth2
- Bcrypt Password Hashing

## Usage 🖥️

1. Development Server:
```bash
npm run dev
```

2. Production Build:
```bash
npm run build
npm start
```

3. Docker Deployment:
```bash
docker-compose up --build
```

## Security Considerations 🔒

- Patient data encrypted at rest and in transit
- Regular security audits
- HIPAA compliance guidelines
- Comprehensive input validation
- Protection against web vulnerabilities

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/Amazingfeature`)
3. Commit changes (`git commit -m 'Add Amazingfeature'`)
4. Push to branch (`git push origin feature/Amazingfeature`)
5. Open Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

- Email: avhixorin@gmail.com
- Project Link: [MediKeep GitHub](https://github.com/avhixorin/Medikeep-frontend)
