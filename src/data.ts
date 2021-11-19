import dotenv from 'dotenv';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

dotenv.config();

// set up the googleapi
const getData = async (range: string) => {
  try {
    const parsePrivateKey = (input: string): string => {
      if (input[0] === '-') return input;

      return JSON.parse(input);
    };

    const client = new JWT({
      email: process.env.CLIENT_EMAIL,
      key: parsePrivateKey(process.env.PRIVATE_KEY!),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    //const credentials = await client.authorize();

    const sheets = google.sheets({ version: 'v4', auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    return response.data.values;
  } catch (error) {
    console.log('Error occured while fetching data');
    console.log(error);
    throw error;
  }

  return null;
};

export { getData };
