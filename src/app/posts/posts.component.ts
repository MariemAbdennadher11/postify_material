import { Component } from '@angular/core';
import { PostCreateInput, PostResponseDto } from '../shared/DTO/post';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'app-posts',
  standalone: false,

  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  postContent: string = ''; // Content for posts
  replySettings: string = 'Everyone can reply';
  selectedFiles: File[] = []; // Holds the selected files
  imagePreviews: string[] = [];
  showCommentSection = false; // To toggle the comment section
  newComment: string = ''; // To bind the input for new comments
  comments: string[] = []; // To store the list of comments
  posts: PostResponseDto[] = [];
  userId: string = '675f40d53887ab412d23f3bc';
  newPost: PostCreateInput = { authorId: '', content: '', images: [], videos: [] };

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.loadPosts();
  }
  // loadPosts(): void {
  //   this.postService.getAllPosts().subscribe(posts => {
  //       this.posts = posts;
  //   });
  // }
  loadPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        console.log('Posts loaded:', posts); // Debug to ensure posts are loaded
      },
      error: (err) => console.error('Failed to load posts:', err)
    });
  }
  trackByPostId(index: number, post: PostResponseDto): any {
    return post.id; // Assuming each post has a unique ID
  }
  
  // State for content
  checkContent(): void {
    const editableContent = document.querySelector('.editable-content');
    this.postContent = editableContent?.textContent || '';
  }

  toggleReplySettings1(): void {
    this.replySettings =
      this.replySettings === 'Everyone can reply'
        ? 'Only followers can reply'
        : 'Everyone can reply';
  }

  // post(): void {
  //   console.log('Post content:', this.postContent);
  //   // Add your post logic here
  // }

  // createPost(){
  //   if (!this.isPostButtonEnabled()) {
  //     console.warn('Post content or images are required.');
  //     return;
  //   }
  
  //   // Prepare the PostCreateInput object
  //   const postCreateInput: PostCreateInput = {
  //     authorId: '12345', // Replace with the actual authorId from your logic
  //     content: this.postContent.trim(),
  //     images: [],//this.selectedFiles.map((file) => file.name),  Map file names or handle file uploads
  //     videos: [], // Add logic for videos if needed
  //   };
  
  //   // Prepare FormData for file upload
  //   const formData = new FormData();
  //   formData.append('content', postCreateInput.content);
  //   formData.append('authorId', postCreateInput.authorId);
  //   this.selectedFiles.forEach((file) => {
  //     formData.append('images', file);
  //   });
  
  //   // Call the createPost method from the PostService
  //   this.postService.createPost(formData).subscribe({
  //     next: (response) => {
  //       console.log('Post created successfully:', response);
  //       this.loadPosts(); // Refresh posts
  //       this.resetPostForm(); // Clear the form
  //     },
  //     error: (error) => {
  //       console.error('Error creating post:', error);
  //     },
  //   });
  // }
  resetPostForm(): void {
    this.postContent = '';
    this.imagePreviews = [];
    this.selectedFiles = [];
  }
  selectedPost: any;

  selectPost(post: any) {
    this.selectedPost = post;
  }


  // Trigger file input for image selection
  triggerFileUpload1() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput.click();
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files);

      // Clear previous previews
      this.imagePreviews = [];

      // Generate previews
      this.selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);
          console.log('Image preview added:', reader.result); // Debugging
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage1(index: number) {
    this.imagePreviews.splice(index, 1);
    console.log('Removed image at index:', index);
  }
  // isPostButtonEnabled(): boolean {
  //   // Enable if there's content or at least one image selected
  //   return this.postContent.trim().length > 0 || this.imagePreviews.length > 0;
  // }
  onContentInput(event: Event): void {
    const element = event.target as HTMLElement;
    this.postContent = element.textContent || '';
    console.log('Content updated:', this.postContent); // Debugging
  }
  // isFavorite: boolean = false;

  // toggleFavorite() {
  //   this.isFavorite = !this.isFavorite; // Toggle favorite state
  // }

  // Check if the current user has liked the post
//   isFavorite(postId: string): boolean {
//     const post = this.posts.find(p => p.id === postId);
//     const userId = 'currentUserId'; // This should be the actual ID of the current user
//     return post?.likes.includes(userId) ?? false;
// }

// Toggle the favorite state of a post
// toggleFavorite(postId: string): void {
//     let post = this.posts.find(p => p.id === postId);
//     const userId = 'currentUserId'; // Again, use the actual user ID
//     if (post) {
//         if (this.isFavorite(postId)) {
//             post.likes = post.likes.filter(id => id !== userId); // Remove like
//         } else {
//             post.likes.push(userId); // Add like
//         }
//         // Assuming you have a method to update the post in the backend
//         this.postService.updatePost(post).subscribe({
//             next: updatedPost => {
//                 const index = this.posts.findIndex(p => p.id === postId);
//                 this.posts[index] = updatedPost;
//             },
//             error: err => console.error('Failed to update post:', err)
//         });
//     }
// }
// Check if the current user has liked the post
isFavorite(postId: string, userId: string): boolean {
  const post = this.posts.find((p) => p.id === postId);
  return post?.likes?.includes(userId) ?? false;
}

// Toggle the favorite state of a post
toggleFavorite(postId: string): void {
  const userId = this.userId; // Dynamically use the current user's ID
  const isFavorite = this.isFavorite(postId, userId);

  if (isFavorite) {
      // If already liked, remove the like
      this.postService.deleteLike(postId, userId).subscribe({
          next: (updatedPost) => {
              const index = this.posts.findIndex((p) => p.id === postId);
              if (index !== -1) {
                  this.posts[index] = updatedPost; // Update the local posts array
              }
          },
          error: (err) => console.error('Failed to remove like:', err),
      });
  } else {
      // If not liked, add a like
      this.postService.addLike(postId, userId).subscribe({
          next: (updatedPost) => {
              const index = this.posts.findIndex((p) => p.id === postId);
              if (index !== -1) {
                  this.posts[index] = updatedPost; // Update the local posts array
              }
          },
          error: (err) => console.error('Failed to add like:', err),
      });
  }
}

  // toggleCommentSection() {
  //   this.showCommentSection = !this.showCommentSection;
  // }
  // submitComment() {
  //   if (this.newComment.trim()) {
  //     this.comments.push(this.newComment.trim());
  //     this.newComment = ''; // Clear the input after submission
  //   }
  // }
  editPost(post: PostResponseDto) {
    // Handle edit post logic here
    console.log('Editing post:', post);
  }

  deletePost(id: String) {
    // Handle delete post logic here
    console.log('Deleting post:', id);
  }
}
