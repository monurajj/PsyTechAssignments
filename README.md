# PsytechStocks
Name : Monu Kumar
Email : monu.k23csaimo@nst.rishihood.edu.in


Links :

*Live Frontend: [PsytechStocks Frontend](https://psy-tech-assignments.vercel.app/)
*Frontend Repository: [GitHub](https://github.com/monurajj/PsyTechAssignments)
*Live Backend: [PsytechStocks Backend](https://psytech-backend-server.vercel.app/)
*Backend Repository: [GitHub](https://github.com/monurajj/PsyTechBackend)



PsytechStocks is a full-stack web application designed to provide retail investors with tools to analyze stocks, generate stock pitches, and interact with AI for stock-related insights. The application also features user authentication for saving/bookmarking stock pitches for future reference.

## Features
### 1. Home Page
*Purpose**: Introduces the company and its services.
*Options**: 
  - Navigate to different sections such as **Stock Analysis**, **About**, **Chat Support**, **Sign In**, and **Sign Up**.
  - A CTA: "Get Your Stock Insights with Our AI Chat Support."

### 2. Stock Analysis
- **Search and Select**: Users can search for stocks by their symbol (e.g., AAPL, TSLA).
- **Stock Details**: Displays financial metrics such as:
  - P/E ratio
  - EPS
  - Market Cap
  - Dividend Yield
- **Historical Performance**: Graphical representation of stock performance over the past year using Chart.js.
- **Stock Pitch Generation**: Generates a concise stock pitch based on:
  - Financial health and growth potential.
  - Key risks derived from market data or sentiment analysis.
- **Bookmark Pitches**: Allows logged-in users to save generated pitches for later.

### 3. AI Stock Predictor
- **AI Chat Support**: Powered by the Gemini API, this feature:
  - Answers user queries about stock performance.
  - Provides AI-powered predictions and sentiment analysis.

### 4. Authentication
- **Sign Up and Sign In**: Users can create an account or log in to:
  - Save stock pitches.
  - Access personalized features.
- **Bookmark Management**: Saved pitches can be retrieved later.

### 5. Chat Support
- Offers real-time AI chat for stock-related help and suggestions.

### 6. Footer
- Includes navigation links and contact details.


## Tech Stack
### Frontend
- **Framework**: React
- **Styling**: Tailwind CSS
- **Graph Visualization**: Chart.js
- **Hosting**: Vercel

### Backend
- **Runtime**: Node.js
- **Database**: MongoDB
- **Hosting**: Vercel


## Project Structure
### Frontend
src/ ├── AiStockAnalyser/ │ └── AiStockPredictor 
    ├── assets/ 
    ├── Authentication/ 
                │ ├── login │ 
                └── signup 
    ├── chatsupport/ 
    ├── components/ 
            │ ├── aboutpage │ 
            ├── footer │ 
            ├── homepage │ 
            ├── navbar 
            │ └── StockDetails 
            ├── toast/ 
            │ └── pitchData

### Backend
    AllApis/ 
        ├── Allroutes/ 
        ├── Middleware/ 
    ├── Schemas/ 
        │ └── schema.js 
    index.js

## Installation and Setup

### Prerequisites
- Node.js
- MongoDB
- Git

### Steps to Run Locally
1. Clone the repositories:
   ```bash
   git clone https://github.com/monurajj/PsyTechAssignments.git
   git clone https://github.com/monurajj/PsyTechBackend.git


API Details
Gemini API: Used for AI chat support and stock insights.
MongoDB Schema:
json
Copy code
{
  "_id": "6752c2f78d581f7b2cf9e44e",
  "email": "test@example11.com",
  "password": "$2a$10$vDyjXIdf9AgJew1ZNZX3bugYDoAFX64ls5nnxqf.FwjEunmxE7R2C",
  "bookmarks": [],
  "__v": 0
}

Future Enhancements
Fully integrate real-time data from the stock API.
Fix AI prediction errors.
Complete the bookmarking functionality.
Add additional charts and insights for more comprehensive stock analysis.