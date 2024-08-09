// script-runner.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptRunnerService {
  
  runScript(code: string, parameters: any[]): any {
    try {
      // Extract parameter names from the function signature in the code
      const paramRegex = /\(([^)]+)\)/;
      const functionNameRegex = /function\s+([a-zA-Z0-9_]+)/;
      const paramMatch = code.match(paramRegex);
      const functionNameMatch = code.match(functionNameRegex);
  
      if (paramMatch && paramMatch[1] && functionNameMatch && functionNameMatch[1]) {
        let params = paramMatch[1].split(',').map(param => param.trim());
        const functionName = functionNameMatch[1];
  
        // Ensure that the number of provided parameters is at least the number required
        if (parameters.length < params.length) {
          throw new Error(`Expected at least ${params.length} parameters, but got ${parameters.length}`);
        }
  
        // Remove '%' from parameter names
        params = params.map(param => param.replace(/%/g, ''));
  
        // Instantiate the mock parameters as variables
        const variables = params.map((param, index) => {
          const value = typeof parameters[index] === 'string'
            ? `'${parameters[index]}'`
            : parameters[index];
          return `var ${param} = ${value};`;
        }).join('\n');
  
        // Prepend the variable declarations and append a call to the detected function
        const modifiedCode = `
          ${variables}
          ${code}
          return ${functionName}(${params.join(', ')});
        `;
  
        // Execute the modified code and return the result
        const result = new Function(modifiedCode)();
        return result;
      } else {
        // If no parameters or function name found, execute the code as is
        const result = new Function(code)();
        return result;
      }
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }
    
  
}
