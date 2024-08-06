import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleFontsService } from './google-fonts.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-font-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './font-selector.component.html',
  styleUrls: ['./font-selector.component.css']
})
export class FontSelectorComponent {
  fonts: string[] = [];
  sizes: number[] = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40];
  styles: string[] = ['normal', 'italic', 'oblique', 'bold', 'bold italic', 'bold oblique'];

  selectedFont: string = 'Roboto';
  selectedSize: number = 16;
  selectedStyle: string = 'normal';
  selectedColor: string = "#CCC";

  @Output() sizeChange = new EventEmitter<number>();
  @Output() styleChange = new EventEmitter<string>();
  @Output() fontChange = new EventEmitter<string>();
  @Output() colorChange = new EventEmitter<string>();

  constructor(private googleFontsService: GoogleFontsService) { }

  ngOnInit(): void {
    this.googleFontsService.getAllFonts().subscribe(fonts => {
      this.fonts = fonts;
    });
  }

  onFontChange() {
    this.loadFont(this.selectedFont);
    this.fontChange.emit(this.selectedFont);
  }

  onSizeChange() {
    this.sizeChange.emit(this.selectedSize);
  }

  onStyleChange() {
    this.styleChange.emit(this.selectedStyle);
  }
 
  onColorChange() {
    this.colorChange.emit(this.selectedColor);
  }

  loadFont(font: string) {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
}
