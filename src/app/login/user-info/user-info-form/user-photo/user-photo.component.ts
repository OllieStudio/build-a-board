import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { UserInfoService } from '../../user-info.service';

@Component({
  selector: 'app-user-profile-photo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-photo-container" (click)="fileInput.click()">
      <img *ngIf="service.photoURL" [src]="service.photoURL" alt="User Profile Photo">
      <i *ngIf="!service.photoURL" class="material-icons user-icon">account_circle</i>
    </div>
    <input #fileInput type="file" (change)="fileChangeEvent($event)" style="display: none;" />
  `,
})

export class UserProfilePhotoComponent  {
  isUploading: boolean = false;
  uploadTask: any;

  constructor(
    private afStorage: AngularFireStorage,
    public service:UserInfoService
  ) {}

 
  fileChangeEvent(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadImage(file);
    }
  }

  uploadImage(file: File): void {
    this.isUploading = true;
    const filePath = `user-profile-photos/${this.service.currentUser?.uid}`; // Use currentUser.uid
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);

    // Observe the upload progress
    task.percentageChanges().subscribe(progress => console.log('Upload is ' + progress + '% done'));

    // When the upload is complete
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.service.updateUserPhoto(url);
          this.isUploading = false;
        });
      })
    ).subscribe();
  }

  
}