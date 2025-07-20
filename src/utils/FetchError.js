export class FetchError extends Error {
  constructor({ codigo, descripcion }) {
    super(descripcion);
    this.codigo = codigo;
  }
}