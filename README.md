# GitFollow

GitFollow is a Next.js web application that allows you to analyze your GitHub follower and following relationships. By providing your GitHub Personal Access Token (PAT), you can:

1.  Fetch and display your followers.
2.  Fetch and display the users you are following.
3.  Compute and display:
    *   **Fans**: Users who follow you, but you don't follow back.
    *   **Not Following You Back**: Users you follow, but who don't follow you back.

## Features

*   Securely uses your GitHub PAT (sent to the server for API calls, but not stored).
*   Fetches comprehensive lists of followers and following (handles pagination).
*   Clear, side-by-side comparison of relationship categories.
*   Modern, clean UI built with Next.js and shadcn/ui.

## Tech Stack

*   **Frontend**: Next.js (React), TypeScript, Tailwind CSS, shadcn/ui
*   **Backend**: Next.js Server Actions
*   **API**: GitHub REST API v3
## Prerequisites

*   Node.js (>=18.x recommended)
*   npm or yarn

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd gitfollow
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up your GitHub Personal Access Token (PAT):**
    *   Go to your GitHub [Developer settings](https://github.com/settings/tokens).
    *   It's recommended to use a **"Token (classic)"** for simplicity with this application. If you choose "Fine-grained tokens," ensure it has read access to "Followers" and "Following" under "User permissions."
    *   Click "Generate new token" and select "Generate new token (classic)".
    *   Give your token a descriptive name (e.g., "GitFollowApp").
    *   Set an expiration date (e.g., 7 days, 30 days).
    *   Under "Select scopes", ensure you grant AT LEAST the following permission:
        *   `read:user` (This scope is essential to read your user profile data, including followers and who you are following).
        *   _Note: The application only reads data. No write permissions (like `user:follow` or `write:user`) are required or used._
    *   Click "Generate token".
    *   **Important**: Copy your new PAT. You won't be able to see it again. You will enter this token directly into the application's input field.

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will typically start on `http://localhost:3000` (or the port specified in your `package.json` `dev` script, which is `9002` for this project by default).

5.  **Use the App:**
    *   Open your browser and navigate to the local development URL.
    *   Enter your GitHub PAT into the input field.
    *   Click "Load GitHub Data".
    *   View your follower analytics!

## Troubleshooting PAT Issues

If you encounter errors like "Forbidden," "Resource not accessible," or "Unauthorized":

*   **Check Scopes**: Ensure your PAT (classic) has the `read:user` scope selected. This is the most common cause of permission errors.
*   **Token Type**: For this application, a "Token (classic)" is generally easier to configure with the correct broad read access. If using a "Fine-grained token," double-check its specific permissions for reading user data.
*   **Token Expiration**: Verify that your token has not expired. You can check this on your [GitHub tokens page](https://github.com/settings/tokens).
*   **Active Token**: Ensure the token is still active and hasn't been revoked.
*   **SAML SSO / Organization Restrictions**: If your account is part of an organization that uses SAML Single Sign-On, you might need to authorize the PAT for use with that organization. Look for a "Configure SSO" or "Authorize" button next to your token on the GitHub tokens page.
*   **Copy-Paste Error**: Ensure you copied the entire token correctly, without extra spaces or missing characters.
*   **Generate a New Token**: If unsure, try generating a new "Token (classic)" with only the `read:user` scope and test with that.
*   **Rate Limits**: While the error might mention rate limits, "Resource not accessible" often points more directly to a permissions problem. GitHub has API rate limits, but these are usually hit after many requests.

## Building for Production

To create a production build:

```bash
npm run build
```

Then, to start the production server:

```bash
npm run start
```

## Important Security Note

*   **Token Security**: Your GitHub Personal Access Token is powerful. Treat it like a password.
    *   This application sends the token to its backend (Next.js server actions running on the same infrastructure) to make GitHub API calls on your behalf. It is not stored persistently by the application.
    *   Ensure you understand the scopes you grant to the token. For this app, `read:user` is sufficient.
    *   If you suspect your token has been compromised, revoke it immediately from your GitHub settings.
    *   Consider using tokens with appropriate expiration dates.

This project is for educational and personal use. Be mindful of GitHub's API rate limits.
```
will be adding and bringing forth more updates to this app and bringing forth the final version that would be coming along with the apk file
```
