module.exports = {
  apps: [{
    name: 'toz-yapi-api',
    script: 'src/app.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    watch: false,
    ignore_watch: ['node_modules', 'logs'],
    max_memory_restart: '1G',
    node_args: '--max_old_space_size=4096',
    kill_timeout: 5000,
    listen_timeout: 8000,
    wait_ready: true,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};