import fs from 'fs';

const FILE_PATH = './data.json';

class StorageHandler {

    static save(data) {
        try {
            fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    static load() {
        try {
            if (fs.existsSync(FILE_PATH)) {
                const data = fs.readFileSync(FILE_PATH, 'utf-8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
        return null;
    }
}

export default StorageHandler;
