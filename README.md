# PDF Translator Project

## Project Overview

This project provides a web application that allows users to upload PDF files and translate them into a specified language. Currently, the application reads the text content of the PDF files, replaces it with a dummy translation, and returns the translated content as a new PDF file.

## Setup and Running

### Prerequisites

- Node.js (v20.15.1 or newer)
- npm (Node Package Manager)

### Server Setup

1. Navigate to the server directory:
   cd server
2. Install dependencies:
    npm install
3. Start the server:
    node index.js
    The server will run at http://localhost:5000.

## Client Setup

1. Navigate to the client directory:
   cd client
2. Install dependencies:
    npm install
3. Start the server:
    npm start
    The client application will run at http://localhost:3000.

## Usage

- **Upload PDF:** Use the form on the main page to upload a PDF file and click the "Upload PDF" button.
- **Translation:** The uploaded PDF file will be processed by the server, and a translated PDF file will be provided for download.

## Future Plans

- **Frontend Updates:** The current frontend consists of a basic form and button. Future updates will focus on enhancing the user interface to be more user-friendly.
- **OpenAI API Integration:** Currently, translations are handled with dummy text. In the future, the integration of the OpenAI API will provide dynamic and accurate translations.
- **Fixing Word Concatenation Issues:** There are issues with concatenated words in the PDF content. Plans are in place to address and improve text formatting.

## Contributing

If you would like to contribute to this project, please create a pull request or provide feedback in the issue section of the project.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or feedback, please reach out via [serhaatkemal@gmail.com](mailto:serhaatkemal@gmail.com).
