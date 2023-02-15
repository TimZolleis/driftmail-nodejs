import {Variable} from "./variable";
import {Recipient} from "./recipient";

export class Mail {
    private readonly template: string;
    private variables: Variable[]
    private recipients: Recipient[];

    constructor(template: string) {
        this.template = template;
        this.recipients = [];
        return this;
    }

    addVariable(variable: Variable) {
        this.variables.push(variable);
        return this;
    }

    addVariables(variables: Variable[]) {
        this.variables.push(...variables);
        return this;
    }

    addRecipients(recipients: Recipient[]) {
        this.recipients.push(...recipients);
        return this;
    }

    addRecipient(recipient: Recipient) {
        this.recipients.push(recipient);
        return this;
    }

    getRequestObject() {
        return {
            mail: {
                template: this.template
            },
            variables: this.variables,
            recipients: this.recipients
        }
    }
}

