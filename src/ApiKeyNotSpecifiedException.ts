class ApiKeyNotSpecifiedException extends Error {
    static #errorMessage = 'You did not provide an API Key as an argument nor does an environment variable "DRIFTMAIL_API_KEY" exist.'

    constructor(msg?: string) {
        const message = msg || ApiKeyNotSpecifiedException.#errorMessage
        super(message);
        Object.setPrototypeOf(this, ApiKeyNotSpecifiedException.prototype);
    }
}