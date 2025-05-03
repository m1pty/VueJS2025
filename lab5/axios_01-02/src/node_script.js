const axios = require('axios');

axios.get('https://json.geoiplookup.io/')
    .then(response => console.log('GeoIP:', response.data))
    .catch(error => console.error('GeoIP Error:', error));

axios.get('https://vk.com')
    .then(response => console.log('VK:', response))
    .catch(error => console.error('VK Error:', error));