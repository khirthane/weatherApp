export const getWeatherDescription = (code: number | undefined): string => {
  const map: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Light rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    80: 'Light showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
  };
  return code !== undefined ? map[code] || `Code ${code}` : '';
};
