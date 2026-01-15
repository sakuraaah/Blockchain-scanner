export const getJsonSafe = (
  data: unknown
): {
  data: any;
  success: boolean;
  error: unknown;
} => {
  if (typeof data !== 'string') {
    return {
      data,
      success: true,
      error: null,
    };
  }

  try {
    const jsonData = JSON.parse(data);

    return {
      data: jsonData,
      success: true,
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      success: false,
      error: e,
    };
  }
};
