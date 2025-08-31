import React, { useState } from 'react';
import ListaAutos from './components/ListaAutos';
import FormularioAuto from './components/FormularioAuto';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [autoEditando, setAutoEditando] = useState(null);

    const handleNuevoAuto = () => {
        setAutoEditando(null);
        setMostrarFormulario(true);
    };

    const handleEditarAuto = (auto) => {
        setAutoEditando(auto.id);
        setMostrarFormulario(true);
    };

    const handleGuardado = () => {
        setMostrarFormulario(false);
        setAutoEditando(null);
    };

    return (
        <div className="App">
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    <span className="navbar-brand mb-0 h1">Gestión de Autos</span>
                </div>
            </nav>
            
            <div className="container mt-4">
                {!mostrarFormulario ? (
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2>Lista de Autos</h2>
                            <button 
                                className="btn btn-success" 
                                onClick={handleNuevoAuto}
                            >
                                 Nuevo Auto
                            </button>
                        </div>
                        <ListaAutos onEditar={handleEditarAuto} />
                    </div>
                ) : (
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2>{autoEditando ? 'Editar Auto' : 'Nuevo Auto'}</h2>
                            <button 
                                className="btn btn-secondary" 
                                onClick={() => setMostrarFormulario(false)}
                            >
                                ← Volver a la lista
                            </button>
                        </div>
                        <FormularioAuto 
                            autoId={autoEditando} 
                            onGuardado={handleGuardado} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;