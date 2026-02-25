# Route Planner with Ollama & Dynamic Place Discovery

## Overview

The RoutePlannerPage now includes advanced features for extracting geographic coordinates using Ollama's AI capabilities and dynamically discovering nearby attractions from multiple sources.

## Features

### 1. **Ollama-Powered Coordinate Extraction**
- Extracts latitude/longitude from Wikipedia articles using Ollama LLM
- Falls back to a comprehensive database of 40+ Indian cities
- Automatically queries Wikipedia API for location data
- Uses `mistral` or other Ollama models to parse the information

**File:** `src/utils/ollamaService.js`

### 2. **Dynamic Nearby Places Discovery**
- Aggregates places from multiple sources:
  - **Overpass API**: Street-level data (restaurants, hotels, attractions, etc.)
  - **Wikipedia Geosearch**: Historical sites, notable landmarks
  - **OpenStreetMap**: Real-world POI data
- Calculates distance using Haversine formula
- Deduplicates results across sources
- Filters by route parameters

**File:** `src/utils/nearbyPlacesService.js`

### 3. **Enhanced UI**
- Loading states with animated spinner
- Distance display for each place
- Data source attribution (Wikipedia, Overpass, etc.)
- Dynamic image selection based on place type
- Error handling with user-friendly messages

---

## How It Works

### Coordinate Extraction Flow

```
User Input (e.g., "Agra")
    ↓
Check Fallback Database
    ↓ (if not found)
Query Wikipedia API
    ↓
Send to Ollama with Extraction Prompt
    ↓
Parse JSON Response
    ↓
Return Coordinates (lat, lng)
```

### Nearby Places Discovery Flow

```
Start and End Coordinates
    ↓
Calculate Center Point & Radius
    ↓
Query Overpass API (async) + Wikipedia Geosearch (async)
    ↓
Combine & Deduplicate Results
    ↓
Filter by Route Geography
    ↓
Sort by Distance
    ↓
Display Top 15-20 Results
```

---

## Setup Requirements

### Ollama Service
1. Install Ollama from [ollama.com](https://ollama.com)
2. Pull a model (e.g., `ollama pull mistral`)
3. Start the service:
   ```bash
   OLLAMA_HOST=127.0.0.1:5051 ollama serve
   ```

### API Services Used (No Auth Required)
- **Wikipedia API**: Free, no authentication
- **Overpass API**: Free, no authentication
- **OpenStreetMap**: Free, no authentication

---

## API Configuration

### Ollama Service URL
- **Default**: `http://127.0.0.1:5051/api`
- **Environment Variable**: `OLLAMA_BASE_URL` (if needed)
- **Model Used**: `mistral` (configurable)

Update in `src/utils/ollamaService.js` line 3:
```javascript
const OLLAMA_BASE_URL = 'http://127.0.0.1:5051/api';
```

---

## Usage

### Basic Usage
1. Navigate to Route Planner page
2. Enter starting point (e.g., "Delhi")
3. Enter destination (e.g., "Jaipur")
4. Click "Map Route"
5. Wait for extraction and discovery (10-30 seconds)
6. View nearby places and add to itinerary

### Under the Hood

**Coordinate Extraction:**
```javascript
const coords = await getLocationCoordinates('Agra');
// Returns: { lat: 27.1767, lng: 78.0081, source: 'ollama_wikipedia' }
```

**Nearby Places Discovery:**
```javascript
const places = await fetchNearbyPlaces(27.17, 78.00, 25, 20);
// Returns array of 20 nearby places with distance and type
```

---

## Data Structure

### Place Object
```javascript
{
  id: "wikipedia_12345",
  name: "Taj Mahal",
  lat: 27.1751,
  lng: 78.0421,
  type: "Heritage",
  description: "Built in 1652 by Mughal Emperor... ",
  source: "wikipedia",
  distance: 5.2,  // km
  url: "https://en.wikipedia.org/wiki/Taj_Mahal"
}
```

### Supported Place Types
- `Heritage` - Historical monuments
- `Food` - Restaurants, cafes
- `Nature` - Parks, waterfalls, peaks
- `Lodging` - Hotels, guest houses
- `Museum` - Museums, galleries
- `Attraction` - Tourist attractions
- `Wildlife` - Wildlife sanctuaries

---

## Error Handling

The application gracefully handles:
1. **Ollama Unavailable**: Falls back to city database
2. **Wikipedia Not Found**: Returns null, uses fallback
3. **Overpass Timeout**: Returns partial results from Wikipedia
4. **Network Errors**: User-friendly error messages
5. **Invalid Locations**: Uses nearest match or central India default

---

## Performance Considerations

- **Coordinate Extraction**: 2-5 seconds per location
- **Place Discovery**: 5-15 seconds (parallel API calls)
- **Caching**: Implement Redis/localStorage to cache coordinates
- **Rate Limiting**: Respect API rate limits (especially Overpass)

---

## Future Enhancements

1. **Caching Layer**: Cache extracted coordinates and nearby places
2. **Route Optimization**: Optimize stop order using traveling salesman algorithm
3. **Real-time Traffic**: Integrate with routing APIs (Mapbox, Google Maps)
4. **Advanced Filtering**: Filter by opening hours, reviews, price range
5. **Batch Processing**: Export itinerary as PDF with maps
6. **Multi-Language Support**: Extract Wikipedia in different languages
7. **Weather Integration**: Show weather at each stop

---

## Troubleshooting

### Ollama Connection Issues
```javascript
// Check if Ollama is running
const response = await fetch('http://127.0.0.1:5051/api');
console.log(response.status); // Should be 200-500, not connection error
```

### Missing Coordinates
- Ensure Wikipedia data is available for the location
- Try with exact city names (e.g., "Jaipur" instead of "Jaipur City")
- Check Ollama model is loaded

### No Places Found
- Increase search radius in `fetchNearbyPlaces()` parameters
- Check that coordinates are within India bounds
- May be a data availability issue for remote areas

---

## Files Structure

```
src/
├── utils/
│   ├── ollamaService.js          # Ollama integration
│   └── nearbyPlacesService.js    # Place discovery
└── pages/
    └── RoutePlannerPage.js       # Updated with new features
```

---

## Dependencies

No new npm packages required! Uses:
- Built-in `fetch` API
- Existing Lucide React icons
- Existing React Router

---

## License & Attribution

- Wikipedia API: CC-BY-SA 3.0
- OpenStreetMap/Overpass: ODbL 1.0
- Ollama: Open source

---

## Contact & Support

For issues or questions about the implementation:
1. Check console logs for specific errors
2. Verify Ollama is running: `ps aux | grep ollama`
3. Test Wikipedia in browser: `https://en.wikipedia.org/api/rest_v1/page/summary/{location}`
4. Test Overpass: `https://overpass-api.de/api/interpreter`
