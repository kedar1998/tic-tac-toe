class customAPIError extends Error {
  constructor(msg) {
    super(msg);
  }
}

export default customAPIError;
