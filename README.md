# Comments Manager

## Project Overview
A modern React application for managing comments from the JSONPlaceholder API. This project demonstrates implementing CRUD operations, filtering, sorting, and a responsive UI with clean architecture.
## Live Demo

You can access the live demo of this project at: [Comments Manager Demo](https://comments-manager-eight.vercel.app/)

##  Steps to Run the Project Locally

Follow these steps to set up and run the project on your local machine.

### 📌 Prerequisites
Make sure you have the following installed before proceeding:
- **Node.js** (version 14 or higher) → [Download here](https://nodejs.org/)
- **Git** → [Download here](https://git-scm.com/)

### 🛠️ Installation Steps

 Open your terminal and run the following command:  
1. **Clone the repository**    
   ```sh
   git clone https://github.com/FrontEndDevAsti/comments-manager

2. **Navigate to the project directory**
     ```sh
     cd comments-manager
3. **Install dependencies**
     ```sh
     npm install          
4. **Start the development serve**
     ```sh
     npm run dev     
5. Open your browser and visit `http://localhost:5173` to view the application.  

## 🚀 Features

- **View comments** from the JSONPlaceholder API
- **Create, update, and delete** comments (simulated on client-side)
- **Search** through comments by name, email, or content
- **Sort** comments in ascending or descending order
- **Responsive design** that works on mobile, tablet, and desktop
- **Modal dialogs** for adding and editing comments
- **Confirmation dialogs** before deleting comments
- **Toast notifications** for operation feedback
- **Error handling** with user-friendly messages

## 🛠️ Technologies Used

- **React 19** - Frontend library
- **Vite** - Fast build tool and development server
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Radix UI** - Headless UI components
- **Lucide React** - Beautiful SVG icons
- **Sonner** - Toast notifications

## 🧩 Components Overview

### Main Components

- **App.tsx**: 
  - Main component that handles state management
  - Manages comments data and filtering logic
  - Handles API calls for CRUD operations
  - Renders the overall UI structure

- **CommentCard**: 
  - Displays a single comment with styling based on email
  - Provides edit and delete actions
  - Includes confirmation dialog for delete action
  - Uses gradient backgrounds for visual appeal

- **CommentDialog**: 
  - Modal form for creating or editing comments
  - Handles form validation
  - Provides feedback for invalid inputs
  - Supports both create and update operations

### UI Components (shadcn/ui)

- **Button**: Customizable button with various styles and states
- **Input**: Text input field with styling
- **Textarea**: Multi-line text input
- **Card**: Container for displaying content with header and content sections
- **Dialog**: Modal dialog for forms and information
- **AlertDialog**: Confirmation dialog with actions
- **Select**: Dropdown selection component
- **Label**: Form label component

## 🔧 Code Organization

### API Layer

The `api.ts` file contains all API-related code, including:
- API client configuration (using axios)
- Functions for fetching, creating, updating, and deleting comments
- Error handling for API requests
- Type-safe API responses

### Component Architecture

Components follow a clear separation of concerns:
- **App.tsx**: Manages state and orchestrates data flow
- **CommentCard**: Presentation component for individual comments
- **CommentDialog**: Form handling and validation for comment creation/editing

### State Management

The application uses React's built-in state management with:
- `useState` for local component state
- `useEffect` for side effects like API calls
- Props for passing data between components

### Styling Approach

The project uses Tailwind CSS with:
- Utility classes for most styling
- Component-specific styles
- Responsive design patterns
- Custom gradients for visual appeal
- Dark mode support

## 🔍 Key Features Implementation

### Comment Filtering

The application supports filtering comments by:
- Text search across name, email, and body
- Post ID filtering
- Email domain filtering
- Alphabetical sorting (A-Z and Z-A)

### Form Validation

The comment form includes validation for:
- Required fields
- Email format validation
- Instant feedback on validation errors

### Toast Notifications

User actions trigger toast notifications for:
- Successful operations (add, update)
- Error messages
- Confirmation messages (delete)

## 🐛 Troubleshooting

### Common Issues

- **API Errors**: If you see "Failed to load comments" errors, check your internet connection or try refreshing the page.
- **Form Submission Issues**: Ensure all required fields are filled out correctly.
- **Styling Issues**: If the UI looks broken, try clearing your browser cache.


