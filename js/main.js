// DOM Elements
const heroSection = document.getElementById('heroSection');
const heroGrid = document.getElementById('heroGrid');
const fixedGrid = document.getElementById('fixedGrid');
const carousel = document.getElementById('candidatesCarousel');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

// Helper function to get candidate photo path
function getCandidatePhoto(candidato) {
    if (candidato.foto) {
        return candidato.foto;
    }
    const nombreNormalizado = candidato.nombre.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-');
    return `./img/candidatos/${nombreNormalizado}.png`;
}

// Helper function to get party logo path
function getPartyLogo(partido) {
    const partyInfo = partyStyles[partido];
    if (partyInfo && partyInfo.logo) {
        return partyInfo.logo;
    }
    const partidoNormalizado = partido.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-');
    return `./img/logos/${partidoNormalizado}.png`;
}

// Party styles configuration
const partyStyles = {
    'Ahora Nación': { abbr: 'AN', color: '#673ab7', logo: './img/logos/ahora-nacion.jpg' },
    'Fe en el Perú': { abbr: 'FEP', color: '#673ab7', logo: './img/logos/fe-en-el-peru.jpg' },
    'Perú Federal': { abbr: 'PF', color: '#673ab7', logo: './img/logos/peru-federal.jpg' },
    'País para todos': { abbr: 'PPT', color: '#673ab7', logo: './img/logos/pais-para-todos.jpg' },
    'Sí creo': { abbr: 'SC', color: '#673ab7', logo: './img/logos/si-creo.jpg' },
    'Alianza para el Progreso': { abbr: 'APP', color: '#0d6efd', logo: './img/logos/alianza-para-el-progreso.jpg' },
    'Unido Perú': { abbr: 'UP', color: '#ff7a00', logo: './img/logos/unido-peru.jpg' },
    'Frente Esperanza': { abbr: 'FE', color: '#ff7a00', logo: './img/logos/frente-esperanza.jpg' },
    'Alianza Fuerza y Libertad': { abbr: 'FM', color: '#ff7a00', logo: './img/logos/alianza-fuerza-y-libertad.jpg' },
    'Perú Acción': { abbr: 'PA', color: '#ff7a00', logo: './img/logos/peru-accion.jpg' },
    'APRA': { abbr: 'APRA', color: '#ff7a00', logo: './img/logos/apra.jpg' },
    'Partido del Buen Gobierno': { abbr: 'PDBG', color: '#ff7a00', logo: './img/logos/partido-del-buen-gobierno.jpg' },
    'Podemos Perú': { abbr: 'PP', color: '#ff7a00', logo: './img/logos/podemos-peru.jpg' },
    'Fuerza Popular': { abbr: 'FP', color: '#ff7a00', logo: './img/logos/fuerza-popular.jpg' },
    'PRIN': { abbr: 'PRIN', color: '#ff7a00', logo: './img/logos/prin.jpg' },
    'Salvemos al Perú': { abbr: 'SAP', color: '#ff7a00', logo: './img/logos/salvemos-al-peru.jpg' },
    'Perú Primero': { abbr: 'PP', color: '#e53935', logo: './img/logos/peru-primero.jpg' },    
    'Primero la gente': { abbr: 'PL', color: '#e53935', logo: './img/logos/primero-la-gente.jpg' },   
    'Progresemos': { abbr: 'P', color: '#e53935', logo: './img/logos/progresemos.jpg' },  
    'Avanza País': { abbr: 'AP', color: '#0ea5e9', logo: './img/logos/avanza-pais.jpg' },    
    'Libertad Popular': { abbr: 'LP', color: '#0ea5e9', logo: './img/logos/libertad-popular.jpg' }, 
    'Renovación Popular': { abbr: 'RP', color: '#22c55e', logo: './img/logos/renovacion-popular.jpg' },  
    'Obras': { abbr: 'OB', color: '#22c55e', logo: './img/logos/obras.jpg' },       
    'Partido Morado': { abbr: 'PM', color: '#22c55e', logo: './img/logos/partido-morado.jpg' },   
    'Alianza Unidad Nacional': { abbr: 'UYP', color: '#22c55e', logo: './img/logos/alianza-unidad-nacional.jpg' },    
    'Juntos por el Perú': { abbr: 'JPP', color: '#22c55e', logo: './img/logos/juntos-por-el-peru.jpg' }, 
    'Un Camino Diferente': { abbr: 'UCD', color: '#22c55e', logo: './img/logos/un-camino-diferente.jpg' },     
    'Nuevo Perú': { abbr: 'NP', color: '#22c55e', logo: './img/logos/nuevo-peru.jpg' },     
    'Acción Popular': { abbr: 'AP', color: '#22c55e', logo: './img/logos/accion-popular.jpg' },  
    'Perú Libre': { abbr: 'AP', color: '#22c55e', logo: './img/logos/peru-libre.jpg' },    
    'Cooperación Popular': { abbr: 'AP', color: '#22c55e', logo: './img/logos/cooperacion-popular.jpg' },   
    'Partido Verde': { abbr: 'PV', color: '#22c55e', logo: './img/logos/partido-verde.jpg' },   
    'Venceremos': { abbr: 'V', color: '#be123c', logo: './img/logos/venceremos.jpg' },
    'Partido Patriótico del Perú': { abbr: 'V', color: '#be123c', logo: './img/logos/partido-patriotico-del-peru.jpg' },
    'Partido de los Trabajadores y Emprendedores': { abbr: 'V', color: '#be123c', logo: './img/logos/partido-de-los-trabajadores-y-emprendedores.jpg' },
    'Integridad Democrática': { abbr: 'V', color: '#be123c', logo: './img/logos/integridad-democratica.jpg' },
    'Perú Moderno': { abbr: 'V', color: '#be123c', logo: './img/logos/peru-moderno.jpg' },
    'Somos Perú': { abbr: 'V', color: '#be123c', logo: './img/logos/somos-peru.jpg' },
};

// Candidates data with attributes for each section
const candidatos = [
    { nombre: 'Carlos Alvarez', genero: 'M', denuncias: false, edad: 29, reeleccion: false, experiencia: false, partido: 'País para todos', departamento: 'LIMA', profesion: 'Sociólogo', experienciaLaboral: 'Activista social', sentencias: 'No', ingresos: 'S/.95,000', bio: 'Activista social enfocado en derechos de juventud y educación.', extranjero: false, millennial: true, movilidad: false, educacionGrupo: 'bachiller', inconclusos: false, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { 
        nombre: 'Alfonso Lopez Chau', 
        genero: 'M', 
        denuncias: true, 
        edad: 28, 
        reeleccion: false, 
        experiencia: false, 
        partido: 'Ahora Nación', 
        vicepresidentes: 'Ana Maria Choquehuanca',
        departamento: 'Lima', 
        profesion: 'Ingeniero de Sistemas', 
        formacion: 'Universidad Nacional de Ingeniería',
        especializacion: 'Políticas de Innovación Tecnológica',
        experienciaLaboral: 'Conductor en Compañía Latinoamericana de Radiodifusión SA', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'No registra cargos partidarios relevantes',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'No registra sentencias', 
        demandas: 'No registra demandas',
        ingresos: 'S/.150,000', 
        origenIngresos: 'Sector público y ejercicio profesional',
        inmuebles: 'Sí registra bienes inmuebles',
        muebles: 'Sí registra',
        bio: 'Ingeniero de sistemas con enfoque en políticas de innovación tecnológica.',
        pdfLink: 'https://drive.google.com/file/d/1UXqW050ZnRkQJs5Pp4m_oLEwDrJObYlX/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: true,
        educacionGrupo: 'universitario',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin'
    },
    { nombre: 'Alvaro Paz de la Barra', genero: 'M', denuncias: false, edad: 45, reeleccion: true, experiencia: true, partido: 'Fe en el Perú', departamento: 'AREQUIPA', profesion: 'Economista', experienciaLaboral: 'Asesor económico del Congreso', sentencias: 'No', ingresos: 'S/.280,000', bio: 'Congresista actual, enfocado en desarrollo económico regional.', extranjero: false, millennial: false, movilidad: true, educacionGrupo: 'maestro', inconclusos: false, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'Armando Masse', genero: 'M', denuncias: true, edad: 52, reeleccion: true, experiencia: true, partido: 'Perú Federal', departamento: 'CUSCO', profesion: 'Abogado', experienciaLaboral: 'Ex alcalde provincial', sentencias: 'Sí - Penal', ingresos: 'S/.420,000', bio: 'Ex alcalde con experiencia en gestión municipal y obras públicas.', extranjero: false, millennial: false, movilidad: true, educacionGrupo: 'maestro', inconclusos: true, delitos: true, reincidencia: false, sentenciaTipo: 'penal' },
    
    { nombre: 'Carlos Espá', genero: 'M', denuncias: false, edad: 38, reeleccion: false, experiencia: true, partido: 'Sí creo', departamento: 'LA LIBERTAD', profesion: 'Administrador', experienciaLaboral: 'Gerente regional', sentencias: 'No', ingresos: 'S/.350,000', bio: 'Empresario con trayectoria en desarrollo social empresarial.', extranjero: false, millennial: true, movilidad: true, educacionGrupo: 'licenciado', inconclusos: false, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'César Acuña', genero: 'M', denuncias: true, edad: 41, reeleccion: true, experiencia: true, partido: 'Alianza para el Progreso', departamento: 'PIURA', profesion: 'Ingeniero Agrónomo', experienciaLaboral: 'Congresista actual', sentencias: 'Sí - Civil', ingresos: 'S/.290,000', bio: 'Político de carrera con enfoque en agricultura.', extranjero: false, millennial: false, movilidad: true, educacionGrupo: 'maestro', inconclusos: true, delitos: false, reincidencia: false, sentenciaTipo: 'civil' },
    { nombre: 'Charlie Carrasco', genero: 'M', denuncias: false, edad: 27, reeleccion: false, experiencia: false, partido: 'Unido Perú', departamento: 'LIMA', profesion: 'Economista', experienciaLaboral: 'Analista financiero', sentencias: 'No', ingresos: 'S/.120,000', bio: 'Economista joven especializado en finanzas públicas.', extranjero: false, millennial: true, movilidad: false, educacionGrupo: 'universitario', inconclusos: false, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'Fernando Olivera', genero: 'M', denuncias: false, edad: 35, reeleccion: false, experiencia: true, partido: 'Frente Esperanza', departamento: 'LAMBAYEQUE', profesion: 'Contador', experienciaLaboral: 'Ex funcionario público', sentencias: 'No', ingresos: 'S/.180,000', bio: 'Ex funcionario público con experiencia en transparencia.', extranjero: false, millennial: true, movilidad: true, educacionGrupo: 'licenciado', inconclusos: false, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'Fiorella Mollineli', genero: 'F', denuncias: true, edad: 48, reeleccion: true, experiencia: true, partido: 'Alianza Fuerza y Libertad', departamento: 'JUNÍN', profesion: 'Médico', experienciaLaboral: 'Congresista reeleccionista', sentencias: 'No', ingresos: 'S/.510,000', bio: 'Congresista reeleccionista con historial controversial.', extranjero: false, millennial: false, movilidad: true, educacionGrupo: 'maestro', inconclusos: true, delitos: false, reincidencia: false, sentenciaTipo: 'sin', internacional: true },
    { nombre: 'Francisco Diez Canseco', genero: 'M', denuncias: false, edad: 33, reeleccion: false, experiencia: false, partido: 'Perú Acción', departamento: 'LIMA', profesion: 'Abogado', experienciaLaboral: 'Especialista en DDHH', sentencias: 'No', ingresos: 'S/.160,000', bio: 'Abogado especializado en derechos humanos y justicia social.', extranjero: false, millennial: true, movilidad: false, educacionGrupo: 'bachiller', inconclusos: false, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'Enrique Valderrama', genero: 'M', denuncias: false, edad: 42, reeleccion: false, experiencia: true, partido: 'APRA', departamento: 'AYACUCHO', profesion: 'Ingeniero Civil', experienciaLaboral: 'Ex regidor', sentencias: 'No', ingresos: 'S/.240,000', bio: 'Ex regidor con propuestas en medio ambiente.', extranjero: false, millennial: false, movilidad: true, educacionGrupo: 'no-universitario', inconclusos: true, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'Jorge Nieto', genero: 'M', denuncias: true, edad: 29, reeleccion: false, experiencia: false, partido: 'Partido del Buen Gobierno', departamento: 'LIMA', profesion: 'Comunicador', experienciaLaboral: 'Periodista independiente', sentencias: 'Sí - Penal', ingresos: 'S/.105,000', bio: 'Comunicador social con historial de denuncias por difamación.', extranjero: false, millennial: true, movilidad: false, educacionGrupo: 'tecnico', inconclusos: false, delitos: true, reincidencia: false, sentenciaTipo: 'penal' },
    { nombre: 'José Luna Galvez', genero: 'M', denuncias: false, edad: 36, reeleccion: true, experiencia: true, partido: 'Podemos Perú', departamento: 'SAN MARTÍN', profesion: 'Médico', experienciaLaboral: 'Congresista actual', sentencias: 'No', ingresos: 'S/.280,000', bio: 'Congresista con enfoque en salud pública.', extranjero: false, millennial: true, movilidad: true, educacionGrupo: 'licenciado', inconclusos: false, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'Keiko Fujimori', genero: 'F', denuncias: false, edad: 44, reeleccion: false, experiencia: true, partido: 'Fuerza Popular', departamento: 'LORETO', profesion: 'Médico', experienciaLaboral: 'Director de hospital', sentencias: 'No', ingresos: 'S/.320,000', bio: 'Médico con propuestas de reforma sanitaria.', extranjero: false, millennial: false, movilidad: true, educacionGrupo: 'maestro', inconclusos: false, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'Walter Chirinos', genero: 'M', denuncias: true, edad: 50, reeleccion: true, experiencia: true, partido: 'PRIN', departamento: 'UCAYALI', profesion: 'Empresario', experienciaLaboral: 'Político veterano', sentencias: 'Sí - Penal', ingresos: 'S/.485,000', bio: 'Político veterano con múltiples investigaciones fiscales.', extranjero: false, millennial: false, movilidad: true, educacionGrupo: 'secundaria', inconclusos: true, delitos: true, reincidencia: true, sentenciaTipo: 'penal' },
    { nombre: 'Antonio Ortiz', genero: 'M', denuncias: false, edad: 28, reeleccion: false, experiencia: false, partido: 'Salvemos al Perú', departamento: 'LIMA', profesion: 'Profesor', experienciaLaboral: 'Docente universitario', sentencias: 'No', ingresos: 'S/.98,000', bio: 'Profesor universitario con enfoque en reforma educativa.', extranjero: false, millennial: true, movilidad: false, educacionGrupo: 'universitario', inconclusos: false, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'Mario Vizcarra', genero: 'M', denuncias: false, edad: 39, reeleccion: false, experiencia: true, partido: 'Perú Primero', departamento: 'MOQUEGUA', profesion: 'Gestor Público', experienciaLaboral: 'Funcionario municipal', sentencias: 'No', ingresos: 'S/.210,000', bio: 'Gestor público con experiencia en gobiernos locales.', extranjero: false, millennial: true, movilidad: true, educacionGrupo: 'bachiller', inconclusos: false, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'Marisol Pérez Tello', genero: 'F', denuncias: false, edad: 46, reeleccion: true, experiencia: true, partido: 'Primero la gente', departamento: 'APURÍMAC', profesion: 'Ingeniero', experienciaLaboral: 'Congresista reeleccionista', sentencias: 'No', ingresos: 'S/.340,000', bio: 'Congresista reeleccionista enfocado en infraestructura.', extranjero: false, millennial: false, movilidad: true, educacionGrupo: 'no-universitario', inconclusos: true, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'Paul Jaimes', genero: 'M', denuncias: true, edad: 34, reeleccion: false, experiencia: false, partido: 'Progresemos', departamento: 'LIMA', profesion: 'Empresario', experienciaLaboral: 'Gerente comercial', sentencias: 'Sí - Penal', ingresos: 'S/.380,000', bio: 'Empresario con denuncias laborales pendientes.', extranjero: false, millennial: true, movilidad: false, educacionGrupo: 'tecnico', inconclusos: false, delitos: true, reincidencia: false, sentenciaTipo: 'penal' },
    { nombre: 'José Williams', genero: 'M', denuncias: false, edad: 40, reeleccion: false, experiencia: true, partido: 'Avanza País', departamento: 'TUMBES', profesion: 'Contador', experienciaLaboral: 'Asesor fiscal', sentencias: 'No', ingresos: 'S/.230,000', bio: 'Contador con propuestas de transparencia fiscal.', extranjero: false, millennial: false, movilidad: true, educacionGrupo: 'licenciado', inconclusos: false, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'Rafael Belaúnde', genero: 'M', denuncias: false, edad: 32, reeleccion: false, experiencia: true, partido: 'Libertad Popular', departamento: 'LIMA', profesion: 'Politóloga', experienciaLaboral: 'Ex funcionaria ministerial', sentencias: 'No', ingresos: 'S/.195,000', bio: 'Ex funcionaria con enfoque en igualdad de género.', extranjero: true, millennial: true, movilidad: true, educacionGrupo: 'universitario', inconclusos: false, delitos: false, reincidencia: false, sentenciaTipo: 'sin', internacional: true },
    { nombre: 'Rafael López Aliaga', genero: 'M', denuncias: true, edad: 29, reeleccion: false, experiencia: false, partido: 'Renovación Popular', departamento: 'ICA', profesion: 'Periodista', experienciaLaboral: 'Conductora de noticias', sentencias: 'Sí - Penal', ingresos: 'S/.140,000', bio: 'Periodista con denuncias por plagio.', extranjero: false, millennial: true, movilidad: true, educacionGrupo: 'tecnico', inconclusos: true, delitos: true, reincidencia: false, sentenciaTipo: 'penal' },
    { nombre: 'Ricardo Belmont', genero: 'M', denuncias: false, edad: 43, reeleccion: true, experiencia: true, partido: 'Obras', departamento: 'ANCASH', profesion: 'Educadora', experienciaLaboral: 'Congresista reeleccionista', sentencias: 'No', ingresos: 'S/.265,000', bio: 'Congresista reeleccionista enfocada en niñez.', extranjero: false, millennial: false, movilidad: true, educacionGrupo: 'secundaria', inconclusos: true, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'Roberto Chiabra', genero: 'M', denuncias: true, edad: 38, reeleccion: false, experiencia: true, partido: 'Alianza Unidad Nacional', departamento: 'CAJAMARCA', profesion: 'Ingeniera', experienciaLaboral: 'Ex regidora provincial', sentencias: 'Sí - Penal', ingresos: 'S/.220,000', bio: 'Ex regidora con investigaciones por nepotismo.', extranjero: false, millennial: true, movilidad: true, educacionGrupo: 'no-universitario', inconclusos: true, delitos: true, reincidencia: true, sentenciaTipo: 'penal' },
    { nombre: 'Roberto Sanchez', genero: 'M', denuncias: false, edad: 45, reeleccion: true, experiencia: true, partido: 'Juntos por el Perú', departamento: 'PUNO', profesion: 'Administradora', experienciaLaboral: 'Política veterana', sentencias: 'No', ingresos: 'S/.315,000', bio: 'Política experimentada en desarrollo rural.', extranjero: false, millennial: false, movilidad: true, educacionGrupo: 'bachiller', inconclusos: false, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'Rosario Fernández', genero: 'F', denuncias: false, edad: 31, reeleccion: false, experiencia: false, partido: 'Un Camino Diferente', departamento: 'LIMA', profesion: 'Arquitecta', experienciaLaboral: 'Especialista en vivienda', sentencias: 'No', ingresos: 'S/.175,000', bio: 'Arquitecta enfocada en vivienda social.', extranjero: false, millennial: true, movilidad: false, educacionGrupo: 'primaria', inconclusos: false, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'Vladimir Cerrón', genero: 'M', denuncias: false, edad: 28, reeleccion: false, experiencia: false, partido: 'Perú Libre', departamento: 'LIMA', profesion: 'Bióloga', experienciaLaboral: 'Investigadora ambiental', sentencias: 'Sí - Penal', ingresos: 'S/.125,000', bio: 'Bióloga con propuestas ambientales innovadoras.', extranjero: false, millennial: true, movilidad: false, educacionGrupo: 'maestro', inconclusos: false, delitos: true, reincidencia: false, sentenciaTipo: 'penal' },
    { nombre: 'Yonhy Lescano', genero: 'M', denuncias: false, edad: 39, reeleccion: false, experiencia: true, partido: 'Cooperación Popular', departamento: 'MADRE DE DIOS', profesion: 'Administradora', experienciaLaboral: 'Gestora pública', sentencias: 'No', ingresos: 'S/.255,000', bio: 'Administradora con experiencia en gestión pública.', extranjero: false, millennial: true, movilidad: true, educacionGrupo: 'licenciado', inconclusos: false, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'Alex Gonzáles', genero: 'M', denuncias: false, edad: 47, reeleccion: true, experiencia: true, partido: 'Partido Verde', departamento: 'PASCO', profesion: 'Abogada', experienciaLaboral: 'Congresista reeleccionista', sentencias: 'No', ingresos: 'S/.370,000', bio: 'Congresista reeleccionista enfocada en seguridad ciudadana.', extranjero: false, millennial: false, movilidad: true, educacionGrupo: 'universitario', inconclusos: false, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'Ronald Atencio', genero: 'M', denuncias: false, edad: 41, reeleccion: false, experiencia: true, partido: 'Venceremos', departamento: 'AMAZONAS', profesion: 'Socióloga', experienciaLaboral: 'Ex viceministra', sentencias: 'No', ingresos: 'S/.285,000', bio: 'Ex viceministra con experiencia en cultura.', extranjero: false, millennial: false, movilidad: true, educacionGrupo: 'bachiller', inconclusos: true, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'Mesias Guevara', genero: 'M', denuncias: true, edad: 44, reeleccion: true, experiencia: true, partido: 'Partido Morado', departamento: 'CALLAO', profesion: 'Política', experienciaLaboral: 'Congresista actual', sentencias: 'Sí - Penal', ingresos: 'S/.395,000', bio: 'Política con denuncias por enriquecimiento ilícito.', extranjero: false, millennial: false, movilidad: true, educacionGrupo: 'tecnico', inconclusos: false, delitos: true, reincidencia: false, sentenciaTipo: 'penal' },
    { nombre: 'Herbert Caller', genero: 'M', denuncias: true, edad: 44, reeleccion: true, experiencia: true, partido: 'Partido Patriótico del Perú', departamento: 'CALLAO', profesion: 'Política', experienciaLaboral: 'Congresista actual', sentencias: 'No', ingresos: 'S/.395,000', bio: 'Política con denuncias por enriquecimiento ilícito.', extranjero: false, millennial: false, movilidad: true, educacionGrupo: 'bachiller', inconclusos: false, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'Napoleón Becerra', genero: 'M', denuncias: true, edad: 44, reeleccion: true, experiencia: true, partido: 'Partido de los Trabajadores y Emprendedores', departamento: 'CALLAO', profesion: 'Política', experienciaLaboral: 'Congresista actual', sentencias: 'No', ingresos: 'S/.395,000', bio: 'Política con denuncias por enriquecimiento ilícito.', extranjero: false, millennial: false, movilidad: true, educacionGrupo: 'no-universitario', inconclusos: true, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'Wolfgang Grozo', genero: 'M', denuncias: true, edad: 44, reeleccion: true, experiencia: true, partido: 'Integridad Democrática', departamento: 'CALLAO', profesion: 'Política', experienciaLaboral: 'Congresista actual', sentencias: 'Sí - Penal', ingresos: 'S/.395,000', bio: 'Política con denuncias por enriquecimiento ilícito.', extranjero: false, millennial: false, movilidad: true, educacionGrupo: 'licenciado', inconclusos: false, delitos: true, reincidencia: false, sentenciaTipo: 'penal' },
    { nombre: 'Carlos Jaico', genero: 'M', denuncias: true, edad: 44, reeleccion: true, experiencia: true, partido: 'Perú Moderno', departamento: 'CALLAO', profesion: 'Política', experienciaLaboral: 'Congresista actual', sentencias: 'No', ingresos: 'S/.395,000', bio: 'Política con denuncias por enriquecimiento ilícito.', extranjero: false, millennial: false, movilidad: false, educacionGrupo: 'maestro', inconclusos: false, delitos: false, reincidencia: false, sentenciaTipo: 'sin' },
    { nombre: 'George Forsyth', genero: 'M', denuncias: true, edad: 44, reeleccion: true, experiencia: true, partido: 'Somos Perú', departamento: 'CALLAO', profesion: 'Política', experienciaLaboral: 'Congresista actual', sentencias: 'No', ingresos: 'S/.395,000', bio: 'Política con denuncias por enriquecimiento ilícito.', extranjero: false, millennial: false, movilidad: true, educacionGrupo: 'licenciado', inconclusos: false, delitos: false, reincidencia: false, sentenciaTipo: 'sin' }
];

    

    candidatos.forEach((c, idx) => {
        // Insertar el logo en la posiciÃ³n correcta (despuÃ©s del candidato 31, Ã­ndice 30)
        // Para que quede centrado en la fila 3: 5 candidatos + logo (span 3) + 5 candidatos
        if (idx === 18) {
            const logoDiv = document.createElement('div');
            logoDiv.className = 'hero-logo-cell';
            logoDiv.innerHTML = `<img src="./img/logo-tu-decides.jpg" alt="TÃº decides" class="hero-logo-integrated">`;
            heroGrid.appendChild(logoDiv);
        }

        const div = document.createElement('div');
        div.className = 'candidate-hero';
        
        const flipContainer = document.createElement('div');
        flipContainer.className = 'hero-flip';
        
        const front = document.createElement('div');
        front.className = 'hero-face hero-front';
        const candidatePhoto = getCandidatePhoto(c);
        front.style.backgroundImage = `url(${candidatePhoto})`;
        
        const back = document.createElement('div');
        back.className = 'hero-face hero-back';
        const partyInfo = partyStyles[c.partido] || { abbr: c.partido.slice(0, 3).toUpperCase(), color: '#222', logo: null };
        back.style.backgroundColor = partyInfo.color;
        
        const partyLogo = getPartyLogo(c.partido);
        if (partyInfo.logo) {
            back.innerHTML = `<img src="${partyLogo}" alt="${c.partido}" style="width:100%; height:100%; object-fit:contain; border-radius: 10px;" onerror="this.style.display='none';">`;
        } else {
            back.textContent = partyInfo.abbr;
            back.style.display = 'flex';
            back.style.alignItems = 'center';
            back.style.justifyContent = 'center';
            back.style.color = '#fff';
            back.style.fontWeight = 'bold';
            back.style.fontSize = '12px';
        }
        
        flipContainer.appendChild(front);
        flipContainer.appendChild(back);
        div.appendChild(flipContainer);
        
        div.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        
        heroGrid.appendChild(div);
    });

    // Create fixed grid for data sections
    // Crear array de índices aleatorios para posiciones iniciales
    const shuffledIndices = [...Array(candidatos.length).keys()];
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
    }
    
    // Función para obtener número de columnas según el tamaño de pantalla
    function getGridColumns() {
        const width = window.innerWidth;
        if (width <= 640) return 5;
        if (width <= 768) return 6;
        return 8;
    }
    
    // Función para calcular y aplicar offsets aleatorios (intercambio exacto de celdas)
    function calculateRandomOffsets() {
        const gridCandidates = fixedGrid.querySelectorAll('.data-candidate-fixed');
        if (gridCandidates.length < 2) return;
        
        const columns = getGridColumns();
        
        // Obtener tamaño real de celda midiendo los primeros dos elementos
        const firstCell = gridCandidates[0];
        const secondCell = gridCandidates[1];
        const firstRect = firstCell.getBoundingClientRect();
        const secondRect = secondCell.getBoundingClientRect();
        
        // El cellSize es la diferencia entre las posiciones X de celdas consecutivas
        const cellWidth = secondRect.left - firstRect.left;
        // Para la altura, comparamos con el elemento de la siguiente fila
        const nextRowCell = gridCandidates[columns];
        const cellHeight = nextRowCell ? 
            nextRowCell.getBoundingClientRect().top - firstRect.top : 
            cellWidth; // Asumir cuadrado si no hay siguiente fila
        
        gridCandidates.forEach((div, idx) => {
            // Posición donde debería ir esta cara en el orden aleatorio
            const randomIdx = shuffledIndices[idx];
            
            // Calcular fila y columna original
            const originalRow = Math.floor(idx / columns);
            const originalCol = idx % columns;
            
            // Calcular fila y columna destino (aleatorio)
            const randomRow = Math.floor(randomIdx / columns);
            const randomCol = randomIdx % columns;
            
            // Calcular desplazamiento exacto en píxeles (celda a celda)
            const offsetX = (randomCol - originalCol) * cellWidth;
            const offsetY = (randomRow - originalRow) * cellHeight;
            
            div.dataset.randomOffsetX = offsetX;
            div.dataset.randomOffsetY = offsetY;
            
            // Solo aplicar si el grid está en estado aleatorio
            if (fixedGrid.classList.contains('randomized')) {
                div.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            }
        });
    }
    
    candidatos.forEach((c, idx) => {
        const div = document.createElement('div');
        div.className = 'data-candidate-fixed';
        div.dataset.index = idx;
        div.dataset.originalIndex = idx;
        const candidatePhoto = getCandidatePhoto(c);
        div.style.backgroundImage = `url(${candidatePhoto})`;
        fixedGrid.appendChild(div);
    });
    
    // Marcar grid como aleatorio inicialmente
    fixedGrid.classList.add('randomized');
    
    // Variable para rastrear si ya se ordenó
    let isGridOrdered = false;
    
    // Esperar a que el layout esté completo para calcular tamaños
    setTimeout(() => {
        calculateRandomOffsets();
    }, 100);
    
    // Recalcular offsets en resize (con debounce)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (fixedGrid.classList.contains('randomized')) {
                calculateRandomOffsets();
            }
        }, 200);
    });

    // Create carousel
    candidatos.forEach((c, i) => {
        const div = document.createElement('div');
        div.className = 'carousel-candidate';
        
        const face = document.createElement('div');
        face.className = 'candidate-face';
        const candidatePhoto = getCandidatePhoto(c);
        face.style.backgroundImage = `url(${candidatePhoto})`;
        
        const party = document.createElement('div');
        party.className = 'candidate-party';
        const partyInfo = partyStyles[c.partido] || { abbr: c.partido.slice(0, 3).toUpperCase(), color: '#222', logo: null };
        party.style.backgroundColor = partyInfo.color;
        
        const partyLogo = getPartyLogo(c.partido);
        if (partyInfo.logo) {
            party.innerHTML = `<img src="${partyLogo}" alt="${c.partido}" style="width:100%; height:100%; object-fit:contain; border-radius: 10px;" onerror="this.style.display='none';">`;
        } else {
            party.textContent = partyInfo.abbr;
        }
        
        div.appendChild(face);
        div.appendChild(party);
        div.addEventListener('click', () => openModal(c));
        carousel.appendChild(div);
    });

    // Modal functions
    function openModal(candidato) {
        const candidatePhoto = getCandidatePhoto(candidato);
        const partyLogo = getPartyLogo(candidato.partido);
        
        document.getElementById('modalPhoto').style.backgroundImage = `url(${candidatePhoto})`;
        document.getElementById('modalPartyLogo').style.backgroundImage = `url(${partyLogo})`;
        document.getElementById('modalName').textContent = candidato.nombre;
        document.getElementById('modalParty').textContent = candidato.partido;
        document.getElementById('modalEdad').textContent = candidato.edad;
        document.getElementById('modalVicepresidentes').textContent = candidato.vicepresidentes || 'No disponible';
        
        document.getElementById('modalProfesion').textContent = candidato.profesion || 'No disponible';
        document.getElementById('modalFormacion').textContent = candidato.formacion || candidato.profesion || 'No disponible';
        document.getElementById('modalEspecializacion').textContent = candidato.especializacion || 'No disponible';
        
        document.getElementById('modalExpPublica').textContent = candidato.expPublica || (candidato.experiencia ? 'SÃ­' : 'No');
        document.getElementById('modalRolRelevante').textContent = candidato.rolRelevante || candidato.experienciaLaboral || 'No disponible';
        document.getElementById('modalExpInternacional').textContent = candidato.expInternacional || 'No registra';
        
        document.getElementById('modalCargosEleccion').textContent = candidato.cargosEleccion || (candidato.reeleccion ? 'Cargo actual' : 'No registra');
        document.getElementById('modalCargosPartidarios').textContent = candidato.cargosPartidarios || 'No disponible';
        document.getElementById('modalContinuidad').textContent = candidato.continuidad || 'No disponible';
        
        document.getElementById('modalSentencias').textContent = candidato.sentencias === 'No' ? 'No registra sentencias' : candidato.sentencias;
        document.getElementById('modalDemandas').textContent = candidato.demandas || 'No registra';
        
        document.getElementById('modalIngresos').textContent = candidato.ingresos;
        document.getElementById('modalOrigenIngresos').textContent = candidato.origenIngresos || 'No especificado';
        
        document.getElementById('modalInmuebles').textContent = candidato.inmuebles || 'No disponible';
        document.getElementById('modalMuebles').textContent = candidato.muebles || 'No disponible';
        
        document.getElementById('modalResumen').textContent = candidato.resumen || candidato.bio || 'InformaciÃ³n no disponible.';
        
        const pdfLink = document.getElementById('modalPdfLink');
        if (candidato.pdfLink) {
            pdfLink.href = candidato.pdfLink;
        } else {
            pdfLink.href = '#';
        }
        
        modal.classList.add('active');
        modalOverlay.classList.add('active');
        
        const scrollContainer = document.querySelector('.modal-scroll-container');
        if (scrollContainer) {
            scrollContainer.scrollTop = 0;
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        modalOverlay.classList.remove('active');
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Section highlight configurations
    const sectionConfigs = {
        'previo': {
            filter: () => false, // No highlights, solo muestra caras aleatorias
            color: null,
            isTransition: true // Marca para la transición
        },
        'extranjero': {
            filter: (c) => c.extranjero,
            color: 'active-yellow'
        },
        'mujeres': {
            filter: (c) => c.genero === 'F',
            color: 'active-yellow'
        },
        'internacional': {
            filter: (c) => c.internacional,
            color: 'active-yellow'
        },
        'millennial': {
            filter: (c) => c.millennial,
            color: 'active-yellow'
        },
        'informativo1': {
            filter: () => false, // No highlights para informativos
            color: null,
            keepPrevious: true // Mantener highlights previos
        },
        'movilidad': {
            filter: (c) => c.movilidad,
            color: 'active-yellow'
        },
        'educacion': {
            filter: (c) => true, // All candidates
            colorMap: {
                'maestro': 'active-yellow',
                'bachiller': 'active-pink',
                'licenciado': 'active-orange',
                'universitario': 'active-green',
                'no-universitario': 'active-blue',
                'tecnico': 'active-blue',
                'secundaria': 'active-red',
                'primaria': 'active-lime'
            }
        },
        'inconclusos': {
            filter: (c) => c.inconclusos,
            color: 'active-red'
        },
        'delitos': {
            filter: (c) => c.delitos,
            color: 'active-red'
        },
        'informativo2': {
            filter: () => false, // No highlights para informativos
            color: null,
            keepPrevious: true // Mantener highlights previos
        },
        'reincidencia': {
            filter: (c) => c.reincidencia,
            color: 'active-red'
        },
        'sentencias': {
            filter: (c) => c.sentenciaTipo !== 'sin',
            colorMap: {
                'penal': 'active-red',
                'civil': 'active-blue',
                'sin': null
            }
        },
        'informativo3': {
            filter: () => false, // No highlights para informativos
            color: null,
            keepPrevious: true // Mantener highlights previos
        }
    };

    // Clear all highlights from grid
    function clearHighlights() {
        const gridCandidates = fixedGrid.querySelectorAll('.data-candidate-fixed');
        gridCandidates.forEach(el => {
            el.classList.remove('active-yellow', 'active-red', 'active-blue', 'active-pink', 'active-orange', 'active-green', 'active-lime');
        });
    }

    // Apply highlights for a section
    function applyHighlights(sectionName) {
        const config = sectionConfigs[sectionName];
        if (!config) return;
        
        // Si es section previo, mantener caras aleatorias
        if (config.isTransition) {
            // Asegurarse de que el grid está en estado aleatorio
            if (!fixedGrid.classList.contains('randomized')) {
                fixedGrid.classList.add('randomized');
                fixedGrid.classList.remove('ordered');
                const gridCandidates = fixedGrid.querySelectorAll('.data-candidate-fixed');
                gridCandidates.forEach(el => {
                    const offsetX = el.dataset.randomOffsetX || 0;
                    const offsetY = el.dataset.randomOffsetY || 0;
                    el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                });
            }
            clearHighlights();
            return;
        }
        
        // Si es section informativo, mantener highlights previos
        if (config.keepPrevious) {
            return; // No hacer nada, mantener estado actual
        }
        
        // Ordenar el grid si aún está aleatorio
        if (fixedGrid.classList.contains('randomized')) {
            fixedGrid.classList.remove('randomized');
            fixedGrid.classList.add('ordered');
            const gridCandidates = fixedGrid.querySelectorAll('.data-candidate-fixed');
            gridCandidates.forEach(el => {
                el.style.transform = 'translate(0, 0)';
            });
            isGridOrdered = true;
        }
        
        clearHighlights();
        
        const gridCandidates = fixedGrid.querySelectorAll('.data-candidate-fixed');
        
        gridCandidates.forEach((el, idx) => {
            const candidato = candidatos[idx];
            if (!candidato) return;
            
            if (config.colorMap) {
                // Multiple colors based on attribute
                if (sectionName === 'educacion') {
                    const colorClass = config.colorMap[candidato.educacionGrupo];
                    if (colorClass) {
                        el.classList.add(colorClass);
                    }
                } else if (sectionName === 'sentencias') {
                    const colorClass = config.colorMap[candidato.sentenciaTipo];
                    if (colorClass) {
                        el.classList.add(colorClass);
                    }
                }
            } else {
                // Single color
                if (config.filter(candidato) && config.color) {
                    el.classList.add(config.color);
                }
            }
        });
    }

    // Intersection Observer for info boxes
    function setupIntersectionObserver() {
        const sections = document.querySelectorAll('.data-section-new');
        
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const infoBox = entry.target.querySelector('.info-box-centered');
                
                if (entry.isIntersecting) {
                    infoBox.classList.add('visible');
                    const sectionName = entry.target.dataset.section;
                    applyHighlights(sectionName);
                } else {
                    infoBox.classList.remove('visible');
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const carouselCandidates = carousel.querySelectorAll('.carousel-candidate');
        const hasSearch = query !== '';
        
        carouselCandidates.forEach((card, i) => {
            const candidato = candidatos[i];
            const match = candidato.nombre.toLowerCase().includes(query) || 
                        candidato.partido.toLowerCase().includes(query);
            
            card.style.opacity = query === '' ? '1' : (match ? '1' : '0.2');
            
            if (hasSearch && match) {
                card.classList.add('no-flip');
            } else {
                card.classList.remove('no-flip');
            }
        });
    });

    // Scroll button
    const btnBajar = document.querySelector('.btn-bajar');
    if (btnBajar) {
        btnBajar.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        setupIntersectionObserver();
    });

    // Fallback for browsers that don't support DOMContentLoaded properly
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setupIntersectionObserver();
    }
