import { Worker } from "worker_threads";
import path from "path";
import { LoggerConfig, EventObject } from "./types";

// Updated `createEventLogger` function
export const createEventLogger = ({
  apiKey,
  serviceId,
  environment = "development", // Default value for environment
}: LoggerConfig) => {
  if (!apiKey) {
    throw new Error("apiKey is required to initialize the event logger.");
  }
  if (!serviceId) {
    throw new Error("serviceId is required to initialize the event logger.");
  }

  return (eventObject: EventObject) => {
    // Add environment and timestamp_ms automatically
   

    const worker = new Worker(path.resolve(__dirname, "./logger-worker.js"));

    // Post message to the worker
    worker.postMessage({
      loggerConfig: {
        apiKey,
        serviceId,
        environment,
      },
      eventObject,
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
