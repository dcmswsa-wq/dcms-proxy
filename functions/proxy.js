// functions/proxy.js
export async function handler(event) {
  const targetUrl = 'https://script.google.com/macros/s/AKfycbzndTrDoYFQIoviKDZebsuBt4gEQg5GXLsoXqJWS_s_PRkbvKP6NSwW3YVwfH8XP4n8/exec';

  try {
    // Build fetch options dynamically
    const fetchOptions = {
      method: event.httpMethod,
      headers: { 'Content-Type': 'application/json' },
    };

    // Only attach body if not a GET request
    if (event.httpMethod !== 'GET' && event.body) {
      fetchOptions.body = event.body;
    }

    const response = await fetch(targetUrl, fetchOptions);
    const text = await response.text();

    return {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: text,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
