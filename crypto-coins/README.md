# Welcome to Crypto-Coins! 🚀
Vanakkam 🙏 I'm Aditya Srinivas, and I'm excited to welcome you to Crypto-Coins. This project is designed to track the cryptocurrency data.

## Installation 🛠️
1. **Clone this Repo:** `git clone [repo-url]`
2. **Navigate to the Project Directory:** `cd crypto-coins/crypto-coins`
3. **Install Dependencies:** `npm i`
4. **Ensure Node.js Version** `>= v18.17.0`
5. **Configure Environment Variables:** Add a `.env` file with values

## Building and Testing 🚧
1. **Build for Production**:  
   Run the production build to prepare your app for deployment.  
   `npm run build`
2. **Start the App**:  
   Start the app in production mode to see it in action.  
   `npm start`

## If Using a New MongoDB Database 🌱
1. **Start the Server**
2. **Initialize the Database**:  
   Visit `localhost:3000/api/init` in your browser to initialize the database with all the required coin data. This step sets up your database with the necessary info.

## Project Overview 🌟
Crypto-Coins is a application built to fetch and display real-time cryptocurrency information. 
- **Real-Time Coin Data**
- **Historical Price Tracking**
- **Subreddit Links**

Our app pulls data from the CoinGecko API and stores it in MongoDB for efficient retrieval and management. With a clean and user-friendly interface, it ensures you have all the critical data at your fingertips.

## How It Works 🛠️

- **Data Fetching**: The application uses the CoinGecko API to fetch real-time and historical data on various cryptocurrencies.
- **Database Management**: MongoDB is used to store and manage the coin data efficiently.
- **User Interface**: A clean, modern UI built using `Next.js`, `DaisyUI`, `Tailwind` displays the coin data, including current prices and historical trends, along with links to relevant subreddits for community engagement.
