export interface Mensaje {
  id: number
  texto: string
  timestamp: string
}

interface Props {
  mensajes: Mensaje[]
}

export default function Mensajes({ mensajes }: Props) {
  if (mensajes.length === 0) {
    return (
      <div className="empty-state">
        <p>No tienes notificaciones aún.</p>
        <p className="empty-hint">Aquí aparecerán los eventos de tu cuenta.</p>
      </div>
    )
  }

  return (
    <div className="mensajes-lista">
      <p className="lista-citas-count">
        Total de notificaciones: <strong>{mensajes.length}</strong>
      </p>
      <ul className="mensajes-ul">
        {mensajes.map(msg => (
          <li key={msg.id} className="mensaje-item">
            <span className="mensaje-icono">✓</span>
            <div className="mensaje-cuerpo">
              <p className="mensaje-texto">{msg.texto}</p>
              <span className="mensaje-hora">{msg.timestamp}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
