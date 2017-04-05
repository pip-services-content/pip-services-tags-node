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

* [PartyTagsV1 class](#class1)
* [TagRecordV1 class](#class2)
* [cmd: 'get_tags'](#operation1)
* [cmd: 'set_tags'](#operation2)
* [cmd: 'record_tags'](#operation3)

## Data types

### <a name="class1"></a> PartyTagsV1 class

Contains collection of all recorded tags used by a party

**Properties:**
- id: string - unique party id
- tags: TagRecordV1[] - array with recorded tags
- changed_time: Date - date and time when the tags where changed

### <a name="class2"></a> TagRecordV1 class

Represents a record of specific tag usage by the party

**Properties:**
- tag: string - a tag string
- count: number - how manu times the tag was used
- last_time: Date - date and time when the tag used for the last time

## Operations

### <a name="operation1"></a> Cmd: 'get_tags'

Retrieves a tags usage history for specified party.

**Arguments:** 
- party_id: string - unique party id

**Returns:**
- err: Error - occured error or null for success
- party_tags: PartyTagsV1 - object with party id and recorded tags

### <a name="operation2"></a> Cmd: 'set_tags'

Sets tags usage history for the specified party

**Arguments:** 
- party_tags: PartyTagsV1 - object with party id and recorded tags

**Returns:**
- err: Error - occured error or null for success
- party_tags: PartyTagsV1 - object with party id and recorded tags

### <a name="operation3"></a> Cmd: 'record_tags'

Records single instance of tags usage and updates the tags history.

**Arguments:** 
- party_id: string - unique party id
- tags: [string] - tags used by the party to be added to the history

**Returns:**
- err: Error - occured error or null for success
- party_tags: PartyTagsV1 - object with party id and recorded tags
