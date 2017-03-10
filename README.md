# Tags Microservice

This is a search tags microservice from Pip.Services library. 
It keeps track of search tags entered by a party (user or other party he or she represents). 
Later the tags can be used to enhance user experience in autocomplete and search functions.

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca
* External APIs: HTTP/REST, Seneca
* Persistence: Flat Files, MongoDB

This microservice has no dependencies on other microservices.

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services/pip-clients-tags-node)
* Communication Protocols
  - [HTTP/REST Version 1](doc/RestProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services/pip-services-tags.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.json** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.json** file. 

Example of microservice configuration
```javascript
{    
    "logs": {
        "descriptor": { 
            "type": "console"
        },
        "options": { 
            "level": 5
        }
    },    
    "counters": {
        "descriptor": { 
            "type": "log"
        },
        "options": { 
            "timeout": 10000
        }
    },
    "persistence": {
        "descriptor": {
            "group": "pip-services-tags",            
            "type": "file"
        },
        "options": {
            "path": "data/tags.json"
        },
    },    
    "controllers": {
        "descriptor": {
            "group": "pip-services-tags"            
        },
        "options": {
            "maxTagCount": 1000
        }
    },    
    "clients": [],    
    "services": [
        {
            "descriptor": {
                "group": "pip-services-tags",            
                "type": "seneca"
            },
            "endpoint": {
                "protocol": "tcp",
                "host": "localhost",
                "port": 8812
            }
        },
        {
            "descriptor": {
                "group": "pip-services-tags",            
                "type": "rest"
            },
            "endpoint": {
                "protocol": "http",
                "host": "localhost",
                "port": 8012
            }
        }
    ]   
}
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-tags-node": "^1.0.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-tags-node').Version1;
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    endpoint: {
        protocol: 'http',
        host: 'localhost', 
        port: 8012
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.TagsRestClient(config);

// Connect to the microservice
client.open(function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Record tags for a user
client.recordTags(
    null,
    '123',
    ['draft', 'important'],
    function (err, tags) {
        ...
    }
);
```

```javascript
// Get the list of user tags
client.getTags(
    null,
    '123',
    function(err, tags) {
        ...    
    }
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.
