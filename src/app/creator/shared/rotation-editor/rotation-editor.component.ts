import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-rotation-editor',
  standalone: true,
  imports: [CommonModule, CdkDrag],
  templateUrl: './rotation-editor.component.html',
  styleUrls: ['./rotation-editor.component.css']
})

export class RotationEditorComponent {
  rotation = 0;

  onDrag(event: CdkDragMove): void {
    const centerX = event.source.element.nativeElement.parentElement.clientWidth / 2;
    const centerY = event.source.element.nativeElement.parentElement.clientHeight / 2;

    const deltaX = event.pointerPosition.x - centerX;
    const deltaY = event.pointerPosition.y - centerY;

    this.rotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  }

  getRotationStyle(): string {
    return `rotate(${this.rotation}deg)`;
  }
}
