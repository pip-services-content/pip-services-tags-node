# HTTP REST Protocol (version 1) <br/> Tags Microservice

Tags microservice implements a REST compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [PartyTagsV1 class](#class1)
* [TagRecordV1 class](#class2)
* [POST /tags/get_tags](#operation1)
* [POST /tags/set_tags](#operation2)
* [POST /tags/record_tags](#operation3)

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

### <a name="operation1"></a> Method: 'POST', route '/tags/get_tags'

Retrieves a tags usage history for specified party.

**Request body:** 
- party_id: string - unique party id

**Response body:**
PartyTagsV1 object or error

### <a name="operation2"></a> Method: 'POST', route '/tags/set_tags'

Sets tags usage history for the specified party

**Request body:**
party_tags: PartyTagsV1 - object with party id and recorded tags

**Response body:**
PartyTagsV1 object or error

### <a name="operation3"></a> Method: 'POST', route '/tags/record_tags'

Records single instance of tags usage and updates the tags history.

**Parameters:** 
- party_id: string - unique party id
- tags: [string] - array of used tag strings

**Response body:**
PartyTagsV1 object or error

