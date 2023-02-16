export type DriftmailGetStatusRequestResponse = Job[]
type Job = {
    id: string;
    project_id: string;
    request_id: string;
    mail_address: string;
    status: string;
}