
# Financial Analyzer UI (Vitae)

This project is a modern React-based web application for analyzing financial data. It provides a simple interface for users to upload their financial CSV files and receive instant analysis results.

## Features

- Upload CSV files for financial analysis
- Clean, responsive UI built with React and Tailwind CSS
- Real-time feedback and results display

## Backend Integration

The frontend connects directly to the [financials.ai](https://financials.ai) backend API. When a user uploads a CSV file, the app sends it to the backend for processing and displays the returned analysis results.

**API Endpoint:**

```
POST http://localhost:8000/api/v1/upload/
```

> Make sure the backend server is running and accessible at the above address, or update the endpoint in the code as needed.

## Getting Started

1. Install dependencies:
	```bash
	npm install
	```
2. Start the development server:
	```bash
	npm start
	```
3. Open your browser at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## File Upload

Only CSV files are supported for upload. Make sure your file is formatted correctly for best results.

## License

This project is for educational and demonstration purposes.
