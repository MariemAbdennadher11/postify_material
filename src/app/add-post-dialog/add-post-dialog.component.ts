import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-post-dialog',
  standalone: false,
  
  templateUrl: './add-post-dialog.component.html',
  styleUrl: './add-post-dialog.component.scss'
})
export class AddPostDialogComponent {
  content: string = '';
  replySettings: string = 'Everyone can reply';

  checkContent(): void {
    const editableContent = document.querySelector('.editable-content');
    this.content = editableContent?.textContent || '';
  }

  toggleReplySettings(): void {
    this.replySettings =
      this.replySettings === 'Everyone can reply'
        ? 'Only followers can reply'
        : 'Everyone can reply';
  }

  post(): void {
    console.log('Post content:', this.content);
    // Add your post logic here
  }

  selectedFiles: File[] = []; // Holds the selected files
  imagePreviews: string[] = [];
  // Trigger the file input when the image icon is clicked
  triggerFileUpload() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput.click();
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files); // Convert FileList to Array

      // Clear previous previews
      this.imagePreviews = [];

      // Generate previews for each selected file
      this.selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string); // Add preview to array
        };
        reader.readAsDataURL(file);
      });

      console.log('Selected files:', this.selectedFiles);
    }
  

  // Handle file selection and generate preview
  }   removeImage(index: number) {
    this.imagePreviews.splice(index, 1);
  } }
