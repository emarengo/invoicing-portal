import { validDriverId, validFacturifyId } from './validators';

describe('validDriverId', () => {
  it('should return false if value is empty', () => {
    const result = validDriverId('');
    expect(result).toBe(false);
  });

  it('should return false if value is 0', () => {
    const result = validDriverId(0);
    expect(result).toBe(false);
  });

  it('should return false if value is lower than 0', () => {
    const result = validDriverId(-1234);
    expect(result).toBe(false);
  });

  it('should return false if value is not numeric', () => {
    const result = validDriverId('it');
    expect(result).toBe(false);
  });

  it('should return true if value is a number', () => {
    const result = validDriverId(1234);
    expect(result).toBe(true);
  });

  it('should return true if value is numeric', () => {
    const result = validDriverId('1234');
    expect(result).toBe(true);
  });
});

describe('validFacturifyId', () => {
  it('should return false if value is empty', () => {
    const result = validFacturifyId('');
    expect(result).toBe(false);
  });

  it('should return false if value does not have correct format', () => {
    const result = validFacturifyId('22cff210a78b47449751e9c6e55c3108');
    expect(result).toBe(false);
  });

  it('should return true if value has correct format', () => {
    const result = validFacturifyId('22cff210-a78b-4744-9751-e9c6e55c3108');
    expect(result).toBe(true);
  });
});
