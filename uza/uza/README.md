# React + Vite

# Product Recommendation System

## Table of Contents
- [Features](#features)
- [How It Works](#how-it-works)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Extending the System](#extending-the-system)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features
- Real-time product recommendations
- TF-IDF vectorization for semantic similarity
- Personalized message generation
- View history tracking
- Modular design for easy extension

## How It Works

### Data Representation
- Each product is represented by:
  - Name
  - Category
  - Tags
- These attributes are combined into a text string for TF-IDF vectorization

### Recommendation Process
1. When a user views products:
   - Their IDs are sent to the backend
2. Backend processing:
   - Calculates an average vector of the viewed products
   - Finds products with highest cosine similarity to this average
   - Applies filters if specified by the user

### Personalized Message Generation
- System analyzes viewed product categories and tags
- Generates a contextually appropriate recommendation message

### Tracking
- All recommendation events are logged with timestamps
- Data can be used for:
  - Analytics
  - Recommendation algorithm improvements

## Prerequisites
- Node.js v16+ (for frontend)
- Python 3.8+ (for backend)
- npm/yarn/pnpm
- pip (Python package manager)

## Installation

Backend
bash
cd backend
pip install -r requirements.txt

## Running the Application
# Start Backend
bash
cd uza_backend
python app.py
### Start Frontend (in another terminal)
## bash
** cd uza
npm run dev
Access the application at:
http://localhost:5174

## Analytics
Track recommendation click-through rates

Implement A/B testing for different recommendation strategies

## Contributing
Fork the repository

Create a feature branch (git checkout -b feature/your-feature)

Commit your changes (git commit -m 'Add some feature')

Push to the branch (git push origin feature/your-feature)

Open a Pull Request

## License
MIT License - See LICENSE for details