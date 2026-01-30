/* --- [COPIER TOUT LE CONTENU CI-DESSOUS] --- */
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
const grid = document.getElementById('presets-grid');
const customGrid = document.getElementById('custom-presets-grid');
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

function switchTemplate(temp) {
    const main = document.getElementById('main-view');
    main.classList.remove('base-below', 'layer-above', 'l3b-above', 't9-style', 't10-style', 't12-style');
    if (temp.id === "t3") main.classList.add('base-below');
    if (temp.id === "t6") main.classList.add('layer-above'); 
    if (temp.id === "t8") main.classList.add('l3b-above');  
    if (temp.id === "t9") main.classList.add('t9-style');
    if (temp.id === "t10") main.classList.add('t10-style');
    if (temp.id === "t12") main.classList.add('t12-style');

    document.querySelectorAll('.template-thumb').forEach(t => t.classList.remove('active'));
    const activeThumb = document.getElementById(`thumb-${temp.id}`);
    if(activeThumb) activeThumb.classList.add('active');
    
    main.querySelector('.bg-target').src = `${temp.path}/background.png`;
    const bBis = main.querySelector('.base-bis-target');
    bBis.style.display = "block";
    bBis.src = `${temp.path}/base_bis.png`;
    bBis.onerror = () => bBis.style.display = "none";
    main.querySelector('.base-target').src = `${temp.path}/base.png`;
    main.querySelector('.overlay-target').src = `${temp.path}/dirty.png`;
    
    const setMask = (cl, img) => {
        const el = main.querySelectorAll(cl);
        el.forEach(m => {
            m.style.maskImage = `url('${temp.path}/${img}')`;
            m.style.webkitMaskImage = `url('${temp.path}/${img}')`;
        });
    };
    setMask('.l1-target', 'calque1.png'); setMask('.l1b-target', 'calque1_bis.png');
    setMask('.l2-target', 'calque2.png'); setMask('.l2b-target', 'calque2_bis.png');
    setMask('.l3-target', 'calque3.png'); setMask('.l3b-target', 'calque3_bis.png');
    update(p1.value, p2.value, p3.value);
}

function initTemplates() {
    configTemplates.forEach(temp => {
        const container = document.createElement('div');
        container.className = 'template-item';
        const thumb = document.createElement('div');
        thumb.className = 'template-thumb';
        if (temp.id === "t3") thumb.classList.add('base-below');
        if (temp.id === "t6") thumb.classList.add('layer-above'); 
        if (temp.id === "t8") thumb.classList.add('l3b-above');  
        if (temp.id === "t9") thumb.classList.add('t9-style');
        if (temp.id === "t10") thumb.classList.add('t10-style');
        if (temp.id === "t12") thumb.classList.add('t12-style');
        
        thumb.id = `thumb-${temp.id}`;
        thumb.innerHTML = `
            <img src="${temp.path}/background.png" class="img-layer">
            <div class="mask-layer l1b-target"></div><div class="mask-layer l2b-target"></div>
            <div class="mask-layer l1-target"></div><div class="mask-layer l2-target"></div>
            <div class="mask-layer l3-target"></div><div class="mask-layer l3b-target"></div>
            <img src="${temp.path}/base_bis.png" class="img-layer base-bis-target" onerror="this.style.display='none'">
            <img src="${temp.path}/base.png" class="img-layer base-target">
            <img src="${temp.path}/dirty.png" class="img-layer overlay-target">`;
        
        thumb.querySelectorAll('.mask-layer').forEach((m) => {
            let file = m.classList.contains('l1-target') ? 'calque1.png' : 
                       m.classList.contains('l1b-target') ? 'calque1_bis.png' :
                       m.classList.contains('l2-target') ? 'calque2.png' :
                       m.classList.contains('l2b-target') ? 'calque2_bis.png' :
                       m.classList.contains('l3-target') ? 'calque3.png' : 'calque3_bis.png';
            m.style.webkitMaskImage = `url('${temp.path}/${file}')`;
            m.style.maskImage = `url('${temp.path}/${file}')`;
        });
        
        const label = document.createElement('span');
        label.className = 'template-label';
        label.innerText = temp.name;
        thumb.onclick = () => switchTemplate(temp);
        container.appendChild(thumb); container.appendChild(label);
        thumbBar.appendChild(container);
    });
}

function createCard(t, targetGrid, isCustom = false, index = null) {
    const card = document.createElement('div');
    card.className = 'preset-card';
    card.innerHTML = `<span style="font-size:11px;">${t.name}</span>
        <div class="swatch-box">
            <div class="swatch" style="background:${t.c1}"></div>
            <div class="swatch" style="background:${t.c2}"></div>
            <div class="swatch" style="background:${t.c3}"></div>
        </div>` + (isCustom ? `<div class="delete-icon"><i class="fa-solid fa-trash"></i></div>` : '');
    card.onclick = () => update(t.c1, t.c2, t.c3, card);
    if (isCustom) {
        card.querySelector('.delete-icon').onclick = (e) => {
            e.stopPropagation();
            if(confirm(`Supprimer "${t.name}" ?`)) {
                let saved = JSON.parse(localStorage.getItem('myFootcastThemes')) || [];
                saved.splice(index, 1);
                localStorage.setItem('myFootcastThemes', JSON.stringify(saved));
                loadCustomThemes();
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

initTemplates();
let firstCard;
themes.forEach((t, idx) => {
    const card = createCard(t, grid);
    if (idx === 0) firstCard = card;
});
loadCustomThemes();

update(themes[0].c1, themes[0].c2, themes[0].c3, firstCard);
switchTemplate(configTemplates[0]);

[p1, p2, p3].forEach(p => {
    p.oninput = () => update(p1.value, p2.value, p3.value);
});

document.getElementById('save-btn').onclick = () => {
    let name = prompt("Nom du thème :", "Nouveau Thème");
    if (name) {
        let saved = JSON.parse(localStorage.getItem('myFootcastThemes')) || [];
        saved.push({ name, c1: p1.value, c2: p2.value, c3: p3.value });
        localStorage.setItem('myFootcastThemes', JSON.stringify(saved));
        loadCustomThemes();
    }
};

document.getElementById('export-btn').onclick = function() {
    const btn = this;
    const code = p1.value.toUpperCase() + "-" + p2.value.toUpperCase() + "-" + p3.value.toUpperCase();
    const el = document.createElement('textarea');
    el.value = code; document.body.appendChild(el); el.select();
    document.execCommand('copy'); document.body.removeChild(el);
    
    const originalContent = btn.innerHTML;
    btn.classList.add('export-success');
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Copié !';
    
    setTimeout(() => { 
        btn.classList.remove('export-success'); 
        btn.innerHTML = originalContent; 
    }, 1500);
};

document.getElementById('import-btn').onclick = function() {
    const code = prompt("Collez le code HEXA :");
    if (code) {
        const colors = code.split('-');
        if (colors.length === 3) {
            let name = prompt("Nom pour ce nouveau thème ?", "Importé");
            if(name) {
                const c1 = colors[0].trim(), c2 = colors[1].trim(), c3 = colors[2].trim();
                update(c1, c2, c3);
                let saved = JSON.parse(localStorage.getItem('myFootcastThemes')) || [];
                saved.push({ name, c1, c2, c3 });
                localStorage.setItem('myFootcastThemes', JSON.stringify(saved));
                loadCustomThemes();
            }
        } else alert("Format invalide !");
    }
};

document.getElementById('clear-custom-btn').onclick = () => {
    if(confirm("Tout effacer ?")) {
        localStorage.removeItem('myFootcastThemes');
        loadCustomThemes();
    }
};