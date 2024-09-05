// script-runner.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptRunnerService {
  
    runScript(code, parameters = []) {
        try {
            // Extract the function name and parameter list from the function declaration
            const functionDeclarationRegex = /function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)/;
            const match = code.match(functionDeclarationRegex);
    
            if (match) {
                const functionName = match[1];
                const paramsString = match[2].trim();
    
                let params = [];
    
                if (paramsString !== "") {
                    params = paramsString.split(',').map(param => param.trim());
    
                    // Process parameters and default values
                    const processedParams = params.map((param, index) => {
                        let [name, defaultValue] = param.split('=').map(p => p.trim());
    
                        // Use provided parameter or default value
                        let value = parameters[index] !== undefined
                            ? parameters[index]
                            : defaultValue !== undefined
                                ? defaultValue
                                : undefined;
    
                        // If value is still undefined, throw an error
                        if (value === undefined) {
                            throw new Error(`Parameter ${name} is required but was not provided`);
                        }
    
                        value = typeof value === 'string' ? `'${value}'` : value;
                        return `var ${name} = ${value};`;
                    }).join('\n');
    
                    // Prepend the variable declarations and append a call to the detected function
                    const modifiedCode = `
                        ${processedParams}
                        ${code}
                        return ${functionName}(${params.map(param => param.split('=')[0].trim()).join(', ')});
                    `;
    
                    // Execute the modified code and return the result
                    const result = new Function(modifiedCode)();
                    return result;
                } else {
                    // If no parameters, execute the code without parameters
                    const modifiedCode = `
                        ${code}
                        return ${functionName}();
                    `;
                    const result = new Function(modifiedCode)();
                    return result;
                }
            } else {
                // If no function declaration is found, execute the code as is
                const result = new Function(code)();
                return result;
            }
        } catch (error) {
            return `Error: ${error.message}`;
        }
    }
    

    
  
}
