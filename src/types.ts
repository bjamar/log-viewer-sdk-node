
export interface EventObject {
    log_type: 'api' | 'database' | 'internal' | 'webhook'; // Type of log, required
    level: 'critical' | 'error' | 'warn' | 'info'; // Severity level, required
    message: string; // log message
    request_id?: string | null; // Optional request identifier
    ip_address?: string | null; // Optional IP address
    request_payload?: string | null; // Optional request payload as a string
    function_name?: string | null; // Optional function name
    status_code?: number | null; // Optional status code, equivalent to tinyInt
    endpoint?: string | null; // Optional endpoint
    stack?: string | null; // Optional stack trace
  }
  

export interface LoggerConfig {
  serviceUrl: string;
  environment: 'production' | 'staging' | 'development'; // Environment type, required
}


export interface WorkerPayload {
  loggerConfig: LoggerConfig;
  eventObject: EventObject;
}

export interface RequestPayload extends EventObject {
  environment: 'production' | 'staging' | 'development';
  timestamp_ms: bigint;
}
