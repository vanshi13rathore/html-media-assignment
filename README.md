# ProdigyPrep

ProdigyPrep is an AI-powered academic assistant for STEM students. It's a full-stack, responsive web application with a student-centric chatbot that specializes in engineering subjects, with a primary emphasis on solving mathematical and numerical problems.

## Features

*   **Chatbot:** A chatbot that can answer questions and solve mathematical problems.
*   **Mathematical Problem Solving:** The chatbot can solve mathematical problems using SymPy and format the output in LaTeX.
*   **Voice Input:** Users can speak their questions to the chatbot.
*   **Text-to-Speech:** The chatbot's responses can be read aloud.
*   **Responsive Design:** The application is responsive and works on both desktop and mobile devices.

## Tech Stack

*   **Backend:** Flask, Python
*   **Frontend:** React, Vite, Material-UI
*   **API:** Google Gemini API

## Getting Started

### Prerequisites

*   Python 3.7+
*   Node.js 14+
*   An API key for the Google Gemini API.

### Installation and Running the Application

**Note:** Due to limitations in the development environment, all files for both the frontend and backend are located in the root directory.

**1. Clone the repository:**

```bash
git clone <repository-url>
cd <repository-directory>
```

**2. Backend Setup:**

*   **Install Python dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

*   **Set the Google Gemini API Key:**

    You need to set your Google Gemini API key as an environment variable.

    On Linux/macOS:
    ```bash
    export GOOGLE_API_KEY='your_api_key'
    ```

    On Windows:
    ```bash
    set GOOGLE_API_KEY='your_api_key'
    ```

*   **Run the Flask server:**

    ```bash
    flask run
    ```
    The backend will be running on `http://127.0.0.1:5000`.

**3. Frontend Setup:**

*   **Install Node.js dependencies:**

    ```bash
    npm install
    ```

*   **Run the React development server:**

    ```bash
    npm run dev
    ```
    The frontend will be running on `http://localhost:5173` (or another port if 5173 is busy). The application will open in your default browser.

### How to Use

1.  Open the application in your browser.
2.  Type a question in the input field and press Enter or click the "Send" button.
3.  You can also click the microphone icon to speak your question.
4.  The chatbot will respond to your question. If the response is a mathematical formula, it will be rendered in LaTeX.
5.  You can click the speaker icon to have the chatbot's response read aloud.

## Project Structure

As mentioned, all files are in the root directory. Here is a brief overview of the key files:

*   `app.py`: The Flask backend application.
*   `requirements.txt`: The Python dependencies for the backend.
*   `package.json`: The Node.js dependencies for the frontend.
*   `vite.config.js`: The Vite configuration file.
*   `index.html`: The main HTML file for the frontend.
*   `src/`: This directory contains the React application source code.
*   `src/App.jsx`: The main React component for the application.
*   `src/main.jsx`: The entry point for the React application.
