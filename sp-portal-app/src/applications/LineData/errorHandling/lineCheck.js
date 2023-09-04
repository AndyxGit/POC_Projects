export const errorHandlingLineCheck = (code) => {

  const ERR_NETWORK = {
    type: "closeable",
    title: "Servicio no disponible",
    subtitle: "Por favor, intente de nuevo mas tarde.",
  }

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
      title: "Tipo de negocio no válido (Error 100101)",
      subtitle: "Por favor, ingrese el número de línea válido para la consulta.",
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
      subtitle: "Se encontró más de un registro.",
    },
  };

  return errors[code] || ERR_NETWORK;
};
