let Converter = require('openapi-to-postmanv2');
let FS = require('node:fs')

console.log('VstsOpenApi-to-PostmanCollection');

let openApiJson = FS.readFileSync('vsts-rest-api-specs\\specification\\core\\6.1\\core.json');

let openApi = JSON.parse(openApiJson);

openApi['openapi'] = "3.0";

Converter.convert(
    { type: 'json', data: openApi },
    { includeAuthInfoInExample: false },
    (_err: any, conversionResult: { result: any; reason: any; output: { data: any; }[]; }) => {
        if (!conversionResult.result) {
            console.log('Could not convert\n', conversionResult.reason);
        }
        else {
            console.log('The collection object is: ', conversionResult.output[0].data);
        }
    }
);
