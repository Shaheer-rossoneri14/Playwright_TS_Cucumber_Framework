import { promises as fs } from 'fs';
import * as yaml from 'js-yaml';

class TestDataUtils {
    async getData(data: string): Promise<any> {
        try {
            let yamlFileContent: string;
            if (process.env.NODE_ENV === "INT") {
                yamlFileContent = await fs.readFile("path/to/INT test data", 'utf8');
            } else {
                yamlFileContent = await fs.readFile("path/to/QA test data", 'utf8');
            }
            const config = yaml.load(yamlFileContent) as { [key: string]: any };
            return config[data];
        } catch (err) {
            console.error("Error reading data YAML file", err);
            throw err;
        }
    }
}

export default TestDataUtils;
