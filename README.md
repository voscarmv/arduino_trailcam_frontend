# Arduino Trail Camera - Web Frontend

This project is a React-based web application serving as the frontend interface for the Arduino-powered Trail Camera System. It allows users to interact with the trail camera's data, primarily to view captured media and potentially manage configurations, by communicating with the [Arduino Trail Camera API Backend](https://github.com/voscarmv/arduino_trailcam_api).

## Overview

The Arduino Trailcam Frontend provides a user-friendly web interface to view and manage media captured by an Arduino trail camera. The physical camera setup, motion detection, and media capture are handled by the [Arduino Trail Camera CLI & Sensor Interface](https://github.com/voscarmv/arduino_trailcam_cli), which then uploads data to the [API Backend](https://github.com/voscarmv/arduino_trailcam_api). This frontend consumes that API to display information to the user.

It leverages modern web technologies to deliver a responsive and interactive experience, utilizing Action Cable for potential real-time updates from the backend.

## Key Features

*   **Media Gallery:** Displays images and potentially videos captured by the trail camera and served by the API.
*   **Real-time Updates (Potentially):** Utilizes Action Cable (WebSockets) for real-time communication with the Rails backend, which could include:
    *   Notifications for new media captures.
    *   Live status updates if the backend supports relaying them.
*   **Configuration Display/Management (Potentially):** May use React JSON Schema Form (`@rjsf`) to dynamically generate forms for viewing or updating trail camera settings managed by the API.
*   **User Authentication Interface:** Provides login/registration forms to interact with the API's authentication system.
*   **State Management:** Employs Redux and Redux Saga for robust and predictable application state management, handling asynchronous operations like fetching data from the API.
*   **Client-Side Routing:** Using React Router for navigating between different sections of the application (e.g., gallery, settings, login).

## System Architecture

This frontend is one part of a larger system:

1.  **[Arduino Trail Camera CLI & Sensor Interface](https://github.com/voscarmv/arduino_trailcam_cli):** (Assuming link based on CLI README's related repositories) The hardware (Arduino, PIR sensor, USB webcam) and local scripts (`listener.sh`, Node.js upload scripts) that detect motion, capture media using `ffmpeg`, and upload it to the API backend.
2.  **[Arduino Trail Camera API Backend](https://github.com/voscarmv/arduino_trailcam_api):** A Ruby on Rails 8 application that handles user authentication, stores metadata about captures, manages media (likely via Cloudinary), and provides API endpoints for the frontend. It also supports Action Cable for real-time communication.
3.  **Arduino Trail Camera Web Frontend (This Repository):** A React application that consumes the API backend to display data to the user and allow interaction.

## Tech Stack

*   **Framework:** React (bootstrapped with Create React App)
*   **State Management:** Redux, Redux Toolkit, Redux Saga
*   **Routing:** React Router DOM
*   **Real-time Communication:** Action Cable (connecting to the Rails API backend)
*   **Form Generation:** React JSON Schema Form (`@rjsf/core`, `@rjsf/validator-ajv8`)
*   **API Communication:** Node Fetch
*   **Testing:** Testing Library (Jest, React Testing Library, User Event)
*   **Styling:** CSS

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js)
*   The [Arduino Trail Camera API Backend](https://github.com/voscarmv/arduino_trailcam_api) must be running and accessible.
*   The [Arduino Trail Camera CLI & Sensor Interface](https://github.com/voscarmv/arduino_trailcam_cli) should be set up and actively capturing/uploading data if you wish to see live data.

## Getting Started

To get a local copy up and running, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/arduino_trailcam_frontend-main.git
    cd arduino_trailcam_frontend-main
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    This project uses a `.env.sh` file to manage environment variables. Create this file in the root of the project:
    ```bash
    touch .env.sh
    ```
    Then, populate it with the necessary environment variables. These will primarily be the URLs for your running backend API.
    ```sh
    #!/bin/sh
    # .env.sh

    # URL for your backend API (e.g., where the Rails app is running)
    export REACT_APP_API_URL="http://localhost:3000" # Adjust if your API runs elsewhere

    # URL for your Action Cable WebSocket server (part of the Rails API)
    export REACT_APP_ACTION_CABLE_URL="ws://localhost:3000/cable" # Adjust if your API runs elsewhere

    # Add any other environment variables required by the application
    ```
    Make the script executable:
    ```bash
    chmod +x .env.sh
    ```
    *Note: The `npm start` script is configured to source this file.*

4.  **Run the application in development mode:**
    ```bash
    npm start
    ```
    This will run the app in development mode and automatically source the environment variables from `.env.sh`.
    Open [http://localhost:3000](http://localhost:3000) (or the port specified by `react-scripts start` if different from the API) to view it in your browser. The page will reload when you make changes.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode after sourcing environment variables from `.env.sh`.
Open [http://localhost:3000](http://localhost:3000) (or the configured port) to view it in your browser.

The page will reload when you make changes. Lint errors may also appear in the console.

### `npm test`

Launches the test runner in interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified, and filenames include hashes. Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project and copy all configuration files (webpack, Babel, ESLint, etc.) and transitive dependencies into your project, giving you full control.

## Backend Interaction

This frontend application is designed to communicate with the [Arduino Trail Camera API Backend](https://github.com/voscarmv/arduino_trailcam_api). The backend is responsible for:

*   User authentication and authorization.
*   Managing and serving data related to "projects" and captured media (photos/videos).
*   Interfacing with Cloudinary for media storage.
*   Broadcasting real-time updates via Action Cable (e.g., when new media is uploaded by the CLI component).

Ensure the backend API server is running and configured correctly (including CORS settings) for the frontend to function as expected.

## Learn More

*   [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
*   [React Documentation](https://reactjs.org/)
*   [Redux Toolkit](https://redux-toolkit.js.org/)
*   [Redux Saga](https://redux-saga.js.org/)
*   [React Router](https://reactrouter.com/)
*   [React JSON Schema Form](https://rjsf-team.github.io/react-jsonschema-form/)
*   [Action Cable Client (JavaScript)](https://guides.rubyonrails.org/action_cable_overview.html#client-side-javascript)

## Contributing

Contributions are welcome! Please follow the standard fork, branch, and pull request workflow. Ensure your code adheres to the existing linting rules and that all tests pass.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

This project is licensed under the MIT License, as is common for projects bootstrapped with Create React App. Please check for a `LICENSE` file or clarify with the maintainers if needed.
