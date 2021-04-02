let Converter = require('openapi-to-postmanv2');
let FS = require('fs')

export { };

console.log('VstsOpenApi-to-PostmanCollection');

let openApiJson = await FS.readFile('vsts-rest-api-specs\\specification\\core\\6.1\\core.json', { 'encoding': 'utf8' });

// Remove the UTF-8 BOM because engineers need stupid problems like this to worry about. I really don't enjoy working with Javascript. No, I don.t. Why isn't this just a new property in the options?
openApiJson = openApiJson.replace(/^\uFEFF/, '');

let openApi = JSON.parse(openApiJson);

// console.log('2: ' + JSON.stringify(openApi));

openApi['openapi'] = "3.0";

// console.log('3: ' + JSON.stringify(openApiJson));

let collection = null;

Converter.convert(
    { type: 'json', data: openApi },
    { includeAuthInfoInExample: false },
    (_err: any, conversionResult: { result: any; reason: any; output: { data: any; }[]; }) => {
        if (!conversionResult.result) {
            console.log('Could not convert\n', conversionResult.reason);
        }
        else {
            collection = conversionResult.output[0].data;
        }
    }
);

console.log(collection);

