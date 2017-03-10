# Seneca Protocol (version 1) <br/> Tags Microservice

Tags microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    type: 'tcp', // Microservice seneca protocol
    localhost: 'localhost', // Microservice localhost
    port: 8812, // Microservice seneca port
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'tags',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [Tag class](#class1)
* [cmd: 'get_tags'](#operation1)
* [cmd: 'set_tags'](#operation2)
* [cmd: 'record_tags'](#operation3)

## Data types

### <a name="class1"></a> Tag class

Represents a record of specific tag usage by the party

**Properties:**
- tag: string - a tag string
- count: number - how manu times the tag was used
- used: Date - date and time when the tag used for the last time

## Operations

### <a name="operation1"></a> Cmd: 'get_tags'

Retrieves a tags usage history for specified party.

**Arguments:** 
- party_id: string - unique party id

**Returns:**
- err: Error - occured error or null for success
- result: [Tag] - history of tags used by the party

### <a name="operation2"></a> Cmd: 'set_tags'

Sets tags usage history for the specified party

**Arguments:** 
- party_id: string - unique party id
- tags: [Tag] - history of tags to be stored for the party

**Returns:**
- err: Error - occured error or null for success
- result: [Tag] - updated history of tags used by the party

### <a name="operation3"></a> Cmd: 'record_tags'

Records single instance of tags usage and updates the tags history.

**Arguments:** 
- party_id: string - unique party id
- tags: [string] - tags used by the party to be added to the history

**Returns:**
- err: Error - occured error or null for success
- result: [Tag] - updated history of tags used by the party
