# Event Logger

Event Logger is a lightweight, non-blocking logging utility designed for Node.js applications. It allows you to log events asynchronously via a worker-based architecture, ensuring the main thread remains unaffected.

## Features

- **Non-blocking logging**: Uses worker threads under the hood.
- **Customizable**: Accepts user-defined event attributes.
- **Environment-aware**: Logs events with environment context (production, staging, development).
- **Scalable**: Handles high-frequency logging efficiently.
- **TypeScript ready**: Fully typed for a better developer experience.

## Installation

Install the package via npm:

```bash
npm install log-viewer-sdk-node
```

## Event Object Structure

The event object passed to the logger should follow this structure:

| **Key**            | **Type**                                              | **Required** | **Description**                                     |
|---------------------|-------------------------------------------------------|--------------|-----------------------------------------------------|
| `level`            | `"critical" | "error" | "warn" | "info"`         | Yes          | Severity level of the log.                         |
| `log_type`         | `"api" | "database" | "internal" | "webhook"`     | Yes          | Type of log.                                       |
| `message`          | `string`                                              | No           | Descriptive message for the log.                  |
| `stack`            | `string`                                              | No           | Stack trace details.                               |
| `request_id`       | `string`                                              | No           | Identifier for the request.                       |
| `ip_address`       | `string`                                              | No           | IP address of the client.                         |
| `request_payload`  | `string`                                              | No           | Serialized payload of the request.                |
| `function_name`    | `string`                                              | No           | Name of the function where the log occurred.      |
| `status_code`      | `number`                                              | No           | HTTP status code.                                  |
| `endpoint`         | `string`                                              | No           | API endpoint or resource being accessed.          |
| `environment`      | `"production" | "staging" | "development"`          | Yes          | The application environment.                      |
| `timestamp_ms`     | `bigint` (automatically added by the worker)           | Yes          | Timestamp in milliseconds, added by the worker.   |
