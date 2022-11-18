export function readCSV(
  file: File,
  reader: FileReader = new FileReader()
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    reader.onload = (event) => {
      const csvAsText: string = (event.target?.result as string) || '';
      resolve(csvAsText);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}
