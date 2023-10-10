module.exports = {
  apps: [
    {
      name: "JCWD-0110-02", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 3002,
      },
      time: true,
    },
  ],
};
