// src/app/google-fonts.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleFontsService {
  private apiKey = environment.FONTS_API_KEY; // Replace with your Google Fonts API Key
  private apiUrl = `https://www.googleapis.com/webfonts/v1/webfonts?key=${this.apiKey}`;

  constructor(private http: HttpClient) {}

  getAllFonts(): Observable<string[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.items.map((font: any) => font.family))
    );
  }
}
