export interface BaseEntity {
    id?: number;
    timestamp: number;
    name: string;
    text: string;
}

export interface Comment extends BaseEntity {
}

export interface Feed extends BaseEntity {
    parsedAuthor?: string;
    isParsed?: boolean;
    likes: number;
    comments: Comment[];
}