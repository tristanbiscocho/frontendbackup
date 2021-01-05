export class Mail {
    id: string;
    from: {
        name: string;
        avatar: string;
        email: string;
    };
    to: {
        name: string;
        email: string;
    }[];
    subject: string;
    message: string;
    time: string;
    read: boolean;
    starred: boolean;
    important: boolean;
    hasAttachments: boolean;
    attachments: {
        type: string;
        fileName: string;
        preview: string;
        url: string;
        size: string;
    }[];
    labels: string[];
    folder: string;
    date: any;
    /**
     * Constructor
     *
     * @param mail
     */
    constructor(mail) {
        if (!!mail.ID) {
            this.id = mail.ID;
            this.from = mail.from;
            this.to = mail.to;
            this.subject = mail.Message_Name;
            this.message = mail.Message_Text;
            this.time = mail.time;
            this.read = mail.read;
            this.starred = mail.starred;
            this.important = mail.important;
            this.hasAttachments = mail.hasAttachments;
            this.attachments = mail.attachments;
            this.labels = mail.labels;
            this.folder = mail.folder;
            this.date = mail.Date;
        } else {
            this.id = mail.id;
            this.from = mail.from;
            this.to = mail.to;
            this.subject = mail.subject;
            this.message = mail.message;
            this.time = mail.time;
            this.read = mail.read;
            this.starred = mail.starred;
            this.important = mail.important;
            this.hasAttachments = mail.hasAttachments;
            this.attachments = mail.attachments;
            this.labels = mail.labels;
            this.folder = mail.folder;
            this.date = mail.Date;
        }
    }

    /**
     * Toggle star
     */
    toggleStar(): void {
        this.starred = !this.starred;
    }

    /**
     * Toggle important
     */
    toggleImportant(): void {
        this.important = !this.important;
    }
}
