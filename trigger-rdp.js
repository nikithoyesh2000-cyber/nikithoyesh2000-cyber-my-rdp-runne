const axios = require('axios');

// Environment variables හරහා tokens ලබා ගනී (Hardcoded tokens අයින් කර ඇත)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = "nikithoyesh2000-cyber";
const REPO_NAME = "nikithoyesh2000-cyber-my-rdp-runne"; 
const NGROK_AUTH_TOKEN = process.env.NGROK_AUTH_TOKEN;

async function triggerRDP() {
    console.log("🚀 Triggering GitHub Actions Windows RDP...");

    if (!GITHUB_TOKEN) {
        console.error("❌ ERROR: GITHUB_TOKEN environment variable එක සෙට් කර නොමැත.");
        return;
    }

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
            console.log(`👉 Check logs at: https://github.com/${REPO_OWNER}/${REPO_NAME}/actions`);
        }
    } catch (error) {
        console.error("❌ FAILED to trigger workflow:");
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error(`Data:`, error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

triggerRDP();