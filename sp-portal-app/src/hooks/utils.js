export const showFiltersError = (code) => {
    switch (code) {
        case '900000':
            return {
                type: 'closeable',
                title: 'Error general (900000)',
                subtitle: 'Por favor, consulte a soporte.'
            };
        case '100000':
            return {
                type: 'closeable',
                title: 'Petición incorrecta (100000)',
                subtitle: 'Faltan datos en la consulta de Servicios.'
            };
        case '200001':
            return {
                type: 'closeable',
                title: 'Error en el origen de datos (200001)',
                subtitle: 'Existen parámetros duplicados en la consulta de Servicios.'
            };
        case '200002':
            return {
                type: 'closeable',
                title: 'Error en el origen de datos (200002)',
                subtitle: 'No se encontraron parámetros en la consulta de Servicios.'
            };
        case '200003':
            return {
                type: 'closeable',
                title: 'Error en el origen de datos (200003)',
                subtitle: 'No se encuentran registros para los Servicios consultados.'
            };
        case '200005':
            return {
                type: 'closeable',
                title: 'Error en el origen de datos(200005)',
                subtitle: 'Error en la ejecución de la consulta.'
            };
        case '200007':
            return {
                type: 'closeable',
                title: 'Error en el origen de datos(200007)',
                subtitle: 'Error en la ejecución de la consulta.'
            };
        case '200008':
            return {
                type: 'closeable',
                title: 'Error en el origen de datos(200008)',
                subtitle: 'No se encontraron datos en la consulta.'
            };
        case '200009':
            return {
                type: 'closeable',
                title: 'Error en el origen de datos(200009)',
                subtitle: 'No se encuentra descripción para los Servicios consultados.'
            };
        case '200010':
            return {
                type: 'closeable',
                title: 'Error en el origen de datos(200010)',
                subtitle: 'Error de TimeOut al realizar la consulta.'
            };
        case '200101':
            return {
                type: 'closeable',
                title: 'Error en el origen de datos(200101)',
                subtitle: 'Error en la ejecución de la consulta.'
            };
        default:
            break;
    }
};

export const showOnSaveError = (code) => {
    switch (code) {
        case '900000':
            return {
                type: 'closeable',
                title: 'Error general (900000)',
                subtitle: 'Por favor, consulte a soporte.'
            };
        case '100000':
            return {
                type: 'closeable',
                title: 'Petición incorrecta (100000)',
                subtitle: 'Faltan datos en la consulta de Consumos.'
            };
        case '100001':
            return {
                type: 'closeable',
                title: 'Petición incorrecta (100001)',
                subtitle: 'Falta enviar el BillNumber.'
            };
        case '100002':
            return {
                type: 'closeable',
                title: 'Petición incorrecta (100002)',
                subtitle: 'Fecha Desde debe ser menor a Fecha Hasta.'
            };
        case '100003':
            return {
                type: 'closeable',
                title: 'Petición incorrecta (100003)',
                subtitle: 'Se envía valor incorrecto para Roaming.'
            };
        case '100004':
            return {
                type: 'closeable',
                title: 'Petición incorrecta (100004)',
                subtitle: 'Se envía valor incorrecto.'
            };
        case '100005':
            return {
                type: 'closeable',
                title: 'Petición incorrecta (100005)',
                subtitle: 'El BillNumber no puede contener letras.'
            };

        case '200001':
            return {
                type: 'closeable',
                title: 'Error en el origen de datos (200001)',
                subtitle: 'Existen parámetros duplicados en la consulta de Consumos.'
            };
        case '200002':
            return {
                type: 'closeable',
                title: 'Error en el origen de datos (200002)',
                subtitle: 'No se encontraron parámetros en la consulta de Consumos.'
            };
        case '200003':
            return {
                type: 'closeable',
                title: 'Error en el origen de datos (200003)',
                subtitle: 'No se encuentran registros para los Consumos consultados.'
            };
        case '200005':
            return {
                type: 'closeable',
                title: 'Error en el origen de datos(200005)',
                subtitle: 'Error en la ejecución de la consulta.'
            };
        case '200007':
            return {
                type: 'closeable',
                title: 'Error en el origen de datos(200007)',
                subtitle: 'Error en la ejecución de la consulta.'
            };
        case '200008':
            return {
                type: 'closeable',
                title: 'Error en el origen de datos(200008)',
                subtitle: 'No se encontraron datos en la consulta.'
            };
        case '200009':
            return {
                type: 'closeable',
                title: 'Error en el origen de datos(200009)',
                subtitle: 'No se encuentra descripción para el consumo consultado.'
            };
        case '200010':
            return {
                type: 'closeable',
                title: 'Error en el origen de datos(200010)',
                subtitle: 'Error de TimeOut al realizar la consulta.'
            };
        case '200101':
            return {
                type: 'closeable',
                title: 'Error en el origen de datos(200101)',
                subtitle: 'Error en la ejecución de la consulta.'
            };
        default:
            break;
    }
}
