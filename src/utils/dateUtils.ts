/**
 * Utility functions for date formatting and manipulation
 * Used for dynamic structured data generation
 */

// Format date to ISO 8601 format with timezone offset for Schema.org
export const formatISODate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString();
};

// Get current date in ISO format
export const getCurrentISODate = (): string => {
  return new Date().toISOString();
};

// Format a date range for event schema
export const formatEventDate = (
  date: string, 
  time: string, 
  durationHours: number = 2
): { startDate: string, endDate: string } => {
  // Parse date (DD/MM) and time (HH:MM)
  const [day, month] = date.split('/');
  const [hours, minutes] = time.split(':');
  
  // Create date object using current year
  const currentYear = new Date().getFullYear();
  const startDateTime = new Date(currentYear, parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
  
  // Calculate end time based on duration
  const endDateTime = new Date(startDateTime);
  endDateTime.setHours(endDateTime.getHours() + durationHours);
  
  // Return ISO format strings with Brazilian timezone (-03:00)
  return {
    startDate: startDateTime.toISOString().replace('Z', '-03:00'),
    endDate: endDateTime.toISOString().replace('Z', '-03:00')
  };
};

// Check if an event is in the future
export const isFutureEvent = (date: string): boolean => {
  const [day, month] = date.split('/');
  const currentYear = new Date().getFullYear();
  const eventDate = new Date(currentYear, parseInt(month) - 1, parseInt(day));
  return eventDate >= new Date();
};

// Calculate dynamic copyright year range
export const getCopyrightYearRange = (startYear: number): string => {
  const currentYear = new Date().getFullYear();
  return startYear === currentYear ? `${currentYear}` : `${startYear}-${currentYear}`;
};