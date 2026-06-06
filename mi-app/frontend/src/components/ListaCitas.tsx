import { useMemo, useState } from 'react'
import type { Cita } from './FormularioCita'

interface Props {
  citas: Cita[]
}

export default function ListaCitas({ citas }: Props) {
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('')
  const [filtroSede, setFiltroSede] = useState('')

  const especialidadesDisponibles = useMemo(
    () => Array.from(new Set(citas.map(c => c.especialidad))).sort(),
    [citas]
  )

  const sedesDisponibles = useMemo(
    () => Array.from(new Set(citas.map(c => c.sede))).sort(),
    [citas]
  )

  const citasFiltradas = useMemo(() => {
    return citas.filter(c => {
      const okEsp = !filtroEspecialidad || c.especialidad === filtroEspecialidad
      const okSede = !filtroSede || c.sede === filtroSede
      return okEsp && okSede
    })
  }, [citas, filtroEspecialidad, filtroSede])

  const limpiarFiltros = () => {
    setFiltroEspecialidad('')
    setFiltroSede('')
  }

  if (citas.length === 0) {
    return (
      <div className="empty-state">
        <p>Aún no has registrado ninguna cita.</p>
        <p className="empty-hint">
          Vuelve al inicio y agenda tu primera cita médica.
        </p>
      </div>
    )
  }

  return (
    <div className="lista-citas">
      <div className="filtros-citas">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="filtroEspecialidad">Filtrar por especialidad</label>
            <select
              id="filtroEspecialidad"
              value={filtroEspecialidad}
              onChange={e => setFiltroEspecialidad(e.target.value)}
            >
              <option value="">Todas las especialidades</option>
              {especialidadesDisponibles.map(esp => (
                <option key={esp} value={esp}>{esp}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="filtroSede">Filtrar por sede</label>
            <select
              id="filtroSede"
              value={filtroSede}
              onChange={e => setFiltroSede(e.target.value)}
            >
              <option value="">Todas las sedes</option>
              {sedesDisponibles.map(sede => (
                <option key={sede} value={sede}>{sede}</option>
              ))}
            </select>
          </div>
        </div>

        {(filtroEspecialidad || filtroSede) && (
          <button
            type="button"
            className="btn-back"
            onClick={limpiarFiltros}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <p className="lista-citas-count">
        Mostrando <strong>{citasFiltradas.length}</strong> de {citas.length} cita(s)
      </p>

      {citasFiltradas.length === 0 ? (
        <div className="empty-state">
          <p>No hay citas que coincidan con los filtros aplicados.</p>
        </div>
      ) : (
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
                <th>Motivo</th>
              </tr>
            </thead>
            <tbody>
              {citasFiltradas.map((cita, index) => (
                <tr key={cita.id}>
                  <td>{index + 1}</td>
                  <td>{cita.nombrePaciente}</td>
                  <td>{cita.tipoDocumento} {cita.numeroDocumento}</td>
                  <td>{cita.especialidad}</td>
                  <td>{cita.sede}</td>
                  <td>{cita.fechaCita}</td>
                  <td>{cita.franjaHoraria}</td>
                  <td>{cita.motivoConsulta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
