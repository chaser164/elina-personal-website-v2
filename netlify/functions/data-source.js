// Fetch data directly from a public Google Sheet (faster than Apps Script)

export async function handler(event, context) {
  const SHEET_ID = process.env.GOOGLE_SHEETS_ID;

  if (!SHEET_ID) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'GOOGLE_SHEETS_ID environment variable not set' }),
    };
  }

  try {
    // Fetch the sheet as CSV (sheet must be published or shared publicly)
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;
    
    const response = await fetch(csvUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();
    
    // Parse CSV to JSON
    const lines = csvText.split('\n').filter(line => line.trim());
    
    // Skip header row, map to objects
    const data = lines.slice(1).map(line => {
      // Parse CSV line (handles quoted fields)
      const values = [];
      let current = '';
      let inQuotes = false;
      
      for (const char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      
      return {
        source: values[0] || '',
        title: values[1] || '',
        image: values[2] || '',
        link: values[3] || '',
      };
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=60', // Cache for 1 minute
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching Google Sheet:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
}
