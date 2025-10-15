const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

(async () => {
  try {
    const testPath = path.join(__dirname, 'test.js');
    fs.writeFileSync(testPath, "console.log('hello from test');\n");

    const form = new FormData();
    form.append('codeFile', fs.createReadStream(testPath), {
      filename: 'test.js',
      contentType: 'text/javascript'
    });

    const { data, status } = await axios.post('http://localhost:5000/api/review/anonymous-upload', form, {
      headers: form.getHeaders()
    });
    console.log('Status:', status);
    console.log('Response:', data);
  } catch (err) {
    if (err.response) {
      console.log('Status:', err.response.status);
      console.log('Response:', err.response.data);
    } else {
      console.error('Error:', err.message);
    }
  }
})();


