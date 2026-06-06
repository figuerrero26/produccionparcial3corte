import type { Cita } from './FormularioCita'

interface Props {
  citas: Cita[]
}

export default function ListaCitas({ citas }: Props) {
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
      <p className="lista-citas-count">
        Total de citas registradas: <strong>{citas.length}</strong>
      </p>

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
            {citas.map((cita, index) => (
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
    </div>
  )
}
