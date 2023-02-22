# driftmail

Driftmail api client for NodeJS
## Installation
You can install the client just by running npm install driftmail:

```sh
npm install driftmail
```

## Usage

### Setting up the client

Since driftmail uses the project approach for sending emails, one client is dedicated to one project, thus instantiated
with an API-Key and a service url. You can either provide your own values to the constructor or add the following
variables to your .env file:

```env
DRIFTMAIL_SERVICE_URL=url
DRIFTMAIL_API_KEY=key
```

```javascript
import {DriftmailClient} from "driftmail";

const client = new DriftmailClient('api-key', 'service-url')
```

Of course you do not have to provide the values twice.

### Setting up the email

Since you can have many templates and variables within a project, the client works with "email" objects that you can set
up and send with the client.

To create an email object, import it and specify the template you want to use it with:

```javascript
import {Mail} from "driftmail";

const mail = new Mail('my-template')
```

You cann now add recipients and (global) variables to the mail object. For example, you could provide global variables,
then loop over an array of
users, create local variables for them and add them to the email:

```typescript
import {Mail, Recipient} from "driftmail";

const mail = new Mail('my-template');
mail.addVariable({
    event: {
        name: "My Event",
        location: "At my event"
    }
})

const users = [
    {
        name: "John Doe",
        email: "john@doe.com"
    },
    {
        name: "Example User",
        email: "user@example.com"
    }]

const recipients = users.map(user => {
    return new Recipient(user.email, {
        name: user.name
    })
})
mail.addRecipients(recipients);
```

As you can see in this example, we first create the email object with a template name, then add a global variable to it.
After that, we create an array of recipients from an array of users where the user's name is a variable and add them to
the mail aswell.

### Sending the email

You can now send the created email with the client you instantiated at the beginning:

```typescript
import {DriftmailClient, Mail} from "driftmail";

const client = new DriftmailClient();
const mail = new Mail('my-template');

//Add recipients, variables etc. here

const requestId = await client.send(mail);
```

When the email was successfully sent, the client will return a "request id" which you can store and check the status of
your emails later (since sending 100s of emails can take a while!). This is a uuid in string format.

### Checking your emails status
After sending your email, you can check its status with the client to see if all your emails were successfully sent or some failed:
```typescript
import {DriftmailClient} from "driftmail"

const client = new DriftmailClient();
const jobs = await client.getStatus(requestId);
```
This status is now a class that prefilters waiting, failed and successful jobs for you.

```typescript
import {DriftmailClient} from "driftmail"

const client = new DriftmailClient();
const jobs = await client.getStatus(requestId);


const allJobs = jobs.getAll();
const failedJobs = jobs.getFailed();
const successfulJobs = jobs.getSuccessful();
const waitingJobs = jobs.getWaiting();
```