const config = import(`./${
  process.env.REACT_APP_ENVIRONMENT
}`);

export default config;