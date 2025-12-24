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
    'Alianza Fuerza y Libertad': { abbr: 'FM', color: '#ff7a00', logo: './img/logos/alianza-fuerza-y-libertad.jpg' },
    'Alianza para el Progreso': { abbr: 'APP', color: '#0d6efd', logo: './img/logos/alianza-para-el-progreso.jpg' },
    'Alianza Unidad Nacional': { abbr: 'UYP', color: '#22c55e', logo: './img/logos/alianza-unidad-nacional.jpg' },    
    'Alianza Venceremos': { abbr: 'V', color: '#be123c', logo: './img/logos/venceremos.jpg' },
    'Avanza País': { abbr: 'AP', color: '#0ea5e9', logo: './img/logos/avanza-pais.jpg' },    
    'Cooperación Popular': { abbr: 'AP', color: '#22c55e', logo: './img/logos/cooperacion-popular.jpg' }, 
    'Fe en el Perú': { abbr: 'FEP', color: '#673ab7', logo: './img/logos/fe-en-el-peru.jpg' },
    'Frente de la Esperanza': { abbr: 'FE', color: '#ff7a00', logo: './img/logos/frente-esperanza.jpg' }, 
    'Fuerza Popular': { abbr: 'FP', color: '#ff7a00', logo: './img/logos/fuerza-popular.jpg' },
    'Integridad Democrática': { abbr: 'V', color: '#be123c', logo: './img/logos/integridad-democratica.jpg' },
    'Juntos por el Perú': { abbr: 'JPP', color: '#22c55e', logo: './img/logos/juntos-por-el-peru.jpg' }, 
    'Libertad Popular': { abbr: 'LP', color: '#0ea5e9', logo: './img/logos/libertad-popular.jpg' }, 
    'País para todos': { abbr: 'PPT', color: '#673ab7', logo: './img/logos/pais-para-todos.jpg' },
    'Partido Aprista Peruano': { abbr: 'APRA', color: '#ff7a00', logo: './img/logos/apra.jpg' },
    'Partido Cívico Obras': { abbr: 'OB', color: '#22c55e', logo: './img/logos/obras.jpg' },       
    'Partido de los Trabajadores y Emprendedores': { abbr: 'V', color: '#be123c', logo: './img/logos/partido-de-los-trabajadores-y-emprendedores.jpg' },
    'Partido del Buen Gobierno': { abbr: 'PDBG', color: '#ff7a00', logo: './img/logos/partido-del-buen-gobierno.jpg' },
    'Unido Perú': { abbr: 'UP', color: '#ff7a00', logo: './img/logos/unido-peru.jpg' },
    'Partido Demócrata Verde': { abbr: 'PV', color: '#22c55e', logo: './img/logos/partido-verde.jpg' },  
    'Partido Democrático Federal': { abbr: 'PF', color: '#673ab7', logo: './img/logos/peru-federal.jpg' },
    'Partido Morado': { abbr: 'PM', color: '#22c55e', logo: './img/logos/partido-morado.jpg' },    
    'Partido Patriótico del Perú': { abbr: 'V', color: '#be123c', logo: './img/logos/partido-patriotico-del-peru.jpg' },    
    'Perú Moderno': { abbr: 'V', color: '#be123c', logo: './img/logos/peru-moderno.jpg' },
    'Perú Acción': { abbr: 'PA', color: '#ff7a00', logo: './img/logos/peru-accion.jpg' },  
    'Perú Libre': { abbr: 'AP', color: '#22c55e', logo: './img/logos/peru-libre.jpg' },   
    'Perú Primero': { abbr: 'PP', color: '#e53935', logo: './img/logos/peru-primero.jpg' },    
    'Podemos Perú': { abbr: 'PP', color: '#ff7a00', logo: './img/logos/podemos-peru.jpg' },    
    'Primero la gente': { abbr: 'PL', color: '#e53935', logo: './img/logos/primero-la-gente.jpg' },   
    'Partido Político PRIN': { abbr: 'PRIN', color: '#ff7a00', logo: './img/logos/prin.jpg' },
    'Progresemos': { abbr: 'P', color: '#e53935', logo: './img/logos/progresemos.jpg' },   
    'Renovación Popular': { abbr: 'RP', color: '#22c55e', logo: './img/logos/renovacion-popular.jpg' },
    'Salvemos al Perú': { abbr: 'SAP', color: '#ff7a00', logo: './img/logos/salvemos-al-peru.jpg' },    
    'Sí creo': { abbr: 'SC', color: '#673ab7', logo: './img/logos/si-creo.jpg' },      
    'Somos Perú': { abbr: 'V', color: '#be123c', logo: './img/logos/somos-peru.jpg' },  
    'Un Camino Diferente': { abbr: 'UCD', color: '#22c55e', logo: './img/logos/un-camino-diferente.jpg' }, 
};

// Candidates data with attributes for each section
const candidatos = [
    { 
        nombre: 'César Acuña', 
        genero: 'M', 
        denuncias: true, 
        edad: 73, 
        reeleccion: false, 
        experiencia: false, 
        partido: 'Alianza para el Progreso', 
        vicepresidentes: 'Jessica Tumi y Alejandro Soto',
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
        pdfLink: 'https://drive.google.com/file/d/16IfX4meSvODhTsxNO9B7NO6jkq2GTuNf/view',
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
    { 
        nombre: 'Carlos Alvarez', 
        genero: 'M',
        denuncias: false, 
        edad: 61, 
        reeleccion: false, 
        experiencia: false, 
        partido: 'País para todos', 
        vicepresidentes: 'María Cristina Chambizea Reyes y Diego Edgar Guevara Vivanco',
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
        pdfLink: 'https://drive.google.com/file/d/13Ms7rBVzk5fovhowIGv6_8mekrukY4w9/view',
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
    { 
        nombre: 'Ronald Atencio', 
        genero: 'M', 
        denuncias: false, 
        edad: 44, 
        reeleccion: false, 
        experiencia: false, 
        partido: 'Alianza Venceremos', 
        vicepresidentes: 'Elena Carmen Rivera Huamán y Alberto Eugenio Quintanilla Chacón',
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
        pdfLink: 'https://drive.google.com/file/d/1PlpQG05cMdfa_IXQfSlfUZG353zovAS1/view',
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
    { 
        nombre: 'Napoleón Becerra', 
        genero: 'M', 
        denuncias: true, 
        edad: 44, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Partido de los Trabajadores y Emprendedores', 
        vicepresidentes: 'Winston Clemente Huamán Henríquez y Nelida Juliana Cuayla Cuayla',
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
        pdfLink: '#',
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
    { 
        nombre: 'Rafael Belaúnde', 
        genero: 'M', 
        denuncias: false, 
        edad: 50, 
        reeleccion: false, 
        experiencia: true, 
        partido: 'Libertad Popular', 
        vicepresidentes: 'Pedro Cateriano y Tania Porles Bazalar ',
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
        pdfLink: 'https://drive.google.com/file/d/1xvyBa_hpwYft-LCc7xpdaL_COji3dPiG/view',
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
    { 
        nombre: 'Ricardo Belmont', 
        genero: 'M', 
        denuncias: false,
        edad: 80, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Partido Cívico Obras', 
        vicepresidentes: 'Daniel Hugo Barragán Coloma y Dina Irene Hancco Hancco',
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
        pdfLink: 'https://drive.google.com/file/d/1Q4NcUkbKbIXdzyyukHiBXrWRM1YArQBZ/view',
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
    { 
        nombre: 'Herbert Caller', 
        genero: 'M',
        denuncias: true, 
        edad: 47, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Partido Patriótico del Perú', 
        vicepresidentes: 'Rossana Montes Tello y Jorge Carcovich',
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
        pdfLink: 'https://drive.google.com/file/d/1ltB6GeG-wy7Q_p_1oXelue4lZQzwFgaD/view',
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
    { 
        nombre: 'Charlie Carrasco', 
        genero: 'M', 
        denuncias: false, 
        edad: 45, 
        reeleccion: false, 
        experiencia: false, 
        partido: 'Unido Perú', 
        vicepresidentes: 'María Edith Paredes Verdy y Wilbert Gabino Segovia Quin',
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
        pdfLink: 'https://drive.google.com/file/d/1zfgfBtR-BmoBc5jSO0tIslhzTnqsaCcT/view',
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
    { 
        nombre: 'Roberto Chiabra', 
        genero: 'M', 
        denuncias: true, 
        edad: 76, 
        reeleccion: false, 
        experiencia: true, 
        partido: 'Alianza Unidad Nacional', 
        vicepresidentes: 'Javier Bedoya y Neldy Mendoza ',
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
        pdfLink: 'https://drive.google.com/file/d/1PpZOYerTU0T86TKCnUZfof-rgIcbWF7-/view',
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
    { 
        nombre: 'Walter Chirinos', 
        genero: 'M', 
        denuncias: true, 
        edad: 57, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Partido Político PRIN', 
        vicepresidentes: 'Julio Alberto Vega Ybañez y Mayra Lizeth Vargas Gil',
        departamento: 'Lima', 
        profesion: 'Contador Público', 
        formacion: 'Bachiller en Contabilidad y Finanzas',
        especializacion: 'Gestión Pública',
        expPublica: 'Sí',
        experienciaLaboral: 'Director General del Gobierno del Interior', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'Fundador del Partido Político PRIN',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'No registra sentencias', 
        demandas: 'No registra demandas',
        ingresos: 'S/24,000', 
        origenIngresos: 'Sector privado',
        inmuebles: 'Sí registra bienes inmuebles',
        muebles: 'Sí registra',
        bio: 'Perfil con trayectoria en el sector defensa. No registra sentencias judiciales y sus ingresos declarados son coherentes con su carrera en el Estado.',
        pdfLink: 'https://drive.google.com/file/d/1MRZc0Nd4lZIwZY_AZmN7j8ANU8rdJP7z/view',
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
    {
        nombre: 'Vladimir Cerrón', 
        genero: 'M', 
        denuncias: false,
        edad: 55, 
        reeleccion: false, 
        experiencia: false, 
        partido: 'Perú Libre', 
        vicepresidentes: 'Flavio Cruz Mamani y Bertha Rojas López',
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
        pdfLink: 'https://drive.google.com/file/d/1compmiHFO7MtUjiopYSYuli-nuXaoksb/view',
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
    { 
        nombre: 'Francisco Diez Canseco', 
        genero: 'M', 
        denuncias: false, 
        edad: 79, 
        reeleccion: false, 
        experiencia: false, 
        partido: 'Perú Acción', 
        vicepresidentes: 'Roberto Diego Koster Jáuregui y Clara Amelia Quispe Torres',
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
        pdfLink: 'https://drive.google.com/file/d/19ZA0ZoKdOZunVpYKZvlUJvu5U7rUnMmP/view',
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
    { 
        nombre: 'Carlos Espá', 
        genero: 'M', 
        denuncias: false, 
        edad: 65, 
        reeleccion: false, 
        experiencia: true, 
        partido: 'Sí creo', 
        vicepresidentes: 'Alejandro Agustín Santa María Silva y Melitza Melania Yanzich Villagarcía',
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
        pdfLink: 'https://drive.google.com/file/d/17ThSfgJb9Z29xVI7zh_RwH0OFA3h34jl/view',
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
    { 
        nombre: 'Rosario Fernández', 
        genero: 'F', 
        denuncias: false, 
        edad: 50, 
        reeleccion: false, 
        experiencia: false, 
        partido: 'Un Camino Diferente',
        vicepresidentes: 'Arturo Fernández Bazán y Carlos Pinillos Vinces ',
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
        pdfLink: 'https://drive.google.com/file/d/1ivpsLhlCXoF8fflnpyyq7UuYH7G3d3VO/view',
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
    { 
        nombre: 'George Forsyth', 
        genero: 'M', 
        denuncias: true, 
        edad: 43, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Somos Perú', 
        vicepresidentes: 'Johanna Gabriela Lozada Baldwin y Herbe Olave Ugarte',
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
        pdfLink: 'https://drive.google.com/file/d/1Nh92gi9lSbrRbqU7Rbula5Zr2frrEUcv/view',
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
    { 
        nombre: 'Keiko Fujimori', 
        genero: 'F', 
        denuncias: false, 
        edad: 50, 
        reeleccion: false, 
        experiencia: true, 
        partido: 'Fuerza Popular', 
        vicepresidentes: 'Luis Galarreta y Miguel Torres',
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
        pdfLink: 'https://drive.google.com/file/d/1v-FJEk5j5o8WbeUnwU4xprtF4RpX2AmH/view',
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
    { 
        nombre: 'Alex Gonzáles', 
        genero: 'M', 
        denuncias: false, 
        edad: 64, 
        reeleccion: true,
        experiencia: true, 
        partido: 'Partido Demócrata Verde', 
        vicepresidentes: 'Maritza del Carmen Sánchez y Félix Murazzo',
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
        pdfLink: 'https://drive.google.com/file/d/13W-GlA5IC1_aH6EnSa5KzCcQB2aJBkKf/view',
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
    { 
        nombre: 'Wolfgang Grozo', 
        genero: 'M', 
        denuncias: true, 
        edad: 58, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Integridad Democrática', 
        vicepresidentes: 'Bertha Cecilia Azabache Miranda y Wellington Prada Chipayo',
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
        pdfLink: 'https://drive.google.com/file/d/1x_aTCzNQywIgFJcPWF0EekLg2GfmaBt7/view',
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
    { 
        nombre: 'Mesias Guevara', 
        genero: 'M', 
        denuncias: true, 
        edad: 62,
        reeleccion: true, 
        experiencia: true, 
        partido: 'Partido Morado', 
        vicepresidentes: 'Heber Diómedes Cueva Escobed y Marisol Yolanda Liñán Solís',
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
        pdfLink: 'https://drive.google.com/file/d/1T2vyfnCTt0rgUeN1LDVXKkonJUVVNZHf/view',
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
    { 
        nombre: 'Carlos Jaico',
        genero: 'M', 
        denuncias: true, 
        edad: 58, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Perú Moderno', 
        vicepresidentes: 'Miguel Elías Almenara Huayta y Liz Verónica Quispe Santos',
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
        pdfLink: 'https://drive.google.com/file/d/1KVGFzDB2aC20faDmv61XbnheZnTKsV84/view',
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
    { 
        nombre: 'Paul Jaimes', 
        genero: 'M', 
        denuncias: true, 
        edad: 46, 
        reeleccion: false, 
        experiencia: false, 
        partido: 'Progresemos', 
        vicepresidentes: 'Mónica Margot Guillén Tuanama y Jorge Luis Caloggero Encina',
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
        pdfLink: 'https://drive.google.com/file/d/1ZfJPqfAVkI5vEvIGK4L6wkES3wwkijh7/view',
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
    { 
        nombre: 'Yonhy Lescano',
        genero: 'M',
        denuncias: false, 
        edad: 66, 
        reeleccion: false,
        experiencia: true, 
        partido: 'Cooperación Popular', 
        vicepresidentes: 'Carmela Silene Salazar Jáuregui y Vanessa Rubith Lazo Valles',
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
        pdfLink: 'https://drive.google.com/file/d/138_gdqIYZB-IY3B52-AKumvMiQvOjyA0/view',
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
    { 
        nombre: 'Rafael López Aliaga', 
        genero: 'M', 
        denuncias: true, 
        edad: 64, 
        reeleccion: false,
        experiencia: false, 
        partido: 'Renovación Popular', 
        vicepresidentes: 'Norma Yarrow y Jhon Ramos Malpica',
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
        pdfLink: 'https://drive.google.com/file/d/1K5t1zA-kFv_BhIleX-NixzdpbMUe1eeT/view',
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
        pdfLink: 'https://drive.google.com/file/d/1Xq78QPt4Msns_5EOvVoRWjqM4sD6vi_h/view',
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
    { 
        nombre: 'José Luna Galvez', 
        genero: 'M', 
        denuncias: false,
        edad: 70, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Podemos Perú', 
        vicepresidentes: 'Cecilia García y Raúl Noblecilla',
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
        pdfLink: 'https://drive.google.com/file/d/1X0o82pKXDfnNkpAd0EZLWnwke3rj3vzJ/view',
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
    { 
        nombre: 'Armando Masse', 
        genero: 'M', 
        denuncias: true,
        edad: 66, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Partido Democrático Federal', 
        vicepresidentes: 'Virgilio Acuña Peralta y Lydia Lourdes Díaz Pablo',
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
        pdfLink: 'https://drive.google.com/file/d/142Ok8pgATCnSGAM0rbJZfegykVfe72lT/view',
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
    { 
        nombre: 'Fiorella Mollineli', 
        genero: 'F', 
        denuncias: true, 
        edad: 51, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Alianza Fuerza y Libertad', 
        vicepresidentes: 'Gilbert Violeta López y María Luz Pariona Oré',
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
        pdfLink: 'https://drive.google.com/file/d/1vgwV2NAlW2APhI3KWvX54iMO0eJ6ffWj/view',
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
    { 
        nombre: 'Jorge Nieto', 
        genero: 'M', 
        denuncias: true, 
        edad: 74, 
        reeleccion: false, 
        experiencia: false, 
        partido: 'Partido del Buen Gobierno', 
        vicepresidentes: 'Susana Matute y Carlos Caballero León',
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
    { 
        nombre: 'Fernando Olivera', 
        genero: 'M', 
        denuncias: false, 
        edad: 67, 
        reeleccion: false, 
        experiencia: true, 
        partido: 'Frente de la Esperanza', 
        vicepresidentes: 'Elizabeth María del Rosario León Chinchay y Carlos Ricardo Cuaresma Sánchez',
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
        pdfLink: 'https://drive.google.com/file/d/1r3YBW7ObdvwP81ZvXyR6bG_sls15NqSy/view',
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
    { 
        nombre: 'Antonio Ortiz', 
        genero: 'M', 
        denuncias: false, 
        edad: 70, 
        reeleccion: false, 
        experiencia: false, 
        partido: 'Salvemos al Perú', 
        vicepresidentes: ' ',
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
        pdfLink: 'https://drive.google.com/file/d/1xNue9N_iQoGQlDMZk--Dg32I4-V6IBKM/view',
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
    { 
        nombre: 'Alvaro Paz de la Barra', 
        genero: 'M', 
        denuncias: false, 
        edad: 42, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Fe en el Perú', 
        vicepresidentes: 'Yessika Roxsana Arteaga Narváez y Shellah Belén Palacios Rodríguez',
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
        pdfLink: 'https://drive.google.com/file/d/1K-ZbRGogF8lPeU9NDq3Cr9KtgdCCiF9T/view',
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
    { 
        nombre: 'Marisol Pérez Tello', 
        genero: 'F',
        denuncias: false, 
        edad: 56, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Primero la gente', 
        vicepresidentes: 'Raúl Alberto Molina Martínez y Manuel Antonio Ato del Avellanal Carrera',
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
        pdfLink: '#',
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
    { 
        nombre: 'Roberto Sanchez', 
        genero: 'M', 
        denuncias: false, 
        edad: 56, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Juntos por el Perú', 
        vicepresidentes: 'Analí Márquez Huanca y Brígida Curo',
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
        pdfLink: 'https://drive.google.com/file/d/1RwyJO4A9rcayVlh_O-FIeMRfCcAZ5hId/view',
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
    { 
        nombre: 'Enrique Valderrama', 
        genero: 'M', 
        denuncias: false, 
        edad: 39,
        reeleccion: false, 
        experiencia: true,
        partido: 'Partido Aprista Peruano', 
        vicepresidentes: 'María Inés Valdivia Acuña y Lucio Antonio Vásquez Sánchez',
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
        pdfLink: 'https://drive.google.com/file/d/1-rdnsLOoQTi3Lg6PRphLEV6wjc-YsbGO/view',
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
    { 
        nombre: 'Mario Vizcarra', 
        genero: 'M', 
        denuncias: false, 
        edad: 71, 
        reeleccion: false, 
        experiencia: true, 
        partido: 'Perú Primero', 
        vicepresidentes: 'Carlos Hernán Illanes Calderón y Judith Carla Mendoza Díaz',
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
        pdfLink: 'https://drive.google.com/file/d/1EhgzrH-O8SrrZh0y_A1WZ39lzcjfP3fL/view',
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
    { 
        nombre: 'José Williams', 
        genero: 'M', 
        denuncias: false, 
        edad: 74, 
        reeleccion: false, 
        experiencia: true, 
        partido: 'Avanza País', 
        vicepresidentes: 'Fernán Altuve y Adriana Tudela',
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
        pdfLink: 'https://drive.google.com/file/d/1ZQK16mp5ZNby54huOQoemqu4V4Y9CT7k/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: true,
        educacionGrupo: 'universitario',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin'
    }   
];

    

    candidatos.forEach((c, idx) => {
        // Insertar el logo en la posición correcta (después del candidato 31, índice 30)
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
