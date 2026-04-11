function relierNoeuds(idParent, idEnfant, idPathSvg) {
    const parent = document.getElementById(idParent).getBoundingClientRect();
    const enfant = document.getElementById(idEnfant).getBoundingClientRect();
    const svg = document.querySelector('svg').getBoundingClientRect();

    // Calcul du centre de chaque noeud par rapport au SVG
    const x1 = parent.left + parent.width / 2 - svg.left;
    const y1 = parent.top + parent.height / 2 - svg.top;
    const x2 = enfant.left + enfant.width / 2 - svg.left;
    const y2 = enfant.top + enfant.height / 2 - svg.top;

    // Mise à jour du tracé SVG (M = Move to, L = Line to)
    const path = document.getElementById(idPathSvg);
    path.setAttribute('d', `M ${x1} ${y1} L ${x2} ${y2}`);
}

// On appelle la fonction (à mettre dans un resize ou au chargement)
window.addEventListener('load', () => relierNoeuds('p1', 'e1', 'ligne1'));