        const heroSection = document.getElementById('heroSection');
        const dataSection1 = document.getElementById('dataSection1');
        const dataSection2 = document.getElementById('dataSection2');
        const dataSection3 = document.getElementById('dataSection3');
        const searchSection = document.getElementById('searchSection');
        const heroGrid = document.getElementById('heroGrid');
        const dataGrid1 = document.getElementById('dataGrid1');
        const dataGrid2 = document.getElementById('dataGrid2');
        const dataGrid3 = document.getElementById('dataGrid3');
        const carousel = document.getElementById('candidatesCarousel');
        const searchInput = document.getElementById('searchInput');
        const modal = document.getElementById('modal');
        const modalOverlay = document.getElementById('modalOverlay');
        const modalClose = document.getElementById('modalClose');

        // Función helper para obtener la ruta de la foto del candidato
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

        // Función helper para obtener la ruta del logo del partido
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

        const partyStyles = {
            'Ahora Nación': { abbr: 'AN', color: '#673ab7', logo: './img/logos/ahora-nacion.jpg' },
            'Fe en el Perú': { abbr: 'FEP', color: '#673ab7', logo: './img/logos/fe-en-el-peru.jpg' },
            'Perú Federal': { abbr: 'PF', color: '#673ab7', logo: './img/logos/peru-federal.jpg' },
            'País para todos': { abbr: 'PPT', color: '#673ab7', logo: './img/logos/pais-para-todos.jpg' },
            'Sí creo': { abbr: 'SC', color: '#673ab7', logo: './img/logos/si-creo.jpg' },
            'Alianza para el Progreso': { abbr: 'APP', color: '#0d6efd', logo: './img/logos/alianza-para-el-progreso.jpg' },
            'Unido Perú': { abbr: 'UP', color: '#ff7a00', logo: './img/logos/unido-peru.jpg' },
            'Frente Esperanza': { abbr: 'FE', color: '#ff7a00', logo: './img/logos/frente-esperanza.jpg' },
            'Fuerza Moderna': { abbr: 'FM', color: '#ff7a00', logo: './img/logos/fuerza-moderna.jpg' },
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
            'Unidad y Paz': { abbr: 'UYP', color: '#22c55e', logo: './img/logos/unidad-y-paz.jpg' },    
            'Juntos por el Perú': { abbr: 'JPP', color: '#22c55e', logo: './img/logos/juntos-por-el-peru.jpg' }, 
            'Un Camino Diferente': { abbr: 'UCD', color: '#22c55e', logo: './img/logos/un-camino-diferente.jpg' },     
            'Nuevo Perú': { abbr: 'NP', color: '#22c55e', logo: './img/logos/nuevo-peru.jpg' },     
            'Acción Popular': { abbr: 'AP', color: '#22c55e', logo: './img/logos/accion-popular.jpg' },  
            'Perú Libre': { abbr: 'AP', color: '#22c55e', logo: './img/logos/peru-libre.jpg' },    
            'Cooperación Popular': { abbr: 'AP', color: '#22c55e', logo: './img/logos/cooperacion-popular.jpg' },   
            'Partido Verde': { abbr: 'PV', color: '#22c55e', logo: './img/logos/partido-verde.jpg' },   
            'Venceremos': { abbr: 'V', color: '#be123c', logo: './img/logos/venceremos.jpg' },
        };

        const candidatos = [
            { nombre: 'Alfonso Lopez Chau', genero: 'M', denuncias: true, edad: 28, reeleccion: false, experiencia: false, partido: 'Ahora Nación', departamento: 'LIMA', profesion: 'Ingeniero de Sistemas', experienciaLaboral: 'Conductor en Compañía Latinoamericana de Radiodifusión SA', sentencias: 'No', ingresos: 'S/.150,000', bio: 'Ingeniero de sistemas con enfoque en políticas de innovación tecnológica.' },
            { nombre: 'Alvaro Paz de la Barra', genero: 'M', denuncias: false, edad: 45, reeleccion: true, experiencia: true, partido: 'Fe en el Perú', departamento: 'AREQUIPA', profesion: 'Economista', experienciaLaboral: 'Asesor económico del Congreso', sentencias: 'No', ingresos: 'S/.280,000', bio: 'Congresista actual, enfocado en desarrollo económico regional.' },
            { nombre: 'Armando Masse', genero: 'M', denuncias: true, edad: 52, reeleccion: true, experiencia: true, partido: 'Perú Federal', departamento: 'CUSCO', profesion: 'Abogado', experienciaLaboral: 'Ex alcalde provincial', sentencias: 'No', ingresos: 'S/.420,000', bio: 'Ex alcalde con experiencia en gestión municipal y obras públicas.' },
            { nombre: 'Carlos Alvarez', genero: 'M', denuncias: false, edad: 29, reeleccion: false, experiencia: false, partido: 'País para todos', departamento: 'LIMA', profesion: 'Sociólogo', experienciaLaboral: 'Activista social', sentencias: 'No', ingresos: 'S/.95,000', bio: 'Activista social enfocado en derechos de juventud y educación.' },
            { nombre: 'Carlos Espá', genero: 'M', denuncias: false, edad: 38, reeleccion: false, experiencia: true, partido: 'Sí creo', departamento: 'LA LIBERTAD', profesion: 'Administrador', experienciaLaboral: 'Gerente regional', sentencias: 'No', ingresos: 'S/.350,000', bio: 'Empresario con trayectoria en desarrollo social empresarial.' },
            { nombre: 'César Acuña', genero: 'M', denuncias: true, edad: 41, reeleccion: true, experiencia: true, partido: 'Alianza para el Progreso', departamento: 'PIURA', profesion: 'Ingeniero Agrónomo', experienciaLaboral: 'Congresista actual', sentencias: 'No', ingresos: 'S/.290,000', bio: 'Político de carrera con enfoque en agricultura.' },
            { nombre: 'Charlie Carrasco', genero: 'M', denuncias: false, edad: 27, reeleccion: false, experiencia: false, partido: 'Unido Perú', departamento: 'LIMA', profesion: 'Economista', experienciaLaboral: 'Analista financiero', sentencias: 'No', ingresos: 'S/.120,000', bio: 'Economista joven especializado en finanzas públicas.' },
            { nombre: 'Fernando Olivera', genero: 'M', denuncias: false, edad: 35, reeleccion: false, experiencia: true, partido: 'Frente Esperanza', departamento: 'LAMBAYEQUE', profesion: 'Contador', experienciaLaboral: 'Ex funcionario público', sentencias: 'No', ingresos: 'S/.180,000', bio: 'Ex funcionario público con experiencia en transparencia.' },
            { nombre: 'Fiorella Mollineli', genero: 'F', denuncias: true, edad: 48, reeleccion: true, experiencia: true, partido: 'Fuerza Moderna', departamento: 'JUNÍN', profesion: 'Médico', experienciaLaboral: 'Congresista reeleccionista', sentencias: 'No', ingresos: 'S/.510,000', bio: 'Congresista reeleccionista con historial controversial.' },
            { nombre: 'Francisco Diez Canseco', genero: 'M', denuncias: false, edad: 33, reeleccion: false, experiencia: false, partido: 'Perú Acción', departamento: 'LIMA', profesion: 'Abogado', experienciaLaboral: 'Especialista en DDHH', sentencias: 'No', ingresos: 'S/.160,000', bio: 'Abogado especializado en derechos humanos y justicia social.' },
            { nombre: 'Javier Velasquez Quesquen', genero: 'M', denuncias: false, edad: 42, reeleccion: false, experiencia: true, partido: 'APRA', departamento: 'AYACUCHO', profesion: 'Ingeniero Civil', experienciaLaboral: 'Ex regidor', sentencias: 'No', ingresos: 'S/.240,000', bio: 'Ex regidor con propuestas en medio ambiente.' },
            { nombre: 'Jorge Nieto', genero: 'M', denuncias: true, edad: 29, reeleccion: false, experiencia: false, partido: 'Partido del Buen Gobierno', departamento: 'LIMA', profesion: 'Comunicador', experienciaLaboral: 'Periodista independiente', sentencias: 'No', ingresos: 'S/.105,000', bio: 'Comunicador social con historial de denuncias por difamación.' },
            { nombre: 'José Luna Galvez', genero: 'M', denuncias: false, edad: 36, reeleccion: true, experiencia: true, partido: 'Podemos Perú', departamento: 'SAN MARTÍN', profesion: 'Médico', experienciaLaboral: 'Congresista actual', sentencias: 'No', ingresos: 'S/.280,000', bio: 'Congresista con enfoque en salud pública.' },
            { nombre: 'Keiko Fujimori', genero: 'F', denuncias: false, edad: 44, reeleccion: false, experiencia: true, partido: 'Fuerza Popular', departamento: 'LORETO', profesion: 'Médico', experienciaLaboral: 'Director de hospital', sentencias: 'No', ingresos: 'S/.320,000', bio: 'Médico con propuestas de reforma sanitaria.' },
            { nombre: 'Liliana Humala', genero: 'F', denuncias: true, edad: 50, reeleccion: true, experiencia: true, partido: 'PRIN', departamento: 'UCAYALI', profesion: 'Empresario', experienciaLaboral: 'Político veterano', sentencias: 'No', ingresos: 'S/.485,000', bio: 'Político veterano con múltiples investigaciones fiscales.' },
            { nombre: 'Mariano González', genero: 'M', denuncias: false, edad: 28, reeleccion: false, experiencia: false, partido: 'Salvemos al Perú', departamento: 'LIMA', profesion: 'Profesor', experienciaLaboral: 'Docente universitario', sentencias: 'No', ingresos: 'S/.98,000', bio: 'Profesor universitario con enfoque en reforma educativa.' },
            { nombre: 'Mario Vizcarra', genero: 'M', denuncias: false, edad: 39, reeleccion: false, experiencia: true, partido: 'Perú Primero', departamento: 'MOQUEGUA', profesion: 'Gestor Público', experienciaLaboral: 'Funcionario municipal', sentencias: 'No', ingresos: 'S/.210,000', bio: 'Gestor público con experiencia en gobiernos locales.' },
            { nombre: 'Marisol Pérez Tello', genero: 'M', denuncias: false, edad: 46, reeleccion: true, experiencia: true, partido: 'Primero la gente', departamento: 'APURÍMAC', profesion: 'Ingeniero', experienciaLaboral: 'Congresista reeleccionista', sentencias: 'No', ingresos: 'S/.340,000', bio: 'Congresista reeleccionista enfocado en infraestructura.' },
            { nombre: 'Paul Jaimes', genero: 'M', denuncias: true, edad: 34, reeleccion: false, experiencia: false, partido: 'Progresemos', departamento: 'LIMA', profesion: 'Empresario', experienciaLaboral: 'Gerente comercial', sentencias: 'No', ingresos: 'S/.380,000', bio: 'Empresario con denuncias laborales pendientes.' },
            { nombre: 'Phillip Butters', genero: 'M', denuncias: false, edad: 40, reeleccion: false, experiencia: true, partido: 'Avanza País', departamento: 'TUMBES', profesion: 'Contador', experienciaLaboral: 'Asesor fiscal', sentencias: 'No', ingresos: 'S/.230,000', bio: 'Contador con propuestas de transparencia fiscal.' },
            
            { nombre: 'Rafael Belaúnde', genero: 'M', denuncias: false, edad: 32, reeleccion: false, experiencia: true, partido: 'Libertad Popular', departamento: 'LIMA', profesion: 'Politóloga', experienciaLaboral: 'Ex funcionaria ministerial', sentencias: 'No', ingresos: 'S/.195,000', bio: 'Ex funcionaria con enfoque en igualdad de género.' },
            { nombre: 'Rafael López Aliaga', genero: 'M', denuncias: true, edad: 29, reeleccion: false, experiencia: false, partido: 'Renovación Popular', departamento: 'ICA', profesion: 'Periodista', experienciaLaboral: 'Conductora de noticias', sentencias: 'No', ingresos: 'S/.140,000', bio: 'Periodista con denuncias por plagio.' },
            { nombre: 'Ricardo Belmont', genero: 'M', denuncias: false, edad: 43, reeleccion: true, experiencia: true, partido: 'Obras', departamento: 'ANCASH', profesion: 'Educadora', experienciaLaboral: 'Congresista reeleccionista', sentencias: 'No', ingresos: 'S/.265,000', bio: 'Congresista reeleccionista enfocada en niñez.' },
            { nombre: 'Richard Arce', genero: 'M', denuncias: false, edad: 27, reeleccion: false, experiencia: false, partido: 'Partido Morado', departamento: 'LIMA', profesion: 'Diseñadora', experienciaLaboral: 'Consultora de proyectos', sentencias: 'No', ingresos: 'S/.110,000', bio: 'Diseñadora con propuestas de espacios públicos.' },
            { nombre: 'Roberto Chiabra', genero: 'M', denuncias: true, edad: 38, reeleccion: false, experiencia: true, partido: 'Unidad y Paz', departamento: 'CAJAMARCA', profesion: 'Ingeniera', experienciaLaboral: 'Ex regidora provincial', sentencias: 'No', ingresos: 'S/.220,000', bio: 'Ex regidora con investigaciones por nepotismo.' },
            { nombre: 'Roberto Sanchez', genero: 'M', denuncias: false, edad: 45, reeleccion: true, experiencia: true, partido: 'Juntos por el Perú', departamento: 'PUNO', profesion: 'Administradora', experienciaLaboral: 'Política veterana', sentencias: 'No', ingresos: 'S/.315,000', bio: 'Política experimentada en desarrollo rural.' },
            { nombre: 'Rosario Fernández', genero: 'F', denuncias: false, edad: 31, reeleccion: false, experiencia: false, partido: 'Un Camino Diferente', departamento: 'LIMA', profesion: 'Arquitecta', experienciaLaboral: 'Especialista en vivienda', sentencias: 'No', ingresos: 'S/.175,000', bio: 'Arquitecta enfocada en vivienda social.' },
            { nombre: 'Vicente Alanoca', genero: 'M', denuncias: false, edad: 36, reeleccion: false, experiencia: true, partido: 'Nuevo Perú', departamento: 'TACNA', profesion: 'Psicóloga', experienciaLaboral: 'Gestora en salud mental', sentencias: 'No', ingresos: 'S/.190,000', bio: 'Psicóloga con experiencia en políticas de salud mental.' },
            //{ nombre: 'Victor Andrés García Belaúnde', genero: 'M', denuncias: true, edad: 42, reeleccion: true, experiencia: true, partido: 'Acción Popular', departamento: 'HUÁNUCO', profesion: 'Contadora', experienciaLaboral: 'Congresista actual', sentencias: 'No', ingresos: 'S/.295,000', bio: 'Congresista con denuncias por conflicto de intereses.' },
            { nombre: 'Vladimir Cerrón', genero: 'M', denuncias: false, edad: 28, reeleccion: false, experiencia: false, partido: 'Perú Libre', departamento: 'LIMA', profesion: 'Bióloga', experienciaLaboral: 'Investigadora ambiental', sentencias: 'No', ingresos: 'S/.125,000', bio: 'Bióloga con propuestas ambientales innovadoras.' },
            { nombre: 'Yonhy Lescano', genero: 'M', denuncias: false, edad: 39, reeleccion: false, experiencia: true, partido: 'Cooperación Popular', departamento: 'MADRE DE DIOS', profesion: 'Administradora', experienciaLaboral: 'Gestora pública', sentencias: 'No', ingresos: 'S/.255,000', bio: 'Administradora con experiencia en gestión pública.' },
            { nombre: 'Alex Gonzáles', genero: 'M', denuncias: false, edad: 47, reeleccion: true, experiencia: true, partido: 'Partido Verde', departamento: 'PASCO', profesion: 'Abogada', experienciaLaboral: 'Congresista reeleccionista', sentencias: 'No', ingresos: 'S/.370,000', bio: 'Congresista reeleccionista enfocada en seguridad ciudadana.' },
            { nombre: 'Hernán Garrido Lecca', genero: 'M', denuncias: true, edad: 33, reeleccion: false, experiencia: false, partido: 'APRA', departamento: 'HUANCAVELICA', profesion: 'Empresaria', experienciaLaboral: 'Directora comercial', sentencias: 'No', ingresos: 'S/.410,000', bio: 'Empresaria con denuncias tributarias.' },
            //{ nombre: 'Julio Chávez', genero: 'M', denuncias: false, edad: 29, reeleccion: false, experiencia: false, partido: 'Acción Popular', departamento: 'LIMA', profesion: 'Nutricionista', experienciaLaboral: 'Especialista en salud', sentencias: 'No', ingresos: 'S/.115,000', bio: 'Nutricionista con propuestas en seguridad alimentaria.' },
            { nombre: 'Ronald Atencio', genero: 'M', denuncias: false, edad: 41, reeleccion: false, experiencia: true, partido: 'Venceremos', departamento: 'AMAZONAS', profesion: 'Socióloga', experienciaLaboral: 'Ex viceministra', sentencias: 'No', ingresos: 'S/.285,000', bio: 'Ex viceministra con experiencia en cultura.' },
            { nombre: 'Mesias Guevara', genero: 'M', denuncias: true, edad: 44, reeleccion: true, experiencia: true, partido: 'Partido Morado', departamento: 'CALLAO', profesion: 'Política', experienciaLaboral: 'Congresista actual', sentencias: 'No', ingresos: 'S/.395,000', bio: 'Política con denuncias por enriquecimiento ilícito.' }
        ];

        let currentStage = 0;

        // Crear hero grid
        candidatos.forEach(c => {
            const div = document.createElement('div');
            div.className = 'candidate-hero';
            const candidatePhoto = getCandidatePhoto(c);
            div.style.backgroundImage = `url(${candidatePhoto})`;
            heroGrid.appendChild(div);
        });

        // Crear data grids
        candidatos.forEach((c, idx) => {
            const div1 = document.createElement('div');
            div1.className = 'data-candidate';
            const candidatePhoto = getCandidatePhoto(c);
            div1.style.backgroundImage = `url(${candidatePhoto})`;
            if (c.denuncias) div1.dataset.denuncias = 'true';
            dataGrid1.appendChild(div1);

            const div2 = document.createElement('div');
            div2.className = 'data-candidate';
            div2.style.backgroundImage = `url(${candidatePhoto})`;

            // Asignar grupos de educación según índice
            if (idx < 5) {
                div2.dataset.education = 'maestro';
            } else if (idx < 9) {
                div2.dataset.education = 'bachiller';
            } else if (idx < 13) {
                div2.dataset.education = 'licenciado';
            } else if (idx < 17) {
                div2.dataset.education = 'universitario';
            } else if (idx < 20) {
                div2.dataset.education = 'no-universitario';
            } else if (idx < 23) {
                div2.dataset.education = 'tecnico';
            } else if (idx < 25) {
                div2.dataset.education = 'secundaria';
            } else if (idx < 26) {
                div2.dataset.education = 'primaria';
            } else {
                div2.dataset.education = 'otros';
            }

            if (c.experiencia) div2.dataset.experiencia = 'true';
            dataGrid2.appendChild(div2);

            const div3 = document.createElement('div');
            div3.className = 'data-candidate';
            div3.style.backgroundImage = `url(${candidatePhoto})`;
            
            // Asignar grupos de sentencias según índice
            // 5 penal (rojo), 1 civil (azul), resto sin sentencia (grises)
            if (idx === 2 || idx === 9 || idx === 17 || idx === 25 || idx === 33) {
                div3.dataset.sentence = 'penal';
            } else if (idx === 5) {
                div3.dataset.sentence = 'civil';
            } else {
                div3.dataset.sentence = 'sin-sentencia';
            }
            
            dataGrid3.appendChild(div3);
        });

        // Crear carousel
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
            document.getElementById('modalPhoto').style.backgroundImage = `url(${candidatePhoto})`;
            document.getElementById('modalName').textContent = candidato.nombre;
            document.getElementById('modalParty').textContent = candidato.partido;
            document.getElementById('modalEdad').textContent = `${candidato.edad} años`;
            document.getElementById('modalDepartamento').textContent = candidato.departamento;
            document.getElementById('modalExperiencia').textContent = candidato.experienciaLaboral;
            document.getElementById('modalProfesion').textContent = candidato.profesion;
            document.getElementById('modalSentencias').textContent = candidato.sentencias;
            document.getElementById('modalIngresos').textContent = candidato.ingresos;
            
            modal.classList.add('active');
            modalOverlay.classList.add('active');
        }

        function closeModal() {
            modal.classList.remove('active');
            modalOverlay.classList.remove('active');
        }

        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);

        function handleScroll() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            let newStage = 0;
            if (scrollY < windowHeight * 0.8) {
                newStage = 1;
            } else if (scrollY < windowHeight * 2.2) {
                newStage = 2;
            } else if (scrollY < windowHeight * 3.5) {
                newStage = 3;
            } else if (scrollY < windowHeight * 4.8) {
                newStage = 4;
            } else {
                newStage = 5;
            }

            if (newStage !== currentStage) {
                currentStage = newStage;
                updateStages();
            }
        }

        function updateStages() {
            heroSection.classList.remove('visible', 'hide');
            dataSection1.classList.remove('visible', 'hide');
            dataSection2.classList.remove('visible', 'hide');
            dataSection3.classList.remove('visible', 'hide');
            searchSection.classList.remove('visible');

            switch(currentStage) {
                case 1:
                    heroSection.classList.add('visible');
                    break;
                case 2:
                    heroSection.classList.add('hide');
                    dataSection1.classList.add('visible');
                    animateToDataGrid1();
                    break;
                case 3:
                    dataSection1.classList.add('hide');
                    dataSection2.classList.add('visible');
                    animateToDataGrid2();
                    break;
                case 4:
                    dataSection2.classList.add('hide');
                    dataSection3.classList.add('visible');
                    animateToDataGrid3();
                    break;
                case 5:
                    dataSection3.classList.add('hide');
                    searchSection.classList.add('visible');
                    break;
            }
        }

        function animateToDataGrid1() {
            const heroCandidates = heroGrid.querySelectorAll('.candidate-hero');
            const heroPositions = new Map();
            
            heroCandidates.forEach((el, i) => {
                const rect = el.getBoundingClientRect();
                heroPositions.set(i, { x: rect.left, y: rect.top });
            });

            requestAnimationFrame(() => {
                const dataCandidates = dataGrid1.querySelectorAll('.data-candidate');
                
                dataCandidates.forEach((el, i) => {
                    const newRect = el.getBoundingClientRect();
                    const oldPos = heroPositions.get(i);
                    
                    if (oldPos) {
                        const deltaX = oldPos.x - newRect.left;
                        const deltaY = oldPos.y - newRect.top;
                        
                        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                        el.style.transition = 'none';
                    }
                });

                dataGrid1.offsetHeight;

                requestAnimationFrame(() => {
                    dataCandidates.forEach(el => {
                        el.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease';
                        el.style.transform = 'translate(0, 0)';
                    });

                    setTimeout(() => {
                        dataCandidates.forEach((c, index) => {
                            // Todos iluminados excepto el último (índice 38)
                            if (index !== 33) {
                                c.classList.add('active');
                                c.classList.add('group-yellow'); // Todos amarillos
                            } else {
                                // El último queda gris
                                c.classList.add('group-sin-sentencia');
                            }
                        });
                    }, 400);
                });
            });
        }

        function animateToDataGrid2() {
            const data1Candidates = dataGrid1.querySelectorAll('.data-candidate');
            const data1Positions = new Map();
            
            data1Candidates.forEach((el, i) => {
                const rect = el.getBoundingClientRect();
                data1Positions.set(i, { x: rect.left, y: rect.top });
            });

            requestAnimationFrame(() => {
                const data2Candidates = dataGrid2.querySelectorAll('.data-candidate');
                
                data2Candidates.forEach((el, i) => {
                    const newRect = el.getBoundingClientRect();
                    const oldPos = data1Positions.get(i);
                    
                    if (oldPos) {
                        const deltaX = oldPos.x - newRect.left;
                        const deltaY = oldPos.y - newRect.top;
                        
                        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                        el.style.transition = 'none';
                    }
                });

                dataGrid2.offsetHeight;

                requestAnimationFrame(() => {
                    data2Candidates.forEach(el => {
                        el.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease';
                        el.style.transform = 'translate(0, 0)';
                    });

                    setTimeout(() => {
                        data2Candidates.forEach(c => {
                            const education = c.dataset.education;
                            c.classList.add('active');
                            
                            switch(education) {
                                case 'maestro':
                                    c.classList.add('group-yellow');
                                    break;
                                case 'bachiller':
                                    c.classList.add('group-pink');
                                    break;
                                case 'licenciado':
                                    c.classList.add('group-orange');
                                    break;
                                case 'universitario':
                                    c.classList.add('group-green');
                                    break;
                                case 'no-universitario':
                                    c.classList.add('group-blue');
                                    break;
                                case 'tecnico':
                                    c.classList.add('group-purple');
                                    break;
                                case 'secundaria':
                                    c.classList.add('group-red');
                                    break;
                                case 'primaria':
                                    c.classList.add('group-lime');
                                    break;
                                default:
                                    c.classList.add('group-cyan');
                            }
                        });
                    }, 400);
                });
            });
        }

        function animateToDataGrid3() {
            const data2Candidates = dataGrid2.querySelectorAll('.data-candidate');
            const data2Positions = new Map();
            
            data2Candidates.forEach((el, i) => {
                const rect = el.getBoundingClientRect();
                data2Positions.set(i, { x: rect.left, y: rect.top });
            });

            requestAnimationFrame(() => {
                const data3Candidates = dataGrid3.querySelectorAll('.data-candidate');
                
                data3Candidates.forEach((el, i) => {
                    const newRect = el.getBoundingClientRect();
                    const oldPos = data2Positions.get(i);
                    
                    if (oldPos) {
                        const deltaX = oldPos.x - newRect.left;
                        const deltaY = oldPos.y - newRect.top;
                        
                        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                        el.style.transition = 'none';
                    }
                });

                dataGrid3.offsetHeight;

                requestAnimationFrame(() => {
                    data3Candidates.forEach(el => {
                        el.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease, background-color 0.6s ease, border-color 0.6s ease, filter 0.6s ease';
                        el.style.transform = 'translate(0, 0)';
                    });

                    setTimeout(() => {
                        // Aplicar colores según sentencias
                        data3Candidates.forEach((c) => {
                            const sentence = c.dataset.sentence;
                            c.classList.add('active');
                            
                            switch(sentence) {
                                case 'penal':
                                    c.classList.add('group-penal');
                                    break;
                                case 'civil':
                                    c.classList.add('group-civil');
                                    break;
                                case 'sin-sentencia':
                                    c.classList.add('group-sin-sentencia');
                                    break;
                            }
                        });
                    }, 400);
                });
            });
        }

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const carouselCandidates = carousel.querySelectorAll('.carousel-candidate');
            
            carouselCandidates.forEach((card, i) => {
                const candidato = candidatos[i];
                const match = candidato.nombre.toLowerCase().includes(query) || 
                             candidato.partido.toLowerCase().includes(query);
                
                card.style.opacity = query === '' ? '1' : (match ? '1' : '0.2');
            });
        });

        window.addEventListener('scroll', handleScroll);
        handleScroll();
