import { Component } from '@angular/core';
import { PostCreateInput, PostResponseDto, PostUpdateInput } from '../shared/DTO/post';
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
  // showCommentSection = false; // To toggle the comment section
  // newComment: string = ''; // To bind the input for new comments
  // comments: string[] = []; // To store the list of comments
  posts: PostResponseDto[] = [];
  userId: string = '675f40d53887ab412d23f3bc';
  // newPost: PostCreateInput = { authorId: '', content: '', images: [], videos: [] };

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.loadPosts();
  }
  // Load existing posts
  loadPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        console.log('Posts loaded:', posts); // Debugging
      },
      error: (err) => console.error('Failed to load posts:', err),
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

  // onContentInput(event: Event): void {
  //   const element = event.target as HTMLElement;
  //   this.postContent = element.textContent || '';
  //   console.log('Content updated:', this.postContent); // Debugging
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

  // editPost(post: PostResponseDto): void {
  //   const updatedContent = prompt('Edit your post content:', post.content);
    
  //   if (updatedContent !== null && updatedContent.trim() !== '') {
  //     const postUpdateInput: PostUpdateInput = {
  //       content: updatedContent.trim(),
  //       imagePaths: post.imagePaths || [], // Provide an empty array if no images
  //       videoPaths: post.videoPaths || []  // Provide an empty array if no videos
  //     };
  
  //     this.postService.updatePost(post.id, postUpdateInput).subscribe({
  //       next: (updatedPost) => {
  //         console.log('Post updated successfully:', updatedPost);
  
  //         // Update the post in the local posts array
  //         const index = this.posts.findIndex((p) => p.id === post.id);
  //         if (index !== -1) {
  //           this.posts[index] = updatedPost;
  //         }
  //       },
  //       error: (err) => console.error('Error updating post:', err),
  //     });
  //   } else {
  //     console.warn('Post update cancelled or invalid content.');
  //   }
  // }

  deletePost(id: string): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(id).subscribe({
        next: () => {
          console.log('Post deleted successfully.');
  
          // Remove the deleted post from the local posts array
          this.posts = this.posts.filter((post) => post.id !== id);
        },
        error: (err) => console.error('Error deleting post:', err),
      });
    } else {
      console.log('Post deletion cancelled.');
    }
  }
  
  // Enable Post Button
  isPostButtonEnabled(): boolean {
    return this.postContent.trim().length > 0 || this.selectedFiles.length > 0;
  }

  // Create a New Post
  createPost(): void {
    if (!this.isPostButtonEnabled()) {
      console.warn('Post content or images are required.');
      return;
    }
  
    const formData = new FormData();
    formData.append('authorId', this.userId);
    formData.append('content', this.postContent.trim());
    this.selectedFiles.forEach((file) => formData.append('images', file));
  
    this.postService.createPost(formData).subscribe({
      next: (response) => {
        console.log('Post created successfully:', response);
        this.loadPosts(); // Refresh the posts list
        this.resetPostForm(); // Clear the form inputs
      },
      error: (error) => {
        console.error('Error creating post:', error);
      },
    });
  }
  resetPostForm(): void {
    this.postContent = '';
    this.imagePreviews = [];
    this.selectedFiles = [];
  }

//   isEditing: { [postId: string]: boolean } = {}; // Tracks editing state for each post
// editedContent: { [postId: string]: string } = {}; // Holds the edited content for each post

// Enable edit mode for a post
enableEdit(post: PostResponseDto): void {
  this.isEditing[post.id] = true;
  this.editedContent[post.id] = post.content; // Initialize with current content
}

// Update the post using the backend
// updatePost(post: PostResponseDto): void {
//   const updatedContent = this.editedContent[post.id]?.trim();
//   if (!updatedContent || updatedContent === post.content) {
//     console.warn('No changes to update.');
//     return;
//   }

//   const postUpdateInput: PostUpdateInput = {
//     content: updatedContent,
//     imagePaths: post.imageURLs || [], // Default empty if not provided
//     videoPaths: post.videoURLs || [],
//   };

//   this.postService.updatePost(post.id, postUpdateInput).subscribe({
//     next: (updatedPost) => {
//       console.log('Post updated successfully:', updatedPost);

//       // Update the post locally
//       const index = this.posts.findIndex((p) => p.id === post.id);
//       if (index !== -1) {
//         this.posts[index] = updatedPost;
//       }

//       this.isEditing[post.id] = false; // Exit edit mode
//     },
//     error: (err) => console.error('Error updating post:', err),
//   });
// }
updatePost(post: PostResponseDto): void {
  const updatedContent = this.editedContent[post.id]?.trim();
  if (!updatedContent || updatedContent === post.content) {
    console.warn('No changes to update.');
    return;
  }

  const postUpdateInput: PostUpdateInput = { content: updatedContent };

  this.postService.updatePost(post.id, postUpdateInput).subscribe({
    next: (updatedPost) => {
      console.log('Post updated successfully:', updatedPost);

      // Update the post locally
      const index = this.posts.findIndex((p) => p.id === post.id);
      if (index !== -1) {
        this.posts[index] = updatedPost;
      }

      this.isEditing[post.id] = false; // Exit edit mode
    },
    error: (err) => console.error('Error updating post:', err),
  });
}
onContentInput(event: Event, postId: string): void {
  const target = event.target as HTMLElement; // Typecast EventTarget to HTMLElement
  if (target && target.innerText !== null) {
    this.editedContent[postId] = target.innerText;
  }
}

// Cancel edit mode
cancelEdit(postId: string): void {
  this.isEditing[postId] = false;
}
isEditing: { [postId: string]: boolean } = {}; // Tracks editing state for each post
editedContent: { [postId: string]: string } = {}; // Tracks the edited content

}
