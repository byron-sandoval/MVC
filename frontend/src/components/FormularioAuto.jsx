import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, Alert } from 'react-bootstrap';

function FormularioAuto({ autoId, onGuardado }) {
    const [auto, setAuto] = useState({
        marca: '',
        modelo: '',
        anio: '',
        precio: ''
    });
    const [esEdicion, setEsEdicion] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (autoId) {
            cargarAuto(autoId);
            setEsEdicion(true);
        }
    }, [autoId]);

    const cargarAuto = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/autos/${id}`);
            setAuto(response.data);
            setError(null);
        } catch (error) {
            console.error('Error cargando auto:', error);
            setError('Error al cargar el auto');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuto(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            if (esEdicion) {
                await axios.put(`http://localhost:8080/api/autos/${autoId}`, auto);
            } else {
                await axios.post('http://localhost:8080/api/autos', auto);
            }
            
            setAuto({
                marca: '',
                modelo: '',
                anio: '',
                precio: ''
            });
            
            if (onGuardado) {
                onGuardado();
            }
        } catch (error) {
            console.error('Error guardando auto:', error);
            setError('Error al guardar el auto');
        } finally {
            setLoading(false);
        }
    };

    if (loading && esEdicion) {
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <Card>
            <Card.Header>
                <h4>{esEdicion ? '✏️ Editar Auto' : ' Nuevo Auto'}</h4>
            </Card.Header>
            <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control
                            type="text"
                            name="marca"
                            value={auto.marca}
                            onChange={handleChange}
                            placeholder="Ej: Toyota, Honda, Ford..."
                            required
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control
                            type="text"
                            name="modelo"
                            value={auto.modelo}
                            onChange={handleChange}
                            placeholder="Ej: Corolla, Civic, Mustang..."
                            required
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Año</Form.Label>
                        <Form.Control
                            type="number"
                            name="anio"
                            value={auto.anio}
                            onChange={handleChange}
                            placeholder="Ej: 2023"
                            min="1900"
                            max="2030"
                            required
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            name="precio"
                            value={auto.precio}
                            onChange={handleChange}
                            placeholder="Ej: 25000"
                            step="0.01"
                            min="0"
                            required
                        />
                    </Form.Group>
                    
                    <div className="d-grid gap-2">
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Guardando...
                                </>
                            ) : (
                                esEdicion ? ' Actualizar Auto' : ' Guardar Auto'
                            )}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default FormularioAuto;