# QuizVibe

**QuizVibe** is a modern, category-based quiz app that allows users to create, review, and participate in quizzes across a variety of topics. This app targets young audiences, offering a sleek and interactive experience with a vibrant purple and green theme.

## Features

- **Create Quizzes**: Users can create their own quizzes by providing questions, options, and answers.
- **Review Process**: Newly created quizzes require admin approval before they are published to ensure quality and relevance.
- **Take Quizzes**: Users can select and participate in quizzes from a diverse list of categories.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Mobile**: React Native, TypeScript

## Project Structure

The project is organized into two main directories:

- **frontend/**: Contains the React.js client-side application.
- **backend/**: Contains the server-side code using Express.js, along with the MongoDB schema.
    - `server.js`: Main file containing the configuration and setup for the Express server.
    - `/models/quiz.js`: Defines the structure for quiz documents in MongoDB.
- **mobile/**: Contains the React Native cross-platform mobile application with TypeScript.

## Installation Instructions

To set up QuizVibe locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/tawanda-profuse/general-knowledge.git
    ```

2. **Install Backend Dependencies**:
    Navigate to the `backend` directory and install dependencies:
    ```bash
    cd backend
    npm install
    ```

3. **Configure Environment Variables for Backend**:
    Create a `.env` file in the `backend` directory with the following:
    ```plaintext
    MONGO_URI=your_mongodb_connection_string
    ```

4. **Install Frontend Dependencies**:
    Navigate to the `frontend` directory and install dependencies:
    ```bash
    cd frontend
    npm install
    ```
5. **Install Mobile Dependencies**:
    Navigate to the `mobile` directory and install dependencies:
    ```bash
    cd mobile 
    npm install
    ```

6. **Run the Application**:

    - **Backend**: Start the Express server from the `backend` directory.
        ```bash
        cd backend
        npm start
        ```

    - **Frontend**: Start the React app from the `frontend` directory.
        ```bash
        cd frontend
        npm start
        ```
    - **Mobile**: Start the mobile application from the `mobile` directory.
      ```bash
      cd mobile
      npx expo start
      ```

6. **Access the Application**:
    - The React frontend should be running at `http://localhost:3000`.
    - The Express backend API should be running at `http://localhost:8000`.
    - The React Native mobile application is served by Expo and can be used with the Expo Go app or in the browser.

## Chrome Extension

The Chrome extension is available in the [chrome directory](/chrome/). Enable the extension locally by following these steps:

1. Change to the **chrome** directory:

```bash
cd chrome
```

2. Run the build command to generate a folder named **build**:

```bash
npm run build
```

3. Open the Chrome browser at this URL: [chrome://extensions/](chrome://extensions/).

4. Click on **Load unpacked** and select the build folder previously generated.

5. The QuizVibe Chrome extension should be available to use from your list of extensions.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Enjoy QuizVibe and happy quizzing!
