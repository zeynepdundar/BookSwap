interface BookItem {
    id: string;
    title: string;
    publisher?: string
    coverUrl?:string;
    author?: string;
    owners?: string[];
}