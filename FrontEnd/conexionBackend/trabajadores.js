/**
 * CONEXIONES API PARA TRABAJADORES - MASTURIN
 * 
 * Este archivo contiene las peticiones fetch para gestionar trabajadores:
 * 
 * TRABAJADORES API (window.trabajadoresAPI):
 * - obtenerTrabajadores(): Obtiene todos los trabajadores
 * - obtenerTrabajadorPorRut(rut): Obtiene un trabajador específico por RUT
 * - crearTrabajador(trabajadorData): Crea un nuevo trabajador
 * - actualizarTrabajador(rut, trabajadorData): Actualiza un trabajador existente
 * - eliminarTrabajador(rut): Elimina un trabajador
 * 
 * Todas las funciones son asíncronas y requieren autenticación con token JWT.
 */

document.addEventListener("DOMContentLoaded", () => {
    const API = "http://localhost:3000";
    const token = localStorage.getItem("token");

    // Funciones para trabajadores
    const obtenerTrabajadores = async () => {
        try {
            const response = await fetch(API + "/api/trabajadores", {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            return data;
        } catch (error) {
            console.error('Error al obtener trabajadores:', error);
            throw error;
        }
    };

    const obtenerTrabajadorPorRut = async (rut) => {
        try {
            const response = await fetch(API + `/api/trabajadores/${rut}`, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            return data;
        } catch (error) {
            console.error('Error al obtener trabajador:', error);
            throw error;
        }
    };

    const crearTrabajador = async (trabajadorData) => {
        try {
            const response = await fetch(API + "/api/trabajadores", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(trabajadorData)
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            return data;
        } catch (error) {
            console.error('Error al crear trabajador:', error);
            throw error;
        }
    };

    const actualizarTrabajador = async (rut, trabajadorData) => {
        try {
            const response = await fetch(API + `/api/trabajadores/${rut}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(trabajadorData)
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            return data;
        } catch (error) {
            console.error('Error al actualizar trabajador:', error);
            throw error;
        }
    };

    const eliminarTrabajador = async (rut) => {
        try {
            const response = await fetch(API + `/api/trabajadores/${rut}`, {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            return data;
        } catch (error) {
            console.error('Error al eliminar trabajador:', error);
            throw error;
        }
    };

    // Exportar funciones para uso global
    window.trabajadoresAPI = {
        obtenerTrabajadores,
        obtenerTrabajadorPorRut,
        crearTrabajador,
        actualizarTrabajador,
        eliminarTrabajador
    };
});