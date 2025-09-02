// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadSavedBackground();
    initializePageTracking();
});

// 页面访问追踪
let pageStartTime = Date.now();
let isPageVisible = true;

function initializePageTracking() {
    // 记录页面访问开始时间
    pageStartTime = Date.now();
    
    // 监听页面可见性变化
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            isPageVisible = false;
            // 页面隐藏时记录停留时间
            recordPageStayTime();
        } else {
            isPageVisible = true;
            pageStartTime = Date.now(); // 重新开始计时
        }
    });
    
    // 页面卸载前记录停留时间
    window.addEventListener('beforeunload', function() {
        recordPageStayTime();
    });
    
    // 每5分钟记录一次在线时间
    setInterval(function() {
        if (isPageVisible) {
            recordPageStayTime(false); // 不重置计时器
        }
    }, 5 * 60 * 1000); // 5分钟
}

// 记录页面停留时间
function recordPageStayTime(resetTimer = true) {
    const stayTime = Math.round((Date.now() - pageStartTime) / 1000); // 秒
    
    if (stayTime > 5) { // 只记录停留超过5秒的
        // 百度统计 - 记录停留时间
        if (typeof _hmt !== 'undefined') {
            _hmt.push(['_trackEvent', '页面停留', '停留时间', `${Math.round(stayTime/60)}分钟`, stayTime]);
        }
        
        console.log(`页面停留时间: ${stayTime}秒`);
    }
    
    if (resetTimer) {
        pageStartTime = Date.now();
    }
}

// 地图下载功能
function downloadMap() {
    // 创建一个临时的 a 标签来触发下载
    const link = document.createElement('a');
    link.href = 'resources/map.jpg';
    link.download = '校园电子地图.jpg';
    link.style.display = 'none';
    
    // 添加到页面并点击
    document.body.appendChild(link);
    link.click();
    
    // 移除临时元素
    document.body.removeChild(link);
    
    // 百度统计 - 记录下载事件
    if (typeof _hmt !== 'undefined') {
        _hmt.push(['_trackEvent', '电子地图', '下载', 'map.png', 1]);
    }
    
    // 本地统计计数（备用方案）
    updateDownloadCount();
    
    // 显示下载提示
    showMessage('电子地图下载已开始！', 'success');
}

// 初始化导航功能
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            const buttonText = this.querySelector('.button-text').textContent;
            
            if (url) {
                // 百度统计 - 记录导航按钮点击事件
                if (typeof _hmt !== 'undefined') {
                    _hmt.push(['_trackEvent', '导航按钮', '点击', buttonText, 1]);
                }
                
                // 添加点击动画效果
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // 打开链接
                window.open(url, '_blank');
            }
        });
        
        // 添加触摸反馈
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// 从本地存储加载背景
function loadSavedBackground() {
    // 直接检查默认背景图片
    checkDefaultBackground();
}

// 检查默认背景图片是否存在
function checkDefaultBackground() {
    const img = new Image();
    img.onload = function() {
        // 图片加载成功，使用 resources/background.png
        document.body.style.background = "url('resources/background.png') center/cover fixed, linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)";
        document.body.style.backgroundBlendMode = 'overlay';
    };
    img.onerror = function() {
        // 图片加载失败，使用纯渐变背景
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        document.body.style.backgroundBlendMode = 'normal';
        console.log('resources/background.png 未找到，使用默认渐变背景');
    };
    img.src = 'resources/background.png';
}

// 显示消息提示
function showMessage(message, type = 'info') {
    // 移除已存在的消息
    const existingMessage = document.querySelector('.message-toast');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 创建消息元素
    const messageToast = document.createElement('div');
    messageToast.className = 'message-toast';
    messageToast.textContent = message;
    
    // 设置样式
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    
    messageToast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // 添加动画样式
    if (!document.querySelector('#message-animations')) {
        const style = document.createElement('style');
        style.id = 'message-animations';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageToast);
    
    // 3秒后自动移除
    setTimeout(() => {
        messageToast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (messageToast.parentNode) {
                messageToast.remove();
            }
        }, 300);
    }, 3000);
}

// 本地统计功能（备用方案）
function updateDownloadCount() {
    const currentCount = localStorage.getItem('mapDownloadCount') || 0;
    const newCount = parseInt(currentCount) + 1;
    localStorage.setItem('mapDownloadCount', newCount);
    
    // 记录下载时间
    const downloadHistory = JSON.parse(localStorage.getItem('downloadHistory') || '[]');
    downloadHistory.push({
        timestamp: new Date().toISOString(),
        count: newCount
    });
    // 只保留最近100次记录
    if (downloadHistory.length > 100) {
        downloadHistory.splice(0, downloadHistory.length - 100);
    }
    localStorage.setItem('downloadHistory', JSON.stringify(downloadHistory));
    
    console.log(`地图下载次数: ${newCount}`);
}

// 获取本地统计数据
function getLocalStats() {
    const downloadCount = localStorage.getItem('mapDownloadCount') || 0;
    const downloadHistory = JSON.parse(localStorage.getItem('downloadHistory') || '[]');
    
    return {
        totalDownloads: parseInt(downloadCount),
        downloadHistory: downloadHistory,
        todayDownloads: getTodayDownloads(downloadHistory)
    };
}

// 获取今日下载次数
function getTodayDownloads(history) {
    const today = new Date().toDateString();
    return history.filter(record => {
        const recordDate = new Date(record.timestamp).toDateString();
        return recordDate === today;
    }).length;
}

// 显示统计信息（调试用）
function showStats() {
    const stats = getLocalStats();
    console.log('=== 本地统计数据 ===');
    console.log(`总下载次数: ${stats.totalDownloads}`);
    console.log(`今日下载次数: ${stats.todayDownloads}`);
    console.log('下载历史:', stats.downloadHistory.slice(-5)); // 显示最近5次
}

// 预加载图片优化
function preloadImages() {
    const imageUrls = [
        // 可以在这里添加需要预加载的图片URL
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl+Shift+S 显示统计信息（开发者调试用）
    if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        showStatsModal();
    }
});

// 显示统计信息弹窗
function showStatsModal() {
    const stats = getLocalStats();
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 90%;">
            <h3 style="margin: 0 0 20px 0; color: #333; text-align: center;">📊 本地统计数据</h3>
            <div style="font-family: monospace; line-height: 1.6;">
                <p><strong>总下载次数:</strong> ${stats.totalDownloads}</p>
                <p><strong>今日下载:</strong> ${stats.todayDownloads}</p>
                <p><strong>最近下载:</strong></p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    ${stats.downloadHistory.slice(-3).map(record => 
                        `<li>${new Date(record.timestamp).toLocaleString()}</li>`
                    ).join('')}
                </ul>
                <p style="font-size: 12px; color: #666; margin-top: 20px;">
                    * 此为本地浏览器统计，完整数据请查看百度统计后台<br>
                    * 按 Ctrl+Shift+S 可随时查看此窗口
                </p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="margin-top: 20px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer; display: block; margin-left: auto; margin-right: auto;">
                关闭
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 点击背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// 切换全屏地图显示
function toggleFullscreen() {
    const modal = document.getElementById('mapModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 百度统计 - 记录查看大图事件
    if (typeof _hmt !== 'undefined') {
        _hmt.push(['_trackEvent', '地图查看', '查看大图', '全屏模式', 1]);
    }
}

// 关闭全屏地图
function closeMapModal() {
    const modal = document.getElementById('mapModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // 百度统计 - 记录关闭大图事件
    if (typeof _hmt !== 'undefined') {
        _hmt.push(['_trackEvent', '地图查看', '关闭大图', '退出全屏', 1]);
    }
}

// 键盘事件支持
document.addEventListener('keydown', function(e) {
    // ESC键关闭地图模态框
    if (e.key === 'Escape') {
        const modal = document.getElementById('mapModal');
        if (modal.classList.contains('active')) {
            closeMapModal();
        }
    }
});
