require('dotenv').config();
const express = require('express');
const axios = require('axios');
const logger = require('./logger');
const expressPino = require('express-pino-logger')({ logger });
const natural = require("natural");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(expressPino);

// Define a POST route to handle sentiment analysis requests
app.post('/sentiment', async (req, res) => {
     // Extract the 'sentence' parameter from the query string
    const { sentence } = req.query;


    if (!sentence) {
        logger.error('No sentence provided');
        return res.status(400).json({ error: 'No sentence provided' });
    }

    // Initialize the sentiment analyzer with the Natural's PorterStemmer and "English" language
    // Get the SentimentAnalyzer class from the 'natural' library
    const Analyzer = natural.SentimentAnalyzer;
    // Get the PorterStemmer, which is used to reduce words to their root form
    const stemmer = natural.PorterStemmer;
    // Create an instance of SentimentAnalyzer
    const analyzer = new Analyzer("English", stemmer, "afinn");

    try {
          // Perform sentiment analysis by splitting the sentence into words
        const analysisResult = analyzer.getSentiment(sentence.split(' '));

        let sentiment = "neutral";

        if (analysisResult < 0) {
            sentiment = "negative";
        } else if (analysisResult > 0.33) {
            sentiment = "positive";
        }

        // Logging the result
        logger.info(`Sentiment analysis result: ${analysisResult}`);
        // Responding with the sentiment analysis result
        res.status(200).json({ sentimentScore: analysisResult, sentiment: sentiment });
    } catch (error) {
        logger.error(`Error performing sentiment analysis: ${error}`);
        res.status(500).json({ message: 'Error performing sentiment analysis' });
    }
});

// Start the server
app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});