const USER = 'DrapBS';
const REPO = 'DrapPlugins';
const FOLDER = 'plugins';

async function loadMods() {
    const container = document.getElementById('mods-container');
    try {
        const res = await fetch(`https://api.github.com/repos/${USER}/${REPO}/contents/${FOLDER}`);
        const files = await res.json();
        container.innerHTML = '';

        for (let file of files) {
            if (file.name.endsWith('.py')) {
                const fileRes = await fetch(file.download_url);
                const text = await fileRes.text();
                const match = text.match(/drpmod\s*\{([\s\S]*?)\}/);
                
                if (match) {
                    const dataRaw = match[1].replace(/'/g, '"');
                    const data = JSON.parse('{' + dataRaw + '}');
                    
                    container.innerHTML += `
                        <div class="mod-card">
                            <h3>${data.Name}</h3>
                            <p>${data.Description}</p>
                            ${data.Picture !== "None" ? `<img src="${data.Picture}">` : ''}
                            ${data.Video !== "None" ? `<video controls src="${data.Video}"></video>` : ''}
                            <a href="${file.download_url}" class="dl-btn" download="${file.name}">Download Plugin</a>
                            <span class="version">Version: ${data.Version}</span>
                        </div>`;
                }
            }
        }
    } catch (e) { container.innerHTML = "Error loading mods."; }
}
loadMods();
