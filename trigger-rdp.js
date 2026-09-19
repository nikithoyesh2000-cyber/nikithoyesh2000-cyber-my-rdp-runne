const axios = require('axios');

// මෙතන තියෙන values ඔබේ තොරතුරු වලින් replace කරන්න:
const GITHUB_TOKEN = "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"; // Step 4 එකේ ගත්ත PAT Token එක
const REPO_OWNER = "your-github-username";                  // ඔබගේ GitHub Username එක
const REPO_NAME = "my-rdp-runner";                          // Step 1 එකේ හැදූ Repo Name එක
const NGROK_AUTH_TOKEN = "3JXDtfS9I2mtxUBiyfJluR5QQo1_6S1p5oZPk7CgarpuxTifQ";   // Step 3 එකේ ගත්ත Ngrok Token එක

async function triggerRDP() {
    console.log("🚀 Triggering GitHub Actions Windows RDP...");

    try {
        const response = await axios.post(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/dispatches`,
            {
                event_type: "start-rdp",
                client_payload: {
                    ngrok_token: NGROK_AUTH_TOKEN
                }
            },
            {
                headers: {
                    "Authorization": `Bearer ${GITHUB_TOKEN}`,
                    "Accept": "application/vnd.github.v3+json",
                    "User-Agent": "NodeJS-RDP-Trigger"
                }
            }
        );

        if (response.status === 204) {
            console.log("✅ SUCCESS: Workflow Triggered Successfully!");
            console.log("👉 Go to GitHub Repo -> Actions tab -> Check Live Log forRepository එකක් සාදා ගැනීමේ සිට සම්පූර්ණ ක්‍රියාවලිය පියවරෙන් පියවර පහත පරිදි වේ:

**1. GitHub Repository එක සාදා ගැනීම**
* GitHub ගිණුමට ලොග් වී ඉහළ දකුණු කෙළවරේ ඇති **`+`** ලකුණ ක්ලික් කර **New repository** තෝරන්න.
* **Repository name** එක ලබා දී (උදා: `my-project`), **Public** හෝ **Private** යන්න තෝරන්න.
* **Add a README file** එක mark නොකර තබන්න (කලින් සාදපු local project එකක් push කරන්නේ නම්).
* **Create repository** බොත්තම ක්ලික් කරන්න.

**2. Local Project එක සූදානම් කර ගැනීම**
* ඔබේ கணினියේ project එක ඇති folder එක open කර, terminal / command prompt එක Open කරගන්න.

**3. Git Initialize කිරීම**
* Project folder එක ඇතුළත git repository එකක් ආරම්භ කිරීමට පහත command එක run කරන්න:
  ```bash
  git init