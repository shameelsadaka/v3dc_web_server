module.exports = {
  apps : [
    {
      name:'v3dc',
      script: 'dist/index.js',
      env: {
        "PORT": 3000,
        "NODE_ENV": "development"
      },
      env_production: {
          "PORT": 80,
          "NODE_ENV": "production",
      },
      env_https: {
          "PORT": 443,
          "NODE_ENV": "production",
      }
    },
  ],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
