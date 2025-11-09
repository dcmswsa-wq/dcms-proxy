export async function handler(event, context) {
  const targetUrl = "https://script.google.com/macros/s/AKfycbzndTrDoYFQIoviKDZebsuBt4gEQg5GXLsoXqJWS_s_PRkbvKP6NSwW3YVwfH8XP4n8/exec";

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: ""
    };
  }

  try {
    const response = await fetch(targetUrl, {
      method: event.httpMethod,
      headers: { "Content-Type": "application/json" },
      body: event.body
    });

    const data = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: data
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: error.message })
    };
  }
}
