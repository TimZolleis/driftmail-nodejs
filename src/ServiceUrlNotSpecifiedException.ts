class ServiceUrlNotSpecifiedException extends Error {
    static #errorMessage = 'You did not provide a service URL as an argument nor does an environment variable "DRIFTMAIL_SERVICE_URL exist.'

    constructor(msg?: string) {
        const message = msg || ServiceUrlNotSpecifiedException.#errorMessage
        super(message);
        Object.setPrototypeOf(this, ServiceUrlNotSpecifiedException.prototype);
    }
}