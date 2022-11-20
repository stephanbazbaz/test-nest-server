export const configService = ((env) => {
  const get = (key: string): string | number => {
    return env[key];
  };

  return {
    get,
  };
})(process.env);
