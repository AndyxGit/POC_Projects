import { errorHandlingLineCheck } from './lineCheck';

describe('errorHandlingLineCheck', () => {
  test('should return the correct error object for valid code', () => {
    const code = 100401;
    const expectedError = {
      type: 'closeable',
      title: 'Petición incorrecta (Error 100401)',
      subtitle: 'Faltan datos requeridos para la consulta.'
    };

    const result = errorHandlingLineCheck(code);

    expect(result).toEqual(expectedError);
  });

  test('should return the network error object for an invalid code', () => {
    const code = 999999;
    const expectedError = {
      type: 'closeable',
      title: 'Servicio no disponible',
      subtitle: 'Por favor, intente de nuevo mas tarde.'
    };

    const result = errorHandlingLineCheck(code);

    expect(result).toEqual(expectedError);
  });
});