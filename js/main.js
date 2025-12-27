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
    return `https://nuevasnarrativasec.github.io/candidatos-2026/img/candidatos/${nombreNormalizado}.png`;
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
    return `https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/${partidoNormalizado}.png`;
}

// Party styles configuration
const partyStyles = {
    'Ahora Nación': { abbr: 'AN', color: '#673ab7', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/ahora-nacion.jpg' },
    'Alianza Fuerza y Libertad': { abbr: 'FM', color: '#ff7a00', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/alianza-fuerza-y-libertad.jpg' },
    'Alianza para el Progreso': { abbr: 'APP', color: '#0d6efd', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/alianza-para-el-progreso.jpg' },
    'Alianza Unidad Nacional': { abbr: 'UYP', color: '#22c55e', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/alianza-unidad-nacional.jpg' },    
    'Alianza Venceremos': { abbr: 'V', color: '#be123c', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/venceremos.jpg' },
    'Avanza País': { abbr: 'AP', color: '#0ea5e9', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/avanza-pais.jpg' },    
    'Cooperación Popular': { abbr: 'AP', color: '#22c55e', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/cooperacion-popular.jpg' }, 
    'Fe en el Perú': { abbr: 'FEP', color: '#673ab7', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/fe-en-el-peru.jpg' },
    'Frente de la Esperanza': { abbr: 'FE', color: '#ff7a00', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/frente-esperanza.jpg' }, 
    'Fuerza Popular': { abbr: 'FP', color: '#ff7a00', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/fuerza-popular.jpg' },
    'Integridad Democrática': { abbr: 'V', color: '#be123c', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/integridad-democratica.jpg' },
    'Juntos por el Perú': { abbr: 'JPP', color: '#22c55e', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/juntos-por-el-peru.jpg' }, 
    'Libertad Popular': { abbr: 'LP', color: '#0ea5e9', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/libertad-popular.jpg' }, 
    'País para todos': { abbr: 'PPT', color: '#673ab7', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/pais-para-todos.jpg' },
    'Partido Aprista Peruano': { abbr: 'APRA', color: '#ff7a00', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/apra.jpg' },
    'Partido Cívico Obras': { abbr: 'OB', color: '#22c55e', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/obras.jpg' },       
    'Partido de los Trabajadores y Emprendedores': { abbr: 'V', color: '#be123c', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/partido-de-los-trabajadores-y-emprendedores.jpg' },
    'Partido del Buen Gobierno': { abbr: 'PDBG', color: '#ff7a00', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/partido-del-buen-gobierno.jpg' },
    'Unido Perú': { abbr: 'UP', color: '#ff7a00', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/unido-peru.jpg' },
    'Partido Demócrata Verde': { abbr: 'PV', color: '#22c55e', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/partido-verde.jpg' },  
    'Partido Democrático Federal': { abbr: 'PF', color: '#673ab7', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/peru-federal.jpg' },
    'Partido Morado': { abbr: 'PM', color: '#22c55e', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/partido-morado.jpg' },    
    'Partido Patriótico del Perú': { abbr: 'V', color: '#be123c', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/partido-patriotico-del-peru.jpg' },    
    'Perú Moderno': { abbr: 'V', color: '#be123c', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/peru-moderno.jpg' },
    'Perú Acción': { abbr: 'PA', color: '#ff7a00', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/peru-accion.jpg' },  
    'Perú Libre': { abbr: 'AP', color: '#22c55e', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/peru-libre.jpg' },   
    'Perú Primero': { abbr: 'PP', color: '#e53935', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/peru-primero.jpg' },    
    'Podemos Perú': { abbr: 'PP', color: '#ff7a00', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/podemos-peru.jpg' },    
    'Primero la gente': { abbr: 'PL', color: '#e53935', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/primero-la-gente.jpg' },   
    'Partido Político PRIN': { abbr: 'PRIN', color: '#ff7a00', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/prin.jpg' },
    'Progresemos': { abbr: 'P', color: '#e53935', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/progresemos.jpg' },   
    'Renovación Popular': { abbr: 'RP', color: '#22c55e', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/renovacion-popular.jpg' },
    'Salvemos al Perú': { abbr: 'SAP', color: '#ff7a00', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/salvemos-al-peru.jpg' },    
    'Sí creo': { abbr: 'SC', color: '#673ab7', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/si-creo.jpg' },      
    'Somos Perú': { abbr: 'V', color: '#be123c', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/somos-peru.jpg' },  
    'Un Camino Diferente': { abbr: 'UCD', color: '#22c55e', logo: 'https://nuevasnarrativasec.github.io/candidatos-2026/img/logos/un-camino-diferente.jpg' }, 
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
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'Jessica Tumi y Alejandro Soto',
        departamento: 'La Libertad', 
        profesion: 'Ingeniero Químico', 
        formacion: 'Título de Doctor por la Universidad de Complutense de Madrid',
        especializacion: 'Administración',
        expPublica: 'Sí',
        experienciaLaboral: 'Gobernador Regional de La Libertad', 
        expInternacional: 'No',
        cargosEleccion: 'Sí',
        cargosPartidarios: 'Presidente de Alianza Para el Progreso',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Sí declara una sentencia', 
        demandas: 'Declara no tener demandas',
        ingresos: 'S/9,836,766', 
        origenIngresos: 'Sector público y privado',
        inmuebles: 'Registra 24 bienes inmuebles que sumados ascienden a S/58,257,047.79 <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 158 bienes muebles que sumados ascienden a S/15,113,167.06',
        bio: 'Perfil con trayectoria en gestión pública. Registra una sentencia declarada.',
        pdfLink: 'https://drive.google.com/file/d/16IfX4meSvODhTsxNO9B7NO6jkq2GTuNf/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: true,
        educacionGrupo: 'doctorado',
        inconclusos: true,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'penal',
        tipoCandidatura: 'senador',
        tipoDelito: 'corrupcion',
        detalles: 'Declara contar con sentencia por incumplimiento de obligaciones familiares.',
        fallo: '<p class="fallo"><span>Fallo:</span> Confirma la sentencia expedida</p>',
        informacion: '<p class="informacion"><span>Información complementaria:</span> Ordena que la parte demandada César Acuña preste en forma mensual y adelantada.</p> ',
        acciones: '<p class="acciones"><span>Declara participación accionaria en 4 empresas.</span> La información consignada corresponde al valor nominal de las acciones y no permite conocer su valor económico efectivo.</p>'
    },
    { 
        nombre: 'Carlos Alvarez', 
        genero: 'M',
        denuncias: false, 
        edad: 61, 
        reeleccion: false, 
        experiencia: false, 
        partido: 'País para todos', 
        cargoExtra: '',
        vicepresidentes: 'María Cristina Chambizea Reyes y Diego Edgar Guevara Vivanco',
        departamento: 'Lima', 
        profesion: 'Comediante', 
        formacion: 'Estudios primarios y secundarios completos',
        especializacion: 'No registra',
        experienciaLaboral: 'Comediante en programas de televisión', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'No registra',
        continuidad: 'No registra',
        sentencias: 'Declara no tener sentencias', 
        demandas: 'Declara no tener demandas',
        ingresos: 'S/207,543', 
        origenIngresos: 'Sector privado',
        inmuebles: 'Registra 6 bienes inmuebles que sumados ascienden a S/506,000. <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 1 bien mueble valorizado en S/102,000',
        bio: 'Perfil con trayectoria en el entretenimiento y comedia. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/13Ms7rBVzk5fovhowIGv6_8mekrukY4w9/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'secundaria',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
    },
    { 
        nombre: 'Ronald Atencio', 
        genero: 'M', 
        denuncias: false, 
        edad: 44, 
        reeleccion: false, 
        experiencia: false, 
        partido: 'Alianza Venceremos', 
        cargoExtra: 'También postula como Diputado',
        vicepresidentes: 'Elena Carmen Rivera Huamán y Alberto Eugenio Quintanilla Chacón',
        departamento: 'Lima', 
        profesion: 'Abogado', 
        formacion: 'Maestro en Derecho Penal',
        especializacion: 'Derecho y Ciencias Políticas',
        experienciaLaboral: 'Gerente y docente del Centro Jurídico Athena', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'Representante legal de la Alianza Electoral Venceremos',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas: 'Declara no tener demandas',
        ingresos: 'S/290,119', 
        origenIngresos: 'Sector público.',
        inmuebles: 'Registra 4 bienes inmuebles que sumados ascienden a S/90,444.11. <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 2 bienes muebles que sumados ascienden a S/204,290',
        bio: 'Perfil con experiencia en Derecho y Ciencias Políticas. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1PlpQG05cMdfa_IXQfSlfUZG353zovAS1/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: true,
        educacionGrupo: 'maestro',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'diputado',
        acciones: '<p class="acciones"><span>Declara participación accionaria en 1 empresa.</span> La información consignada corresponde al valor nominal de las acciones y no permite conocer su valor económico efectivo.</p>'
    },
    { 
        nombre: 'Napoleón Becerra', 
        genero: 'M', 
        denuncias: true, 
        edad: 61, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Partido de los Trabajadores y Emprendedores', 
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'Winston Clemente Huamán Henríquez y Nelida Juliana Cuayla Cuayla',
        departamento: 'Lima', 
        profesion: 'Licenciado en Administración', 
        formacion: 'Licenciado en Administración',
        especializacion: 'Administración',
        experienciaLaboral: 'Empleado en la Municipalidad de Lima', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'Fundador del Partido de los Trabajadores y Emprendedores',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas: 'Declara no tener demandas',
        ingresos: 'S/72,000',
        origenIngresos: 'Sector público.',
        inmuebles: 'No registra bienes inmuebles.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 1 bien mueble valorizado en S/20,000',
        bio: 'Perfil no registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1UNx4QV0G-bUcnHAlul4V4nbJM_c8A8fH/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: true,
        educacionGrupo: 'bachiller',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'senador',
    },
    { 
        nombre: 'Rafael Belaúnde', 
        genero: 'M', 
        denuncias: false, 
        edad: 50, 
        reeleccion: false, 
        experiencia: true, 
        partido: 'Libertad Popular', 
        cargoExtra: '',
        vicepresidentes: 'Pedro Cateriano y Tania Porles Bazalar ',
        departamento: 'Lima', 
        profesion: 'Economista', 
        formacion: 'Bachiller en economía',
        especializacion: 'Economista',
        experienciaLaboral: 'Exministro de Energía y Minas.', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'Presidente del Partido Libertad Popular',
        continuidad: 'Partido Todos por el Perú',
        sentencias: 'Declara no tener sentencias', 
        demandas: 'Declara no tener demandas',
        ingresos: 'S/2,134,800', 
        origenIngresos: 'Sector privado',
        inmuebles: 'Registra 3 bienes inmuebles que sumados ascienden a S/494,150.99.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 1 bien mueble valorizado en S/269,600',
        bio: 'Perfil con experiencia en la gestión pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1xvyBa_hpwYft-LCc7xpdaL_COji3dPiG/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'bachiller',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        acciones: '<p class="acciones"><span>Declara participación accionaria en 8 empresas.</span> La información consignada corresponde al valor nominal de las acciones y no permite conocer su valor económico efectivo.</p>'
    },
    { 
        nombre: 'Ricardo Belmont', 
        genero: 'M', 
        denuncias: false,
        edad: 80, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Partido Cívico Obras', 
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'Daniel Hugo Barragán Coloma y Dina Irene Hancco Hancco',
        departamento: 'Lima', 
        profesion: 'Administrador de empresas', 
        formacion: 'Bachiller en Administración de Empresas',
        especializacion: 'Administración de empresas',
        experienciaLaboral: 'Empresario en Red Bicolor de Comunicaciones S.A.A.', 
        expInternacional: 'No',
        cargosEleccion: 'Congresistas por Alianza Electoral Frente de Centro en 2009',
        cargosPartidarios: 'Presidente del Partido Cívico Obras',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas: 'Declara no tener demandas',
        ingresos: 'S/301,514', 
        origenIngresos: 'Sector privado',
        inmuebles: 'No registra bienes inmuebles.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'No registra bienes muebles',
        bio: 'Perfil con experiencia en la gestión pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1Q4NcUkbKbIXdzyyukHiBXrWRM1YArQBZ/view',
        // Atributos para secciones
        extranjero: false,
        millennial: false,
        movilidad: false,
        educacionGrupo: 'bachiller',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'senador',
        acciones: '<p class="acciones"><span>Declara participación accionaria en 1 empresa.</span> La información consignada corresponde al valor nominal de las acciones y no permite conocer su valor económico efectivo.</p>'
    },
    { 
        nombre: 'Herbert Caller', 
        genero: 'M',
        denuncias: true, 
        edad: 47, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Partido Patriótico del Perú', 
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'Rossana Montes Tello y Jorge Carcovich',
        departamento: 'Lima', 
        profesion: 'Abogado', 
        formacion: 'Bachiller en Ciencias Marítimo Navales',
        especializacion: 'Ingeniería de telecomunicaciones y derecho',
        experienciaLaboral: 'Oficial superior de la Marina de Guerra del Perú', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'Fundador del Partido Patriótico del Perú',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas: 'Declara no tener demandas',
        ingresos: 'S/186,259.32', 
        origenIngresos: 'Sector público y privado',
        inmuebles: 'Registra 2 bienes inmuebles que sumados ascienden a S/93,269.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 1 bien mueble valorizado en S/2,800',
        bio: 'Perfil con experiencia en derecho y ciencias marítimas navales. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1ltB6GeG-wy7Q_p_1oXelue4lZQzwFgaD/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: true,
        educacionGrupo: 'maestro',
        inconclusos: true,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'senador',
        acciones: '<p class="acciones"><span>Declara participación accionaria en 2 empresas.</span> La información consignada corresponde al valor nominal de las acciones y no permite conocer su valor económico efectivo.</p>'
    },
    { 
        nombre: 'Charlie Carrasco', 
        genero: 'M', 
        denuncias: false, 
        edad: 45, 
        reeleccion: false, 
        experiencia: false, 
        partido: 'Unido Perú', 
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'María Edith Paredes Verdy y Wilbert Gabino Segovia Quin',
        departamento: 'Lima', 
        profesion: 'Abogado', 
        formacion: 'Maestro en Gestión Pública',
        especializacion: 'Derecho Constitucional y Gestión Pública',
        experienciaLaboral: 'Catedrático de la Universidad Nacional José Faustino Sánchez Carrión', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'Presidente del Partido Demócrata Unido Perú',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas: 'Declara no tener demandas',
        ingresos: 'S/74,118', 
        origenIngresos: 'Sector público y privado',
        inmuebles: 'Registra 8 bienes inmuebles que sumados ascienden a S/348,544.94.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 2 bienes muebles que sumados ascienden a S/82,000',
        bio: 'Perfil con estudios en Derecho y Gestión Pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1zfgfBtR-BmoBc5jSO0tIslhzTnqsaCcT/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: true,
        educacionGrupo: 'doctorado',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'senador',
        acciones: '<p class="acciones"><span>Declara participación accionaria en 8 empresas.</span> La información consignada corresponde al valor nominal de las acciones y no permite conocer su valor económico efectivo.</p>'
    },
    { 
        nombre: 'Roberto Chiabra', 
        genero: 'M', 
        denuncias: true, 
        edad: 76, 
        reeleccion: false, 
        experiencia: true, 
        partido: 'Alianza Unidad Nacional', 
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'Javier Bedoya y Neldy Mendoza ',
        departamento: 'Lima', 
        profesion: 'Bachiller en Ciencias Militares', 
        formacion: 'Licenciado en Ciencias Militares',
        especializacion: 'Ciencias Militares',
        experienciaLaboral: 'Congresista de la República (2021-2025)', 
        expInternacional: 'No',
        cargosEleccion: 'Congresista de la República (2021-2025) por Alianza para el Progreso',
        cargosPartidarios: 'Presidente del Partido Unidad y Paz',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas: 'Declara no tener demandas',
        ingresos: 'S/320,676', 
        origenIngresos: 'Sector público',
        inmuebles: 'Registra 2 bienes inmuebles que sumados ascienden a S/351,467.82.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 1 bien mueble valorizado en S/93,573',
        bio: 'Perfil con estudios en Ciencias Militares y experiencia en Gestión Pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1PpZOYerTU0T86TKCnUZfof-rgIcbWF7-/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: true,
        educacionGrupo: 'licenciado',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'senador'
    },
    { 
        nombre: 'Walter Chirinos', 
        genero: 'M', 
        denuncias: false, 
        edad: 57, 
        reeleccion: false, 
        experiencia: true, 
        partido: 'Partido Político PRIN', 
        cargoExtra: '',
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
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/24,000', 
        origenIngresos: 'Sector privado',
        inmuebles: 'Registra en total 1 bien inmueble valorizado en S/200,000.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra en total 1 bien mueble valorizado en S/45,000',
        bio: 'Perfil con trayectoria en el sector defensa. No registra sentencias judiciales y sus ingresos declarados ascienden a S/24,000.',
        pdfLink: 'https://drive.google.com/file/d/1MRZc0Nd4lZIwZY_AZmN7j8ANU8rdJP7z/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: true,
        educacionGrupo: 'maestro',
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
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'Flavio Cruz Mamani y Bertha Rojas López',
        departamento: 'Huancayo', 
        profesion: 'Doctor', 
        formacion: 'Magister en neurociencias',
        especializacion: 'Medicina y neurocirugía',
        experienciaLaboral: 'Secretario general del partido político Perú Libre', 
        expInternacional: 'No',
        cargosEleccion: 'Gobernador regional de Junín (2019-2022)',
        cargosPartidarios: 'Secretario general del partido político Perú Libre',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Registra 2 sentencias  penales.', 
        demandas: 'No registra demandas',
        ingresos: 'No registra', 
        origenIngresos: 'No registra',
        inmuebles: 'Registra en total 1 bien inmueble valorizado en S/396,811.03.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'No registra',
        bio: 'Perfil con estudios en medicina humana y fundador del Partido Perú Libre. Registra 2 sentencias judiciales.',
        pdfLink: 'https://drive.google.com/file/d/1compmiHFO7MtUjiopYSYuli-nuXaoksb/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'doctorado',
        inconclusos: true,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'civil',
        tipoCandidatura: 'senador',
        tipoDelito: 'patrimonio',
        detalles: 'Declara contar con sentencia en modalidad suspendida por negociación incompatible. ',
        fallo: '<p class="fallo"><span>Fallo:</span> 4 años de pena privativa</p>',
        cumplimiento: '<p class="cumplimiento"><span>Cumplimiento:</span> Pena cumplida</p> ',
        informacion: '<p class="informacion"><span>Información complementaria:</span> Sentencia anulada por el TC.</p> ',
        detallesDos: 'Declara contar con sentencia en modalidad efectiva por colusión ',
        falloDos: '<p class="fallo"><span>Fallo:</span> 3 años 6 meses</p>',
        cumplimientoDos: '<p class="cumplimiento"><span>Cumplimiento:</span> Pena cumplida</p> ',
        informacionDos: '<p class="informacion"><span>Información complementaria:</span> Absuelto de sentencia penal por recurso de casación.</p> ',
    },
    { 
        nombre: 'Francisco Diez Canseco', 
        genero: 'M', 
        denuncias: false, 
        edad: 79, 
        reeleccion: false, 
        experiencia: false, 
        partido: 'Perú Acción', 
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'Roberto Diego Koster Jáuregui y Clara Amelia Quispe Torres',
        departamento: 'Lima', 
        profesion: 'Abogado', 
        formacion: 'Bachiller en Derecho',
        especializacion: 'Derecho',
        experienciaLaboral: 'Abogado independiente', 
        expInternacional: 'No',
        cargosEleccion: 'Diputado por Lima (1985-1990)',
        cargosPartidarios: 'Presidente del Partido Perú Acción',
        continuidad: 'Presidente del Partido Perú Nación (2020-2021)',
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/45,000', 
        origenIngresos: 'Sector privado',
        inmuebles: 'No registra.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'No registra',
        bio: 'Perfil con experiencia en Gestión Pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/19ZA0ZoKdOZunVpYKZvlUJvu5U7rUnMmP/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'licenciado',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'senador'
    },
    { 
        nombre: 'Carlos Espá', 
        genero: 'M', 
        denuncias: false, 
        edad: 65, 
        reeleccion: false, 
        experiencia: true, 
        partido: 'Sí creo', 
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'Alejandro Agustín Santa María Silva y Melitza Melania Yanzich Villagarcía',
        departamento: 'Lima', 
        profesion: 'Abogado', 
        formacion: 'Master en Ciencia Política',
        especializacion: 'Derecho y Ciencias Políticas',
        experienciaLaboral: 'Director de Comunicaciones de la Embajada de Estados Unidos en Perú', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'Fundador del partido Sí Creo',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/105,103', 
        origenIngresos: 'Sector privado',
        inmuebles: 'Registra 5 bienes inmuebles que sumados ascienden a S/639,105.6.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 2 bienes muebles que sumados ascienden a S/45,000',
        bio: 'Perfil con estudios en Ciencias Políticas. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/17ThSfgJb9Z29xVI7zh_RwH0OFA3h34jl/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'maestro',
        inconclusos: true,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'senador',
        acciones: '<p class="acciones"><span>Declara participación accionaria en 7 empresas.</span> La información consignada corresponde al valor nominal de las acciones y no permite conocer su valor económico efectivo.</p>'
    },
    { 
        nombre: 'Rosario Fernández', 
        genero: 'F', 
        denuncias: false, 
        edad: 50, 
        reeleccion: false, 
        experiencia: false, 
        partido: 'Un Camino Diferente',
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'Arturo Fernández Bazán y Carlos Pinillos Vinces ',
        departamento: 'Trujillo', 
        profesion: 'Educadora', 
        formacion: 'Bachiller en Educación',
        especializacion: 'Educación',
        experienciaLaboral: 'Docente en la I.E.P. Jan Komesky de Trujillo', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'Fundadora del partido Un Camino Diferente',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/36,520', 
        origenIngresos: 'Sector privado',
        inmuebles: 'Registra 2 bienes inmuebles que sumados ascienden a S/109,149.35.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 1 bien mueble valorizado en S/35,000',
        bio: 'Perfil con experiencia en Educación. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1ivpsLhlCXoF8fflnpyyq7UuYH7G3d3VO/view',
        // Atributos para secciones
        extranjero: true,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'bachiller',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'senador',
    },
    { 
        nombre: 'George Forsyth', 
        genero: 'M', 
        denuncias: true, 
        edad: 43, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Somos Perú', 
        cargoExtra: 'También postula como Diputado',
        vicepresidentes: 'Johanna Gabriela Lozada Baldwin y Herbe Olave Ugarte',
        departamento: 'Lima', 
        profesion: 'Administrador de empresas', 
        formacion: 'Magíster en Administración de Empresas',
        especializacion: 'Gestión y Administración',
        experienciaLaboral: 'Gerente General de Alhambra Inversiones S.R.L.', 
        expInternacional: 'No',
        cargosEleccion: 'Alcalde distrital de La Victoria (2019-2022)',
        cargosPartidarios: 'No registra',
        continuidad: 'Partido Democrático Somos Perú (2019-2022)',
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/244,000', 
        origenIngresos: 'Sector privado',
        inmuebles: 'No registra.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 2 bienes muebles que sumados ascienden a S/42,000',
        bio: 'Perfil con experiencia en Gestión Pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1Nh92gi9lSbrRbqU7Rbula5Zr2frrEUcv/view',
        // Atributos para secciones
        internacional: true,
        extranjero: false,
        millennial: true,
        movilidad: true,
        educacionGrupo: 'maestro',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'diputado',
        acciones: '<p class="acciones"><span>Declara participación accionaria en 1 empresa.</span> La información consignada corresponde al valor nominal de las acciones y no permite conocer su valor económico efectivo.</p>'
    },
    { 
        nombre: 'Keiko Fujimori', 
        genero: 'F', 
        denuncias: false, 
        edad: 50, 
        reeleccion: false, 
        experiencia: true, 
        partido: 'Fuerza Popular', 
        cargoExtra: ' ',
        vicepresidentes: 'Luis Galarreta y Miguel Torres',
        departamento: 'Lima', 
        profesion: 'Administradora de empresas', 
        formacion: 'Máster en Administración de Empresas',
        especializacion: 'Administración y Gestión Empresarial',
        experienciaLaboral: 'Presidenta del Partido Fuerza Popular', 
        expInternacional: 'No',
        cargosEleccion: 'Congresista por Alianza por el futuro (2006-2011).',
        cargosPartidarios: 'Presidenta del Partido Fuerza Popular',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/271,853.45', 
        origenIngresos: 'Sector privado',
        inmuebles: 'No registra.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 1 bien mueble valorizado en S/115,998',
        bio: 'Perfil con experiencia en Gestión Pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1v-FJEk5j5o8WbeUnwU4xprtF4RpX2AmH/view',
        // Atributos para secciones
        extranjero: true,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'maestro',
        inconclusos: true,
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
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'Maritza del Carmen Sánchez y Félix Murazzo',
        departamento: 'Lima', 
        profesion: 'Conciliador Extrajudicial', 
        formacion: '',
        especializacion: 'Conciliación Extrajudicial',
        experienciaLaboral: 'Presidente del Instituto de Estudios Jurídicos DERECTUM', 
        expInternacional: 'No',
        cargosEleccion: 'Alcalde distrital de San Juan de Lurigancho (2019-2022)',
        cargosPartidarios: 'Presidente del Partido Podemos por el Progreso del Perú',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/36,000', 
        origenIngresos: 'Sector privado',
        inmuebles: 'Registra 7 bienes inmuebles que sumados ascienden a S/211,293.44.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 7 bienes muebles que sumados ascienden a S/0',
        bio: 'Perfil con experiencia en Gestión Pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/13W-GlA5IC1_aH6EnSa5KzCcQB2aJBkKf/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'bachiller',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'senador',
        acciones: '<p class="acciones"><span>Declara participación accionaria en 4 empresas.</span> La información consignada corresponde al valor nominal de las acciones y no permite conocer su valor económico efectivo.</p>'
    },
    { 
        nombre: 'Wolfgang Grozo', 
        genero: 'M', 
        denuncias: true, 
        edad: 58, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Integridad Democrática', 
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'Bertha Cecilia Azabache Miranda y Wellington Prada Chipayo',
        departamento: 'Lima', 
        profesion: 'Licenciado en Ciencias de la Administración Aeroespacial', 
        formacion: 'Doctor en Desarrollo y Seguridad Estratégico',
        especializacion: 'Desarollo y Seguridad Estratégico',
        experienciaLaboral: 'Profesor en Gerencia en la Universidad de Lima', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'Fundador del Partido Político Integridad Democrática',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/277,827,000*', 
        notaIngresos: '*Este es el monto consignado por el candidato en su hoja de vida. Sin embargo, en su partido señalan que se trata de un error y que la cifra real es S/277,827',
        origenIngresos: 'Sector público y privado',
        inmuebles: 'Registra 4 bienes inmuebles que sumados ascienden a S/758,250.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 1 biene mueble valorizado en S/67,400',
        bio: 'Perfil con experiencia en Desarrollo y Seguridad. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1x_aTCzNQywIgFJcPWF0EekLg2GfmaBt7/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'doctorado',
        inconclusos: true,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'senador'
    },
    { 
        nombre: 'Mesias Guevara', 
        genero: 'M', 
        denuncias: true, 
        edad: 62,
        reeleccion: true, 
        experiencia: true, 
        partido: 'Partido Morado', 
        cargoExtra: ' ',
        vicepresidentes: 'Heber Diómedes Cueva Escobed y Marisol Yolanda Liñán Solís',
        departamento: 'Lima', 
        profesion: 'Ingeniero electrónico', 
        formacion: 'Magíster en Administración de Empresas',
        especializacion: 'Gestión y Administración',
        experienciaLaboral: 'Gobernador Regional de Cajamarca (2019-2022)', 
        expInternacional: 'No',
        cargosEleccion: 'Congresista por Perú Posible (2011-2016)',
        cargosPartidarios: 'No registra cargos partidarios relevantes',
        continuidad: 'Presidente de Acción Popular (2014-2018)',
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/154,941', 
        origenIngresos: 'Sector público y privado',
        inmuebles: 'Registra 4 bienes inmuebles que sumados ascienden a S/221,994.79.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 2 bienes muebles que sumados ascienden a S/25,000',
        bio: 'Perfil con experiencia en gestión pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1T2vyfnCTt0rgUeN1LDVXKkonJUVVNZHf/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: true,
        educacionGrupo: 'maestro',
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
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'Miguel Elías Almenara Huayta y Liz Verónica Quispe Santos',
        departamento: 'Lima', 
        profesion: 'Abogado', 
        formacion: 'Maestro en Derecho',
        especializacion: 'Derecho',
        experienciaLaboral: 'Gerente General en Alpaxor S.A.C.', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'No registra',
        continuidad: 'Renunció a Alianza para el Progreso en 2023',
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/47,158', 
        origenIngresos: 'Sector privado',
        inmuebles: 'Registra 1 bien inmueble valorizado en S/45,426.58.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'No registra',
        bio: 'Perfil con experiencia en Derecho. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1KVGFzDB2aC20faDmv61XbnheZnTKsV84/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: true,
        educacionGrupo: 'maestro',
        inconclusos: true,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'senador',
        acciones: '<p class="acciones"><span>Declara participación accionaria en 1 empresa.</span> La información consignada corresponde al valor nominal de las acciones y no permite conocer su valor económico efectivo.</p>'
    },
    { 
        nombre: 'Paul Jaimes', 
        genero: 'M', 
        denuncias: true, 
        edad: 46, 
        reeleccion: false, 
        experiencia: false, 
        partido: 'Progresemos', 
        cargoExtra: 'También postula como Diputado',
        vicepresidentes: 'Mónica Margot Guillén Tuanama y Jorge Luis Caloggero Encina',
        departamento: 'Lima', 
        profesion: 'Abogado', 
        formacion: 'Bachiller en Derecho y Ciencias Políticas',
        especializacion: 'Gobierno y Políticas Públicas',
        experienciaLaboral: 'Asesor del Congreso de la República del Perú (2022-2025)', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'No registra cargos partidarios relevantes',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/263,500', 
        origenIngresos: 'Sector público y ejercicio profesional',
        inmuebles: 'Registra 4 bienes inmuebles que sumados ascienden a S/1,172,396.1.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 2 bienes muebles que sumados ascienden a S/168,161.99',
        bio: 'Perfil no cuenta con experiencia en gestión pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1ZfJPqfAVkI5vEvIGK4L6wkES3wwkijh7/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'maestro',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'diputado',
        acciones: '<p class="acciones"><span>Declara participación accionaria en 6 empresas.</span> La información consignada corresponde al valor nominal de las acciones y no permite conocer su valor económico efectivo.</p>' 
    },
    { 
        nombre: 'Yonhy Lescano',
        genero: 'M',
        denuncias: false, 
        edad: 66, 
        reeleccion: false,
        experiencia: true, 
        partido: 'Cooperación Popular', 
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'Carmela Silene Salazar Jáuregui y Vanessa Rubith Lazo Valles',
        departamento: 'Lima', 
        profesion: 'Abogado', 
        formacion: 'Magister en Derecho',
        especializacion: 'Derecho',
        experienciaLaboral: 'Profesor en la Universidad Antiplano Puno (2025)', 
        expInternacional: 'No',
        cargosEleccion: 'Congresista por Acción Popular (2016-2021)',
        cargosPartidarios: 'Adherente Fundacional de Acción Popular (2004-2023)',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/120,000', 
        origenIngresos: 'Sector público',
        inmuebles: 'Registra 6 bienes inmuebles que sumados ascienden a S/1,006,599.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 3 bienes muebles que sumados ascienden a S102,000',
        bio: 'Perfil con experiencia en gestión pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/138_gdqIYZB-IY3B52-AKumvMiQvOjyA0/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: true,
        educacionGrupo: 'doctorado',
        inconclusos: true,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'senador'
    },
    { 
        nombre: 'Rafael López Aliaga', 
        genero: 'M', 
        denuncias: true, 
        edad: 64, 
        reeleccion: false,
        experiencia: false, 
        partido: 'Renovación Popular', 
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'Norma Yarrow y Jhon Ramos Malpica',
        departamento: 'Lima', 
        profesion: 'Ingeniero Industrial', 
        formacion: 'Magíster en Administración',
        especializacion: 'Administración',
        experienciaLaboral: 'Alcalde de Lima (2023-2025)', 
        expPublica: 'Sí',
        expInternacional: 'No',
        cargosEleccion: 'Alcalde de Lima (2023-2025)',
        cargosPartidarios: 'Presidente de Renovación Popular',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/1,897,374', 
        origenIngresos: 'Sector privado',
        inmuebles: 'No registra.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'No registra',
        bio: 'Perfil con experiencia en gestión pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1K5t1zA-kFv_BhIleX-NixzdpbMUe1eeT/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'maestro',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'senador',
        acciones: '<p class="acciones"><span>Declara participación accionaria en 10 empresas.</span> La información consignada corresponde al valor nominal de las acciones y no permite conocer su valor económico efectivo.</p>' 
    },
    { 
        nombre: 'Alfonso Lopez Chau', 
        genero: 'M', 
        denuncias: true, 
        edad: 75, 
        reeleccion: false, 
        experiencia: false, 
        partido: 'Ahora Nación', 
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'Luis Villanueva y Ruth Buendía',
        departamento: 'Lima', 
        profesion: 'Economista', 
        formacion: 'Maestro en economía',
        especializacion: 'Ciencias económicas',
        experienciaLaboral: 'Rector de la UNI (2021-2025)', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'Presidente del partido Ahora Nación',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/350,000', 
        origenIngresos: 'Sector público',
        inmuebles: 'Registra 2 bienes inmuebles que sumados ascienden a S/295,000.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'No registra',
        bio: 'Perfil con estudios en Economía. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1Xq78QPt4Msns_5EOvVoRWjqM4sD6vi_h/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'doctorado',
        inconclusos: true,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'senador',
    },
    { 
        nombre: 'José Luna Galvez', 
        genero: 'M', 
        denuncias: false,
        edad: 70, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Podemos Perú', 
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'Cecilia García y Raúl Noblecilla',
        departamento: 'Lima', 
        profesion: 'Economista', 
        formacion: 'Maestro en economía',
        especializacion: 'Economía, Comercio y Finanzas Internacionales',
        experienciaLaboral: 'Congresista de la República (2021-2025)', 
        expInternacional: 'No',
        cargosEleccion: 'Congresista de la República (2021-2025) por Podemos Perú',
        cargosPartidarios: 'Presidente fundador de Pdemos Perú',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/11,409,038.64', 
        origenIngresos: 'Sector público y privado',
        inmuebles: 'Registra 15 bienes inmuebles que sumados ascienden a S/30,415,324,5.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 12 bienes muebles que sumados ascienden a S/601,014.20',
        bio: 'Perfil con estudios en Economía. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1X0o82pKXDfnNkpAd0EZLWnwke3rj3vzJ/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'doctorado',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'senador',
        acciones: '<p class="acciones"><span>Declara participación accionaria en 5 empresas.</span> La información consignada corresponde al valor nominal de las acciones y no permite conocer su valor económico efectivo.</p>'
    },
    { 
        nombre: 'Armando Masse', 
        genero: 'M', 
        denuncias: true,
        edad: 66, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Partido Democrático Federal', 
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'Virgilio Acuña Peralta y Lydia Lourdes Díaz Pablo',
        departamento: 'Lima', 
        profesion: 'Médico Cirujano', 
        formacion: 'Magíster en Administración Estratégica de Empresas',
        especializacion: 'Derecho y Administración de Empresas',
        experienciaLaboral: 'Presidente de APDAYC (1999-2025)', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'Fundador del Partido Político Democrático Federal',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Registra 2 sentencias. Una absolutoria y la otra sobreseída', 
        demandas: 'No registra demandas',
        ingresos: 'S/682,626', 
        origenIngresos: 'Sector privado',
        inmuebles: 'Registra 15 bienes inmuebles que sumados ascienden a S/1,177,163.51.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 5 bienes muebles que sumados ascienden a S/91,500',
        bio: 'Perfil con estudios en Gestión de empresas. Registra 2 sentencias cumplidas.',
        pdfLink: 'https://drive.google.com/file/d/142Ok8pgATCnSGAM0rbJZfegykVfe72lT/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'maestro',
        inconclusos: true,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'penal',
        tipoCandidatura: 'senador',
        tipoDelito: 'corrupcion',
        detalles: 'Declara contar con sentencia en modalidad sobreseida por delito contra el patrimonio. ',
        fallo: '<p class="fallo"><span>Fallo:</span> Sobreseida</p>',
        cumplimiento: '<p class="cumplimiento"><span>Cumplimiento:</span> Pena cumplida</p> ',        
        detallesDos: 'Declara contar con sentencia en modalidad absuelto por delito de fraude en la Adm. de las personas.',
        falloDos: '<p class="fallo"><span>Fallo:</span> Absuelto Archivado</p>',
        cumplimientoDos: '<p class="cumplimiento"><span>Estado:</span> Pena cumplida</p> ',      
        acciones: '<p class="acciones"><span>Declara participación accionaria en 6 empresas.</span> La información consignada corresponde al valor nominal de las acciones y no permite conocer su valor económico efectivo.</p>'  
    },
    { 
        nombre: 'Fiorella Molinelli', 
        genero: 'F', 
        denuncias: true, 
        edad: 51, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Alianza Fuerza y Libertad', 
        cargoExtra: 'También postula como Senadora',
        vicepresidentes: 'Gilbert Violeta López y María Luz Pariona Oré',
        departamento: 'Lima', 
        profesion: 'Economista', 
        formacion: 'Doctorado en Gobierno y Ciencias Políticas',
        especializacion: 'Economía y Ciencias Políticas',
        experienciaLaboral: 'Docente en la Universidad Continental', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'Presidenta del Partido Fuerza y Libertad',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/123,865.13', 
        origenIngresos: 'Sector público y ejercicio profesional',
        inmuebles: 'Registra 2 bienes inmuebles que sumados ascienden a S/139,768.28.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'No registra',
        bio: 'Perfil con experiencia en gestión pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1vgwV2NAlW2APhI3KWvX54iMO0eJ6ffWj/view',
        // Atributos para secciones
        extranjero: true,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'doctorado',
        inconclusos: true,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'senador'
    },
    { 
        nombre: 'Jorge Nieto', 
        genero: 'M', 
        denuncias: true, 
        edad: 74, 
        reeleccion: false, 
        experiencia: false, 
        partido: 'Partido del Buen Gobierno', 
        cargoExtra: ' ',
        vicepresidentes: 'Susana Matute y Carlos Caballero León',
        departamento: 'Lima', 
        profesion: 'Sociólogo', 
        formacion: 'Doctor en Sociología',
        especializacion: 'Ciencias Sociales',
        experienciaLaboral: 'Ministro de Defensa (2016-2018)', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'Presidente del Partido del Buen Gobierno',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/180,000', 
        origenIngresos: 'Sector privado',
        inmuebles: 'Registra 5 bienes inmuebles que sumados ascienden a S/487,672.67.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 1 bien mueble valorizado en S/50,000',
        bio: 'Perfil con experiencia en gestión pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1UXqW050ZnRkQJs5Pp4m_oLEwDrJObYlX/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: true,
        educacionGrupo: 'doctorado',
        inconclusos: true,
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
        cargoExtra: ' ',
        vicepresidentes: 'Elizabeth María del Rosario León Chinchay y Carlos Ricardo Cuaresma Sánchez',
        departamento: 'Lima', 
        profesion: 'Administrador', 
        formacion: 'Bachiller en ciencias con mención en administración',
        especializacion: 'Administración',
        experienciaLaboral: 'Director de Economía y Cooperación Internacional en la Asociación Akuy Ukuku', 
        expInternacional: 'No',
        cargosEleccion: 'Congresista por el Frente Independiente Moralizador (2000-2001)',
        cargosPartidarios: 'Presidente del Partido Frente de la Esperanza 2021',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/0', 
        origenIngresos: 'No registra',
        inmuebles: 'Registra 3 bienes inmuebles que sumados ascienden a S/398,469.94.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 1 bien mueble valorizado en S/15,000',
        bio: 'Perfil con experiencia en gestión pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1r3YBW7ObdvwP81ZvXyR6bG_sls15NqSy/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'bachiller',
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
        cargoExtra: ' ',
        vicepresidentes: ' ',
        departamento: 'Lima', 
        profesion: 'Gestión de Empresas', 
        formacion: 'Diplomados',
        especializacion: 'Habilidades Gerenciales',
        experienciaLaboral: 'Gerente General de Importadora y distribuidora IDRE S.A.', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'No registra cargos partidarios relevantes',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/221,634', 
        origenIngresos: 'Sector privado',
        inmuebles: 'Registra 5 bienes inmuebles que sumados ascienden a S/701,628.87.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 1 bien mueble valorizado en S/10,000',
        bio: 'Perfil sin experiencia en gestión pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1xNue9N_iQoGQlDMZk--Dg32I4-V6IBKM/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: true,
        educacionGrupo: 'secundaria',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        acciones: '<p class="acciones"><span>Declara participación accionaria en 5 empresas.</span> La información consignada corresponde al valor nominal de las acciones y no permite conocer su valor económico efectivo.</p>'
    },
    { 
        nombre: 'Alvaro Paz de la Barra', 
        genero: 'M', 
        denuncias: false, 
        edad: 42, 
        reeleccion: true, 
        experiencia: true, 
        partido: 'Fe en el Perú', 
        cargoExtra: 'También postula como Diputado',
        vicepresidentes: 'Yessika Roxsana Arteaga Narváez y Shellah Belén Palacios Rodríguez',
        departamento: 'Lima', 
        profesion: 'Abogado', 
        formacion: 'Magíster en Gestión Pública',
        especializacion: 'Derecho y Gestión Pública',
        experienciaLaboral: 'Gerente Municipal de la Muinicipalidad Distrital del Rimac (2023)', 
        expInternacional: 'No',
        cargosEleccion: 'Alcalde de La Molina (2019-2022) por Acción Popular',
        cargosPartidarios: 'Fundador del partido Fé en el Perú',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Declara no tener sentencias', 
        demandas:  'Declara no tener demandas',
        ingresos: 'S/341,465', 
        origenIngresos: 'Sector privado',
        inmuebles: 'Registra 20 bienes inmuebles que sumados ascienden a S/13,760,000,36.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 3 bienes muebles valorizados en S/216,000',
        bio: 'Perfil con experiencia en gestión pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1K-ZbRGogF8lPeU9NDq3Cr9KtgdCCiF9T/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'maestro',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'diputado',
        acciones: '<p class="acciones"><span>Declara participación accionaria en 4 empresas.</span> La información consignada corresponde al valor nominal de las acciones y no permite conocer su valor económico efectivo.</p>' 
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
        inmuebles: 'Sí registra bienes inmuebles.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Sí registra',
        bio: 'Ingeniero de sistemas con enfoque en políticas de innovación tecnológica.',
        pdfLink: '#',
        // Atributos para secciones
        extranjero: true,
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
        cargoExtra: 'También postula como Diputado',
        vicepresidentes: 'Analí Márquez Huanca y Brígida Curo',
        departamento: 'Lima', 
        profesion: 'Piscólogo', 
        formacion: 'Maestría en Políticas Sociales',
        especializacion: 'Psicología y Políticas Sociales',
        experienciaLaboral: 'Congresista de la República (2021-2025)', 
        expInternacional: 'No',
        cargosEleccion: 'Congresista de la República (2021-2025)',
        cargosPartidarios: 'Apoderado de Juntos por el Perú',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'No registra sentencias', 
        demandas: 'No registra demandas',
        ingresos: 'S/224,945.83', 
        origenIngresos: 'Sector público',
        inmuebles: 'Registra 1 bien inmueble valorizado en S/35,000.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'No registra',
        bio: 'Perfil con experiencia en gestión pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1RwyJO4A9rcayVlh_O-FIeMRfCcAZ5hId/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'maestro',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'diputado'
    },
    { 
        nombre: 'Enrique Valderrama', 
        genero: 'M', 
        denuncias: false, 
        edad: 39,
        reeleccion: false, 
        experiencia: true,
        partido: 'Partido Aprista Peruano', 
        cargoExtra: 'También postula como Diputado',
        vicepresidentes: 'María Inés Valdivia Acuña y Lucio Antonio Vásquez Sánchez',
        departamento: 'Lima', 
        profesion: 'Abogado', 
        formacion: 'Bachiller en Derecho',
        especializacion: 'Derecho',
        experienciaLaboral: 'Analista legal de Global Security Law S.A.C.', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'Funddor del Partido Aprista Peruano',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'No registra sentencias', 
        demandas: 'No registra demandas',
        ingresos: 'S/33,600', 
        origenIngresos: 'Sector privado',
        inmuebles: 'No registra.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'No registra',
        bio: 'Perfil sin experiencia en gestión pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1-rdnsLOoQTi3Lg6PRphLEV6wjc-YsbGO/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'maestro',
        inconclusos: true,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'diputado',
        acciones: '<p class="acciones"><span>Declara participación accionaria en 1 empresa.</span> La información consignada corresponde al valor nominal de las acciones y no permite conocer su valor económico efectivo.</p>'
    },
    { 
        nombre: 'Mario Vizcarra', 
        genero: 'M', 
        denuncias: false, 
        edad: 71, 
        reeleccion: false, 
        experiencia: true, 
        partido: 'Perú Primero', 
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'Carlos Hernán Illanes Calderón y Judith Carla Mendoza Díaz',
        departamento: 'Lima', 
        profesion: 'Ingeniero industrial', 
        formacion: 'Magister en Administración',
        especializacion: 'Administración',
        experienciaLaboral: 'Gerente administrativo en Agrotécnica Estuquiña S.A.', 
        expInternacional: 'No',
        cargosEleccion: 'No registra',
        cargosPartidarios: 'Miembro de la Comisión Política del partido Perú Primero',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'Registra 1 sentencia con pena cumplida', 
        demandas: 'No registra demandas',
        ingresos: 'S/117,684', 
        origenIngresos: 'Sector privado',
        inmuebles: 'Registra 6 bienes inmuebles que sumados ascienden a S/441,894.96.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 1 bien mueble valorizado en S/10,000',
        bio: 'Perfil sin experiencia en gestión pública. Registra una sentencia cumplida.',
        pdfLink: 'https://drive.google.com/file/d/1EhgzrH-O8SrrZh0y_A1WZ39lzcjfP3fL/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'maestro',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'civil',
        tipoCandidatura: 'senador',
        tipoDelito: 'patrimonio',
        detalles: 'Declara contar con sentencia en modalidad suspendida por delito de peculado.',
        fallo: '<p class="fallo"><span>Fallo:</span> Pena privativa</p>',
        cumplimiento: '<p class="cumplimiento"><span>Cumplimiento:</span> Pena cumplida</p> ',
        informacion: '<p class="informacion"><span>Información complementaria:</span> Me encuentro habilitado</p> ',
        acciones: '<p class="acciones"><span>Declara participación accionaria en 5 empresas.</span> La información consignada corresponde al valor nominal de las acciones y no permite conocer su valor económico efectivo.</p>'
    },
    { 
        nombre: 'José Williams', 
        genero: 'M', 
        denuncias: false, 
        edad: 74, 
        reeleccion: false, 
        experiencia: true, 
        partido: 'Avanza País', 
        cargoExtra: 'También postula como Senador',
        vicepresidentes: 'Fernán Altuve y Adriana Tudela',
        departamento: 'Lima', 
        profesion: 'Político', 
        formacion: 'Doctor en Gobierno y Políticas Públicas',
        especializacion: 'Ciencias Militares y Políticas Públicas',
        experienciaLaboral: 'Congresista de la República (2021-2025)', 
        expInternacional: 'No',
        cargosEleccion: 'Congresista de la República (2021-2025)',
        cargosPartidarios: 'No registra',
        continuidad: 'No se declara militancia previa distinta a la actual',
        sentencias: 'No registra sentencias', 
        demandas: 'No registra demandas',
        ingresos: 'S/351,600', 
        origenIngresos: 'Sector público',
        inmuebles: 'Registra 2 bienes inmuebles que sumados ascienden a S/102,968.17.  <span class="asterisco-bienes"> *Estos bienes se refieren a terrenos, casas, departamentos, edificios, fábricas, estacionamientos, depósitos, etc.</span>',
        muebles: 'Registra 3 bienes muebles  que sumados ascienden a S/54,750.00',
        bio: 'Perfil con experiencia en gestión pública. No registra sentencias ni demandas.',
        pdfLink: 'https://drive.google.com/file/d/1ZQK16mp5ZNby54huOQoemqu4V4Y9CT7k/view',
        // Atributos para secciones
        extranjero: false,
        millennial: true,
        movilidad: false,
        educacionGrupo: 'doctorado',
        inconclusos: false,
        delitos: false,
        reincidencia: false,
        sentenciaTipo: 'sin',
        tipoCandidatura: 'senador'
    }   
];

    

    candidatos.forEach((c, idx) => {
        // Insertar el logo en la posiciÃƒÂ³n correcta (despuÃƒÂ©s del candidato 31, ÃƒÂ­ndice 30)
        // Para que quede centrado en la fila 3: 5 candidatos + logo (span 3) + 5 candidatos
        if (idx === 18) {
            const logoDiv = document.createElement('div');
            logoDiv.className = 'hero-logo-cell';
            logoDiv.innerHTML = `<img src="./img/logo-tu-decides.jpg" alt="Tú Decides" class="hero-logo-integrated">`;
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
    // Crear array de ÃƒÂ­ndices aleatorios para posiciones iniciales
    const shuffledIndices = [...Array(candidatos.length).keys()];
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
    }
    
    // FunciÃƒÂ³n para obtener nÃƒÂºmero de columnas segÃƒÂºn el tamaÃƒÂ±o de pantalla
    function getGridColumns() {
        const width = window.innerWidth;
        if (width <= 640) return 5;
        if (width <= 768) return 6;
        return 8;
    }
    
    // FunciÃƒÂ³n para calcular y aplicar offsets aleatorios (intercambio exacto de celdas)
    function calculateRandomOffsets() {
        const gridCandidates = fixedGrid.querySelectorAll('.data-candidate-fixed');
        if (gridCandidates.length < 2) return;
        
        const columns = getGridColumns();
        const screenWidth = window.innerWidth;

        // Desactivar efecto randomizado en pantallas pequeñas (móvil y tablet)
        // Solo aplicar en desktop (mayor a 1024px)
        if (screenWidth <= 1024) {
            gridCandidates.forEach((div) => {
                div.dataset.randomOffsetX = 0;
                div.dataset.randomOffsetY = 0;
                div.style.transform = 'translate(0, 0)';
            });
            return;
        }
        
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
            // PosiciÃƒÂ³n donde deberÃƒÂ­a ir esta cara en el orden aleatorio
            const randomIdx = shuffledIndices[idx];
            
            // Calcular fila y columna original
            const originalRow = Math.floor(idx / columns);
            const originalCol = idx % columns;
            
            // Calcular fila y columna destino (aleatorio)
            const randomRow = Math.floor(randomIdx / columns);
            const randomCol = randomIdx % columns;
            
            // Calcular desplazamiento exacto en pÃƒÂ­xeles (celda a celda)
            const offsetX = (randomCol - originalCol) * cellWidth;
            const offsetY = (randomRow - originalRow) * cellHeight;
            
            div.dataset.randomOffsetX = offsetX;
            div.dataset.randomOffsetY = offsetY;
            
            // Solo aplicar si el grid estÃƒÂ¡ en estado aleatorio
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
    
    // Variable para rastrear si ya se ordena
    let isGridOrdered = false;
    
    // Esperar a que el layout estÃƒÂ© completo para calcular tamaÃƒÂ±os
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
        document.getElementById('modalCargoExtra').textContent = candidato.cargoExtra || '';
        
        
        document.getElementById('modalProfesion').textContent = candidato.profesion || 'No disponible';
        document.getElementById('modalFormacion').textContent = candidato.formacion || candidato.profesion || 'No disponible';
        document.getElementById('modalEspecializacion').textContent = candidato.especializacion || 'No disponible';
        
        document.getElementById('modalExpPublica').textContent = candidato.expPublica || (candidato.experiencia ? 'Sí' : 'No');
        document.getElementById('modalRolRelevante').textContent = candidato.rolRelevante || candidato.experienciaLaboral || 'No disponible';
        //document.getElementById('modalExpInternacional').textContent = candidato.expInternacional || 'No registra';
        
        document.getElementById('modalCargosEleccion').textContent = candidato.cargosEleccion || (candidato.reeleccion ? 'Cargo actual' : 'No registra');
        document.getElementById('modalCargosPartidarios').textContent = candidato.cargosPartidarios || 'No disponible';
        document.getElementById('modalContinuidad').textContent = candidato.continuidad || 'No disponible';
        
        document.getElementById('modalSentencias').textContent = candidato.sentencias === 'No' ? 'No declara tner sentencias' : candidato.sentencias;
        document.getElementById('modalDemandas').textContent = candidato.demandas || 'No declara tner sentencias';
        
        document.getElementById('modalIngresos').textContent = candidato.ingresos;
        document.getElementById('modalOrigenIngresos').textContent = candidato.origenIngresos || 'No especificado';
        document.getElementById('modalNotaIngresos').textContent = candidato.notaIngresos;
        
        document.getElementById('modalInmuebles').innerHTML = candidato.inmuebles || 'No disponible';
        document.getElementById('modalMuebles').textContent = candidato.muebles || 'No disponible';
        
        document.getElementById('modalResumen').textContent = candidato.resumen || candidato.bio || 'Información no disponible.';
        
        document.getElementById('modalDetalles').textContent = candidato.detalles || ' ';
        document.getElementById('modalFallo').innerHTML = candidato.fallo || ' ';
        document.getElementById('modalCumplimiento').innerHTML = candidato.cumplimiento || ' ';
        document.getElementById('modalInformacion').innerHTML = candidato.informacion || ' ';

        document.getElementById('modalDetallesDos').textContent = candidato.detallesDos || ' ';
        document.getElementById('modalFalloDos').innerHTML = candidato.falloDos || ' ';
        document.getElementById('modalCumplimientoDos').innerHTML = candidato.cumplimientoDos || ' ';
        document.getElementById('modalInformacionDos').innerHTML = candidato.informacionDos || ' ';

        document.getElementById('modalAcciones').innerHTML = candidato.acciones || ' ';

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
            isTransition: true // Marca para la transiciÃ³n
        },
        'extranjero': {
            filter: (c) => c.extranjero,
            color: 'active-yellow'
        },
        'mujeres': {
            filter: (c) => c.genero === 'F',
            color: 'active-yellow'
        },
        'dobleambicion': {
            filter: (c) => c.cargoExtra && c.cargoExtra.trim() !== '',
            colorMap: {
                'diputado': 'active-orange',
                'senador': 'active-purple'
            }
        },
        'internacional': {
            filter: (c) => c.internacional,
            color: 'active-yellow'
        },
        'millennial': {
            filter: (c) => c.millennial,
            color: 'active-yellow'
        },
        'generaciones': {
            filter: (c) => true, // Todos los candidatos
            colorMap: {
                'silenciosa': 'active-red',
                'boomer': 'active-orange',
                'genx': 'active-pink',
                'millennial': 'active-purple'
            }
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
                'doctorado': 'active-blue',
                'bachiller': 'active-bachiller',
                'licenciado': 'active-licenciado',
                'universitario': 'active-green',
                'no-universitario': 'active-blue',                
                'secundaria': 'active-secundaria',
                'primaria': 'active-lime'
            }
        },
        'inconclusos': {
            filter: (c) => c.inconclusos,
            color: 'active-yellow'
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
                'civil': 'active-black',
                'sin': null
            }
        },
        'tiposdelitos': {
            filter: (c) => c.tipoDelito,
            colorMap: {
                'patrimonio': 'active-black',
                'corrupcion': 'active-red',
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
            el.classList.remove('active-yellow', 'active-red', 'active-blue', 'active-pink', 'active-orange', 'active-green', 'active-lime', 'active-purple', 'active-bachiller', 'active-licenciado','active-secundaria', 'active-black');
        });
    }

    // Apply highlights for a section
    function applyHighlights(sectionName) {
        const config = sectionConfigs[sectionName];
        if (!config) return;
        
        // Si es section previo, mantener caras aleatorias
        if (config.isTransition) {
            // Asegurarse de que el grid estÃƒÂ¡ en estado aleatorio
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
        
        // Ordenar el grid si aÃƒÂºn estÃƒÂ¡ aleatorio
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
                } else if (sectionName === 'generaciones') {
                    // Calcular generaciÃ³n basÃ¡ndose en la edad
                    const edad = candidato.edad;
                    let generacion;
                    if (edad >= 80) {
                        generacion = 'silenciosa';
                    } else if (edad >= 61) {
                        generacion = 'boomer';
                    } else if (edad >= 45) {
                        generacion = 'genx';
                    } else {
                        generacion = 'millennial';
                    }
                    const colorClass = config.colorMap[generacion];
                    if (colorClass) {
                        el.classList.add(colorClass);
                    }
                } else if (sectionName === 'dobleambicion') {
                    // Determinar tipo de cargo adicional
                    const cargoExtra = candidato.cargoExtra || '';
                    if (cargoExtra.toLowerCase().includes('diputado')) {
                        el.classList.add(config.colorMap['diputado']);
                    } else if (cargoExtra.toLowerCase().includes('senador')) {
                        el.classList.add(config.colorMap['senador']);
                    }
                } else if (sectionName === 'tiposdelitos') {
                    // Determinar tipo de delito
                    const tipoDelito = candidato.tipoDelito;
                    if (tipoDelito) {
                        const colorClass = config.colorMap[tipoDelito];
                        if (colorClass) {
                            el.classList.add(colorClass);
                        }
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
