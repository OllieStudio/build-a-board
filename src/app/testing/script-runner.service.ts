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

            // If parameters exist (non-empty), process them
            if (paramsString !== "") {
                params = paramsString.split(',').map(param => param.trim());

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
