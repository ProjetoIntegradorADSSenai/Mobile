import 'dotenv/config';

export default {
  expo: {
    name: "mobileApp",
    slug: "mymobileapp",
    version: "1.0.0",
    scheme: "myapp",
    android: {
      package: "com.guilhermeamargo.mymobileapp",
    },
    ios: {
      bundleIdentifier: "com.guilhermeamargo.mymobileapp",
    },
    extra: {
      eas: {
        projectId: "f9c3633e-1c7f-4e88-929a-cf9f42b6b92f",
      },
      githubClientId: process.env.GITHUB_ID || "SUA_CLIENT_ID_AQUI",
      githubSecret: process.env.GITHUB_SECRET || "SEU_GITHUB_SECRET_AQUI",
      nextAuthSecret: process.env.NEXTAUTH_SECRET || "SEU_NEXTAUTH_SECRET_AQUI",
    },
  }, 
};
