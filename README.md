# Steps to run this project locally

## Project Prerequisites

To successfully run this project, ensure you have the following prerequisites:

### 1. Docker
- Install Docker on your machine. Follow the installation guide for your operating system:
  - **Windows**: [Install Docker Desktop](https://docs.docker.com/desktop/windows/install/)
  - **macOS**: [Install Docker Desktop](https://docs.docker.com/desktop/mac/install/)
  - **Linux**: Follow the guide for your specific distribution (e.g., Ubuntu, CentOS):
    - [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
    - [Install Docker Engine on CentOS](https://docs.docker.com/engine/install/centos/)

### 2. Docker Compose
- Install Docker Compose. If you're using Docker Desktop, Docker Compose is included by default. Otherwise, follow the installation instructions for Linux:
  - [Install Docker Compose](https://docs.docker.com/compose/install/)

### 3. Verify Installation
- After installation, verify that Docker and Docker Compose are installed correctly by running the following commands:
  ```bash
  docker --version
  docker-compose --version
  ```

## Clone this project

Run the following command:

```sh
git clone git@github.com:himanshu07Rai/Steins-Gate.git
```

- Open the cloned repository locally

## Add Environment Variables

```bash
cd apps/server
touch .env
```

Copy the `server..env.example` file and paste it inside `server/.env` and add `JWT_SECRET`

```sh
cd ..
cd ..
touch .env.local
```
Copy `web/.env.example`, paste it in `web/.env.local` and add the remaining variables


## How to Fetch Google Client ID and Secret

Follow these steps to get your Google Client ID and Secret for OAuth integration:

### 1. Go to Google Cloud Console
- Open your browser and navigate to [Google Cloud Console](https://console.cloud.google.com/).
- Log in with your Google account if required.

### 2. Create a New Project
- In the top bar, click the project dropdown and select **New Project**.
- Provide a name for your project and select an organization (if necessary).
- Click **Create**.

### 3. Enable the Google OAuth2.0 API
- Once your project is created, go to the **API & Services** dashboard.
- Click on **+ ENABLE APIS AND SERVICES** at the top.
- Search for **"Google OAuth 2.0"** and select **Google OAuth 2.0 API** from the list.
- Click **Enable**.

### 4. Create OAuth Consent Screen
- In the left sidebar, click **OAuth consent screen**.
- Choose the **External** user type (for public apps) or **Internal** (for organization-only apps).
- Click **Create**.
  
  Fill out the required fields:
  - **App Name**: The name of your application as it will appear to users.
  - **User Support Email**: An email where users can contact you for support.
  - **App Domain** (optional): Your app’s home page, privacy policy, and terms of service (if applicable).
  - **Authorized Domains**: Add the domain(s) you own that will use OAuth (e.g., your app’s domain).
  - **Developer Contact Information**: Provide an email where Google can contact you.

- After filling in the details, click **Save and Continue**.

### 5. Create OAuth Credentials (Client ID and Secret)
- In the left sidebar, go to **Credentials**.
- Click on **Create Credentials** and select **OAuth 2.0 Client ID**.
- Choose your **Application Type**:
  - Select **Web Application** for a web app.
  - Choose other types (e.g., **Desktop App**) as needed.
  
  Fill out the following details:
  - **Name**: A name for the OAuth client (for your internal reference).
  - **Authorized redirect URIs**: Add your redirect URIs where Google sends responses after authorization.
    - Example for local development: `http://localhost:3000/api/auth/callback/google`.
    - Example for production: `https://yourapp.com/auth/google/callback`.

- Click **Create**.

### 6. Copy Your Google Client ID and Secret
- Once created, you will be shown your **Client ID** and **Client Secret**.
- Copy these values and store them securely.

### 7. Use the Client ID and Secret in Your Application
- Add your Client ID and Secret to your environment variables. For a Next.js project, use a `.env.local` file:
  ```bash
  GOOGLE_CLIENT_ID=your-client-id
  GOOGLE_CLIENT_SECRET=your-client-secret
  ```

## Run the project locally

```powershell-interactive
cd ..
cd ..
chmod +x run_app.sh
./run_app.sh
```