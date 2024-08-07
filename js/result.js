document.addEventListener('DOMContentLoaded', function() {
    const resultDiv = document.getElementById('result');
    const resultData = JSON.parse(localStorage.getItem('result'));

    if (resultData) {
        // Display the basic scan details in a table
        const scanResultHtml = `
            <h2>Scan Results</h2>
            <table class="table">
                <tr>
                    <th>Scan ID</th>
                    <td>${resultData.id}</td>
                </tr>
                <tr>
                    <th>Scan Date</th>
                    <td>${new Date(resultData.data.attributes.date * 1000).toLocaleString()}</td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>${resultData.data.attributes.status}</td>
                </tr>
            </table>
        `;
        resultDiv.innerHTML = scanResultHtml;

        // Extract the necessary data for charts
        const stats = resultData.data.attributes.stats;
        const labels = Object.keys(stats);
        const data = Object.values(stats);
        const colors = ['#2ecc71', '#e74c3c', '#f1c40f', '#3498db', '#95a5a6'];

        // Create the pie chart for overall scan results
        const scanResultsChartContainer = document.createElement('div');
        scanResultsChartContainer.style.width = '50%';
        scanResultsChartContainer.style.margin = '20px auto';
        scanResultsChartContainer.innerHTML = '<canvas id="scanResultsChart"></canvas>';
        resultDiv.appendChild(scanResultsChartContainer);
        const ctx1 = document.getElementById('scanResultsChart').getContext('2d');
        new Chart(ctx1, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#ffffff' // Set legend text color to white
                        }
                    },
                    title: {
                        display: true,
                        text: 'Overall Scan Results',
                        color: '#ffffff' // Set title text color to white
                    }
                }
            }
        });

        // Extract data for engine results and create a table
        let engineTableHtml = `
            <h2>Results by Scanning Engines</h2>
            <table class="table">
                <tr>
                    <th>Engine</th>
                    <th>Category</th>
                </tr>
        `;
        const engineLabels = [];
        const engineData = [];
        const engineColors = [];
        for (const [engine, details] of Object.entries(resultData.data.attributes.results)) {
            engineLabels.push(engine);
            engineData.push(details.category === 'harmless' ? 1 : 0); // Simplified for demo
            engineColors.push(details.category === 'harmless' ? '#2ecc71' : '#e74c3c');
            engineTableHtml += `
                <tr>
                    <td>${engine}</td>
                    <td>${details.category}</td>
                </tr>
            `;
        }
        engineTableHtml += '</table>';
        resultDiv.innerHTML += engineTableHtml;

        // Create the bar chart for individual engine results
        const engineResultsChartContainer = document.createElement('div');
        engineResultsChartContainer.style.width = '60%';
        engineResultsChartContainer.style.margin = '20px auto';
        engineResultsChartContainer.innerHTML = '<canvas id="engineResultsChart"></canvas>';
        resultDiv.appendChild(engineResultsChartContainer);
        const ctx2 = document.getElementById('engineResultsChart').getContext('2d');
        new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: engineLabels,
                datasets: [{
                    label: 'Engine Results',
                    data: engineData,
                    backgroundColor: engineColors,
                    borderColor: engineColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Results by Scanning Engines',
                        color: '#ffffff' // Set title text color to white
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Engines',
                            color: '#ffffff' // Set x-axis title color to white
                        },
                        ticks: {
                            color: '#ffffff' // Set x-axis ticks color to white
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Count',
                            color: '#ffffff' // Set y-axis title color to white
                        },
                        ticks: {
                            precision: 0,
                            stepSize: 1,
                            color: '#ffffff' // Set y-axis ticks color to white
                        }
                    }
                }
            }
        });

    } else {
        resultDiv.textContent = 'No result available.';
    }
});