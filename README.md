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
  - Navigate to different sections such as **Stock Analysis**,**Try Financial Modeling
**,  **About**, **Chat Support**, **Sign In**, and **Sign Up**.
  - A CTA: "Get Your Stock Insights with Our AI Chat Support."

### 2. Stock Analysis
- **Select**: Users can search for stocks by their symbol (e.g., AAPL, TSLA).
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

### 3. Try Financial Modeling
- **Users can calculate EBITDA, Profit Margin, Cash Flow and Cash Flow Projection:
  - User have to provide some data related to Revenue, COGS, OPEX, Taxes.
  - As a result they will get their EBITDA, Profit Margin, Cash Flow and Cash Flow Projection details .

### 4. AI Stock Predictor
- **AI Chat Support**: Powered by the Gemini API, this feature:
  - Answers user queries about stock performance.
  - Provides AI-powered predictions and sentiment analysis.

### 5. Authentication
- **Sign Up and Sign In**: Users can create an account or log in to:
  - Save stock pitches.
  - Access personalized features.
- **Bookmark Management**: Saved pitches can be retrieved later.

### 6. Chat Support
- Offers real-time AI chat for stock-related help and suggestions.

### 7. Footer
- Includes navigation links and contact details.


My Approach to the problem:

Step 1: Understanding the Problem
I started by carefully reading the case study to understand the requirements. I broke it into smaller tasks and made a rough plan in my notebook, listing out the tech stack and features I’d need. The main focus areas were:

Creating a clean and responsive user interface.

Setting up a backend for user authentication and data handling.

Integrating stock and AI APIs for data insights.

Adding a bookmarking feature for users to save their stock pitches.

Step 2: Development
Homepage: I began by building a simple homepage using React and Tailwind CSS to act as the main entry point.

Authentication: I implemented login and signup functionality on the backend with MongoDB to store user information securely.

Stock Data and AI: I connected stock APIs to fetch data like financial metrics and stock performance. For AI analysis, I used the Gemini API to provide stock insights.

Bookmarking: I built an API to save user bookmarks, but there are still some issues to resolve with the functionality.

Deployment: After completing the basic structure, I deployed the frontend and backend on Vercel for live access.

Challenges and Solutions

1. Backend Deployment Issues
Problem: I faced several issues while deploying the backend and database, especially with CORS errors.
Solution: After researching and testing, I fixed the CORS configuration in the backend and ensured that the frontend and backend communicated smoothly.

2. Stock API Data Limitations
Problem: Some key data points (like P/E ratio and EPS) were unavailable in the API.
Solution: I used placeholder (hardcoded) data temporarily to keep the application functional while looking for a better API solution.

3. Bookmarking Issues
Problem: While the API for bookmarks is functional, I faced issues integrating it with the frontend.
Solution: I’m still working on debugging and testing this feature to ensure smooth functionality.

4. Time Spent on Debugging
Problem: Debugging deployment and authentication consumed a lot of time.
Solution: I referred to official documentation and sought help from friends to resolve issues faster.

5. Not enough previous knowledge
Problem : I don't have mush previous knowledge about Revenue, COGS, OPEX, Taxes, EBITDA and cashflow
Solution : I read about them from youtube , chatgpt, and Google


Future Enhancements
Fully integrate real-time data from the stock API.
Fix AI prediction errors.
Complete the bookmarking functionality.
Add additional charts and insights for more comprehensive stock analysis.


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
    ├── FinanceModeling/ 
            │--- CalculationDisplay │ 
            ├── InputSection │ 
            ├── Mianpage │ 
            ├── Slider  
            ├── VisiualizationSection

### Backend
    AllApis/ 
        ├── Allroutes/ 
        ├── Middleware/ 
    ├── Schemas/ 
        │ └── schema.js 
    index.js

## Installation and Setup

### Prerequisites
- React JS
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
{
  "_id": "6752c2f78d581f7b2cf9e44e",
  "email": "test@example11.com",
  "password": "$2a$10$vDyjXIdf9AgJew1ZNZX3bugYDoAFX64ls5nnxqf.FwjEunmxE7R2C",
  "bookmarks": [],
  "__v": 0
}


Thanks and regards:
Monu Kumar
