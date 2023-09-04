@Web @Smoke
Feature: Datos de la linea

   #TIPOS DE RATINGGROUP =  NULL       ->     TODOS LOS SERVICIOS
  #                        REDES      ->     TODOS LOS SERVICIOS DE REDES SOCIALES SOLAMENTE
  #                        SERVICIOS  ->     SERVICIOS QUE NO SON REDES SOCIALES
  #                        DEFAULT    ->     EL SERVICIO ESPECIFICADO
  #TIPOS DE FILTROS =      REDES      ->     REDES SOCIALES
  #                        SERVICIOS  ->     SERVICIOS QUE NO SON REDES SOCIALES
  #                        NULL       ->     TODOS LOS SERVICIOS
  #                        DEFAULT    ->     EL SERVICIO ESPECIFICADO
  #TIPOS DE FECHAS =       RANGO      ->     RANGO ALEATORIO DENTRO DE LOS 30 DIAS
  #                        DEFAULT    ->     RANGO DE LOS ULTIMOS 2 DIAS
  #                        DIA        ->     1 DIA ALEATORIO DENTRO DE LOS 30 DIAS
  # 42 escenarios


  Background: Sesion iniciada
    Given inicio sesion con las credenciales por defecto
    And una linea claro del tipo CR

  @Funcional
    @PSP-11235
  Scenario Outline: PSP-11235-TC_Pantalla Consumo de Datos_Consulta_Whatsapp_Fecha_Por_Defecto
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas  | roaming | ratingGroup | filtro |
      | default | null    | 80          | 80     |

  @Funcional
    @PSP-11236
  Scenario Outline: PSP-11236-TC_Pantalla Consumo de Datos_Consulta_Whatsapp_Fecha_Modificada
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas | roaming | ratingGroup | filtro |
      | rango  | null    | 80          | 80     |

  @Regresion
    @PSP-11237
  Scenario Outline: PSP-11237-TC_Pantalla Consumo de Datos_Consulta_Noches_Libres_Fecha_Por_Defecto
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas  | roaming | ratingGroup | filtro |
      | default | null    | 996         | 996    |

  @Funcional
    @PSP-11238
  Scenario Outline: PSP-11238-TC_Pantalla Consumo de Datos_Consulta_Noches_Libres_Fecha_Modificada
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas | roaming | ratingGroup | filtro |
      | rango  | null    | 996         | 996    |

  @Funcional
    @PSP-11273
  Scenario Outline: PSP-11273-TC_Pantalla Consumo de Datos_Ordenar_Resultados_Por_Precio
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And se hace click en el header Precio

    Examples:
      | fechas  | roaming | ratingGroup | filtro |
      | default | null    | redes       | null   |


  @Funcional
    @PSP-11272
  Scenario Outline: PSP-11272-TC_Pantalla Consumo de Datos_Ordenar_Resultados_Por_Servicios
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And se hace click en el header SERVICIO

    Examples:
      | fechas  | roaming | ratingGroup | filtro |
      | default | null    | redes       | null   |


  @Funcional
    @PSP-11234
  Scenario Outline: PSP-11234-TC_Pantalla Consumo de Datos_Consulta_Roaming_Fecha_Modificada
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And se consulta a la API con roaming ROAMING y el filtro <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas | roaming | ratingGroup | filtro |
      | rango  | Y       | 5           | null   |


  @Funcional
    @PSP-11233
  Scenario Outline: PSP-11233-TC_Pantalla Consumo de Datos_Consulta_Home_Fecha_Modificada
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And se consulta a la API con roaming HOME y el filtro <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas | roaming | ratingGroup | filtro |
      | rango  | N       | 5           | null   |


  @Funcional
    @PSP-11263
  Scenario Outline: PSP-11263-TC_Pantalla Consumo de Datos_Consulta_Twitter_Fecha_Modificada
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas | roaming | ratingGroup | filtro |
      | dia    | null    | 995       | 995  |

  @Funcional
  @PSP-11283
  Scenario: PSP-11283-TC_Pantalla Consumo de Datos_Tooltip_Rango_Fecha_Mayor_A_Un_Mes
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    Then hovering sobre el icono de info muestra un msj de demora


  @Funcional
    @PSP-11265
  Scenario Outline: PSP-11265-TC_Pantalla Consumo de Datos_Ingreso_Fecha_Invalida
    When se hace click en card Consumo de Datos
    And se configuran las fechas segun <fechas>
    And se ingresa el numero de linea en el front
    And el switch de Rango de fechas está activado por defecto
    And se ingresan las fechas <fechas> en el front
    Then se visualiza un mensaje que informa formato fecha equivocado
    Examples:
      | fechas   |
      | invalido |

  @Regresion
    @PSP-11231
  Scenario Outline: PSP-11231-TC_Pantalla Consumo de Datos_Consulta_Home_Fecha_Por_Defecto
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas  | roaming | ratingGroup | filtro |
      | default | N       | 5           | 5      |

  @Regresion
    @PSP-11253
  Scenario Outline: PSP-11253-TC_Pantalla Consumo de Datos_Consulta_Facebook_Fecha_Por_Defecto
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas  | roaming | ratingGroup | filtro |
      | default | null    | 992         | 992    |

  @Regresion
    @PSP-11196
  Scenario Outline: PSP-11196-TC_Pantalla Consumo de Datos_Linea de Claro Home_Sin visualizar datos
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And las fechas corresponden a las ultimas 48hs
    And se configuran las fechas segun <fechas>
    Then no se visualizan datos de consumo
    And el boton Consultar esta activado
    Examples:
      | fechas  |
      | default |

  @Funcional
    @PSP-11276
  Scenario Outline: PSP-11276-TC_Pantalla Consumo de Datos_Ordenar_Resultados_Por_Fecha
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    Then los resultados se ordenan por Fecha asc


    Examples:
      | fechas | roaming | ratingGroup | filtro |
      | rango  | null    | 80          | null   |


  @Funcional
  @PSP-11216
  Scenario: PSP-11216-TC_Pantalla Consumo de Datos_Boton_Consultar_desactivo
    When el boton Consultar esta desactivado
    And se ingresa el numero de linea en el front
    Then el boton Consultar esta activado

  @Funcional
  @PSP-11218
  Scenario: PSP-11218-TC_Pantalla Consumo de Datos_Consulta_Sin_Presionar_Boton_Consultar
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And el switch de Rango de fechas está activado por defecto
    Then se visualiza un mensaje que informa datos no consultados aun


  @Regresion
    @PSP-11219
  Scenario Outline: PSP-11219-TC_Pantalla Consumo de Datos_Consulta_Por_Defecto(Happy Path)
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas  | roaming | ratingGroup | filtro |
      | default | null    | null        | null   |

  @Funcional
  @PSP-11223
  Scenario: PSP-11223-TC_Pantalla Consumo de Datos_Consulta_Sin_Ingresar_Numero_De_Linea
    When se hace click en card Consumo de Datos
    Then se visualiza un mensaje que solicita que se ingrese numero de linea

  @Regresion
    @PSP-11232
  Scenario Outline: PSP-11232-TC_Pantalla Consumo de Datos_Consulta_Roaming_Fecha_Por_Defecto
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas  | roaming | ratingGroup | filtro |
      | default | Y       | 5           | null   |

  @Regresion
    @PSP-11271
  Scenario Outline: PSP-11271-TC_Pantalla Consumo de Datos_Consulta_Linea_Sin_Consumo
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    Then se visualiza un mensaje que informa consumos no encontrados

    Examples:
      | fechas  | roaming | filtro |
      | default | null    | null   |

  @Funcional
    @PSP-11239
  Scenario Outline: PSP-11239-TC_Pantalla Consumo de Datos_Consulta_By_Pass_Fecha_Por_Defecto
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas  | roaming | ratingGroup | filtro |
      | default | null    | 50          | 50     |

  @Funcional
    @PSP-11241
  Scenario Outline: PSP-11241-TC_Pantalla Consumo de Datos_Consulta_By_Pass_Fecha_Modificada
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas | roaming | ratingGroup | filtro |
      | rango  | null    | 50          | 50     |

  @Funcional
    @PSP-11242
  Scenario Outline: PSP-11242-TC_Pantalla Consumo de Datos_Consulta_FB_Autoflex/NR_Fecha_Por_Defecto
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas  | roaming | ratingGroup | filtro |
      | default | null    | 991         | 991    |

  @Funcional
    @PSP-11243
  Scenario Outline: PSP-11243-TC_Pantalla Consumo de Datos_Consulta_FB_Autoflex/NR_Fecha_Modificada
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas | roaming | ratingGroup | filtro |
      | rango  | null    | 991         | 991    |

  @Funcional
    @PSP-11244
  Scenario Outline: PSP-11244-TC_Pantalla Consumo de Datos_Consulta_Conexion_Movil_Fecha_Por_Defecto
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas  | roaming | ratingGroup | filtro |
      | default | null    | 5           | 5      |

  @Funcional
    @PSP-11245
  Scenario Outline: PSP-11245-TC_Pantalla Consumo de Datos_Consulta_Conexion_Movil_Fecha_Modificada
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas | roaming | ratingGroup | filtro |
      | rango  | null    | 5           | 5      |



  @Funcional
    @PSP-11247
  Scenario Outline: PSP-11247-TC_Pantalla Consumo de Datos_Consulta_Redes_Sociales_Fecha_Modificada
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas | roaming | ratingGroup | filtro |
      | rango  | null    | redes       | redes  |

  @Funcional
    @PSP-11248
  Scenario Outline: PSP-11248-TC_Pantalla Consumo de Datos_Consulta_Youtube_Fecha_Por_Defecto
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas  | roaming | ratingGroup | filtro |
      | default | null    | 993         | 993    |

  @Funcional
    @PSP-11249
  Scenario Outline: PSP-11249-TC_Pantalla Consumo de Datos_Consulta_Youtube_Fecha_Modificada
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas | roaming | ratingGroup | filtro |
      | rango  | null    | 993         | 993    |

  @Funcional
    @PSP-11251
  Scenario Outline: PSP-11251-TC_Pantalla Consumo de Datos_Consulta_Instagram_Fecha_Por_Defecto
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas  | roaming | ratingGroup | filtro |
      | default | null    | 994         | 994    |

  @Funcional
    @PSP-11252
  Scenario Outline: PSP-11252-TC_Pantalla Consumo de Datos_Consulta_Instagram_Fecha_Modificada
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas | roaming | ratingGroup | filtro |
      | rango  | null    | 994         | 994    |

  @Funcional
    @PSP-11254
  Scenario Outline: PSP-11254-TC_Pantalla Consumo de Datos_Consulta_Facebook_Fecha_Modificada
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas | roaming | ratingGroup | filtro |
      | rango  | null    | 992         | 992    |

  @Funcional
    @PSP-11255
  Scenario Outline: PSP-11255-TC_Pantalla Consumo de Datos_Consulta_Tik_Tok_Fecha_Por_Defecto
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas  | roaming | ratingGroup | filtro |
      | default | null    | 997         | 997    |

  @Funcional
    @PSP-11256
  Scenario Outline: PSP-11256-TC_Pantalla Consumo de Datos_Consulta_Tik_Tok_Fecha_Modificada
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas | roaming | ratingGroup | filtro |
      | rango  | null    | 997         | 997    |

  @Funcional
    @PSP-11260
  Scenario Outline: PSP-11260-TC_Pantalla Consumo de Datos_Consulta_Twitter_Fecha_Por_Defecto
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas  | roaming | ratingGroup | filtro |
      | default | null    | 995         | 995    |

  @Funcional
    @PSP-11263
  Scenario Outline: PSP-11263-TC_Pantalla Consumo de Datos_Consulta_Twitter_Fecha_Modificada
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas | roaming | ratingGroup | filtro |
      | rango  | null    | 995         | 995    |

  @Regresion
    @PSP-11280
  Scenario Outline: PSP-11280-TC_Pantalla Consumo de Datos_Seleccionar_Fecha_Actual
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se ingresan las fechas <fechas> en el front
    Then la fecha es la fecha actual

    Examples:
      | fechas |
      | hoy    |

  @Funcional
    @PSP-11281
  Scenario Outline: PSP-11281-TC_Pantalla Consumo de Datos_Consultar_Fecha_Actual
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas | roaming | ratingGroup | filtro |
      | hoy    | null    | redes       | null   |

  @Regresion
    @PSP-11246
  Scenario Outline: PSP-11246-TC_Pantalla Consumo de Datos_Consulta_Redes_Sociales_Fecha_Por_Defecto
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas  | roaming | ratingGroup | filtro |
      | default | null    | redes       | redes  |


  @Funcional
  @PSP-11537
  Scenario: PSP-11537-TC_Pantalla Consumo de Datos_Ingreso_Numero_Invalido
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea invalido en el front
    And el switch de Rango de fechas está activado por defecto
    And se hace click en el boton Consultar
    Then se visualiza un mensaje que informa consumos no encontrados

  @Funcional
  @PSP-11546
  Scenario: PSP-11546-TC_Pantalla Consumo de Datos_Verificar_Relacion_Longitud_Linea_Icono_Pais_AR
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    Then se verifica el icono del pais

  @Funcional
    @PSP-11282
  Scenario Outline: PSP-11282-TC_Pantalla Consumo de Datos_Consultar_Fecha_Seleccionada
    When se hace click en card Consumo de Datos
    And se ingresa el numero de linea en el front
    And se configuran las fechas segun <fechas>
    And se configura el <roaming>
    And se configuran los filtros segun <filtro>
    And existen consumos para el servicio <ratingGroup>
    And se ingresan las fechas <fechas> en el front
    And se selecciona el roaming en el front
    And se selecciona el servicio <filtro> en el front
    And se hace click en el boton Consultar
    And request API filtro = <filtro>
    And se consulta a la BD con el filtro <filtro>
    Then las respuestas son iguales

    Examples:
      | fechas | roaming | ratingGroup | filtro |
      | dia  | null    | 995         | 995    |