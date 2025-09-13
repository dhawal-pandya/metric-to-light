export const SPEED_OF_LIGHT_MS = 299792458; // meters per second

interface DistanceUnit {
  name: string;
  symbol: string;
  factor: number;
}

interface TimeUnit {
  name: string;
  factor: number;
  singular: string;
  plural: string;
}

interface LightTimeResult {
  value: number;
  unit: string;
}

interface LightTimeError {
  error: string;
}

//-------------------------------------------------
// DISTANCE UNITS (conversion factor to meters)
//-------------------------------------------------
export const distanceUnits: DistanceUnit[] = [
  // Metric
  { name: 'Yoctometers', symbol: 'ym', factor: 1e-24 },
  { name: 'Zeptometers', symbol: 'zm', factor: 1e-21 },
  { name: 'Attometers', symbol: 'am', factor: 1e-18 },
  { name: 'Femtometers', symbol: 'fm', factor: 1e-15 },
  { name: 'Picometers', symbol: 'pm', factor: 1e-12 },
  { name: 'Nanometers', symbol: 'nm', factor: 1e-9 },
  { name: 'Micrometers', symbol: 'μm', factor: 1e-6 },
  { name: 'Millimeters', symbol: 'mm', factor: 1e-3 },
  { name: 'Centimeters', symbol: 'cm', factor: 1e-2 },
  { name: 'Meters', symbol: 'm', factor: 1 },
  { name: 'Kilometers', symbol: 'km', factor: 1e3 },
  { name: 'Megameters', symbol: 'Mm', factor: 1e6 },
  { name: 'Gigameters', symbol: 'Gm', factor: 1e9 },
  { name: 'Terameters', symbol: 'Tm', factor: 1e12 },
  { name: 'Petameters', symbol: 'Pm', factor: 1e15 },
  { name: 'Exameters', symbol: 'Em', factor: 1e18 },
  { name: 'Zettameters', symbol: 'Zm', factor: 1e21 },
  { name: 'Yottameters', symbol: 'Ym', factor: 1e24 },
  
  // Astronomical
  { name: 'Astronomical Units', symbol: 'au', factor: 149597870700 },
  { name: 'Light Years', symbol: 'ly', factor: 9460730472580800 },
  { name: 'Parsecs', symbol: 'pc', factor: 3.085677581491367e16 },
];

//-------------------------------------------------
// TIME UNITS (conversion factor to seconds)
//-------------------------------------------------
export const timeUnits: TimeUnit[] = [
  { name: 'Millennia', factor: 31557600000, singular: 'Light Millennium', plural: 'Light Millennia' },
  { name: 'Centuries', factor: 3155760000, singular: 'Light Century', plural: 'Light Centuries' },
  { name: 'Decades', factor: 315576000, singular: 'Light Decade', plural: 'Light Decades' },
  { name: 'Years', factor: 31557600, singular: 'Light Year', plural: 'Light Years' },
  { name: 'Months', factor: 2629800, singular: 'Light Month', plural: 'Light Months' },
  { name: 'Weeks', factor: 604800, singular: 'Light Week', plural: 'Light Weeks' },
  { name: 'Days', factor: 86400, singular: 'Light Day', plural: 'Light Days' },
  { name: 'Hours', factor: 3600, singular: 'Light Hour', plural: 'Light Hours' },
  { name: 'Minutes', factor: 60, singular: 'Light Minute', plural: 'Light Minutes' },
  { name: 'Seconds', factor: 1, singular: 'Light Second', plural: 'Light Seconds' },
  { name: 'Milliseconds', factor: 1e-3, singular: 'Light Millisecond', plural: 'Light Milliseconds' },
  { name: 'Microseconds', factor: 1e-6, singular: 'Light Microsecond', plural: 'Light Microseconds' },
  { name: 'Nanoseconds', factor: 1e-9, singular: 'Light Nanosecond', plural: 'Light Nanoseconds' },
  { name: 'Picoseconds', factor: 1e-12, singular: 'Light Picosecond', plural: 'Light Picoseconds' },
  { name: 'Femtoseconds', factor: 1e-15, singular: 'Light Femtosecond', plural: 'Light Femtoseconds' },
  { name: 'Attoseconds', factor: 1e-18, singular: 'Light Attosecond', plural: 'Light Attoseconds' },
  { name: 'Zeptoseconds', factor: 1e-21, singular: 'Light Zeptosecond', plural: 'Light Zeptoseconds' },
  { name: 'Yoctoseconds', factor: 1e-24, singular: 'Light Yoctosecond', plural: 'Light Yoctoseconds' },
];

/**
 * The "Light Time Algo"
 * Calculates the time it takes for light to travel a given distance.
 * @param {number} distance - The numerical value of the distance.
 * @param {number} distanceFactor - The conversion factor of the input distance unit to meters.
 * @returns {{value: number, unit: string}|{error: string}} The result object or an error object.
 */
export function calculateLightTime(distance: number, distanceFactor: number): LightTimeResult | LightTimeError {
  if (typeof distance !== 'number' || isNaN(distance)) {
    return { error: 'Invalid distance: Must be a number.' };
  }
  if (typeof distanceFactor !== 'number' || isNaN(distanceFactor)) {
    return { error: 'Invalid distanceFactor: Must be a number.' };
  }
  if (distance < 0) {
    return { error: 'Distance cannot be negative.' };
  }
  if (distanceFactor <= 0) {
    return { error: 'Distance factor must be positive.' };
  }

  if (distance === 0) {
    return { value: 0, unit: 'Light Seconds' };
  }

  const distanceInMeters = distance * distanceFactor;
  const timeInSeconds = distanceInMeters / SPEED_OF_LIGHT_MS;

  // find the best unit to display the result in
  for (const unit of timeUnits) {
    const timeInUnit = timeInSeconds / unit.factor;
    if (timeInUnit >= 1) {
      const isPlural = timeInUnit !== 1;
      return { value: timeInUnit, unit: isPlural ? unit.plural : unit.singular };
    }
  }

  // fallback for extremely small values
  const yoctoseconds = timeInSeconds / 1e-24;
  const isPlural = yoctoseconds !== 1;
  return { value: yoctoseconds, unit: isPlural ? 'Light Yoctoseconds' : 'Light Yoctosecond' };
}