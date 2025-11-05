// Utility function to preserve all URL parameters
export const preserveAllParams = (baseUrl: string): string => {
  try {
    // Get current URL parameters
    const currentParams = new URLSearchParams(window.location.search);

    // Create new URL object
    const url = new URL(baseUrl);

    // Add ALL parameters from current URL
    currentParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    return url.toString();
  } catch (error) {
    console.warn('Error preserving URL parameters:', error);
    return baseUrl;
  }
};

// Hook to get preserved URL
export const usePreservedURL = (baseUrl: string): string => {
  return preserveAllParams(baseUrl);
};

// Backward compatibility - keeping the old function name
export const preserveUTMParams = preserveAllParams;