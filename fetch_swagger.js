const fs = require('fs');
const https = require('https');

https.get('https://store-api.softclub.tj/swagger/v1/swagger.json', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        try {
            const swagger = JSON.parse(data);
            const summary = {
                paths: Object.keys(swagger.paths).map(path => {
                    return {
                        path,
                        methods: Object.keys(swagger.paths[path]).map(method => ({
                            method,
                            parameters: swagger.paths[path][method].parameters?.map(p => ({
                                name: p.name,
                                in: p.in,
                                required: p.required,
                                type: p.schema?.type || p.type
                            }))
                        }))
                    };
                })
            };
            fs.writeFileSync('swagger_summary.json', JSON.stringify(summary, null, 2));
            console.log('Swagger summary saved to swagger_summary.json');
        } catch (e) {
            console.error('Error parsing JSON:', e);
        }
    });
}).on('error', (err) => {
    console.error('Error fetching swagger:', err.message);
});
