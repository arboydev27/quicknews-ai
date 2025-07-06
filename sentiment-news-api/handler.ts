import axios from 'axios';
import AWS from 'aws-sdk';

const comprehend = new AWS.Comprehend({ region: 'us-east-1' });

interface Article {
    title: string,
    description: string
}

interface SentimentResult {
    headline: string;
    summary: string;
    sentiment: string | undefined;
}

exports.handler = async (event: any) => {
    try {
        const keyword = event.queryStringParameters?.keyword || 'AI';

        const apiKey = process.env.NEWS_API_KEY;
            if (!apiKey) {
                throw new Error("NEWS_API_KEY environment variable is not defined");
            }

        // Fetch top 3 headlines from the NewsAPI
        const newsResponse = await axios.get(`https://newsapi.org/v2/everything`, {
            params: {
                q: keyword,
                apiKey: apiKey,
                pageSize: 3
            }
        });

        const articles: Article[] = newsResponse.data.articles;

        // Analyze sentiment for each headline using AWS Comprehend
        const results: SentimentResult[] = await Promise.all(
            articles.map(async (article) => {
                const sentimentData = await comprehend.detectSentiment({
                    Text: article.title,
                    LanguageCode: 'en'
                }).promise();

                return {
                    headline: article.title,
                    summary: article.description,
                    sentiment: sentimentData.Sentiment
                };
            })
        );

    return {
        statusCode: 200,
        body: JSON.stringify(results),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // To avoid CORS issues
        },
    };
    } catch (error: any) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error processing request', error: error.message})
        };
    }
};