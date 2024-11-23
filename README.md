# Log Viewer SDK for Node.js

The Log Viewer SDK for Node.js allows you to capture and log events from your Node.js application to the Log Viewer platform so you can monitor and analyze your application's performance and behavior from the Log Viewer UI. Its built with a worker-based architecture, ensuring the main thread remains unaffected. Check out the [Log Viewer](https://logviewer.io) platform for more information. 

## Features

- **Non-blocking logging**: Uses worker threads under the hood.
- **Flexible**: Fits most logging needs.
- **Environment-aware**: Logs events with environment context (production, staging, development).
- **Scalable**: Handles high-frequency logging efficiently.
- **TypeScript ready**: Fully typed for a better developer experience.
- **CommonJS and ESM**: Supports both CommonJS and ESM module systems.

## Installation

Install the package via npm:

```bash
npm install log-viewer-sdk-node
```

## Event Object Structure

The event object passed to the logger should follow this structure:

| **Key**            | **Type**                                              | **Required** | **Description**                                         |
|--------------------|-------------------------------------------------------|--------------|---------------------------------------------------------|
| `level`            | `string`                                              | Yes          | Severity level; `"critical" , "error" , "warn" , "info"`|
| `log_type`         | `string`                                              | Yes          | Type; `"api" , "database" , "internal" , "webhook"`     |
| `message`          | `string`                                              | No           | Descriptive message for the log.                        |
| `stack`            | `string`                                              | No           | Stack trace details.                                    |
| `request_id`       | `string`                                              | No           | Identifier for the request.                             |
| `ip_address`       | `string`                                              | No           | IP address of the client.                               |
| `request_payload`  | `string`                                              | No           | Serialized payload of the request.                      |
| `function_name`    | `string`                                              | No           | Name of the function where the log occurred.            |
| `status_code`      | `number`                                              | No           | HTTP status code.                                       |
| `endpoint`         | `string`                                              | No           | API endpoint or resource being accessed.                |



## Usage

```typescript
import { createEventLogger } from "log-viewer-sdk-node";

const logger = createEventLogger({
  serviceUrl: "https://api.logviewer.io/serviceKey",
  environment: "staging", // or production or development
});

logger({
  level: "info",
  log_type: "internal",
  message: "This is a test message",
});
```


```commonjs
const { createEventLogger } = require("log-viewer-sdk-node");
```

