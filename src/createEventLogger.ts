import { Worker } from "worker_threads";
import path from "path";
import { LoggerConfigType, EventPropType } from "./types";

// Updated `createEventLogger` function
export const createEventLogger = ({
  serviceKey,
  environment = "development", // Default value for environment
}: LoggerConfigType) => {
  if (!serviceKey) {
    throw new Error("serviceKey is required to initialize the event logger.");
  }

  const apiEndpoint = "https://your-logging-service.com/logs";

  return (event: EventPropType) => {
    // Add environment and timestamp_ms automatically
    const enrichedEvent = {
      ...event,
      environment,
    };

    const worker = new Worker(path.resolve(__dirname, "./logger-worker.js"));

    // Post message to the worker
    worker.postMessage({
      apiEndpoint,
      apiKey: serviceKey,
      event: enrichedEvent,
    });

    // Custom event for worker exit
    worker.on("log-viewer-exit", (code) => {
      if (code !== 0) {
        console.error(`Log Viewer Worker exited with code ${code}`);
      }
    });

    // Custom event for worker error
    worker.on("log-viewer-error", (err) => {
      console.error("Log Viewer Worker error:", err);
    });
  };
};
