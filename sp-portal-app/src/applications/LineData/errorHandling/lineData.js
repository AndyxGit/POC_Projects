export const errorHandlingLineData = (code) => {
  const ERR_NETWORK = {
    type: "closeable",
    title: "Servicio no disponible",
    subtitle: "Por favor, intente de nuevo mas tarde.",
  };

  const errors = {
    900000: {
      type: "closeable",
      title: "Error general (Error 900000)",
      subtitle: "Por favor, consulte a soporte.",
    },
    100400: {
      type: "closeable",
      title: "Petición incorrecta (Error 100400)",
      subtitle: "No se puede procesar la información entrante.",
    },
    100401: {
      type: "closeable",
      title: "Petición incorrecta (Error 100401)",
      subtitle: "Faltan datos requeridos para la consulta.",
    },
    100402: {
      type: "closeable",
      title: "Petición incorrecta (Error 100402)",
      subtitle: "El valor ingresado debe ser un número.",
    },

    100101: {
      type: "closeable",
      title: "Error en consulta de datos (Error 100101)",
      subtitle: "No se encontró la descripción del estado de la línea.",
    },
    100102: {
      type: "closeable",
      title: "Error en consulta de datos (Error 100102)",
      subtitle: "No se encontró la descripción del estado actual de la línea.",
    },
    100103: {
      type: "closeable",
      title: "Error en consulta de datos (Error 100103)",
      subtitle: "No se encontró la descripción del último estado de la línea.",
    },
    100104: {
      type: "closeable",
      title: "Error en consulta de datos (Error 100104)",
      subtitle: "No se encontró la descripción del plan de la línea.",
    },
    100105: {
      type: "closeable",
      title: "Error en consulta de datos (Error 100105)",
      subtitle: "No se encontró el valor para Abono Mensual.",
    },

    200001: {
      type: "closeable",
      title: "Error en el origen de datos (Error 200001)",
      subtitle: "Se produjo un error al realizar la consulta.",
    },
    200002: {
      type: "closeable",
      title: "Error en el origen de datos (Error 200002)",
      subtitle: "La consulta demoró más de lo esperado.",
    },
    200003: {
      type: "closeable",
      title: "Error en el origen de datos (Error 200003)",
      subtitle: "No se encuentran registros para los Servicios consultados.",
    },
    200004: {
      type: "closeable",
      title: "Error en el origen de datos (Error 200004)",
      subtitle: "Se encontró más de un registro.",
    },
    200005: {
      type: "closeable",
      title: "Error en el origen de datos (Error 200005)",
      subtitle: "Se produjo un error al realizar la consulta.",
    },
    200006: {
      type: "closeable",
      title: "Error en el origen de datos (Error 200006)",
      subtitle: "La consulta demoró más de lo esperado.",
    },
    200007: {
      type: "closeable",
      title: "Error en el origen de datos (Error 200007)",
      subtitle: "No se encontraron los datos consultados.",
    },
    200008: {
      type: "closeable",
      title: "Error en el origen de datos (Error 200008)",
      subtitle: "Se produjo un error al realizar la consulta.",
    },
    200009: {
      type: "closeable",
      title: "Error en el origen de datos (Error 200009)",
      subtitle: "La consulta demoró más de lo esperado.",
    },
    200010: {
      type: "closeable",
      title: "Error en el origen de datos (Error 200010)",
      subtitle: "No se encontraron los datos consultados.",
    },
    200011: {
      type: "closeable",
      title: "Error en el origen de datos (Error 200011)",
      subtitle: "Se encontró más de un registro.",
    },
    200012: {
      type: "closeable",
      title: "Error en el origen de datos (Error 200012)",
      subtitle: "Se produjo un error al realizar la consulta.",
    },
    200013: {
      type: "closeable",
      title: "Error en el origen de datos (Error 200013)",
      subtitle: "La consulta demoró más de lo esperado.",
    },
    200014: {
      type: "closeable",
      title: "Error en el origen de datos (Error 200014)",
      subtitle: "No se encontraron los datos consultados.",
    },
    200015: {
      type: "closeable",
      title: "Error en el origen de datos (Error 200015)",
      subtitle: "Se encontró más de un registro.",
    },
    200016: {
      type: "closeable",
      title: "Error en el origen de datos (Error 200016)",
      subtitle: "Se produjo un error al realizar la consulta.",
    },
    200017: {
      type: "closeable",
      title: "Error en el origen de datos (Error 200017)",
      subtitle: "La consulta demoró más de lo esperado.",
    },
    200018: {
      type: "closeable",
      title: "Error en el origen de datos (Error 200018)",
      subtitle: "No se encontraron los datos consultados.",
    },
    300001: {
      type: "closeable",
      title: "Error en el origen de datos (Error 300001)",
      subtitle: "Se produjo un error al realizar la consulta.",
    },
    300002: {
      type: "closeable",
      title: "Error en el origen de datos (Error 300002)",
      subtitle: "La consulta demoró más de lo esperado.",
    },
    300003: {
      type: "closeable",
      title: "Error en el origen de datos (Error 300003)",
      subtitle: "No se encontraron los datos consultados.",
    },
    400001: {
      type: "closeable",
      title: "Error en el origen de datos (Error 400001)",
      subtitle: "Se produjo un error al realizar la consulta.",
    },
    400002: {
      type: "closeable",
      title: "Error en el origen de datos (Error 400002)",
      subtitle: "La consulta demoró más de lo esperado.",
    },
    400003: {
      type: "closeable",
      title: "Error en el origen de datos (Error 400003)",
      subtitle: "No se encontraron los datos consultados.",
    },
  };

  return errors[code] || ERR_NETWORK;
};
