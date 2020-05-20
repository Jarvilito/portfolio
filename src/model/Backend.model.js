const prod = "https://jarvis-portfolio.herokuapp.com";

const local = "http://localhost:5000";

let backend;

if (process.env.NODE_ENV === "development") {
  backend = local;
} else {
  backend = prod;
}
// https://jarvis-portfolio.herokuapp.com

// http://localhost:5000

export const backendUrl = backend;
