const prod = 'https://api-dxf6gly5ia-uc.a.run.app';

const local = 'http://127.0.0.1:5001/jarvis-portfolio-backend/us-central1/api';

let URI = process.env.NODE_ENV === 'development' ? local : prod;

export const backendUrl = URI;
