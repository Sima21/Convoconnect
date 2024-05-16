# ConvoConnect

## Overview

ConvoConnect is a video conferencing platform developed as a DevOps project that incorporates technologies and methodologies. It utilizes Jitsi Meet for real-time communication and integrates Authentik for user authentication, showcasing a modern, scalable application built on Amazon EKS.

## Features

- **Authentik Integration**: Secure user authentication ensuring flexibility and security.
- **Jitsi Meet**: High-quality video conferencing embedded within the application.
- **Group Management**: Enables creation and management of user groups for organized communications.
- **Dashboard**: Personalized user dashboard displaying scheduled meetings and active groups.

## Technologies

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **CI/CD**: GitLab CI/CD pipelines
- **Containerization**: Docker, managed on Amazon EKS
- **Monitoring**: Prometheus and Grafana

## Setup

### Prerequisites

- Docker
- Node.js
- Git

### Installation

```bash
git clone https://gitlab.com/mj26143118/convoconnect.git
cd convoconnect
docker-compose up --build
Visit http://localhost:3000 to access the platform.

