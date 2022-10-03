# Examples

All the Tokra example projects are modeled after a real API that provides a `setTimeout` and `setInterval` functionality at the infrastructure level. _a.k.a a Callback API_.

## Endpoints

No matter the underlying architecture or framework each example will have the same endpoints:

| Method | Path                      | Description                                                                                                                       |
| ------ | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/ping`                   | A health check endpoint that always returns pong                                                                                  |
| POST   | `/v1/timeout`             | Create a new timeout. When the timeout is up, a request will be made back to the caller using the information posted.             |
| GET    | `/v1/timeout`             | Get all active timeouts                                                                                                           |
| GET    | `/v1/timeout/{id}`        | Get a timeout by id                                                                                                               |
| PUT    | `/v1/timeout/{id}/clear`  | Clear a timeout by id                                                                                                             |
| POST   | `/v1/interval`            | Create a new interval. Each time the interval time is up, a request will be made back to the caller using the information posted. |
| GET    | `/v1/interval`            | Get all active intervals                                                                                                          |
| GET    | `/v1/interval/{id}`       | Get an interval by id                                                                                                             |
| PUT    | `/v1/interval/{id}/clear` | Clear an interval by id                                                                                                           |
