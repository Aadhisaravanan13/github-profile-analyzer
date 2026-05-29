# GitHub Profile Analyzer API

A backend application built using Node.js, Express.js, and MySQL that analyzes GitHub user profiles using the GitHub API and stores analyzed data in a cloud MySQL database.

---

## Live Deployment

Backend API:

https://github-profile-analyzer-will.onrender.com

---

## Features

* Analyze GitHub user profiles
* Fetch repositories using GitHub API
* Calculate top programming language
* Generate developer score
* Store analyzed profiles in MySQL database
* Automatically update existing profiles
* Retrieve all analyzed profiles using REST APIs
* Cloud database integration using Aiven
* Backend deployment using Render

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* Axios
* dotenv
* CORS
* Render
* Aiven Cloud MySQL

---

## Project Structure

```bash
github-profile-analyzer/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── githubController.js
│
├── routes/
│   └── githubRoutes.js
│
├── .env.example
├── .gitignore
├── package.json
├── server.js
```

---

## API Endpoints

### Analyze GitHub Profile

GET `/api/github/analyzer/:username`

Example:

```bash
/api/github/analyzer/octocat
```

---

### Get All Profiles

GET `/api/github/profiles`

---

## Sample Response

```json
{
  "success": true,
  "data": {
    "username": "octocat",
    "name": "The Octocat",
    "followers": 18000,
    "following": 9,
    "public_repos": 8,
    "top_language": "JavaScript",
    "developer_score": 36016,
    "profile_url": "https://github.com/octocat"
  }
}
```

---

## Installation

### Clone Repository

```bash
git clone <your-github-repo-link>
```

---

### Install Dependencies

```bash
npm install
```

---

### Create Environment Variables

Create a `.env` file:

```env
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=defaultdb
DB_PORT=your_port
PORT=5000
```

---

### Start Development Server

```bash
npm run dev
```

---

## Database Schema

```sql
CREATE TABLE github_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE,
    name VARCHAR(100),
    followers INT,
    following INT,
    public_repos INT,
    top_language VARCHAR(50),
    developer_score INT,
    profile_url TEXT,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Deployment

### Backend Hosting

* Render

### Cloud Database

* Aiven MySQL

---

## Future Improvements

* Add frontend dashboard
* Add GitHub authentication
* Add profile search history
* Add repository statistics visualization
* Add API rate limit handling

---

## Author

Aadhi Saravanan
