/**
 * CONEXIONES API PARA REPORTES - MASTURIN
 * 
 * Este archivo contiene las peticiones fetch para generar reportes:
 * 
 * REPORTES API (window.reportesAPI):
 * - obtenerInasistencias(fechaInicio, fechaFin): Obtiene reporte de inasistencias
 * - obtenerAtrasos(fechaInicio, fechaFin): Obtiene reporte de atrasos de entrada
 * - obtenerAtrasosColacion(fechaInicio, fechaFin): Obtiene reporte de atrasos de colación
 * - obtenerAnticipos(fechaInicio, fechaFin): Obtiene reporte de salidas anticipadas
 * - obtenerAnticiposColacion(fechaInicio, fechaFin): Obtiene reporte de anticipos de colación
 * 
 * Todas las funciones son asíncronas y requieren autenticación con token JWT.
 * Las fechas deben estar en formato YYYY-MM-DD.
 */

document.addEventListener("DOMContentLoaded", () => {
    const API = "http://localhost:3000";
    const token = localStorage.getItem("token");

    // Funciones para reportes de inasistencias
    const obtenerInasistencias = async (fechaInicio, fechaFin) => {
        try {
            const response = await fetch(API + "/inasistencias", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    fecha_inicio: fechaInicio,
                    fecha_fin: fechaFin
                })
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            return data;
        } catch (error) {
            console.error('Error al obtener inasistencias:', error);
            throw error;
        }
    };

    // Funciones para reportes de atrasos
    const obtenerAtrasos = async (fechaInicio, fechaFin) => {
        try {
            const response = await fetch(API + "/reportes/atrasos", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    fecha_inicio: fechaInicio,
                    fecha_fin: fechaFin
                })
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            return data;
        } catch (error) {
            console.error('Error al obtener atrasos:', error);
            throw error;
        }
    };

    const obtenerAtrasosColacion = async (fechaInicio, fechaFin) => {
        try {
            const response = await fetch(API + "/reportes/entradasAtrasadasColacion", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    fecha_inicio: fechaInicio,
                    fecha_fin: fechaFin
                })
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            return data;
        } catch (error) {
            console.error('Error al obtener atrasos de colación:', error);
            throw error;
        }
    };

    // Funciones para reportes de anticipos (salidas anticipadas)
    const obtenerAnticipos = async (fechaInicio, fechaFin) => {
        try {
            const response = await fetch(API + "/reportes/anticipos", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    fecha_inicio: fechaInicio,
                    fecha_fin: fechaFin
                })
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            return data;
        } catch (error) {
            console.error('Error al obtener anticipos:', error);
            throw error;
        }
    };

    const obtenerAnticiposColacion = async (fechaInicio, fechaFin) => {
        try {
            const response = await fetch(API + "/reportes/salidasAnticipadasColacion", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    fecha_inicio: fechaInicio,
                    fecha_fin: fechaFin
                })
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            return data;
        } catch (error) {
            console.error('Error al obtener anticipos de colación:', error);
            throw error;
        }
    };

    // Exportar funciones para uso global
    window.reportesAPI = {
        obtenerInasistencias,
        obtenerAtrasos,
        obtenerAtrasosColacion,
        obtenerAnticipos,
        obtenerAnticiposColacion
    };
});