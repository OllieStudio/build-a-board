import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface ImageGenerationResponse {
  predictions: Array<{
    bytesBase64Encoded: string;
    mimeType: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleImagenService {
  private readonly apiUrl = `https://us-central1-aiplatform.googleapis.com/v1/projects/${environment.firebase.projectId}/locations/us-central1/publishers/google/models/imagegeneration:predict`;
  
  constructor(private http: HttpClient) {}

  generateImages(textPrompt: string, imageCount: number): Observable<string[]> {
    const body = {
      instances: [
        {
          prompt: textPrompt
        }
      ],
      parameters: {
        sampleCount: imageCount
      }
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAccessToken()}`,
      'Content-Type': 'application/json; charset=utf-8'
    });

    return this.http.post<ImageGenerationResponse>(this.apiUrl, body, { headers }).pipe(
      map(response => this.processResponse(response)),
      catchError(this.handleError)
    );
  }

  private processResponse(response: ImageGenerationResponse): string[] {
    return response.predictions.map(prediction => `data:${prediction.mimeType};base64,${prediction.bytesBase64Encoded}`);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `The server returned an error: ${error.status} ${error.statusText}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  private getAccessToken(): string {
    // Implement your logic to get and return the access token here.
    // This could involve calling a service that fetches the token using gcloud or another mechanism.
    return 'YOUR_ACCESS_TOKEN';
  }
}
