# MASTURIN - Sistema de Registro de Asistencia

## Descripción del Proyecto
MASTURIN es un sistema de registro de asistencia de empleados desarrollado para una pequeña empresa de 25 trabajadores dedicada a la compra y venta de productos químicos. Este sistema permite gestionar eficientemente la entrada y salida de trabajadores, optimizando la administración del tiempo y los recursos humanos.

## Objetivo
Desarrollar una aplicación de escritorio que permita:
- Gestionar eficientemente la entrada y salida de trabajadores
- Mejorar la organización interna
- Asegurar el cumplimiento de las normativas laborales
- Optimizar la administración del tiempo y recursos humanos

## Información del Proyecto
- **Autor**: GG
- **Fecha de Creación**: 01-01-2024
- **Última Actualización**: 02-01-2024

## Requerimientos Funcionales Detallados

### 1. Control de Asistencia (CA-01)
#### Descripción
La aplicación debe permitir el control de asistencia de los empleados y empleadas de la empresa. Los usuarios deben poder marcar su entrada con un botón y su salida de la misma forma.

#### Flujo Normal
1. Usuario selecciona la función marcar entrada/salida
2. Sistema almacena el identificador del usuario, acción (entrada/salida), fecha y hora actual
3. Sistema emite una confirmación del registro correcto de la acción
4. Usuario presiona botón 'Cerrar sesión'

#### Precondiciones
- Los usuarios deben estar creados
- Los usuarios deben haber ingresado a la plataforma mediante la ventana login

### 2. Reportes

#### 2.1 Reporte de Atrasos (RE-01)
##### Descripción
La aplicación debe permitir al Administrador elaborar un reporte de todos aquellos que entren post 9:30 am.

##### Flujo Normal
1. Usuario selecciona opción "reporte de entradas atrasadas"
2. Sistema presenta en pantalla todas las entradas que sean posteriores a 9:30 desde la base de datos, indicando el identificador de cada usuario y los días que llegó tarde

##### Precondiciones
- Usuario debe haber ingresado
- Usuario debe tener privilegios de administrador

#### 2.2 Reporte de Salidas Anticipadas (RE-02)
##### Descripción
La aplicación debe permitir al Administrador elaborar un reporte de todos aquellos que salen antes de las 17:30 pm.

##### Flujo Normal
1. Usuario selecciona la opción "reporte de salidas anticipadas"
2. Sistema presenta todas las salidas que sean antes de las 17:30 desde la base de datos, indicando el identificador de cada usuario y los días que salió anticipadamente

##### Precondiciones
- El usuario debe haber ingresado
- El usuario debe tener privilegios de administrador

#### 2.3 Reporte de Inasistencias (RE-03)
##### Descripción
La aplicación debe permitir al Administrador elaborar un reporte de todos y todas aquellos que no registraron ni entrada ni salida en un día.

##### Flujo Normal
1. Usuario selecciona la opción "reporte de inasistencias"
2. Sistema presenta en pantalla todos los días en los que no se registraron ni entradas ni salidas para los usuarios, indicando el identificador de cada usuario

### 3. Gestión de Usuarios

#### 3.1 Crear Usuarios (GU-01)
##### Flujo Normal
1. El usuario selecciona la opción "crear usuario"
2. El usuario ingresa los datos necesarios para la creación del nuevo usuario
3. El sistema valida y guarda la información del nuevo usuario
4. El sistema confirma la creación del nuevo usuario

##### Precondiciones
- El usuario debe haber ingresado
- El usuario debe tener privilegios de administrador

#### 3.2 Modificar Usuarios (GU-02)
##### Flujo Normal
1. El usuario selecciona la opción "modificar usuario"
2. El usuario selecciona el usuario que desea modificar
3. El usuario actualiza los datos necesarios
4. El sistema valida y guarda los cambios
5. El sistema confirma la modificación del usuario

##### Precondiciones
- El usuario debe haber ingresado
- El usuario debe tener privilegios de administrador

#### 3.3 Eliminar Usuarios (GU-03)
##### Flujo Normal
1. El usuario selecciona la opción "eliminar usuario"
2. El usuario selecciona el usuario que desea eliminar
3. El sistema confirma la acción de eliminación
4. El sistema elimina el usuario seleccionado

##### Precondiciones
- El usuario debe haber ingresado
- El usuario debe tener privilegios de administrador

## Estructura del Proyecto