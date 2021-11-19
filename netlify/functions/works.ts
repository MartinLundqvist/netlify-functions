import { Handler } from '@netlify/functions';
import { parseWorks } from '../../src/utils';
import { getData } from '../../src/data';

// set up controllers

const handler: Handler = async () => {
  try {
    const results = await getData('Works!A2:G10');
    if (results) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          data: parseWorks(results),
        }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Something went wrong...',
        }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Something went wrong...',
        error: error,
      }),
    };
  }
};

export { handler };
