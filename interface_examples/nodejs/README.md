# ARGOS Client Sample Code

This directory contains a simple sample of how to connect to ARGOS using node.js
and typescript. An npm package containing ARGOS API types is distributed
alongside this sample.

## Prequisites

-   node.js
-   npm

We test with the latest node.js version available at the start of the
development cycle. The `@types/node` dependency in [package.json](package.json)
indicates the used node.js version.

## Compiling and Running

Update `API_GATEWAY_IP` in `ts_src/index.ts` to point to your ARGOS server. Then execute:

    npm install --install-links
    npm start
