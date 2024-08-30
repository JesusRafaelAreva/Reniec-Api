import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ConsultaForm.css';

const ConsultaForm: React.FC = () => {
  const [dni, setDni] = useState<string>('');
  const [ruc, setRuc] = useState<string>('');
  const [resultadoDni, setResultadoDni] = useState<string | null>(null);
  const [resultadoRuc, setResultadoRuc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const responseDni = await axios.get(`http://localhost:5000/api/dni?numero=${dni}`);
      const dataDni = responseDni.data;
      const nombreCompleto = `${dataDni['apellidoPaterno']} ${dataDni['apellidoMaterno']}, ${dataDni['nombres']}`;
      setResultadoDni(`Nombre completo: ${nombreCompleto}, DNI: ${dataDni['numeroDocumento']}`);

      if (ruc) {
        const responseRuc = await axios.get(`http://localhost:5000/api/ruc?numero=${ruc}`);
        const dataRuc = responseRuc.data;
        setResultadoRuc(`RUC: ${dataRuc['numeroDocumento']}, Estado: ${dataRuc['estado']}, Condición: ${dataRuc['condicion']}`);
      } else {
        setResultadoRuc(null);
      }
    } catch (err) {
      setError("No se pudo obtener la información. Verifique los datos ingresados.");
    }
  };

  return (
    <div className={`app-container ${loading ? 'loading' : ''}`}>
      {loading ? (
        <div className="preloader">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="consulta-form-container">
          <h1 className="consulta-form-heading">Consulta DNI y RUC</h1>
          <form onSubmit={handleSubmit} className="consulta-form">
            <div className="consulta-form-group">
              <label className="consulta-form-label">
                Número de DNI:
                <input
                  type="text"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                  className="consulta-form-input"
                />
              </label>
            </div>
            <div className="consulta-form-group">
              <label className="consulta-form-label">
                Número de RUC (opcional):
                <input
                  type="text"
                  value={ruc}
                  onChange={(e) => setRuc(e.target.value)}
                  className="consulta-form-input"
                />
              </label>
            </div>
            <button type="submit" className="consulta-form-button">Consultar</button>
          </form>
          {resultadoDni && <p className="consulta-form-result">{resultadoDni}</p>}
          {resultadoRuc && <p className="consulta-form-result">{resultadoRuc}</p>}
          {error && <p className="consulta-form-error">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ConsultaForm;