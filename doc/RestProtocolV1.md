# HTTP REST Protocol (version 1) <br/> Tags Microservice

Tags microservice implements a REST compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [Tag class](#class1)
* [GET /tags/:party_id](#operation1)
* [PUT /tags/:party_id](#operation2)
* [POST /tags/:party_id](#operation3)

## Data types

### <a name="class1"></a> Tag class

Represents a record of specific tag usage by the party

**Properties:**
- tag: string - a tag string
- count: number - how manu times the tag was used
- used: Date - date and time when the tag used for the last time

## Operations

### <a name="operation1"></a> Method: 'GET', route '/tags/:party_id'

Retrieves a tags usage history for specified party.

**Parameters:** 
- party_id: string - unique party id

**Response body:**
Array of Tag objects with history of tags used by the party or error

### <a name="operation2"></a> Method: 'PUT', route '/tags/:party_id'

Sets tags usage history for the specified party

**Parameters:** 
- party_id: string - unique party id

**Request body:**
Array of Tag objects with the new history of tags used by the party or error

**Response body:**
Array of Tag objects with the new history of tags used by the party or error

### <a name="operation3"></a> Method: 'POST', route '/tags/:party_id'

Records single instance of tags usage and updates the tags history.

**Parameters:** 
- party_id: string - unique party id
- tags: [string] - array of used tag strings

**Response body:**
Array of Tag objects with updated history of tags used by the party or error

