import { Component, ElementRef, ViewChild } from '@angular/core';

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

  // Post content
  post(): void {
    console.log('Posting:', this.content, this.selectedFiles);
    // Add your post logic here
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
}
