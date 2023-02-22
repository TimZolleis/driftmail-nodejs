export type DriftmailGetStatusRequestResponse = Job[]

type JobStatus = "waiting" | "sending" | "sent" | "failed"

export type JobResponse = {
    id: string;
    project_id: string;
    request_id: string;
    mail_address: string;
    status: JobStatus;
    failure_cause: string | null
}

type Job = Omit<JobResponse, "failure_cause">
type FailedJob = Job & { failure_cause: string | null }


export class DriftMailStatusResponse {
    private readonly allJobs: Job[];

    private readonly waitingJobs: Job[];
    private readonly failedJobs: FailedJob[]
    private readonly successfulJobs: Job[]

    constructor(allJobs: Job[], failedJobs: FailedJob[], successfulJobs: Job[], waitingJobs: Job[]) {
        this.allJobs = allJobs;
        this.failedJobs = failedJobs;
        this.successfulJobs = successfulJobs;
        this.waitingJobs = waitingJobs;
    }

    getAll() {
        return this.allJobs;
    }

    getFailed() {
        return this.failedJobs;
    }

    getWaiting(){
        return this.waitingJobs
    }

    getSuccessful() {
        return this.successfulJobs;
    }

}