export const errorHandle = (error: unknown) => {
  if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error('An unexpected error occurred.');
  }
};
