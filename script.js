/* --- BASE DE DONNÉES --- */
const themes = [
    { name: "Bleu de France", c1: "#00224c", c2: "#003f93", c3: "#4e88df" },
    { name: "Acajou", c1: "#4c2313", c2: "#934425", c3: "#d96536" },
    { name: "Bleu Tiffany", c1: "#144b47", c2: "#0f837e", c3: "#0abab5" },
    { name: "Lavande", c1: "#2e044c", c2: "#7330a2", c3: "#cda0e9" },
    { name: "Ocre", c1: "#4c3803", c2: "#963d05", c3: "#d3a72b" },
    { name: "Menthe à l'eau", c1: "#154a29", c2: "#2e8b57", c3: "#2cdf7b" },
    { name: "Rouge de Falun", c1: "#4c0404", c2: "#801818", c3: "#e9a1a0" },
    { name: "Gris Souris", c1: "#444141", c2: "#676363", c3: "#9e9e9e" },
    { name: "Framboise", c1: "#4b141d", c2: "#912639", c3: "#e03b58" },
    { name: "Vert Olive", c1: "#252b12", c2: "#4a5524", c3: "#839641" },
    { name: "Corail", c1: "#4c1a14", c2: "#943327", c3: "#e9503d" }
];

const configTemplates = [
    { id: "t1", name: "Petit + Gros score", path: "img/template1" },
    { id: "t2", name: "Liner 1L", path: "img/template2" },
    { id: "t3", name: "Liner 2L", path: "img/template3" },
    { id: "t4", name: "Météo", path: "img/template4" },
    { id: "t5", name: "Affiche Match", path: "img/template5" },
    { id: "t6", name: "Arbitres", path: "img/template6" },
    { id: "t7", name: "Composition", path: "img/template7" },
    { id: "t8", name: "Tactique", path: "img/template8" },
    { id: "t9", name: "Affiche Match Bas", path: "img/template9" },
    { id: "t10", name: "Remplacements", path: "img/template10" },
    { id: "t11", name: "Gros score fin", path: "img/template11" },
    { id: "t12", name: "Tirs au but", path: "img/template12" }
];

const p1 = document.getElementById('picker1'), p2 = document.getElementById('picker2'), p3 = document.getElementById('picker3');
const t1 = document.getElementById('hex1'), t2 = document.getElementById('hex2'), t3 = document.getElementById('hex3');
const grid = document.getElementById('presets-grid'), customGrid = document.getElementById('custom-presets-grid');
const thumbBar = document.getElementById('template-bar');

function update(c1, c2, c3, selectedCard = null) {
    document.querySelectorAll('.l1-target, .l1b-target').forEach(el => el.style.backgroundColor = c1);
    document.querySelectorAll('.l2-target, .l2b-target').forEach(el => el.style.backgroundColor = c2);
    document.querySelectorAll('.l3-target, .l3b-target').forEach(el => el.style.backgroundColor = c3);
    p1.value = c1; p2.value = c2; p3.value = c3;
    t1.innerText = c1.toUpperCase(); t2.innerText = c2.toUpperCase(); t3.innerText = c3.toUpperCase();
    document.querySelectorAll('.preset-card').forEach(card => card.classList.remove('active'));
    if (selectedCard) selectedCard.classList.add('active');
}

function setComplexMask(el, imgPath) {
    el.style.backgroundImage = `url('${imgPath}')`;
    el.style.backgroundSize = "contain";
    el.style.backgroundRepeat = "no-repeat";
    el.style.backgroundPosition = "center";
    el.style.backgroundBlendMode = "multiply";
    el.style.webkitMaskImage = `url('${imgPath}')`;
    el.style.maskImage = `url('${imgPath}')`;
}

function switchTemplate(temp) {
    const main = document.getElementById('main-view');
    main.className = 'tv-screen'; 
    if (temp.id === "t3") main.classList.add('base-below');
    if (temp.id === "t6") main.classList.add('layer-above'); 
    if (temp.id === "t8") main.classList.add('l3b-above');  
    if (temp.id === "t9") main.classList.add('t9-style');
    if (temp.id === "t10") main.classList.add('t10-style');
    if (temp.id === "t12") main.classList.add('t12-style');

    document.querySelectorAll('.template-thumb').forEach(t => t.classList.remove('active'));
    const activeThumb = document.getElementById(`thumb-${temp.id}`);
    if(activeThumb) activeThumb.classList.add('active');
    
    // Background unique à la racine
    main.querySelector('.bg-target').src = `img/background.png`;

    const bBis = main.querySelector('.base-bis-target');
    bBis.style.display = "block"; bBis.src = `${temp.path}/base_bis.png`;
    bBis.onerror = () => bBis.style.display = "none";
    
    main.querySelector('.base-target').src = `${temp.path}/base.png`;
    main.querySelector('.overlay-target').src = `${temp.path}/dirty.png`;
    
    const apply = (cl, img) => {
        main.querySelectorAll(cl).forEach(m => setComplexMask(m, `${temp.path}/${img}`));
    };

    apply('.l1-target', 'calque1.png'); apply('.l1b-target', 'calque1_bis.png');
    apply('.l2-target', 'calque2.png'); apply('.l2b-target', 'calque2_bis.png');
    apply('.l3-target', 'calque3.png'); apply('.l3b-target', 'calque3_bis.png');
    update(p1.value, p2.value, p3.value);
}

function initTemplates() {
    configTemplates.forEach(temp => {
        const item = document.createElement('div');
        item.className = 'template-item';
        const thumb = document.createElement('div');
        thumb.className = 'template-thumb';
        thumb.id = `thumb-${temp.id}`;
        if (temp.id === "t3") thumb.classList.add('base-below');
        if (temp.id === "t6") thumb.classList.add('layer-above');
        
        thumb.innerHTML = `
            <img src="img/background.png" class="img-layer">
            <div class="mask-layer l1b-target"></div><div class="mask-layer l2b-target"></div>
            <div class="mask-layer l1-target"></div><div class="mask-layer l2-target"></div>
            <div class="mask-layer l3-target"></div><div class="mask-layer l3b-target"></div>
            <img src="${temp.path}/base_bis.png" class="img-layer base-bis-target" onerror="this.style.display='none'">
            <img src="${temp.path}/base.png" class="img-layer base-target">
            <img src="${temp.path}/dirty.png" class="img-layer overlay-target">`;
        
        thumb.querySelectorAll('.mask-layer').forEach(m => {
            let f = m.classList.contains('l1-target') ? 'calque1.png' : 
                    m.classList.contains('l1b-target') ? 'calque1_bis.png' :
                    m.classList.contains('l2-target') ? 'calque2.png' :
                    m.classList.contains('l2b-target') ? 'calque2_bis.png' :
                    m.classList.contains('l3-target') ? 'calque3.png' : 'calque3_bis.png';
            setComplexMask(m, `${temp.path}/${f}`);
        });
        
        const label = document.createElement('span');
        label.className = 'template-label';
        label.innerText = temp.name;
        thumb.onclick = () => switchTemplate(temp);
        item.appendChild(thumb); item.appendChild(label);
        thumbBar.appendChild(item);
    });
}

function createCard(t, targetGrid, isCustom = false, index = null) {
    const card = document.createElement('div');
    card.className = 'preset-card';
    let html = `<span style="font-size:11px;">${t.name}</span><div class="swatch-box"><div class="swatch" style="background:${t.c1}"></div><div class="swatch" style="background:${t.c2}"></div><div class="swatch" style="background:${t.c3}"></div></div>`;
    if (isCustom) html += `<div class="edit-icon"><i class="fa-solid fa-pen"></i></div><div class="delete-icon"><i class="fa-solid fa-trash"></i></div>`;
    card.innerHTML = html;
    card.onclick = () => update(t.c1, t.c2, t.c3, card);
    if (isCustom) {
        card.querySelector('.edit-icon').onclick = (e) => {
            e.stopPropagation();
            let n = prompt("Nom :", t.name);
            if (n && n !== t.name) {
                let s = JSON.parse(localStorage.getItem('myFootcastThemes')) || [];
                s[index].name = n; localStorage.setItem('myFootcastThemes', JSON.stringify(s)); loadCustomThemes();
            }
        };
        card.querySelector('.delete-icon').onclick = (e) => {
            e.stopPropagation();
            if(confirm(`Supprimer ?`)) {
                let s = JSON.parse(localStorage.getItem('myFootcastThemes')) || [];
                s.splice(index, 1); localStorage.setItem('myFootcastThemes', JSON.stringify(s)); loadCustomThemes();
            }
        };
    }
    targetGrid.appendChild(card);
    return card;
}

function loadCustomThemes() {
    customGrid.innerHTML = '';
    const saved = JSON.parse(localStorage.getItem('myFootcastThemes')) || [];
    saved.forEach((t, idx) => createCard(t, customGrid, true, idx));
}

// Initialisation
initTemplates();
let firstCard;
themes.forEach((t, idx) => {
    const card = createCard(t, grid);
    if (idx === 0) firstCard = card;
});
loadCustomThemes();
update(themes[0].c1, themes[0].c2, themes[0].c3, firstCard);
switchTemplate(configTemplates[0]);

[p1, p2, p3].forEach(p => p.oninput = () => update(p1.value, p2.value, p3.value));

document.getElementById('save-btn').onclick = () => {
    let n = prompt("Nom :", "Nouveau Thème");
    if (n) {
        let s = JSON.parse(localStorage.getItem('myFootcastThemes')) || [];
        s.push({ name: n, c1: p1.value, c2: p2.value, c3: p3.value });
        localStorage.setItem('myFootcastThemes', JSON.stringify(s)); loadCustomThemes();
    }
};

document.getElementById('export-btn').onclick = function() {
    const code = `${p1.value}-${p2.value}-${p3.value}`.toUpperCase();
    const el = document.createElement('textarea');
    el.value = code; document.body.appendChild(el); el.select();
    document.execCommand('copy'); document.body.removeChild(el);
    const original = this.innerHTML;
    this.classList.add('export-success');
    this.innerHTML = '<i class="fa-solid fa-check"></i> Copié !';
    setTimeout(() => { this.classList.remove('export-success'); this.innerHTML = original; }, 1500);
};

document.getElementById('import-btn').onclick = function() {
    const code = prompt("Collez le code HEXA :");
    if (code) {
        const colors = code.split('-');
        if (colors.length === 3) {
            let n = prompt("Nom ?", "Importé");
            if(n) {
                const c1 = colors[0].trim(), c2 = colors[1].trim(), c3 = colors[2].trim();
                update(c1, c2, c3);
                let s = JSON.parse(localStorage.getItem('myFootcastThemes')) || [];
                s.push({ name: n, c1, c2, c3 });
                localStorage.setItem('myFootcastThemes', JSON.stringify(s)); loadCustomThemes();
            }
        } else alert("Invalide !");
    }
};

document.getElementById('clear-custom-btn').onclick = () => { if(confirm("Effacer tout ?")) { localStorage.removeItem('myFootcastThemes'); loadCustomThemes(); } };

/* --- LOGIQUE PLEIN ÉCRAN --- */
const fullscreenWrapper = document.getElementById('fullscreen-wrapper');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const exitFullscreenBtn = document.getElementById('exit-fullscreen-btn');

fullscreenBtn.onclick = () => {
    if (fullscreenWrapper.requestFullscreen) {
        fullscreenWrapper.requestFullscreen();
    } else if (fullscreenWrapper.webkitRequestFullscreen) { /* Safari */
        fullscreenWrapper.webkitRequestFullscreen();
    } else if (fullscreenWrapper.msRequestFullscreen) { /* IE11 */
        fullscreenWrapper.msRequestFullscreen();
    }
};

exitFullscreenBtn.onclick = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
};