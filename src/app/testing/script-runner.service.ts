// script-runner.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptRunnerService {
  
  runScript(code: string): any {
    try {
      const result = new Function(code)();
      return result;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }
}
