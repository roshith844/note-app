export interface ListNote {
    title?: string;
    list?: {
        content: string;
        strike: boolean;
    }[];
    date?: Date;
    type: string;
}
