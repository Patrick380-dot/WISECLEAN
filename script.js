// ---------- TODO 1 : Menu mobile ----------

const menuToggle = document.querySelector("#menu_toggle")
const navLink = document.querySelector(".nav_link")

menuToggle.addEventListener("click", () => {
    const isOpen = navLink.classList.contains("nav_open")

    if(isOpen) {
        navLink.classList.remove("nav_open")
        menuToggle.setAttribute("aria-expanded", "false")
    } else {
        navLink.classList.add("nav_open")
        menuToggle.setAttribute("aria-expanded", "true")
    }
})

navLink.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLink.classList.remove("nav_open")
        menuToggle.setAttribute("aria-expanded", "false")
    })
})


// ---------- TODO 2 : Accordéon FAQ ----------

const faqQuestions = document.querySelectorAll(".faq_question");

faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {

        const answer = question.nextElementSibling;
        const isOpen = question.getAttribute("aria-expanded") === "true";

        faqQuestions.forEach((q) => {
            q.setAttribute("aria-expanded", "false");
            q.nextElementSibling.hidden = true;
            q.querySelector(".faq_chevron").style.transform = "rotate(0deg)";
        });

        if (!isOpen) {
            question.setAttribute("aria-expanded", "true");
            answer.hidden = false;
            question.querySelector(".faq_chevron").style.transform = "rotate(180deg)";
        }
    });
});



// ---------- TODO 3 : Compteurs animés ----------

const statsSection = document.querySelector("#stats-section");
const statValues = document.querySelectorAll(".stat-value");

if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {

            // On anime chaque compteur
            statValues.forEach((element) => {
                const cible = parseInt(element.getAttribute("data-target"));
                animerCompteur(element, cible, 2000);
            });

                observer.unobserve(statsSection);
            }
        });
    });

    observer.observe(statsSection);
}

function animerCompteur(element, cible, duree) {
    let debut = null;

    function etape(timestamp) {
        if (!debut) debut = timestamp;

        const progression = Math.min((timestamp - debut) / duree, 1);
        element.textContent = Math.floor(progression * cible);

        if (progression < 1) {
            requestAnimationFrame(etape);
        } else {
            element.textContent = cible;
        }
    }

    requestAnimationFrame(etape);
}



// ---------- TODO 4 : Formulaire de devis ----------

const form = document.querySelector("#quote-form");
const confirmation = document.querySelector(".form_confirmation");

if (form && confirmation) form.addEventListener("submit", (e) => {
    e.preventDefault();

    document.querySelectorAll(".erreur").forEach((el) => el.remove());

    const nom = document.querySelector("#nom");
    const email = document.querySelector("#email");
    const message = document.querySelector("#message");

    let valide = true;

    if (nom.value.trim() === "") {
        afficherErreur(nom, "Le nom est obligatoire.");
        valide = false;
    }

    if (email.value.trim() === "") {
        afficherErreur(email, "L'email est obligatoire.");
        valide = false;
    } else if (!emailValide(email.value.trim())) {
        afficherErreur(email, "Veuillez entrer un email valide.");
        valide = false;
    }

    if (message.value.trim() === "") {
        afficherErreur(message, "Veuillez décrire votre projet.");
        valide = false;
    }

    if (valide) {
        form.hidden = true;
        confirmation.hidden = false;
        form.reset();
    }
});

function afficherErreur(champ, message) {
    const erreur = document.createElement("p");
    erreur.textContent = message;
    erreur.classList.add("erreur");
    champ.parentElement.appendChild(erreur);
}

function emailValide(email) {
    return email.includes("@") && email.split("@")[1].includes(".");
}