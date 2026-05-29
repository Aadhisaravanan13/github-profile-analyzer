const axios = require("axios");
const db = require("../config/db")

const analyzerProfile = async (req, res) => {
    try {
        const { username } = req.params;

        const userResponse = await axios.get(
            `https://api.github.com/users/${username}`
        );

        const repoResponse = await axios.get(
            `https://api.github.com/users/${username}/repos`
        );

        const user = userResponse.data;
        const repos = repoResponse.data;

        const languageCount = {};

        repos.forEach((repo) => {
            if (repo.language) {
                languageCount[repo.language] =
                    (languageCount[repo.language] || 0) + 1;
            };
        });

        let topLanguage = "Not Available";
        let maxCount = 0;

        for (let language in languageCount) {
            if (languageCount[language] > maxCount) {
                maxCount = languageCount[language];
                topLanguage = language;
            };
        };

        const developerScore = user.followers * 2 + user.public_repos;

        const analyzedData = {
            username: user.login,
            name: user.name,
            followers: user.followers,
            following: user.following,
            public_repos: user.public_repos,
            top_language: topLanguage,
            developer_score: developerScore,
            profile_url: user.html_url,
        };

        const query = `
        INSERT INTO github_profiles
        (username, name, followers, following, public_repos, top_language, developer_score, profile_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)

        ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        followers = VALUES(followers),
        following = VALUES(following),
        public_repos = VALUES(public_repos),
        top_language = VALUES(top_language),
        developer_score = VALUES(developer_score),
        profile_url = VALUES(profile_url)
        `;

        const values = [
            analyzedData.username,
            analyzedData.name,
            analyzedData.followers,
            analyzedData.following,
            analyzedData.public_repos,
            analyzedData.top_language,
            analyzedData.developer_score,
            analyzedData.profile_url
        ];

        db.query(query, values, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "database Insertion Failed",
                    error: err.message
                });
            }
        });

        res.json({
            success: true,
            message: "Profile analyzed and saved successfully",
            data: analyzedData,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "GitHub user not found or API error",
            error: error.message,
        });
    };
};

const getAllProfiles = (req, res) => {
    const query = "SELECT * FROM github_profiles";

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error fetching Profiles",
                error: err.message,
            })
        }

        res.json({
            success: true,
            total: results.length,
            data: results,
        });
    });
};

module.exports = {
    analyzerProfile,
    getAllProfiles
};