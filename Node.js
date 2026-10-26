const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// This allows the app to parse incoming data if it tries to send your highscore
app.use(express.json());

// 1. The Boot Check: Makes the game think the server is completely active
app.get('/', (req, res) => {
    res.send({ status: "online", message: "Subway Server Active" });
});

// 2. The Leaderboard Endpoint: Feeds fake/custom players to the client
// Replace '/leaderboard' with whatever exact path path you found in your game's config.json
app.get('/leaderboard', (req, res) => {
    res.json({
        "status": "success",
        "season": "Classic",
        "scores": [
            { "name": "SubwayKing", "score": 15200300, "country": "US" },
            { "name": "SellyGamer", "score": 9840100, "country": "BR" },
            { "name": "Fresh_01", "score": 4500000, "country": "UK" },
            { "name": "YourAndroidPhone", "score": 1200500, "country": "FR" }
        ]
    });
});

// 3. Score Submission Endpoint (If the game tries to upload your score when you crash)
app.post('/submit-score', (req, res) => {
    console.log("Received new score:", req.body);
    res.json({ status: "score_saved" });
});

app.listen(PORT, () => {
    console.log(`Server is running live on port ${PORT}`);
});
