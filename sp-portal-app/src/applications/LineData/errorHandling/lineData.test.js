import { errorHandlingLineData } from './lineData';

describe('errorHandlingLineData', () => {
  test('should return the correct error object for valid code', () => {
    const code = 100400;
    const expectedError = {
      type: 'closeable',
      title: 'Petición incorrecta (Error 100400)',
      subtitle: 'No se puede procesar la información entrante.'
    };

    const result = errorHandlingLineData(code);

    expect(result).toEqual(expectedError);
  });

  test('should return the network error object for an invalid code', () => {
    const code = 999999;
    const expectedError = {
      type: 'closeable',
      title: 'Servicio no disponible',
      subtitle: 'Por favor, intente de nuevo mas tarde.'
    };

    const result = errorHandlingLineData(code);

    expect(result).toEqual(expectedError);
  });
});