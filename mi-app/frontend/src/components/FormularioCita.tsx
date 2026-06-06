import { useState } from 'react'

export interface Cita {
  id: number
  tipoDocumento: string
  numeroDocumento: string
  nombrePaciente: string
  especialidad: string
  sede: string
  fechaCita: string
  franjaHoraria: string
  motivoConsulta: string
}

type FormData = Omit<Cita, 'id'>

type FormErrors = Partial<Record<keyof FormData, string>>

interface Props {
  onAgregarCita: (cita: FormData) => void
}

const estadoInicial: FormData = {
  tipoDocumento: '',
  numeroDocumento: '',
  nombrePaciente: '',
  especialidad: '',
  sede: '',
  fechaCita: '',
  franjaHoraria: '',
  motivoConsulta: '',
}

function validar(datos: FormData): FormErrors {
  const errores: FormErrors = {}

  if (!datos.tipoDocumento) {
    errores.tipoDocumento = 'Seleccione un tipo de documento'
  }

  if (!datos.numeroDocumento) {
    errores.numeroDocumento = 'Ingrese el número de documento'
  } else if (!/^\d+$/.test(datos.numeroDocumento)) {
    errores.numeroDocumento = 'Solo se permiten números'
  } else if (datos.numeroDocumento.length < 5 || datos.numeroDocumento.length > 15) {
    errores.numeroDocumento = 'Debe tener entre 5 y 15 dígitos'
  }

  if (!datos.nombrePaciente) {
    errores.nombrePaciente = 'Ingrese el nombre del paciente'
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(datos.nombrePaciente)) {
    errores.nombrePaciente = 'Solo se permiten letras y espacios'
  } else if (datos.nombrePaciente.trim().length < 3) {
    errores.nombrePaciente = 'Mínimo 3 caracteres'
  }

  if (!datos.especialidad) {
    errores.especialidad = 'Seleccione una especialidad'
  }

  if (!datos.sede) {
    errores.sede = 'Seleccione una sede'
  }

  if (!datos.fechaCita) {
    errores.fechaCita = 'Seleccione una fecha'
  } else {
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    const fecha = new Date(datos.fechaCita + 'T00:00:00')
    if (fecha < hoy) {
      errores.fechaCita = 'La fecha debe ser hoy o una fecha futura'
    } else {
      const dia = fecha.getDay()
      if (dia === 0 || dia === 6) {
        errores.fechaCita = 'No se atiende los fines de semana'
      }
    }
  }

  if (!datos.franjaHoraria) {
    errores.franjaHoraria = 'Seleccione una franja horaria'
  }

  if (!datos.motivoConsulta) {
    errores.motivoConsulta = 'Ingrese el motivo de consulta'
  } else if (datos.motivoConsulta.trim().length < 10) {
    errores.motivoConsulta = 'Mínimo 10 caracteres'
  } else if (datos.motivoConsulta.length > 200) {
    errores.motivoConsulta = 'Máximo 200 caracteres'
  }

  return errores
}

export default function FormularioCita({ onAgregarCita }: Props) {
  const [form, setForm] = useState<FormData>(estadoInicial)
  const [errores, setErrores] = useState<FormErrors>({})
  const [exitoso, setExitoso] = useState(false)

  const hoy = new Date().toISOString().split('T')[0]

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errores[name as keyof FormErrors]) {
      setErrores(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nuevosErrores = validar(form)
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }
    onAgregarCita(form)
    setForm(estadoInicial)
    setErrores({})
    setExitoso(true)
    setTimeout(() => setExitoso(false), 3000)
  }

  return (
    <form className="form-cita" onSubmit={handleSubmit} noValidate>
      {exitoso && (
        <div className="alert-success">Cita registrada exitosamente.</div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="tipoDocumento">Tipo de documento *</label>
          <select
            id="tipoDocumento"
            name="tipoDocumento"
            value={form.tipoDocumento}
            onChange={handleChange}
          >
            <option value="">Seleccione...</option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="CE">Cédula de Extranjería</option>
            <option value="PA">Pasaporte</option>
          </select>
          {errores.tipoDocumento && (
            <span className="error-msg">{errores.tipoDocumento}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="numeroDocumento">Número de documento *</label>
          <input
            id="numeroDocumento"
            type="text"
            name="numeroDocumento"
            value={form.numeroDocumento}
            onChange={handleChange}
            placeholder="Ej: 1234567890"
            maxLength={15}
          />
          {errores.numeroDocumento && (
            <span className="error-msg">{errores.numeroDocumento}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="nombrePaciente">Nombre del paciente *</label>
        <input
          id="nombrePaciente"
          type="text"
          name="nombrePaciente"
          value={form.nombrePaciente}
          onChange={handleChange}
          placeholder="Nombre completo"
        />
        {errores.nombrePaciente && (
          <span className="error-msg">{errores.nombrePaciente}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="especialidad">Especialidad médica *</label>
          <select
            id="especialidad"
            name="especialidad"
            value={form.especialidad}
            onChange={handleChange}
          >
            <option value="">Seleccione...</option>
            <option value="Medicina General">Medicina General</option>
            <option value="Cardiología">Cardiología</option>
            <option value="Dermatología">Dermatología</option>
            <option value="Pediatría">Pediatría</option>
            <option value="Ortopedia">Ortopedia</option>
            <option value="Ginecología">Ginecología</option>
            <option value="Neurología">Neurología</option>
            <option value="Oftalmología">Oftalmología</option>
          </select>
          {errores.especialidad && (
            <span className="error-msg">{errores.especialidad}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="sede">Sede *</label>
          <select
            id="sede"
            name="sede"
            value={form.sede}
            onChange={handleChange}
          >
            <option value="">Seleccione...</option>
            <option value="Norte">Sede Norte</option>
            <option value="Sur">Sede Sur</option>
            <option value="Centro">Sede Centro</option>
            <option value="Occidente">Sede Occidente</option>
          </select>
          {errores.sede && (
            <span className="error-msg">{errores.sede}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="fechaCita">Fecha de la cita *</label>
          <input
            id="fechaCita"
            type="date"
            name="fechaCita"
            value={form.fechaCita}
            onChange={handleChange}
            min={hoy}
          />
          {errores.fechaCita && (
            <span className="error-msg">{errores.fechaCita}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="franjaHoraria">Franja horaria *</label>
          <select
            id="franjaHoraria"
            name="franjaHoraria"
            value={form.franjaHoraria}
            onChange={handleChange}
          >
            <option value="">Seleccione...</option>
            <option value="07:00 - 08:00">07:00 - 08:00</option>
            <option value="08:00 - 09:00">08:00 - 09:00</option>
            <option value="09:00 - 10:00">09:00 - 10:00</option>
            <option value="10:00 - 11:00">10:00 - 11:00</option>
            <option value="11:00 - 12:00">11:00 - 12:00</option>
            <option value="14:00 - 15:00">14:00 - 15:00</option>
            <option value="15:00 - 16:00">15:00 - 16:00</option>
            <option value="16:00 - 17:00">16:00 - 17:00</option>
          </select>
          {errores.franjaHoraria && (
            <span className="error-msg">{errores.franjaHoraria}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="motivoConsulta">
          Motivo de consulta *{' '}
          <small className="char-count">({form.motivoConsulta.length}/200)</small>
        </label>
        <textarea
          id="motivoConsulta"
          name="motivoConsulta"
          value={form.motivoConsulta}
          onChange={handleChange}
          placeholder="Describa el motivo de su consulta (mínimo 10 caracteres)"
          rows={4}
          maxLength={200}
        />
        {errores.motivoConsulta && (
          <span className="error-msg">{errores.motivoConsulta}</span>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          Registrar Cita
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            setForm(estadoInicial)
            setErrores({})
          }}
        >
          Limpiar
        </button>
      </div>
    </form>
  )
}
