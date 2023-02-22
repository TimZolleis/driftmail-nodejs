import {Mail} from "./mail";
import axios, {AxiosInstance} from "axios";
import {DriftmailGetStatusRequestResponse, DriftMailStatusResponse, JobResponse} from "./GetStatusRequestResponse";


export class DriftmailClient {
    private readonly apiKey: string;
    private readonly serviceUrl: string;
    private client: AxiosInstance

    constructor(apiKey?: string, serviceUrl?: string) {
        if (!apiKey && !process.env.DRIFTMAIL_API_KEY) {
            throw new ApiKeyNotSpecifiedException()
        }
        this.apiKey = apiKey ? apiKey : process.env.DRIFTMAIL_API_KEY!
        if (!serviceUrl && !process.env.DRIFTMAIL_SERVICE_URL) {
            throw new ServiceUrlNotSpecifiedException()
        }
        this.serviceUrl = serviceUrl ? serviceUrl : process.env.DRIFTMAIL_SERVICE_URL!
        this.client = axios.create({
            baseURL: this.serviceUrl,
            headers: {
                'X-API-KEY': this.apiKey
            }
        })
    }

    async send(mail: Mail) {
        const response = await this.client.post('/api/mail/send', mail.getRequestObject())
        return <string>response.data.request_id
    }

    async getStatus(request_id: string) {
        const response = await this.client.get(`/api/mail/status/${request_id}`);
        const jobs: JobResponse[] = response.data.jobs
        const successfulJobs = jobs.filter(job => {
            return job.status === "sent"
        })
        const failedJobs = jobs.filter(job => {
            return job.status === "failed"
        })
        const waitingJobs = jobs.filter(job => {
            return job.status === "waiting" || job.status === "sending"
        })
        return new DriftMailStatusResponse(jobs, failedJobs, successfulJobs, waitingJobs)
    }
}