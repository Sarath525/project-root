document.getElementById('search-type').addEventListener('change', function() {
    const searchInput = document.getElementById('search-input');
    const fileInput = document.getElementById('file-input');
    if (this.value === 'file') {
        searchInput.style.display = 'none';
        fileInput.style.display = 'block';
    } else {
        searchInput.style.display = 'block';
        fileInput.style.display = 'none';
    }
});

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchType = document.getElementById('search-type').value;
    const searchInput = document.getElementById('search-input').value;
    const fileInput = document.getElementById('file-input').files[0];

    let formData = new FormData();
    formData.append('searchType', searchType);
    if (searchType === 'file' && fileInput) {
        formData.append('file', fileInput);
    } else {
        formData.append('input', searchInput);
    }

    fetch('/api/search', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('result', JSON.stringify(data));
            window.location.href = 'result.html';
        })
        .catch(error => console.error('Error:', error));
});