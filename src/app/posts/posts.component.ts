import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  standalone: false,

  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  postContent: string = ''; // Content for posts
  replySettings: string = 'Everyone can reply';

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

  post(): void {
    console.log('Post content:', this.postContent);
    // Add your post logic here
  }

  selectedFiles: File[] = []; // Holds the selected files
  imagePreviews: string[] = [];

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
  isPostButtonEnabled(): boolean {
    // Enable if there's content or at least one image selected
    return this.postContent.trim().length > 0 || this.imagePreviews.length > 0;
  }
  onContentInput(event: Event): void {
    const element = event.target as HTMLElement;
    this.postContent = element.textContent || '';
    console.log('Content updated:', this.postContent); // Debugging
  }
  isFavorite: boolean = false;

  toggleFavorite() {
    this.isFavorite = !this.isFavorite; // Toggle favorite state
  }
  showCommentSection = false; // To toggle the comment section
  newComment: string = ''; // To bind the input for new comments
  comments: string[] = []; // To store the list of comments


  toggleCommentSection() {
    this.showCommentSection = !this.showCommentSection;
  }


  submitComment() {
    if (this.newComment.trim()) {
      this.comments.push(this.newComment.trim());
      this.newComment = ''; // Clear the input after submission
    }
  }
}
