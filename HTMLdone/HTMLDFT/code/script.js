// 获取 DOM 元素
const dropzone = document.getElementById('dropzone');
const fileList = document.getElementById('fileList');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const videoPlayer = document.getElementById('videoPlayer');
const audioPlayer = document.getElementById('audioPlayer');

// 监听拖放事件
dropzone.addEventListener('dragover', (e) => e.preventDefault());
dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFiles(files);
});

// 文件处理逻辑
function handleFiles(files) {
    for (const file of files) {
        const fileName = file.name;
        const fileType = file.type;

        // 更新文件列表
        const listItem = document.createElement('div');
        listItem.textContent = `文件名: ${fileName}, 类型: ${fileType}`;
        fileList.appendChild(listItem);

        // 存储文件信息到 localStorage
        const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
        storedFiles.push({ name: fileName, type: fileType });
        localStorage.setItem('uploadedFiles', JSON.stringify(storedFiles));

        // 处理图片预览
        if (fileType.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    addWatermark();
                };
            };
            reader.readAsDataURL(file);
        }

        // 处理视频或音频播放
        if (fileType.startsWith('video/')) {
            videoPlayer.src = URL.createObjectURL(file);
            videoPlayer.style.display = 'block';
        } else if (fileType.startsWith('audio/')) {
            audioPlayer.src = URL.createObjectURL(file);
            audioPlayer.style.display = 'block';
        }
    }
}

// 添加水印（基于地理位置）
function addWatermark() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            ctx.font = '16px Arial';
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.fillText(`Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`, 10, canvas.height - 10);
        });
    } else {
        ctx.font = '16px Arial';
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fillText('Geolocation not supported', 10, canvas.height - 10);
    }
}