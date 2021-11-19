import { Handler } from '@netlify/functions';
import { parseProjects } from '../../src/utils';
import { getData } from '../../src/data';

// set up controllers

const handler: Handler = async () => {
  try {
    const results = await getData('Projects!A2:G10');
    if (results) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          data: parseProjects(results),
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
      }),
    };
  }
};

export { handler };
