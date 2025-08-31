import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Badge, Alert } from 'react-bootstrap';

function ListaAutos({ onEditar }) {
    const [autos, setAutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        cargarAutos();
    }, []);

    const cargarAutos = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/api/autos');
            setAutos(response.data);
            setError(null);
        } catch (error) {
            console.error('Error cargando autos:', error);
            setError('Error al cargar los autos');
        } finally {
            setLoading(false);
        }
    };

    const eliminarAuto = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este auto?')) {
            try {
                await axios.delete(`http://localhost:8080/api/autos/${id}`);
                cargarAutos();
            } catch (error) {
                console.error('Error eliminando auto:', error);
                setError('Error al eliminar el auto');
            }
        }
    };

    if (loading) {
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div>
            {autos.length === 0 ? (
                <Alert variant="info">
                    No hay autos registrados. ¡Agrega el primero!
                </Alert>
            ) : (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Año</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {autos.map(auto => (
                            <tr key={auto.id}>
                                <td><Badge bg="secondary">{auto.id}</Badge></td>
                                <td><strong>{auto.marca}</strong></td>
                                <td>{auto.modelo}</td>
                                <td>
                                    <Badge bg="info">{auto.anio}</Badge>
                                </td>
                                <td>
                                    <Badge bg="success">${auto.precio?.toLocaleString()}</Badge>
                                </td>
                                <td>
                                    <Button 
                                        variant="warning" 
                                        size="sm" 
                                        className="me-2"
                                        onClick={() => onEditar(auto)}
                                    >
                                         Editar
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={() => eliminarAuto(auto.id)}
                                    >
                                         Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default ListaAutos;