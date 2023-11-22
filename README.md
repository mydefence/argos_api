# Argos API
This repository contains the files needed to build a client interface to Argos -
the MyDefence C2 system backend. For information on the interface refer to the
[documentation](ArgosInterfaceSpecification.pdf).

## Schema Specification
The interface is specified using [JSON Schema](https://json-schema.org), and the
specification  of the messages to/from Argos are placed in the [schema](schema)
folder. Sample messages containing real data is provided in in the
[samples](samples) folder.

### Validation
Messages can be validated against the schema using the validator in
[schema_validator](schema_validator). The validator is a simple Node.js script
with hardcoded relative paths within this folder structure. Therefor it should
be executed from the [schema_validator](schema_validator) folder. Running it
without arguments validates all messages in the [samples](samples) folder:
```
schema_validator$ node index.js
compilation: 344.547ms
validation 1: 57.941ms
validation 2: 5.519ms
All 132 passed!
```

Running with a path to a message file as a single argument validates that
specific message:
```
schema_validator$ node index.js ../samples/alarmStartedApiMsg.json
compilation: 321.702ms
validation 1: 33.667ms
validation 2: 0.061ms
All 1 passed!
```

## Example Client Application
Client with [Socket.io](https://socket.io/) connection to Argos in
  [interface_examples/nodejs](interface_examples/nodejs).
- Application source demonstrates a bare minimum for interacting with Argos.
- Application source written for Node.js in Typescript.
- Refer to [README.md](interface_examples/nodejs/README.md) for more information
  and build instructions.

## Argos Types (Typescript)
Typescript types are provided along side of the example client in the
[interface_examples/argos_types](interface_examples/argos_types) folder. The
client example uses them, and they can be included in any Typescript project.
For more information refer to the
[README.md](interface_examples/argos_types/README.md) and find inspiration in
the example client [source](interface_examples/nodejs).
