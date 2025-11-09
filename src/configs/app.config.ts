type AppConfig = {
  stage?: string;
  apiUrl: string;
  username: string;
  password: string;
};

// Define configuration based on environment variables
export const appConfig: AppConfig = {
  stage: process.env.VITE_STAGE,
  apiUrl: process.env.VITE_API_SWAGGER || "http://localhost:3001",
  username: "vuongduongbuh@gmail.com",
  password: "Admin@123",
};
