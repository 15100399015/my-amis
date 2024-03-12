const os = require('os');
const qrcode = require('qrcode-terminal');

function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const config of iface) {
      if (config.family === 'IPv4' && !config.internal) {
        return config.address;
      }
    }
  }
  return '127.0.0.1'; // 如果没有找到，返回本地回环地址
}

function printQr(suffix) {
  const ip = getLocalIPAddress();
  if (!ip) return;
  const url = `http://${ip}${suffix}`;
  console.log('Local IP Address:' + url);
  qrcode.generate(url, {small: true}, function (qrcode) {
    console.log(qrcode);
  });
}

module.exports.printQr = printQr;
