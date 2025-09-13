# metric-to-light

A JavaScript utility to convert various metric distances into the time it takes for light to travel that distance.

## Installation

```bash
npm install metric-to-light
```

## Usage

```javascript
import { calculateLightTime, distanceUnits } from 'metric-to-light';

// Example: Calculate light travel time for 1 kilometer
const kilometer = distanceUnits.find(unit => unit.symbol === 'km');
const resultKm = calculateLightTime(1, kilometer.factor);
console.log(`Light takes ${resultKm.value.toFixed(2)} ${resultKm.unit} to travel 1 kilometer.`);

// Example: Calculate light travel time for 1 Astronomical Unit
const astronomicalUnit = distanceUnits.find(unit => unit.symbol === 'au');
const resultAu = calculateLightTime(1, astronomicalUnit.factor);
console.log(`Light takes ${resultAu.value.toFixed(2)} ${resultAu.unit} to travel 1 Astronomical Unit.`);
```

## API

### `calculateLightTime(distance, distanceFactor)`

Calculates the time it takes for light to travel a given distance.

-   `distance` (number): The numerical value of the distance.
-   `distanceFactor` (number): The conversion factor of the input distance unit to meters. You can find these factors in the `distanceUnits` array.

Returns an object `{ value: number, unit: string }` or `{ error: string }` if an invalid input is provided.

### `distanceUnits`

An array of objects, each representing a distance unit with its name, symbol, and conversion factor to meters.

```javascript
[
  { name: 'Meters', symbol: 'm', factor: 1 },
  { name: 'Kilometers', symbol: 'km', factor: 1e3 },
  // ... other units
]
```

## License

MIT