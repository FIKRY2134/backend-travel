const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const saveBase64Image = (base64String) => {
  const matches = base64String.match(/^data:(.+);base64,(.+)$/);
  const ext = matches[1].split('/')[1];
  const imageData = matches[2];
  const buffer = Buffer.from(imageData, 'base64');
  const fileName = `${uuidv4()}.${ext}`;
  const filePath = path.join(__dirname, '../uploads', fileName);

  fs.writeFileSync(filePath, buffer);
  return `/uploads/${fileName}`;
};

module.exports = {
  saveBase64Image
};
