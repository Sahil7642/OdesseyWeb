/**
 * Ollama Service - Extracts coordinates from Wikipedia using LLM
 */

const OLLAMA_BASE_URL = 'http://127.0.0.1:5051/api';

/**
 * Fetches Wikipedia summary for a location
 */
const fetchWikipediaSummary = async (location) => {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(location)}`
    );
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Wikipedia fetch error:', error);
    return null;
  }
};

/**
 * Uses Ollama to extract coordinates from Wikipedia data
 */
export const extractCoordinatesWithOllama = async (location) => {
  try {
    // Fetch Wikipedia data for the location
    const wikiData = await fetchWikipediaSummary(location);
    
    if (!wikiData) {
      console.error(`No Wikipedia data found for ${location}`);
      return null;
    }

    // Construct a prompt for Ollama to extract coordinates
    const prompt = `
    I have the following Wikipedia information about a location:
    
    Location: ${location}
    Extract: ${wikiData.extract || 'No extract available'}
    
    Please extract the latitude and longitude coordinates for this location.
    If coordinates are found, respond ONLY with JSON in this exact format:
    {"latitude": <number>, "longitude": <number>, "found": true}
    
    If coordinates cannot be found, respond with:
    {"latitude": null, "longitude": null, "found": false}
    
    Do not include any other text or explanation.
    `;

    // Call Ollama API
    const ollamaResponse = await fetch(`${OLLAMA_BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral', // Or your preferred model
        prompt: prompt,
        stream: false,
        temperature: 0.1,
      }),
    });

    if (!ollamaResponse.ok) {
      console.error('Ollama API error:', ollamaResponse.statusText);
      return null;
    }

    const ollamaData = await ollamaResponse.json();
    const responseText = ollamaData.response?.trim() || '';

    // Parse JSON response from Ollama
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const coords = JSON.parse(jsonMatch[0]);
        if (coords.found && coords.latitude !== null && coords.longitude !== null) {
          return {
            lat: coords.latitude,
            lng: coords.longitude,
            source: 'ollama_wikipedia',
          };
        }
      }
    } catch (parseError) {
      console.error('Failed to parse Ollama response:', parseError);
    }

    return null;
  } catch (error) {
    console.error('Error in extractCoordinatesWithOllama:', error);
    return null;
  }
};

/**
 * Fallback coordinate database for common Indian cities
 */
export const fallbackCityCoords = {
  'delhi': { lat: 28.6139, lng: 77.2090 },
  'jaipur': { lat: 26.9124, lng: 75.7873 },
  'mumbai': { lat: 19.0760, lng: 72.8777 },
  'bangalore': { lat: 12.9716, lng: 77.5946 },
  'bengaluru': { lat: 12.9716, lng: 77.5946 },
  'chennai': { lat: 13.0827, lng: 80.2707 },
  'madras': { lat: 13.0827, lng: 80.2707 },
  'kolkata': { lat: 22.5726, lng: 88.3639 },
  'calcutta': { lat: 22.5726, lng: 88.3639 },
  'ahmedabad': { lat: 23.0225, lng: 72.5714 },
  'pune': { lat: 18.5204, lng: 73.8567 },
  'agra': { lat: 27.1767, lng: 78.0081 },
  'manali': { lat: 32.2396, lng: 77.1887 },
  'goa': { lat: 15.2993, lng: 74.1240 },
  'kochi': { lat: 9.9312, lng: 76.2673 },
  'cochin': { lat: 9.9312, lng: 76.2673 },
  'udaipur': { lat: 24.5854, lng: 73.7125 },
  'chandigarh': { lat: 30.7333, lng: 76.7794 },
  'lucknow': { lat: 26.8467, lng: 80.9462 },
  'hyderabad': { lat: 17.3850, lng: 78.4867 },
  'indore': { lat: 22.7196, lng: 75.8577 },
  'surat': { lat: 21.1458, lng: 72.8341 },
  'vadodara': { lat: 22.3072, lng: 73.1812 },
  'bhopal': { lat: 23.1815, lng: 79.9864 },
  'nagpur': { lat: 21.1458, lng: 79.0882 },
  'pondicherry': { lat: 12.0657, lng: 79.8711 },
  'shimla': { lat: 31.7784, lng: 77.1066 },
  'darjeeling': { lat: 27.0410, lng: 88.2663 },
  'nainital': { lat: 29.3919, lng: 79.4504 },
  'ooty': { lat: 11.4102, lng: 76.6955 },
  'coonoor': { lat: 11.3624, lng: 76.7949 },
  'mussoorie': { lat: 30.4610, lng: 78.4664 },
  'rishikesh': { lat: 30.0890, lng: 78.2679 },
  'varanasi': { lat: 25.3200, lng: 82.9850 },
  'amritsar': { lat: 31.6340, lng: 74.8711 },
  'jodhpur': { lat: 26.2389, lng: 73.0243 },
  'jaisalmer': { lat: 26.9124, lng: 70.9262 },
};

/**
 * Get coordinates for a location - tries Ollama first, then fallback
 */
export const getLocationCoordinates = async (location) => {
  if (!location) return null;

  const normalizedLocation = location.toLowerCase().trim();

  // Try fallback database first for speed
  if (fallbackCityCoords[normalizedLocation]) {
    return {
      ...fallbackCityCoords[normalizedLocation],
      source: 'fallback',
    };
  }

  // Try Ollama for dynamic location extraction
  const ollamaCoords = await extractCoordinatesWithOllama(location);
  if (ollamaCoords) {
    return ollamaCoords;
  }

  // If both fail, return null
  return null;
};
