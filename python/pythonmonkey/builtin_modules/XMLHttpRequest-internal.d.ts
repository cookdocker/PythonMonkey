/**
 * @file    XMLHttpRequest-internal.d.ts
 * @brief   TypeScript type declarations for the internal XMLHttpRequest helpers
 * @author  Tom Tang <xmader@distributive.network>
 * @date    August 2023
 */

/**
 * `processResponse` callback's argument type
 */
export declare interface XHRResponse {
  /** Response URL */
  url: string;
  /** HTTP status */
  status: number;
  /** HTTP status message */
  statusText: string;
  /** The `Content-Type` header value */
  contentLength: number;
  /** Implementation of the `xhr.getResponseHeader` method */
  getResponseHeader(name: string): string | undefined;
  /** Implementation of the `xhr.getAllResponseHeaders` method */
  getAllResponseHeaders(): string;
}

/**
 * Send request
 */
export declare function request(
  method: string,
  url: string,
  headers: Record<string, string>,
  body: string | Uint8Array,
  timeoutMs: number,
  // callbacks for request body progress
  processRequestBodyChunkLength: (bytesLength: number) => void,
  processRequestEndOfBody: () => void,
  // callbacks for response progress
  processResponse: (response: XHRResponse) => void,
  processBodyChunk: (bytes: Uint8Array) => void,
  processEndOfBody: () => void,
  // callbacks for known exceptions
  onTimeoutError: (err: Error) => void,
  onNetworkError: (err: Error) => void,
): Promise<void>;

/**
 * Decode data using the codec registered for encoding.
 */
export declare function decodeStr(data: Uint8Array, encoding?: string): string;
