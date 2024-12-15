import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostCreateInput, PostResponseDto, PostUpdateInput } from '../DTO/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://localhost:8080/post'; // Adjust the URL as needed

    constructor(private http: HttpClient) {}

    getAllPosts(): Observable<PostResponseDto[]> {
        return this.http.get<PostResponseDto[]>(`${this.baseUrl}/all`);
    }

    getPostsByAuthorId(authorId: string): Observable<PostResponseDto[]> {
        return this.http.get<PostResponseDto[]>(`${this.baseUrl}/${authorId}`);
    }

    getPostById(postId: string): Observable<PostResponseDto> {
        return this.http.get<PostResponseDto>(`${this.baseUrl}/${postId}`);
    }

    createPost(postCreateInput: PostCreateInput): Observable<PostResponseDto> {
        const formData: FormData = new FormData();
        formData.append('authorId', postCreateInput.authorId);
        formData.append('content', postCreateInput.content);
        postCreateInput.images.forEach(image => formData.append('images', image));
        postCreateInput.videos.forEach(video => formData.append('videos', video));

        return this.http.post<PostResponseDto>(`${this.baseUrl}/create`, formData);
    }
      // Add a like to a post
    addLike(postId: string, userId: string): Observable<PostResponseDto> {
        return this.http.post<PostResponseDto>(`${this.baseUrl}/${postId}/like/${userId}`, {});
    }
    deleteLike(postId: string, userId: string): Observable<PostResponseDto> {
        return this.http.delete<PostResponseDto>(`${this.baseUrl}/${postId}/dislike/${userId}`, {});
    }

    updatePost(postId: string, postUpdateInput: PostUpdateInput): Observable<PostResponseDto> {
        return this.http.put<PostResponseDto>(`${this.baseUrl}/${postId}`, postUpdateInput);
    }

    deletePost(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
    }

}
