interface BaseEntity {
    id?: number;
    timestamp: number;
    name: string;
    text: string;
}

export interface Comment extends BaseEntity {
}

export interface Feed extends BaseEntity {
    likes: number;
    comments: Comment[];
}
