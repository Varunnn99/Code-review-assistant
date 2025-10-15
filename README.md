# Code Review Assistant

## 🎯 Objective
Automate code reviews by analyzing structure, readability, and best practices using AI-powered analysis with Google Gemini.

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based Authentication**: Secure login/logout with JSON Web Tokens
- **User Registration & Login**: Complete user management system
- **Protected Routes**: Authenticated users can save and view their reports
- **Anonymous Usage**: Upload and review code without registration

### 🤖 AI-Powered Code Analysis
- **Google Gemini Integration**: Uses `gemini-flash-latest` model for high-quality code reviews
- **Intelligent Analysis**: Reviews code for:
  - Readability and code structure
  - Modularity and best practices
  - Potential bugs and issues
  - Improvement suggestions
- **Multi-language Support**: Works with various programming languages (Python, JavaScript, etc.)

### 📁 File Management
- **Drag & Drop Upload**: Easy file upload interface
- **File Validation**: Secure file handling with proper validation
- **Temporary Storage**: Files are processed and cleaned up automatically

### 💾 Data Persistence
- **MySQL Database**: Robust relational database for storing user data and reports
- **Report History**: View and manage all previous code reviews
- **User-specific Data**: Each user can only access their own reports
- **Persistent Storage**: Reports are saved permanently for future reference

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Clean Interface**: Intuitive dashboard with modern styling
- **Real-time Feedback**: Loading states and error handling
- **Professional Styling**: Beautiful gradients, shadows, and animations

## 🚀 Tech Stack

### Backend
- **Node.js & Express**: RESTful API server
- **MySQL**: Relational database for data persistence
- **Sequelize ORM**: Database modeling and querying
- **JWT**: Authentication and authorization
- **Multer**: File upload handling
- **Google Generative AI**: Gemini API integration
- **bcryptjs**: Password hashing and security

### Frontend
- **React**: Modern component-based UI
- **React Router**: Client-side routing
- **Axios**: HTTP client for API communication
- **CSS3**: Modern styling with gradients and animations

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server (local or remote)
- Google AI Studio account (for Gemini API key)

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd code-review-assistant
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Environment Configuration
Create a `.env` file in the `backend` directory:
```env
# Database Configuration
DB_NAME=code_review_assistant
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost

# Gemini AI API Key
GEMINI_API_KEY=your_gemini_api_key_here

# JWT Secret for authentication
JWT_SECRET=your_strong_random_secret_here
```

### 4. Database Setup
Create MySQL database:
```sql
CREATE DATABASE code_review_assistant;
```

### 5. Start Backend Server
```bash
npm start
# Server runs on http://localhost:5000
```

### 6. Frontend Setup
```bash
cd frontend
npm install
npm start
# Frontend runs on http://localhost:3000
```

## 📖 Usage Guide

### For Anonymous Users
1. Visit http://localhost:3000
2. Upload a code file using the file picker
3. Click "Review My Code"
4. View the AI-generated code review instantly

### For Registered Users
1. **Register**: Visit http://localhost:3000/register
2. **Login**: Visit http://localhost:3000/login
3. **Upload & Review**: Upload code files and get AI reviews
4. **View History**: Access all previous reports in "Previous Reports" section
5. **Individual Reports**: Click "View" on any report to see detailed analysis
6. **Logout**: Secure logout when done

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Reports (Authenticated)
- `POST /api/review/upload` - Upload and review code (saves to database)
- `GET /api/review/reports` - Get user's report history
- `GET /api/review/reports/:id` - Get specific report by ID

### Anonymous
- `POST /api/review/anonymous-upload` - Upload and review code (no saving)

## 🗄️ Database Schema

### Users Table
- `id` (Primary Key, Auto Increment)
- `email` (Unique, Required)
- `password` (Hashed, Required)
- `createdAt`, `updatedAt` (Timestamps)

### Reports Table
- `id` (Primary Key, Auto Increment)
- `userId` (Foreign Key to Users)
- `fileName` (Required)
- `reviewContent` (Text, Required)
- `createdAt`, `updatedAt` (Timestamps)

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure authentication with expiration
- **File Validation**: Safe file upload handling
- **User Isolation**: Users can only access their own data
- **Environment Variables**: Sensitive data stored securely

## 🎥 Demo

https://drive.google.com/file/d/17NyPKRS24G9OETwGn-zF6LOdt29f5qT0/view?usp=sharing

## 📝 Development Notes

### Recent Updates
- ✅ Migrated from MongoDB to MySQL for better data consistency
- ✅ Updated to latest Gemini API models (`gemini-flash-latest`)
- ✅ Enhanced error handling and logging
- ✅ Improved UI/UX with modern styling
- ✅ Added comprehensive debugging and monitoring

### Future Enhancements
- [ ] Support for more file types
- [ ] Batch file processing
- [ ] Export reports as PDF
- [ ] Team collaboration features
- [ ] Code quality metrics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
