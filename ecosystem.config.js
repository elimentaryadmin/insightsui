module.exports = {
  apps: [
    {
      name: 'elimentary-ui',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env: {
        PORT: 3300,
        NODE_ENV: 'production',
        TZ: 'UTC'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3300,
        TZ: 'UTC'
      },
      error_file: 'logs/err.log',
      out_file: 'logs/out.log',
      log_file: 'logs/combined.log',
      time: true,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      max_restarts: 10,
      restart_delay: 4000,
      exp_backoff_restart_delay: 100
    }
  ]
}; 