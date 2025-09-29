import fs from 'fs';

export const saveJson = (data: any, filename: string): void => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}
