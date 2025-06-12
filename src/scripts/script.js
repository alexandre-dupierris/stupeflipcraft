async function main() {
    fetch("https://api.mcsrvstat.us/2/stupeflipcraft.mine.fun")
    .then(response => response.json())
    .then(data => {
        const statusDiv = document.getElementById("server-status");
        if (data.online) {
            statusDiv.innerHTML = `✅ Serveur en ligne avec ${data.players.online} joueurs connectés.`;
            statusDiv.style.color = "green";
        } else {
            statusDiv.innerHTML = "❌ Serveur hors ligne.";
            statusDiv.style.color = "red";
        }
    });

    fetch("./src/json/news.json") // Charge le fichier JSON
    .then(response => response.json()) // Convertit la réponse en JSON
    .then(data => {
        const newsContainer = document.getElementById("news-container");
        // newsContainer.innerHTML = ""; // Vide le contenu par défaut

        data.forEach(news => {
            // Crée un bloc pour chaque news
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item"); // Ajoute une classe CSS

            newsItem.innerHTML = `
                <h3>${news.title}</h3>
                <small>${news.date}</small>
                <p>${news.content}</p>
            `;

            newsContainer.appendChild(newsItem); // Ajoute la news au conteneur
        });
    })
    .catch(error => {
        console.error("Erreur lors du chargement des news :", error);
        document.getElementById("news-container").innerHTML = "⚠️ Impossible de charger les news.";
    });
    document.getElementById("accueil").classList.add("display");
}
main();

document.addEventListener("DOMContentLoaded", () => { // Attendre le chargement de la page
    document.querySelectorAll(".buttons .button").forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault(); // Empêcher le changement de page

            let classNames = this.classList;
            let sectionName = [...classNames].find(c => c !== "button"); // Trouver la classe spécifique

            if (sectionName) {
                // Masquer toutes les sections
                document.querySelectorAll("section[id]").forEach(section => section.classList.remove("display"));
                // Afficher la section correspondante
                let targetSection = document.getElementById(sectionName);
                if (targetSection) {
                    targetSection.classList.add("display");
                } else {
                    console.warn(`⚠️ Aucune section trouvée avec l'ID : ${sectionName}`);
                }
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("article h3").forEach(h3 => {
        h3.addEventListener("click", function () {
            let article = this.nextElementSibling;
            if (article && article.classList.contains("article_wiki")) {
                article.style.display = article.style.display === "block" ? "none" : "block";
            }
        });
    });
});

function copierTexte() {
    navigator.clipboard.writeText("stupeflipcraft.mine.fun").then(function() {
        document.getElementById("message").innerText = "IP copiée !";
    }).catch(function(err) {
        console.error("Erreur de copie : ", err);
    });
}

