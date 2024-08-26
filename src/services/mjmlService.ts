import axios from 'axios';
import { Observable, from, map, catchError } from 'rxjs';

// Define the base URL for the MJML API
const API_BASE_URL = 'https://api.mjml.io/v1'; // Replace with actual MJML API URL if needed

// Define the API key
const username = process.env.REACT_APP_MJML_APP_ID; // Replace with your MJML API key
const password = process.env.REACT_APP_MJML_PUBLIC_KEY; // Replace with your MJML Public key

// Ensure username and password are defined
if (!username || !password) {
  throw new Error('API credentials are missing');
}

const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

const headers = {
  'Content-Type': 'application/json',
  Authorization: authHeader,
};

// Function to convert MJML to HTML
export const convertMjmlToHtml = (mjmlCode: string): Observable<string> => {
  return from(
    axios.post(`${API_BASE_URL}/render`, { mjml: mjmlCode }, { headers })
  ).pipe(
    map((response) => response.data.html),
    catchError((error) => {
      console.error('Error converting MJML to HTML:', error);
      throw new Error('Failed to convert MJML to HTML');
    })
  );
};
