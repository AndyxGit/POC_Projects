import { showFiltersError, showOnSaveError } from './utils';

describe('showFiltersError', () => {
    it('returns the correct error object for each code', () => {
        expect(showFiltersError('900000')).toEqual({
            type: 'closeable',
            title: 'Error general (900000)',
            subtitle: 'Por favor, consulte a soporte.'
        });
        expect(showFiltersError('100000')).toEqual({
            type: 'closeable',
            title: 'Petición incorrecta (100000)',
            subtitle: 'Faltan datos en la consulta de Servicios.'
        });
        expect(showFiltersError('200001')).toEqual({
            type: 'closeable',
            title: 'Error en el origen de datos (200001)',
            subtitle: 'Existen parámetros duplicados en la consulta de Servicios.'
        });
        expect(showFiltersError('200002')).toEqual({
            type: 'closeable',
            title: 'Error en el origen de datos (200002)',
            subtitle: 'No se encontraron parámetros en la consulta de Servicios.'
        });
        expect(showFiltersError('200003')).toEqual({
            type: 'closeable',
            title: 'Error en el origen de datos (200003)',
            subtitle: 'No se encuentran registros para los Servicios consultados.'
        });
        expect(showFiltersError('200005')).toEqual({
            type: 'closeable',
            title: 'Error en el origen de datos(200005)',
            subtitle: 'Error en la ejecución de la consulta.'
        });
        expect(showFiltersError('200007')).toEqual({
            type: 'closeable',
            title: 'Error en el origen de datos(200007)',
            subtitle: 'Error en la ejecución de la consulta.'
        });
        expect(showFiltersError('200008')).toEqual({
            type: 'closeable',
            title: 'Error en el origen de datos(200008)',
            subtitle: 'No se encontraron datos en la consulta.'
        });
        expect(showFiltersError('200009')).toEqual({
            type: 'closeable',
            title: 'Error en el origen de datos(200009)',
            subtitle: 'No se encuentra descripción para los Servicios consultados.'
        });
        expect(showFiltersError('200010')).toEqual({
            type: 'closeable',
            title: 'Error en el origen de datos(200010)',
            subtitle: 'Error de TimeOut al realizar la consulta.'
        });
        expect(showFiltersError('200101')).toEqual({
            type: 'closeable',
            title: 'Error en el origen de datos(200101)',
            subtitle: 'Error en la ejecución de la consulta.'
        });
    });
});

describe('showOnSaveError', () => {
    it('returns the correct error object for each code', () => {
        expect(showOnSaveError('900000')).toEqual({
            type: 'closeable',
            title: 'Error general (900000)',
            subtitle: 'Por favor, consulte a soporte.'
        });
        expect(showOnSaveError('100000')).toEqual({
            type: 'closeable',
            title: 'Petición incorrecta (100000)',
            subtitle: 'Faltan datos en la consulta de Consumos.'
        });
        expect(showOnSaveError('100001')).toEqual({
            type: 'closeable',
            title: 'Petición incorrecta (100001)',
            subtitle: 'Falta enviar el BillNumber.'
        });
        expect(showOnSaveError('100002')).toEqual({
            type: 'closeable',
            title: 'Petición incorrecta (100002)',
            subtitle: 'Fecha Desde debe ser menor a Fecha Hasta.'
        });
        expect(showOnSaveError('100003')).toEqual({
            type: 'closeable',
            title: 'Petición incorrecta (100003)',
            subtitle: 'Se envía valor incorrecto para Roaming.'
        });
        expect(showOnSaveError('100004')).toEqual({
            type: 'closeable',
            title: 'Petición incorrecta (100004)',
            subtitle: 'Se envía valor incorrecto.'
        });
        expect(showOnSaveError('100005')).toEqual({
            type: 'closeable',
            title: 'Petición incorrecta (100005)',
            subtitle: 'El BillNumber no puede contener letras.'
        });
        expect(showOnSaveError('200001')).toEqual({
            type: 'closeable',
            title: 'Error en el origen de datos (200001)',
            subtitle: 'Existen parámetros duplicados en la consulta de Consumos.'
        });
        expect(showOnSaveError('200002')).toEqual({
            type: 'closeable',
            title: 'Error en el origen de datos (200002)',
            subtitle: 'No se encontraron parámetros en la consulta de Consumos.'
        });
        expect(showOnSaveError('200003')).toEqual({
            type: 'closeable',
            title: 'Error en el origen de datos (200003)',
            subtitle: 'No se encuentran registros para los Consumos consultados.'
        });
        expect(showOnSaveError('200005')).toEqual({
            type: 'closeable',
            title: 'Error en el origen de datos(200005)',
            subtitle: 'Error en la ejecución de la consulta.'
        });
        expect(showOnSaveError('200007')).toEqual({
            type: 'closeable',
            title: 'Error en el origen de datos(200007)',
            subtitle: 'Error en la ejecución de la consulta.'
        });
        expect(showOnSaveError('200008')).toEqual({
            type: 'closeable',
            title: 'Error en el origen de datos(200008)',
            subtitle: 'No se encontraron datos en la consulta.'
        });
        expect(showOnSaveError('200009')).toEqual({
            type: 'closeable',
            title: 'Error en el origen de datos(200009)',
            subtitle: 'No se encuentra descripción para el consumo consultado.'
        });
        expect(showOnSaveError('200010')).toEqual({
            type: 'closeable',
            title: 'Error en el origen de datos(200010)',
            subtitle: 'Error de TimeOut al realizar la consulta.'
        });
        expect(showOnSaveError('200101')).toEqual({
            type: 'closeable',
            title: 'Error en el origen de datos(200101)',
            subtitle: 'Error en la ejecución de la consulta.'
        });
    });
});

