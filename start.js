const { spawn } = require('child_process');
const path = require('path');

// Start the backend server
const backend = spawn(path.join(__dirname, 'backend', 'venv', 'Scripts', 'python.exe'), ['server.py'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: false
});

const frontend = spawn('npx.cmd', ['next', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});