// =====================================================
// HÀBITS+
// Aplicació de seguiment i millora d'hàbits
// =====================================================


// =====================================================
// DADES
// =====================================================


// Recuperem els hàbits guardats

let habits = JSON.parse(
    localStorage.getItem("habits")
) || [];


// Recuperem els registres diaris

let registres = JSON.parse(
    localStorage.getItem("registres")
) || {};


// =====================================================
// ELEMENTS HTML
// =====================================================


const llistaHabits =
    document.getElementById("llista-habits");


const botoAfegir =
    document.getElementById("boto-afegir");


const formulari =
    document.getElementById("formulari-container");


const botoCrear =
    document.getElementById("boto-crear");


const botoCancelar =
    document.getElementById("boto-cancelar");


const nomHabit =
    document.getElementById("nom-habit");


const percentatge =
    document.getElementById("percentatge");


const missatgeProgres =
    document.getElementById("missatge-progres");


const botoObjectiu =
    document.getElementById("boto-objectiu");


const campObjectiu =
    document.getElementById("objectiu");


const zonaRecomanacions =
    document.getElementById("recomanacions");


const botoMalHabit =
    document.getElementById("boto-mal-habit");


const campMalHabit =
    document.getElementById("mal-habit");


const zonaEstrategia =
    document.getElementById("estrategia");


// =====================================================
// DATA D'AVUI
// =====================================================


function obtenirDataAvui() {

    const avui = new Date();

    return avui.toISOString().split("T")[0];

}


// =====================================================
// GUARDAR DADES
// =====================================================


function guardarHabits() {

    localStorage.setItem(
        "habits",
        JSON.stringify(habits)
    );

}


function guardarRegistres() {

    localStorage.setItem(
        "registres",
        JSON.stringify(registres)
    );

}


// =====================================================
// MOSTRAR HÀBITS
// =====================================================


function mostrarHabits() {

    llistaHabits.innerHTML = "";


    if (habits.length === 0) {

        llistaHabits.innerHTML = `

            <div class="targeta">

                <p>
                    Encara no tens cap hàbit.
                    Comença amb un microhàbit!
                </p>

            </div>

        `;

        actualitzarProgres();

        return;

    }


    habits.forEach(function(habit) {


        const element =
            document.createElement("div");


        element.classList.add("habit");


        const esquerra =
            document.createElement("div");


        esquerra.classList.add(
            "habit-esquerra"
        );


        const casella =
            document.createElement("input");


        casella.type = "checkbox";


        const avui =
            obtenirDataAvui();


        // Comprovem si està completat avui

        casella.checked =
            habit.completat === avui;


        const nom =
            document.createElement("span");


        nom.textContent =
            habit.nom;


        if (casella.checked) {

            nom.classList.add(
                "habit-completat"
            );

        }


        // Quan es marca

        casella.addEventListener(
            "change",
            function() {


                if (casella.checked) {

                    habit.completat =
                        obtenirDataAvui();


                } else {

                    habit.completat = null;

                }


                guardarHabits();


                guardarRegistreAvui();


                mostrarHabits();

            }
        );


        // Botó eliminar

        const botoEliminar =
            document.createElement("button");


        botoEliminar.textContent =
            "🗑️";


        botoEliminar.classList.add(
            "boto-eliminar"
        );


        botoEliminar.addEventListener(
            "click",
            function() {

                eliminarHabit(
                    habit.id
                );

            }
        );


        esquerra.appendChild(
            casella
        );


        esquerra.appendChild(
            nom
        );


        element.appendChild(
            esquerra
        );


        element.appendChild(
            botoEliminar
        );


        llistaHabits.appendChild(
            element
        );

    });


    actualitzarProgres();

}


// =====================================================
// AFEGIR HÀBIT MANUALMENT
// =====================================================


botoAfegir.addEventListener(
    "click",
    function() {

        formulari.classList.remove(
            "amagat"
        );

        nomHabit.focus();

    }
);


botoCrear.addEventListener(
    "click",
    function() {


        const nom =
            nomHabit.value.trim();


        if (nom === "") {

            alert(
                "Escriu el nom de l'hàbit."
            );

            return;

        }


        crearHabit(nom);


        nomHabit.value = "";


        formulari.classList.add(
            "amagat"
        );

    }
);


botoCancelar.addEventListener(
    "click",
    function() {

        nomHabit.value = "";

        formulari.classList.add(
            "amagat"
        );

    }
);


// =====================================================
// CREAR HÀBIT
// =====================================================


function crearHabit(nom) {


    const jaExisteix =
        habits.some(function(habit) {

            return habit.nom === nom;

        });


    if (jaExisteix) {

        alert(
            "Aquest hàbit ja existeix."
        );

        return;

    }


    const nouHabit = {

        id: Date.now(),

        nom: nom,

        completat: null

    };


    habits.push(
        nouHabit
    );


    guardarHabits();


    mostrarHabits();

}


// =====================================================
// ELIMINAR HÀBIT
// =====================================================


function eliminarHabit(id) {


    const confirmar =
        confirm(
            "Vols eliminar aquest hàbit?"
        );


    if (!confirmar) {

        return;

    }


    habits =
        habits.filter(
            function(habit) {

                return habit.id !== id;

            }
        );


    guardarHabits();


    mostrarHabits();

}


// =====================================================
// OBJECTIUS I RECOMANACIONS
// =====================================================


botoObjectiu.addEventListener(
    "click",
    function() {


        const objectiu =
            campObjectiu.value
                .toLowerCase()
                .trim();


        if (objectiu === "") {

            alert(
                "Escriu primer el teu objectiu."
            );

            return;

        }


        let recomanacions = [];


        // ESTUDIS

        if (

            objectiu.includes("estudi") ||
            objectiu.includes("nota") ||
            objectiu.includes("examen") ||
            objectiu.includes("batxillerat")

        ) {


            recomanacions = [

                {
                    text:
                        "📚 Estudiar 15 minuts cada dia",

                    explicacio:
                        "Comença amb només 15 minuts per convertir l'estudi en una acció fàcil de repetir."
                },


                {
                    text:
                        "📝 Repasar els apunts durant 5 minuts",

                    explicacio:
                        "Un petit repàs freqüent pot ajudar a mantenir la informació activa."
                },


                {
                    text:
                        "📱 Deixar el mòbil lluny mentre estudies",

                    explicacio:
                        "Reduir les distraccions facilita començar i mantenir l'atenció."
                },


                {
                    text:
                        "🎒 Preparar el material la nit anterior",

                    explicacio:
                        "Preparar l'entorn redueix l'esforç necessari per començar."
                }

            ];

        }


        // ESPORT

        else if (

            objectiu.includes("esport") ||
            objectiu.includes("exercici") ||
            objectiu.includes("forma") ||
            objectiu.includes("entrenar")

        ) {


            recomanacions = [

                {
                    text:
                        "🏃 Fer 10 minuts d'activitat física",

                    explicacio:
                        "Comença amb una quantitat petita per facilitar la constància."
                },


                {
                    text:
                        "🚶 Caminar 20 minuts",

                    explicacio:
                        "Caminar és una activitat senzilla que pots incorporar fàcilment a la rutina."
                },


                {
                    text:
                        "👟 Preparar la roba esportiva el dia anterior",

                    explicacio:
                        "Preparar l'entorn fa que començar sigui més fàcil."
                },


                {
                    text:
                        "💧 Beure aigua durant el dia",

                    explicacio:
                        "Associar la hidratació a moments concrets pot ajudar a convertir-la en una rutina."
                }

            ];

        }


        // SON

        else if (

            objectiu.includes("dorm") ||
            objectiu.includes("son") ||
            objectiu.includes("descans")

        ) {


            recomanacions = [

                {
                    text:
                        "📱 Deixar el mòbil 30 minuts abans de dormir",

                    explicacio:
                        "Crear un període sense pantalla pot ajudar a establir una rutina nocturna."
                },


                {
                    text:
                        "🌙 Intentar anar a dormir a una hora semblant",

                    explicacio:
                        "La regularitat pot facilitar la creació d'una rutina de son."
                },


                {
                    text:
                        "📖 Llegir 5 pàgines abans de dormir",

                    explicacio:
                        "Pots substituir una activitat poc útil per una alternativa tranquil·la."
                }

            ];

        }


        // ALIMENTACIÓ I SALUT

        else if (

            objectiu.includes("menjar") ||
            objectiu.includes("aliment") ||
            objectiu.includes("salut")

        ) {


            recomanacions = [

                {
                    text:
                        "💧 Beure un got d'aigua en llevar-te",

                    explicacio:
                        "Associar una acció a una rutina que ja existeix facilita recordar-la."
                },


                {
                    text:
                        "🍎 Afegir una peça de fruita al dia",

                    explicacio:
                        "Comença amb un canvi petit en lloc d'intentar modificar tota l'alimentació alhora."
                },


                {
                    text:
                        "🍽️ Menjar sense mirar el mòbil",

                    explicacio:
                        "Eliminar una distracció pot ajudar a ser més conscient de l'activitat."
                }

            ];

        }


        // MÒBIL

        else if (

            objectiu.includes("mòbil") ||
            objectiu.includes("mobil") ||
            objectiu.includes("pantalla") ||
            objectiu.includes("xarxes") ||
            objectiu.includes("instagram") ||
            objectiu.includes("tiktok")

        ) {


            recomanacions = [

                {
                    text:
                        "📱 Deixar el mòbil lluny durant 20 minuts",

                    explicacio:
                        "Augmentar la distància física pot fer que sigui menys automàtic agafar-lo."
                },


                {
                    text:
                        "🔕 Desactivar notificacions innecessàries",

                    explicacio:
                        "Reduir els estímuls pot disminuir les interrupcions."
                },


                {
                    text:
                        "⏰ Establir una estona sense pantalles",

                    explicacio:
                        "Comença amb un període curt i augmenta'l progressivament."
                },


                {
                    text:
                        "📖 Substituir 10 minuts de pantalla per lectura",

                    explicacio:
                        "Substituir un comportament és més concret que simplement intentar eliminar-lo."
                }

            ];

        }


        // OBJECTIU GENERAL

        else {


            recomanacions = [

                {
                    text:
                        "🌱 Comença amb un hàbit de 2 minuts",

                    explicacio:
                        "Un hàbit molt petit redueix la barrera inicial."
                },


                {
                    text:
                        "⏰ Associa el nou hàbit a una rutina existent",

                    explicacio:
                        "Utilitzar una rutina com a senyal pot facilitar recordar el nou comportament."
                },


                {
                    text:
                        "📍 Prepara l'entorn",

                    explicacio:
                        "Fer que l'acció sigui més visible i accessible facilita començar."
                },


                {
                    text:
                        "✅ Registra cada vegada que completis l'hàbit",

                    explicacio:
                        "El seguiment permet veure el progrés i prendre consciència de la constància."
                }

            ];

        }


        mostrarRecomanacions(
            recomanacions
        );

    }
);


// =====================================================
// MOSTRAR RECOMANACIONS
// =====================================================


function mostrarRecomanacions(
    recomanacions
) {


    zonaRecomanacions.innerHTML = `

        <div class="targeta">

            <h3>
                🤖 Recomanacions per al teu objectiu
            </h3>

            <p>
                No cal començar amb tots.
                Tria un o dos microhàbits.
            </p>

        </div>

    `;


    recomanacions.forEach(
        function(recomanacio) {


            const element =
                document.createElement("div");


            element.classList.add(
                "recomanacio"
            );


            const contingut =
                document.createElement("div");


            const text =
                document.createElement("strong");


            text.textContent =
                recomanacio.text;


            const explicacio =
                document.createElement("p");


            explicacio.textContent =
                recomanacio.explicacio;


            explicacio.style.marginTop =
                "6px";


            explicacio.style.color =
                "#666";


            contingut.appendChild(
                text
            );


            contingut.appendChild(
                explicacio
            );


            const boto =
                document.createElement("button");


            boto.textContent =
                "+ Afegir";


            boto.classList.add(
                "boto-afegir-recomanacio"
            );


            boto.addEventListener(
                "click",
                function() {


                    afegirRecomanacioComHabit(
                        recomanacio.text
                    );

                }
            );


            element.appendChild(
                contingut
            );


            element.appendChild(
                boto
            );


            zonaRecomanacions.appendChild(
                element
            );

        }
    );

}


// =====================================================
// AFEGIR RECOMANACIÓ COM A HÀBIT
// =====================================================


function afegirRecomanacioComHabit(
    recomanacio
) {


    const nom =
        recomanacio
            .replace(/^.\s/, "")
            .trim();


    crearHabit(
        nom
    );


    alert(
        "🌱 Microhàbit afegit als teus hàbits!"
    );

}


// =====================================================
// MALS HÀBITS
// =====================================================


botoMalHabit.addEventListener(
    "click",
    function() {


        const malHabit =
            campMalHabit.value
                .toLowerCase()
                .trim();


        if (malHabit === "") {

            alert(
                "Escriu quin hàbit vols canviar."
            );

            return;

        }


        crearEstrategia(
            malHabit
        );

    }
);


// =====================================================
// CREAR ESTRATÈGIA
// =====================================================


function crearEstrategia(
    malHabit
) {


    let substitut =
        "Fer una activitat alternativa durant 5 minuts.";


    let dificultar =
        "Fes que aquest hàbit sigui una mica més difícil d'iniciar.";


    let desencadenant =
        "Observa en quin moment, lloc o situació acostumes a fer aquest hàbit.";


    // MÒBIL

    if (

        malHabit.includes("mòbil") ||
        malHabit.includes("mobil") ||
        malHabit.includes("tiktok") ||
        malHabit.includes("instagram") ||
        malHabit.includes("pantalla")

    ) {


        desencadenant =
            "Identifica quan acostumes a agafar el mòbil automàticament.";


        dificultar =
            "Deixa el mòbil lluny o desactiva les notificacions innecessàries.";


        substitut =
            "Quan tinguis ganes de mirar-lo, espera 5 minuts i fes una altra activitat.";

    }


    // MENJAR

    else if (

        malHabit.includes("menjar") ||
        malHabit.includes("dolç") ||
        malHabit.includes("picar")

    ) {


        desencadenant =
            "Observa si l'impuls apareix per gana, avorriment, emocions o costum.";


        dificultar =
            "No deixis l'aliment que vols evitar en un lloc visible o fàcilment accessible.";


        substitut =
            "Quan aparegui l'impuls, espera uns minuts i tria una alternativa.";

    }


    // CREEM LA INTERFÍCIE

    zonaEstrategia.innerHTML = `

        <div class="pas-estrategia">

            <h3>
                1️⃣ Identifica el desencadenant
            </h3>

            <p>
                ${desencadenant}
            </p>

        </div>


        <div class="pas-estrategia">

            <h3>
                2️⃣ Fes-lo més difícil
            </h3>

            <p>
                ${dificultar}
            </p>

        </div>


        <div class="pas-estrategia">

            <h3>
                3️⃣ Substitueix-lo
            </h3>

            <p>
                ${substitut}
            </p>

        </div>


        <div class="pas-estrategia">

            <h3>
                4️⃣ Comença petit
            </h3>

            <p>
                No intentis eliminar-lo de cop.
                Comença reduint-lo una mica i
                augmenta progressivament.
            </p>

        </div>

    `;

}


// =====================================================
// REGISTRE DIARI
// =====================================================


function guardarRegistreAvui() {


    const avui =
        obtenirDataAvui();


    const completats =
        habits.filter(
            function(habit) {

                return habit.completat === avui;

            }
        ).length;


    registres[avui] =
        completats;


    guardarRegistres();

}


// =====================================================
// ACTUALITZAR PROGRÉS
// =====================================================


function actualitzarProgres() {


    if (habits.length === 0) {

        percentatge.textContent =
            "0%";


        missatgeProgres.textContent =
            "Comença a crear bons hàbits!";


        actualitzarEstadistiques();


        return;

    }


    const avui =
        obtenirDataAvui();


    const completats =
        habits.filter(
            function(habit) {

                return habit.completat === avui;

            }
        ).length;


    const resultat =
        Math.round(
            (completats / habits.length) * 100
        );


    percentatge.textContent =
        resultat + "%";


    if (resultat === 0) {


        missatgeProgres.textContent =
            "Avui és un bon dia per començar!";


    } else if (resultat < 50) {


        missatgeProgres.textContent =
            "Continua! Ja has començat.";


    } else if (resultat < 100) {


        missatgeProgres.textContent =
            "Molt bé! Ja gairebé ho tens.";


    } else {


        missatgeProgres.textContent =
            "🎉 Has completat tots els hàbits!";

    }


    actualitzarEstadistiques();

}


// =====================================================
// ESTADÍSTIQUES
// =====================================================


function actualitzarEstadistiques() {


    const total =
        habits.length;


    const completats =
        habits.filter(
            function(habit) {

                return habit.completat !== null;

            }
        ).length;


    document.getElementById(
        "total-habits"
    ).textContent =
        total;


    document.getElementById(
        "total-completats"
    ).textContent =
        completats;


    const racha =
        calcularRacha();


    document.getElementById(
        "racha"
    ).textContent =
        racha;


    let progrés = 0;


    if (total > 0) {

        progrés =
            Math.round(
                (completats / total) * 100
            );

    }


    document.getElementById(
        "mitjana"
    ).textContent =
        progrés + "%";


    document.getElementById(
        "barra-progres"
    ).style.width =
        progrés + "%";


    if (progrés === 100) {

        document.getElementById(
            "text-estadistiques"
        ).textContent =
            "🎉 Excel·lent! Has completat tots els hàbits.";

    }

    else if (progrés >= 50) {

        document.getElementById(
            "text-estadistiques"
        ).textContent =
            "💪 Molt bé! Continua mantenint la constància.";

    }

    else {

        document.getElementById(
            "text-estadistiques"
        ).textContent =
            "🌱 Estàs construint els teus hàbits.";

    }

}


// =====================================================
// CALCULAR RACHA
// =====================================================


function calcularRacha() {


    let racha = 0;


    let data =
        new Date();


    while (true) {


        const dataString =
            data.toISOString()
                .split("T")[0];


        if (
            registres[dataString] &&
            registres[dataString] > 0
        ) {

            racha++;

            data.setDate(
                data.getDate() - 1
            );


        } else {

            break;

        }

    }


    return racha;

}


// =====================================================
// NAVEGACIÓ
// =====================================================


const botonsNavegacio =
    document.querySelectorAll(
        ".nav-boto"
    );


const seccions =
    document.querySelectorAll(
        ".seccio"
    );


botonsNavegacio.forEach(
    function(boto) {


        boto.addEventListener(
            "click",
            function() {


                const seccio =
                    boto.dataset.seccio;


                // Amaguem totes

                seccions.forEach(
                    function(element) {

                        element.classList.add(
                            "amagada"
                        );

                    }
                );


                // Mostrem la seleccionada

                document
                    .getElementById(seccio)
                    .classList.remove(
                        "amagada"
                    );


                // Actualitzem els botons

                botonsNavegacio.forEach(
                    function(element) {

                        element.classList.remove(
                            "actiu"
                        );

                    }
                );


                boto.classList.add(
                    "actiu"
                );

            }
        );

    }
);


// =====================================================
// INICIAR APLICACIÓ
// =====================================================


mostrarHabits();

actualitzarEstadistiques();