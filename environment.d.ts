declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: string;
        MONGODB_USERNAME: string;
        MONGODB_PASSWORD: string;
        MONGODB_CONNECTION: string;
        JWT_SECRET: string;
      }
    }
  }
  
  export {};
  