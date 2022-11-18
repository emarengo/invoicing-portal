export function validDriverId(value: string | number): boolean {
  value = +value;
  return !isNaN(value) && value > 0;
}

export function validFacturifyId(value: string): boolean {
  return /^[a-z\d]{8}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{12}$/i.test(
    value
  );
}
