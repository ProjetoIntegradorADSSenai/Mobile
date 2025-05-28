import 'dotenv/config';

export default {
  expo: {
    name: "mobileApp",
    slug: "mymobileapp",
    version: "1.0.0",
    scheme: "myapp",
    extra: {
      githubClientId: process.env.GITHUB_ID || "SUA_CLIENT_ID_AQUI",
      githubSecret: process.env.GITHUB_SECRET || "SEU_GITHUB_SECRET_AQUI",
      nextAuthSecret: process.env.NEXTAUTH_SECRET || "SEU_NEXTAUTH_SECRET_AQUI",
    },
  },
};
