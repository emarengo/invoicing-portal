import { readCSV } from './file';

describe('readCSV', () => {
  const file = new File(['test file'], 'test.csv', {
    type: 'text/csv'
  });

  it('should reject if reader fails', async () => {
    const reader = {
      readAsText: () =>
        reader.onerror && reader.onerror({} as ProgressEvent<FileReader>)
    } as unknown as FileReader;
    await expect(readCSV(file, reader)).rejects.toEqual({});
  });

  it('should return empty string if target is not defined', async () => {
    const reader = {
      readAsText: () =>
        reader.onload && reader.onload({} as ProgressEvent<FileReader>)
    } as unknown as FileReader;
    await expect(readCSV(file, reader)).resolves.toEqual('');
  });

  it('should return empty string if target.result is undefined', async () => {
    const reader = {
      readAsText: () =>
        reader.onload &&
        reader.onload({
          target: {}
        } as ProgressEvent<FileReader>)
    } as unknown as FileReader;
    await expect(readCSV(file, reader)).resolves.toEqual('');
  });

  it('should return file contents as string', async () => {
    await expect(readCSV(file)).resolves.toEqual('test file');
  });
});
