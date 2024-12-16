import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-post-dialog',
  standalone: false,

  templateUrl: './add-post-dialog.component.html',
  styleUrl: './add-post-dialog.component.scss'
})
export class AddPostDialogComponent {
  content: string = ''; // Content for the dialog
  selectedFiles: File[] = []; // Files selected in the dialog
  imagePreviews: string[] = []; // Previews for dialog's images
  userId: string = '675f40d53887ab412d23f3bc';
  @Output() postAdded = new EventEmitter<void>();

   constructor(
    private postService: PostService,
    public dialogRef: MatDialogRef<AddPostDialogComponent>
  ) { }


  // File upload trigger
  triggerFileUpload(): void {
    const fileInput = document.querySelector('#dialogFileInput') as HTMLInputElement;
    if (fileInput) fileInput.click();
  }

  // Handle file selection
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

  // Remove selected image
  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
  }

  

  isPostButtonEnabled(): boolean {
    // Enable if there's content or at least one image selected
    return this.content.trim().length > 0 || this.imagePreviews.length > 0;
  }
  onContentInput(event: Event): void {
    const element = event.target as HTMLElement;
    this.content = element.textContent || '';
    console.log('Content updated:', this.content); // Debugging
  }
  createPost(): void {
    if (!this.isPostButtonEnabled()) {
      console.warn('Post content or images are required.');
      return;
    }
  
    const formData = new FormData();
    formData.append('authorId', this.userId);
    formData.append('content', this.content.trim());
    this.selectedFiles.forEach((file) => formData.append('images', file));
  
    this.postService.createPost(formData).subscribe({
      next: (response) => {
        console.log('Post created successfully:', response);
  
       
        this.closeDialog(this.dialogRef); // Close the dialog
        this.postAdded.emit(); // Notify parent component
        this.resetPostForm(); // Clear the form inputs
      },
      error: (error) => {
        console.error('Error creating post:', error);
      },
    });
  }
  resetPostForm(): void {
    this.content = '';
    this.imagePreviews = [];
    this.selectedFiles = [];
  }
  
  closeDialog(dialogRef: any): void {
    dialogRef.close(); // Close the dialog using MatDialog API
  }
}
