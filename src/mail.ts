import {Variable} from "./variable";
import {Recipient} from "./recipient";

export class Mail {
    private readonly template: string;
    private variables: Variable
    private readonly recipients: Recipient[];

    constructor(template: string, variables?: Variable) {
        this.template = template;
        this.recipients = [];
        this.variables = variables ? variables : {}
        return this;
    }

    addVariable(variable: Variable) {
        this.variables = {
            ...this.variables,
            ...variable
        }
        return this;
    }

    addVariables(variables: Variable[]) {
        const parsedVariables = variables.map(variable => {
            return {
                ...this.variables,
                ...variable
            }
        })
        parsedVariables.forEach(variable => {
            this.variables = {
                ...this.variables,
                ...variable
            }
        })
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

const mail = new Mail('my-template');
