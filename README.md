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
    *   Click on "Personal access tokens" > "Tokens (classic)".
    *   Click "Generate new token" (or "Generate new token (classic)").
    *   Give your token a descriptive name (e.g., "GitFollowApp").
    *   Set an expiration date.
    *   Under "Select scopes", ensure you grant the following permissions:
        *   `read:user` (to read user profile data)
        *   `user:follow` (to read follow relationships)
        *   _Note: The application only reads data. No write permissions are required or used._
    *   Click "Generate token".
    *   **Important**: Copy your new PAT. You won't be able to see it again. You will enter this token directly into the application's input field. It is not stored in a `.env` file for this application's operation.

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
    *   Ensure you understand the scopes you grant to the token. For this app, `read:user` and `user:follow` are sufficient.
    *   If you suspect your token has been compromised, revoke it immediately from your GitHub settings.
    *   Consider using tokens with appropriate expiration dates.

This project is for educational and personal use. Be mindful of GitHub's API rate limits.
