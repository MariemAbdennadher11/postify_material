export interface PostCreateInput {
    authorId: string;
    content: string;
    images: File[]; // Representing `MultipartFile` as `File` in TypeScript
    videos: File[];
}
export interface PostResponseDto {
    id: string;
    authorNom: string;            
    authorPrenom: string;
    content: string;
    imageURLs: string[];
    videoURLs: string[];
    likes: string[]; // Assuming likes are represented as a list of user IDs or similar
}
export interface PostUpdateInput {
    content: string;
    imagePaths: string[];
    videoPaths: string[];
}