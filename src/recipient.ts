import {Variable} from "./variable";

export class Recipient {
    mailAddress: string
    variables: Variable

    constructor(mailAddress: string, variables?: Variable) {
        this.mailAddress = mailAddress;
        this.variables = variables ? variables : {}
    }

    public addVariable(variable: Variable) {
        this.variables = {
            ...this.variables,
            ...variable
        }
    }

    public addVariables(variables: Variable[]) {
        this.variables = {
            ...this.variables,
            ...variables
        }
    }
}
