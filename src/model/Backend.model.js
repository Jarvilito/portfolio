const prod = 'https://api-dxf6gly5ia-uc.a.run.app';

const local = 'http://localhost:5001';

let URI = process.env.NODE_ENV === 'development' ? local : prod;

export const backendUrl = URI;
