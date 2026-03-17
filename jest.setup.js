import '@testing-library/jest-dom';

// jsdom does not implement scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn();

// Polyfill the Web Fetch API Response for Next.js route handler tests.
// jsdom runs in a browser-like environment but doesn't expose the server-side
// Response global that Next.js API routes depend on.
global.Response = class Response {
  constructor(body, init = {}) {
    this.status = init.status ?? 200;
    this._body = body;
  }
  async json() {
    return JSON.parse(this._body);
  }
  static json(data, init = {}) {
    return new global.Response(JSON.stringify(data), init);
  }
};
