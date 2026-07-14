// { id: '', url: '', name: ''} a diviser en section plus stricte
const sites = [
    { id: 'korben', url: 'https://korben.info/feedfull', name: 'Korben' },
    { id: 'it', url: 'https://www.it-connect.fr/feed/', name: 'IT-Connect' },
    { id: 'crabe', url: 'https://lecrabeinfo.net/feed', name: 'Le Crabe Info' },
    { id: 'next', url: 'https://next.ink/feed/free', name: 'Next Ink'},
    { id: 'zataz', url: 'https://www.zataz.com/feed/', name: 'Zataz'},
    { id: 'silicon', url: 'https://www.silicon.fr/feed', name: 'Silicon'},
    { id: 'comptoir', url: 'https://www.comptoir-hardware.com/home.xml', name: 'Comptoir-hardware'},
    { id: 'thehackernews', url: 'https://feeds.feedburner.com/TheHackersNews', name: 'The Hacker News'},
    { id: 'arstechnical', url: 'https://feeds.arstechnica.com/arstechnica/technology-lab', name: 'Ars Technica'}, // ajouter les autre catégorie
    { id: 'bleepingcomputer', url: 'https;//www.bleepingcomputer.com/feed', name: 'Bleepingcomputer'},
    { id: 'javascriptweekly', url: 'https://cprss.s3.amazonaws.com/javascriptweekly.com.xml', name: 'Javascript Weekly'},
    { id: 'ruby', url: "https://www.ruby-lang.org/fr/feeds/news.rss", name: "Ruby"}
];

function displayFlux(source, element) {
    const sourceElement = document.getElementById(source);
    const displayElement = document.getElementById(element);
    sourceElement.addEventListener("click", () => {
        console.log('click !!')
        if (displayElement.hidden === true){
            displayElement.hidden = false;
        } else {
            displayElement.hidden = true;
        }

    })
}

async function display(site) {
    try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(site.url)}`);
        const data = await response.json();
        
        let html = `<div class="header" id="article-${site.name}"><button onclick="displayFlux('article-${site.name}', 'div-${site.name}')">${site.name}</button></div><div id="div-${site.name}">`;
        data.items.slice(0, 3).forEach(item => {
            const date = new Date(item.pubDate).toLocaleDateString('fr-FR');
            html += `
                <div class="article">
                    <a href="${item.link}" target="_blank">${item.title}</a>
                    <p style="font-size: 0.7em; color: gray;">${date}</p>
                </div>`;
        });
        
        html += `</div>`;
        // On crée la colonne dynamiquement
        const col = document.createElement('div');
        col.className = 'column';
        col.innerHTML = html;
        document.getElementById('flux-row').appendChild(col);
        
    } catch (err) {
        console.error("Erreur pour " + site.name, err);
    }
}

        // Ajoute ceci à ta liste de sources ou crée une fonction dédiée
async function getNpmUpdates() {
    // On cherche les paquets triés par date de maintenance (donc les plus récents)
    const url = 'https://registry.npmjs.org/-/v1/search?text=boost-exact:false&size=5&popularity=0.5';
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        let html = '';
        data.objects.forEach(obj => {
            const pkg = obj.package;
            html += `
                <div class="article">
                    <a href="${pkg.links.npm}" target="_blank">${pkg.name} (v${pkg.version})</a>
                    <p style="font-size: 0.7em; color: gray;">${pkg.description || 'Pas de description'}</p>
                </div>`;
        });
        document.getElementById('npm-row').innerHTML = html;
    } catch (e) { console.error(e); }
}
getNpmUpdates();
sites.forEach(site => display(site));