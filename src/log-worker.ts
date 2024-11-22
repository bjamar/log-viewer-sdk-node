import { parentPort } from "worker_threads";
import fetch from "node-fetch"; // HTTP request library
import { RequestPayload, WorkerPayload } from "./types";



parentPort?.on("message", async (workerPayload: WorkerPayload) => {
  const { loggerConfig, eventObject } = workerPayload;

  try {
    // Add timestamp_ms to the event
    const requestPayload: RequestPayload = {
      ...eventObject,
      timestamp_ms: BigInt(Date.now()),
      environment: loggerConfig.environment,
    };

    await fetch("https://api.logviewer.io/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggerConfig.apiKey}`,
      },
      body: JSON.stringify(requestPayload),
    });

    // Send success message back to main thread
    parentPort?.postMessage({
      type: 'log-viewer-success',
      message: 'Event logged successfully'
    });
  } catch (error) {
    console.error("Failed to log event:", error);
    parentPort?.postMessage({
      type: 'log-viewer-error',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});
