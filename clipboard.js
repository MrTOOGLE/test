// Clipboard functionality
// Функция для копирования текста в буфер обмена

function clipboard(text, message) {
    navigator.clipboard.writeText(text).then(function() {
        // Создаем временное уведомление
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show position-fixed" 
                 style="top: 100px; right: 20px; z-index: 9999; min-width: 250px;">
                <i class="bi bi-check-circle me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        document.body.appendChild(notification);

        // Автоматически удаляем уведомление через секунду
        setTimeout(() => {
            const alert = notification.querySelector('.alert');
            if (alert) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 1000);
    }).catch(function(err) {
        console.error('Ошибка копирования: ', err);
        alert('Не удалось скопировать. Попробуйте выделить текст вручную.');
    });
}