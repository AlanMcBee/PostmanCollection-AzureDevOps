let Converter = require('openapi-to-postmanv2'),
    FS = require('fs')
    ;

console.log('VstsOpenApi-to-PostmanCollection');

let openApiJson = FS.readFileSync('..\\vsts-rest-api-specs\\specification\\core\\6.1\\core.json', {encoding: 'UTF8'})

Converter.convert({ type: 'string', data: openApiJson },
  {}, (_err, conversionResult) => {
    if (!conversionResult.result) {
      console.log('Could not convert', conversionResult.reason);
    }
    else {
      console.log('The collection object is: ', conversionResult.output[0].data);
    }
  }
);