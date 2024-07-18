document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('resultChart').getContext('2d');
    const resultData = JSON.parse(localStorage.getItem('result'));

    if (resultData) {
        const labels = resultData.map(item => item.label);
        const values = resultData.map(item => item.value);

        const chart = new Chart(ctx, {
            type: 'bar', // you can also choose 'line', 'pie', 'doughnut', etc.
            data: {
                labels: labels,
                datasets: [{
                    label: 'Result Data',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        ctx.fillText('No result available.', 10, 50);
    }
});