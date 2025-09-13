import { calculateLightTime, distanceUnits, timeUnits, SPEED_OF_LIGHT_MS } from './metric-to-light';

describe('calculateLightTime', () => {
  // Test case 1: Basic conversion for 1 meter
  test('should correctly calculate light time for 1 meter', () => {
    const meter = distanceUnits.find(unit => unit.symbol === 'm');
    if (!meter) throw new Error('Meter unit not found');
    const result = calculateLightTime(1, meter.factor);
    // Expected: Light Nanoseconds, as 1 meter is a very small distance for light travel time
    const timeInSeconds = 1 / SPEED_OF_LIGHT_MS;
    const nanoseconds = timeUnits.find(unit => unit.name === 'Nanoseconds');
    if (!nanoseconds) throw new Error('Nanoseconds unit not found');
    const expectedValue = timeInSeconds / nanoseconds.factor;
    expect(result).toEqual({ value: expectedValue, unit: 'Light Nanoseconds' });
  });

  // Test case 2: Conversion for 1 kilometer
  test('should correctly calculate light time for 1 kilometer', () => {
    const kilometer = distanceUnits.find(unit => unit.symbol === 'km');
    if (!kilometer) throw new Error('Kilometer unit not found');
    const result = calculateLightTime(1, kilometer.factor);
    // 1 km = 1000 meters. Time in seconds = 1000 / SPEED_OF_LIGHT_MS
    const timeInSeconds = 1000 / SPEED_OF_LIGHT_MS;
    const microseconds = timeUnits.find(unit => unit.name === 'Microseconds');
    if (!microseconds) throw new Error('Microseconds unit not found');
    const expectedValue = timeInSeconds / microseconds.factor;
    expect(result).toEqual({ value: expectedValue, unit: 'Light Microseconds' });
  });

  // Test case 3: Conversion for 1 Light Year (should be 1 Light Year)
  test('should correctly calculate light time for 1 Light Year', () => {
    const lightYearDistance = distanceUnits.find(unit => unit.symbol === 'ly');
    if (!lightYearDistance) throw new Error('Light Year distance unit not found');
    const result = calculateLightTime(1, lightYearDistance.factor);
    // Expect singular 'Light Year' for value 1
    expect(result).toEqual({ value: 1, unit: 'Light Year' });
  });

  // Test case 4: Distance of 0
  test('should return 0 Light Seconds for a distance of 0', () => {
    const meter = distanceUnits.find(unit => unit.symbol === 'm');
    if (!meter) throw new Error('Meter unit not found');
    const result = calculateLightTime(0, meter.factor);
    expect(result).toEqual({ value: 0, unit: 'Light Seconds' });
  });

  // Test case 5: Invalid distance (not a number)
  test('should return an error for invalid distance input (not a number)', () => {
    const meter = distanceUnits.find(unit => unit.symbol === 'm');
    if (!meter) throw new Error('Meter unit not found');
    // @ts-ignore
    const result = calculateLightTime('abc', meter.factor);
    expect(result).toEqual({ error: 'Invalid distance: Must be a number.' });
  });

  // Test case 6: Invalid distance (NaN)
  test('should return an error for invalid distance input (NaN)', () => {
    const meter = distanceUnits.find(unit => unit.symbol === 'm');
    if (!meter) throw new Error('Meter unit not found');
    const result = calculateLightTime(NaN, meter.factor);
    expect(result).toEqual({ error: 'Invalid distance: Must be a number.' });
  });

  // Test case 7: Invalid distanceFactor (not a number)
  test('should return an error for invalid distanceFactor input (not a number)', () => {
    const meter = distanceUnits.find(unit => unit.symbol === 'm');
    if (!meter) throw new Error('Meter unit not found');
    // @ts-ignore
    const result = calculateLightTime(1, 'abc');
    expect(result).toEqual({ error: 'Invalid distanceFactor: Must be a number.' });
  });

  // Test case 8: Invalid distanceFactor (NaN)
  test('should return an error for invalid distanceFactor input (NaN)', () => {
    const meter = distanceUnits.find(unit => unit.symbol === 'm');
    if (!meter) throw new Error('Meter unit not found');
    const result = calculateLightTime(1, NaN);
    expect(result).toEqual({ error: 'Invalid distanceFactor: Must be a number.' });
  });

  // Test case 9: Negative distance
  test('should return an error for negative distance', () => {
    const meter = distanceUnits.find(unit => unit.symbol === 'm');
    if (!meter) throw new Error('Meter unit not found');
    const result = calculateLightTime(-10, meter.factor);
    expect(result).toEqual({ error: 'Distance cannot be negative.' });
  });

  // Test case 10: Zero distanceFactor
  test('should return an error for zero distanceFactor', () => {
    const result = calculateLightTime(10, 0);
    expect(result).toEqual({ error: 'Distance factor must be positive.' });
  });

  // Test case 11: Negative distanceFactor
  test('should return an error for negative distanceFactor', () => {
    const result = calculateLightTime(10, -1);
    expect(result).toEqual({ error: 'Distance factor must be positive.' });
  });

  // Test case 12: Very small distance (should fall back to yoctoseconds)
  test('should handle very small distances and return in yoctoseconds', () => {
    const yoctometer = distanceUnits.find(unit => unit.symbol === 'ym');
    if (!yoctometer) throw new Error('Yoctometer unit not found');
    const result = calculateLightTime(1, yoctometer.factor);
    const expectedTimeInSeconds = (1 * yoctometer.factor) / SPEED_OF_LIGHT_MS;
    const expectedYoctoseconds = expectedTimeInSeconds / 1e-24;
    expect(result).toEqual({ value: expectedYoctoseconds, unit: 'Light Yoctoseconds' });
  });

  // Test case 13: Large distance (e.g., Gigameters)
  test('should handle large distances and return in appropriate units (e.g., Light Minutes)', () => {
    const gigameter = distanceUnits.find(unit => unit.symbol === 'Gm');
    if (!gigameter) throw new Error('Gigameter unit not found');
    const distance = 100; // 100 Gigameters
    const result = calculateLightTime(distance, gigameter.factor);

    // Type guard to ensure 'result' is a LightTimeResult
    if ('error' in result) {
      throw new Error(`Unexpected error: ${result.error}`);
    }

    const distanceInMeters = distance * gigameter.factor;
    const timeInSeconds = distanceInMeters / SPEED_OF_LIGHT_MS;
    const lightMinute = timeUnits.find(unit => unit.singular === 'Light Minute'); // Changed to Light Minute
    if (!lightMinute) throw new Error('Light Minute unit not found');
    const expectedValue = timeInSeconds / lightMinute.factor;
    expect(result.unit).toBe('Light Minutes'); // Changed to Light Minutes
    expect(result.value).toBeCloseTo(expectedValue);
  });
});