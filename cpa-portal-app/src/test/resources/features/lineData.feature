@Web @LineData
Feature: Datos de la linea

  Background: Sesion iniciada
    Given inicio sesion con las credenciales por defecto

  @PSP-12097 @Regresion @CA1
  Scenario: Validacion de bandera segun numero de linea ingresada en portal prepago cuenta segura
    And una linea claro del tipo CR
    When el asesor ingresa el numero de linea en el campo de busqueda
    Then Se verifica que la bandera mostrada corresponde al pais

  @PSP-12098 @Regresion @CA2
  Scenario: Se despliega Datos de la linea sin ingresar un numero previamente
    When el asesor hace click en el desplegable Datos de la linea
    Then se muestra el mensaje de error 'Por favor, ingrese el número de línea a consultar.'

  @PSP-12100 @Funcional @CA4
  Scenario: Se busca una linea vacia
    When el asesor presiona enter en el textbox searchPhoneInput sin ingresar ningun numero
    Then se muestra el error 'Número de línea: Por favor, ingrese el número de línea a consultar.' en un mensaje emergente

  @PSP-12101 @Funcional @CA5.3
  Scenario Outline: Se busca una linea invalida (menor cantidad de caracteres permitidos)
    When el asesor presiona enter en el textbox numero de linea ingresando un numero invalido - '<numero>'
    Then se muestra el error 'Número de línea: Por favor, ingrese el número de línea válido para la consulta.' en un mensaje emergente
    Examples:
      | numero  |
      | 1234567 |

  @PSP-13902 @Regresion @CA5.2
  Scenario: Se busca una linea invalida (linea CO)
    And una linea claro del tipo CO
    When el asesor ingresa el numero de linea en el campo de busqueda
    And el asesor hace click en el desplegable Datos de la linea
    Then se muestra el error 'Número de línea: Por favor, ingrese el número de línea válido para la consulta.' en un mensaje emergente
    And se muestra el mensaje de error 'Debe ingresar una línea PP o CR para la consulta.'

  @PSP-13903 @Funcional @CA5.1
  Scenario: Se busca una linea invalida (linea no Claro/linea inexistente)
    And una linea inexistente
    When el asesor ingresa el numero de linea en el campo de busqueda
    And el asesor presiona enter en el textbox searchPhoneInput
    Then se muestra el error 'Error en el origen de datos (Error 200003): No se encuentran registros para los Servicios consultados.' en un mensaje emergente

  @PSP-12102 @Regresion @CA6
  Scenario Outline: Happy path - Se despliega Datos de la linea ingresando un numero de linea
    And una linea claro del tipo <tipoNegocio>
    When el asesor ingresa el numero de linea en el campo de busqueda
    And el asesor hace click en el desplegable Datos de la linea
    Then se visualizan los datos de la linea
    And se verifican que son correctos
    Examples:
      | tipoNegocio |
      | PP          |
      | CR          |

  @PSP-12103 @Regresion @CA7
  Scenario: Se contrae datos de la linea
    And una linea claro del tipo CR
    And el asesor ingresa el numero de linea en el campo de busqueda
    And el asesor hace click en el desplegable Datos de la linea
    And se visualizan los datos de la linea
    When el asesor hace click en el desplegable Datos de la linea
    Then datos de la linea se contrae
    And no se visualizan los datos

  @PSP-12104 @Regresion @CA8 #5558352394
  Scenario: Estado actual inconsistente
    And una linea claro del tipo CR
    And hay diferencia entre el Estado Actual de la base de datos y la plataforma para la linea ingresada
    When el asesor ingresa el numero de linea en el campo de busqueda
    And el asesor hace click en el desplegable Datos de la linea
    Then se verifica que el estado actual es inconsistente
    And se muestra un tooltip con el detalle del estado actual

  @PSP-12105 @Regresion @CA9
  Scenario: El asesor borra el numero de linea con datos de la linea expandido
    And una linea claro del tipo CR
    And el asesor ingresa el numero de linea en el campo de busqueda
    And el asesor hace click en el desplegable Datos de la linea
    And se visualizan los datos de la linea
    When el asesor presiona backspace en el textbox numero de linea
    Then datos de la linea se contrae
    And no se visualizan los datos

  @PSP-12099 @Regresion @CA6
  Scenario Outline: Se realiza una recarga de credito y se valida que se muestre correctamente
    And una linea claro del tipo <tipoNegocio>
    And se realiza una recarga de credito de '<montoRecarga>' pesos con vencimiento en '<dias>' dias
    When el asesor ingresa el numero de linea en el campo de busqueda
    And el asesor hace click en el desplegable Datos de la linea
    Then se visualizan los datos de la linea
    And se verifican que son correctos
    And se verifica la recarga de credito de pesos '<montoRecarga>' con vencimiento en '<dias>' dias
    Examples:
      | tipoNegocio | montoRecarga | dias |
      | PP          | 1000         | 30   |
      | CR          | 1000         | 30   |

  @PSP-13148 @Regresion @CA6
  Scenario Outline: Se acredita un saldo promocional y se valida que se muestre correctamente
    And una linea claro del tipo <tipoNegocio>
    And se realiza una acreditacion de saldo promocional de pesos '<monto>' con vencimiento en '<dias>' dias
    When el asesor ingresa el numero de linea en el campo de busqueda
    And el asesor hace click en el desplegable Datos de la linea
    Then se visualizan los datos de la linea
    And se verifican que son correctos
    And se verifica la acreditacion de saldo promocional de pesos '<monto>' con vencimiento en '<dias>' dias
    Examples:
      | tipoNegocio | monto | dias |
      | PP          | 1000  | 30   |
      | CR          | 1000  | 30   |

  @PSP-13199 @Funcional @CA6
  Scenario: Se acredita saldo disponible de abono y se valida que se muestre correctamente
    And una linea claro del tipo CR
    And un saldo de abono disponible de pesos '20'
    When el asesor ingresa el numero de linea en el campo de busqueda
    And el asesor hace click en el desplegable Datos de la linea
    Then se visualizan los datos de la linea
    And se verifican que son correctos
    And se verifica que el saldo de abono disponible es de pesos '20'


#    @CA3
#  Scenario Outline: Happy path - Se despliega Datos de la linea ingresando un numero previamente en claro home
#    #And una linea claro
#    #And que la linea es <tipoNegocio>
#    And el asesor ingresa el numero de linea en el campo de busqueda
#    #When ingresamos al Portal Prepago Cuenta Segura
#    And el asesor hace click en el desplegable Datos de la linea
#    Then se visualizan los datos de la linea
#    And se verifican que son correctos
#    Examples:
#      | tipoNegocio |
#      | PP          |
#      | CR          |