import { useState } from 'react'
import FormularioCita, { type Cita } from './components/FormularioCita'
import './App.css'

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [citas, setCitas] = useState<Cita[]>([])

  const agregarCita = (datos: Omit<Cita, 'id'>) => {
    const nueva: Cita = { ...datos, id: Date.now() }
    setCitas(prev => [...prev, nueva])
  }

  return (
    <div className="app-wrapper">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-cross">+</span>
            <span className="brand-name">SaludViva</span>
          </div>
          <p className="brand-slogan">Portal de servicios médicos en línea</p>
        </div>
      </header>

      <main className="main-content">
        {!mostrarFormulario ? (
          <section className="hero-section">
            <h1>Agenda tu cita médica</h1>
            <p className="hero-desc">
              Reserva con nuestros especialistas de forma rápida y segura.<br />
              Sin filas, desde cualquier lugar.
            </p>
            <button
              className="btn-primary"
              onClick={() => setMostrarFormulario(true)}
            >
              Agendar Cita
            </button>
          </section>
        ) : (
          <section className="form-section">
            <div className="form-section-header">
              <h2>Agendamiento de cita médica</h2>
              <button
                className="btn-back"
                onClick={() => setMostrarFormulario(false)}
              >
                ← Volver al inicio
              </button>
            </div>
            <FormularioCita onAgregarCita={agregarCita} />
          </section>
        )}

        {citas.length > 0 && (
          <section className="citas-section">
            <h3>Citas registradas en esta sesión ({citas.length})</h3>
            <div className="table-wrapper">
              <table className="citas-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Paciente</th>
                    <th>Documento</th>
                    <th>Especialidad</th>
                    <th>Sede</th>
                    <th>Fecha</th>
                    <th>Franja</th>
                  </tr>
                </thead>
                <tbody>
                  {citas.map((cita, index) => (
                    <tr key={cita.id}>
                      <td>{index + 1}</td>
                      <td>{cita.nombrePaciente}</td>
                      <td>{cita.tipoDocumento} {cita.numeroDocumento}</td>
                      <td>{cita.especialidad}</td>
                      <td>{cita.sede}</td>
                      <td>{cita.fechaCita}</td>
                      <td>{cita.franjaHoraria}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <p>SaludViva &copy; {new Date().getFullYear()} — Todos los derechos reservados</p>
      </footer>
    </div>
  )
}

export default App
