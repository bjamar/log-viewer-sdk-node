
export interface EventPropType {
    log_type: 'api' | 'database' | 'internal' | 'webhook'; // Type of log, required
    level: 'critical' | 'error' | 'warn' | 'info'; // Severity level, required
    request_id?: string | null; // Optional request identifier
    ip_address?: string | null; // Optional IP address
    request_payload?: string | null; // Optional request payload as a string
    function_name?: string | null; // Optional function name
    status_code?: number | null; // Optional status code, equivalent to tinyInt
    endpoint?: string | null; // Optional endpoint
    message?: string | null; // Optional log message
    stack?: string | null; // Optional stack trace
  }
  

export interface LoggerConfigType {
  serviceKey: string; // Foreign key to the service table, required
  environment: 'production' | 'staging' | 'development'; // Environment type, required
}

export interface LogRequestType {
  timestamp_ms: bigint;
  log: EventPropType;
  config: LoggerConfigType;
}
