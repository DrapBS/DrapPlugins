const USER = 'DrapBS';
const REPO = 'DrapPlugins';
const FOLDER = 'plugins';

// Show download notification
function showDownloadNotification(filename) {
    const notification = document.getElementById('download-notification');
    const notificationText = notification.querySelector('.notification-text');
    
    notificationText.textContent = `Downloading ${filename}...`;
    notification.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');
        setTimeout(() => {
            notification.classList.remove('hide');
        }, 500);
    }, 3000);
}

// Download file from GitHub
async function downloadFile(url, filename) {
    try {
        showDownloadNotification(filename);
        
        const response = await fetch(url);
        const blob = await response.blob();
        
        // Create download link
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        window.URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error('خطأ في التحميل:', error);
        alert('حدث خطأ في تحميل الملف. حاول مرة أخرى.');
    }
}

// Load mods from GitHub
async function loadMods() {
    const container = document.getElementById('mods-container');
    
    try {
        const res = await fetch(`https://api.github.com/repos/${USER}/${REPO}/contents/${FOLDER}`);
        const files = await res.json();
        
        // Clear loading spinner
        container.innerHTML = '';

        if (!Array.isArray(files) || files.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #94a3b8;">لا توجد مودات حالياً.</p>';
            return;
        }

        for (let file of files) {
            if (file.name.endsWith('.py')) {
                const fileRes = await fetch(file.download_url);
                const text = await fileRes.text();
                const match = text.match(/drpmod\s*\{([\s\S]*?)\}/);
                
                if (match) {
                    const dataRaw = match[1].replace(/'/g, '"');
                    try {
                        const data = JSON.parse('{' + dataRaw + '}');
                        
                        // Prepare image
                        let imgHtml = data.Picture !== "None" 
                            ? `<img src="${data.Picture}" alt="${data.Name}">` 
                            : `<div class="no-img">💣</div>`;

                        // Prepare video
                        let vidHtml = data.Video !== "None" 
                            ? `<video controls src="${data.Video}"></video>` 
                            : '';

                        // Create card
                        const card = document.createElement('div');
                        card.className = 'mod-card';
                        card.innerHTML = `
                            <div class="card-header">
                                ${imgHtml}
                                <h3>${data.Name}</h3>
                            </div>
                            <div class="card-details">
                                <p>${data.Description}</p>
                                ${vidHtml}
                                <a href="#" class="dl-btn" data-url="${file.download_url}" data-filename="${file.name}">
                                    📥 تحميل المود
                                </a>
                                <span class="version">الإصدار: ${data.Version}</span>
                            </div>
                        `;
                        
                        // Toggle card details on click
                        card.addEventListener('click', (e) => {
                            // Don't toggle if clicking download button or video
                            if (e.target.closest('.dl-btn') || e.target.tagName === 'VIDEO') {
                                return;
                            }
                            card.classList.toggle('active');
                        });
                        
                        // Handle download button click
                        const downloadBtn = card.querySelector('.dl-btn');
                        downloadBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const url = e.currentTarget.dataset.url;
                            const filename = e.currentTarget.dataset.filename;
                            downloadFile(url, filename);
                        });
                        
                        container.appendChild(card);
                        
                    } catch(e) {
                        console.log("خطأ في قراءة بيانات: " + file.name, e);
                    }
                }
            }
        }
        
        if(container.children.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #94a3b8;">لا توجد مودات متاحة حالياً.</p>';
        }
        
    } catch (e) {
        console.error('خطأ في تحميل المودات:', e);
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <p style="color: #ef4444; font-size: 1.2rem;">⚠️ حدث خطأ في تحميل المودات</p>
                <p style="color: #94a3b8; margin-top: 10px;">تحقق من الاتصال بالإنترنت وحاول مرة أخرى</p>
            </div>
        `;
    }
}

// Load mods when page is ready
loadMods();
        document.body.removeChild(link);
        
        // Clean up
        window.URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error('خطأ في التحميل:', error);
        alert('حدث خطأ في تحميل الملف. حاول مرة أخرى.');
    }
}

// Load mods from GitHub
async function loadMods() {
    const container = document.getElementById('mods-container');
    
    try {
        const res = await fetch(`https://api.github.com/repos/${USER}/${REPO}/contents/${FOLDER}`);
        const files = await res.json();
        
        // Clear loading spinner
        container.innerHTML = '';

        if (!Array.isArray(files) || files.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #94a3b8;">لا توجد مودات حالياً.</p>';
            return;
        }

        for (let file of files) {
            if (file.name.endsWith('.py')) {
                const fileRes = await fetch(file.download_url);
                const text = await fileRes.text();
                const match = text.match(/drpmod\s*\{([\s\S]*?)\}/);
                
                if (match) {
                    const dataRaw = match[1].replace(/'/g, '"');
                    try {
                        const data = JSON.parse('{' + dataRaw + '}');
                        
                        // Prepare image
                        let imgHtml = data.Picture !== "None" 
                            ? `<img src="${data.Picture}" alt="${data.Name}">` 
                            : `<div class="no-img">💣</div>`;

                        // Prepare video
                        let vidHtml = data.Video !== "None" 
                            ? `<video controls src="${data.Video}"></video>` 
                            : '';

                        // Create card
                        const card = document.createElement('div');
                        card.className = 'mod-card';
                        card.innerHTML = `
                            <div class="card-header">
                                ${imgHtml}
                                <h3>${data.Name}</h3>
                            </div>
                            <div class="card-details">
                                <p>${data.Description}</p>
                                ${vidHtml}
                                <a href="#" class="dl-btn" data-url="${file.download_url}" data-filename="${file.name}">
                                    📥 تحميل المود
                                </a>
                                <span class="version">الإصدار: ${data.Version}</span>
                            </div>
                        `;
                        
                        // Toggle card details on click
                        card.addEventListener('click', (e) => {
                            // Don't toggle if clicking download button or video
                            if (e.target.closest('.dl-btn') || e.target.tagName === 'VIDEO') {
                                return;
                            }
                            card.classList.toggle('active');
                        });
                        
                        // Handle download button click
                        const downloadBtn = card.querySelector('.dl-btn');
                        downloadBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const url = e.currentTarget.dataset.url;
                            const filename = e.currentTarget.dataset.filename;
                            downloadFile(url, filename);
                        });
                        
                        container.appendChild(card);
                        
                    } catch(e) {
                        console.log("خطأ في قراءة بيانات: " + file.name, e);
                    }
                }
            }
        }
        
        if(container.children.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #94a3b8;">لا توجد مودات متاحة حالياً.</p>';
        }
        
    } catch (e) {
        console.error('خطأ في تحميل المودات:', e);
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <p style="color: #ef4444; font-size: 1.2rem;">⚠️ حدث خطأ في تحميل المودات</p>
                <p style="color: #94a3b8; margin-top: 10px;">تحقق من الاتصال بالإنترنت وحاول مرة أخرى</p>
            </div>
        `;
    }
}

// Load mods when page is ready
loadMods();
