import {useState, useEffect} from 'react'
import Error from './Error';


const Formulario = ( {pacientes, setPacientes, paciente, setPaciente} ) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  // Detects and executed every time the "paciente" prop has changed
  useEffect(() => {

    // When paciente prop comes with values, it populates the form

    if(Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente]);

  // Used without dependencies to detect when the current component is ready
  useEffect(() => {
    console.log('El conponente Formulario esta listo')
  }, [])

  const generarId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

  /**
   * Handler submit, executed when the submit button "AGREGAR PACIENTE" is clicked on
   * 
   * @param {*} e 
   * @returns 
   */
  const handleSubmit = (e) => {

    e.preventDefault()

    // in case any field is empty
    if ( [nombre, propietario, email, fecha, sintomas].includes('') ) {
      
      setError(true)
      return;

    } 
    
    setError(false)

    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas
    }

    if(paciente.id) {
      // Editing existent record
      objetoPaciente.id = paciente.id

      const pacientesActualizados = pacientes.map( p => p.id === paciente.id ? objetoPaciente : p)
      setPacientes(pacientesActualizados)

      // clean up the paciente prop
      setPaciente({})
  
    } else {
      // Creating new record
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente])
      
    }

    

    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')

  }


  

  
  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      
      <form
          onSubmit={handleSubmit} 
          className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        
        { 
          error && <Error mensaje="Todos los campos son obbligatorios" />
        }

        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input 
              id="mascota"
              type="text" 
              placeholder="Nombre de la mascota"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={nombre}
              onChange={ (e) => {setNombre(e.target.value); setError(false)} }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre del Propietario</label>
          <input 
              id="propietario"
              type="text" 
              placeholder="Nombre del propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={propietario}
              onChange={ (e) => setPropietario(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
          <input 
              id="email"
              type="email" 
              placeholder="E-Mail Contacto Propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
          <input 
              id="alta"
              type="date" 
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={fecha}
              onChange={ (e) => setFecha(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
          <textarea 
              id="sintomas"
              placeholder="Describe los Sintomas"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={sintomas}
              onChange={ (e) => setSintomas(e.target.value) }
          />
        </div>

        <input 
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all rounded-md" 
            value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}   
        />

      </form>
    </div>
  )
}

export default Formulario
