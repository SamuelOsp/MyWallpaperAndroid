export interface PixabayType {
    id: number;
    pageURL: string;
    type: string;
    tags: string;
    largeImageURL: string;
    imageWidth: number;
    imageHeight: number;
    imageSize: number;
    downloads: number;
    likes: number;
    user: string;
    userImageURL?: string;
}

export interface PixabayResponse {  
  total: number;
  totalHits: number;
  hits: PixabayType[];
}
