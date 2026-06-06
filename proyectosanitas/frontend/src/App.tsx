import { useState } from 'react'
import FormularioCita, { type Cita } from './components/FormularioCita'
import ListaCitas from './components/ListaCitas'
import Mensajes, { type Mensaje } from './components/Mensajes'
import './App.css'

type Vista = 'inicio' | 'mensajes'

function App() {
  const [vista, setVista] = useState<Vista>('inicio')
  const [citas, setCitas] = useState<Cita[]>([])
  const [mensajes, setMensajes] = useState<Mensaje[]>([])

  const agregarCita = (datos: Omit<Cita, 'id'>) => {
    const nueva: Cita = { ...datos, id: Date.now() }
    setCitas(prev => [...prev, nueva])

    const ahora = new Date()
    const timestamp =
      ahora.toLocaleDateString('es-CO') +
      ' ' +
      ahora.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
    const msg: Mensaje = {
      id: Date.now(),
      texto: `Cita registrada exitosamente para ${datos.nombrePaciente} — ${datos.especialidad} en Sede ${datos.sede} el ${datos.fechaCita} de ${datos.franjaHoraria}.`,
      timestamp,
    }
    setMensajes(prev => [msg, ...prev])
  }

  return (
    <div className="app-wrapper">
      <header className="site-header">
        <div className="header-inner header-row">
          <div>
            <div className="brand">
              <span className="brand-cross">+</span>
              <span className="brand-name">SaludViva</span>
            </div>
            <p className="brand-slogan">Portal de servicios médicos en línea</p>
          </div>
          <button
            className="btn-mensajes"
            onClick={() => setVista(v => v === 'mensajes' ? 'inicio' : 'mensajes')}
          >
            Mensajes
            {mensajes.length > 0 && (
              <span className="badge">{mensajes.length}</span>
            )}
          </button>
        </div>
      </header>

      <main className="main-content">
        {vista === 'mensajes' ? (
          <section className="form-section">
            <div className="form-section-header">
              <h2>Mensajes</h2>
              <button className="btn-back" onClick={() => setVista('inicio')}>
                ← Volver
              </button>
            </div>
            <Mensajes mensajes={mensajes} />
          </section>
        ) : (
          <div className="inicio-grid">
            <section className="form-section">
              <div className="form-section-header">
                <h2>Agendamiento de cita médica</h2>
              </div>
              <FormularioCita onAgregarCita={agregarCita} />
            </section>

            <section className="form-section">
              <div className="form-section-header">
                <h2>Citas registradas</h2>
              </div>
              <ListaCitas citas={citas} />
            </section>
          </div>
        )}
      </main>

      <footer className="site-footer">
        <p>SaludViva &copy; {new Date().getFullYear()} — Todos los derechos reservados</p>
      </footer>
    </div>
  )
}

export default App
