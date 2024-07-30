import { promises as fs } from 'fs';
import * as yaml from 'js-yaml';

/**
 * Utility class for loading and retrieving test data from YAML files.
 */
class TestDataUtils {

    /**
     * Retrieve specific test data from the appropriate YAML file based on the environment.
     * 
     * @param data - The key of the data to retrieve.
     * @returns The corresponding value from the YAML file.
     */
    async getData(data: string): Promise<any> {
        try {
            let yamlFileContent: string;

            // Determine the environment and read the corresponding YAML file
            if (process.env.NODE_ENV === "INT") {
                yamlFileContent = await fs.readFile("path/to/INT test data", 'utf8');
            } else {
                yamlFileContent = await fs.readFile("path/to/QA test data", 'utf8');
            }

            // Parse the YAML file content into a JavaScript object
            const config = yaml.load(yamlFileContent) as { [key: string]: any };

            // Return the requested data
            return config[data];
        } catch (err) {
            console.error("Error reading data from YAML file:", err);
            throw err;
        }
    }
}

export default TestDataUtils;
