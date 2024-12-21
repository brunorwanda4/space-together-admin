export interface CollectionStats {
    name: string;
    document_count: number;
    size_bytes: string;
}

export interface DatabaseStats {
    total_documents: number;
    total_size_bytes: string;
    total_collection: number;
    collections: CollectionStats[];
}
