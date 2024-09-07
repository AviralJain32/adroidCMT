export interface SubmittedPaper {
    paperAuthor: [];
    correspondingAuthor: [];
    paperTitle: string;
    paperFile: string;
    paperKeywords: string[];
    paperAbstract: string;
    paperSubmissionDate: Date;
    conference: { conferenceAcronym: string };
    paperStatus: 'submitted' | 'accepted' | 'rejected' | 'review';
    paperID: string;
}