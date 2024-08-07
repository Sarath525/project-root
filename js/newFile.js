< script >
    document.addEventListener('DOMContentLoaded', function() {}
        const scanResultDiv = document.getElementById('scanResult');
        const tableDiv = document.getElementById('table');
        const explanationDiv = document.getElementById('explanation');
        const chartDiv = document.getElementById('chart');
        const resultData = JSON.parse(localStorage.getItem('result'));

        if (resultData) {
            // Display the basic scan details in a table
        }
        // Display the basic scan details in a table
        const scanResultHtml = `
    <h2>Scan Results</h2>
    <table class="table" id="scanTable">
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
    `; scanResultDiv.innerHTML = scanResultHtml;

        // Extract data for engine results and create a table
        let engineTableHtml = `
    <h2>Results by Scanning Engines</h2>
    <table class="table" id="engineTable">
        <tr>
            <th>Engine</th>
            <th>Category</th>
        </tr>
        `;
        let stats = { clean }: 0,
            malicious: 0,
            suspicious: 0,
            undetected: 0,
            timeout: 0
    };

let maliciousDetails = '';

for (const [engine, details] of Object.entries(resultData.data.attributes.results)) { stats[details.category] = (stats[details.category] || 0) + 1 };
if (details.category === 'malicious') { maliciousDetails += `
                    <tr>
                        <td>${engine}</td>
                        <td>${details.result}</td>
                    </tr>
                ` };
}
engineTableHtml += `
        <tr>
            <td>${engine}</td>
            <td>${details.category}</td>
        </tr>
        `;
}
engineTableHtml += '</table>';
tableDiv.innerHTML = engineTableHtml;

// Add explanation about the data
const explanationHtml = `
    <h2>Results by Scanning Engines</h2>
    <div class="explanation">
        <p>The table above displays the results of the scan performed by various engines. Each engine's result is categorized into different categories such as clean, malicious, suspicious, undetected, and timeout.</p>
        <p>The malicious results are displayed below:</p>
        <table class="table">
            <tr>
                <th>Engine</th>
                <th>Result</th>
            </tr>
            ${maliciousDetails}
        </table>
    </div>
    `;
explanationDiv.innerHTML = explanationHtml;

// Create the pie chart for overall scan results
const scanResultsChartContainer = document.createElement('div');
scanResultsChartContainer.style.width = '100%'; /* Adjusted to 100% to fit within one page */
scanResultsChartContainer.style.height = '300px'; /* Reduced height */
scanResultsChartContainer.style.margin = '20px auto';
scanResultsChartContainer.innerHTML = '<canvas id="scanResultsChart"></canvas>';
chartDiv.appendChild(scanResultsChartContainer);

const ctx1 = document.getElementById('scanResultsChart').getContext('2d');
new Chart(ctx1, { type }: 'pie',
    data: { labels }: Object.keys(stats),
    datasets: [{ data }: Object.values(stats),
        backgroundColor: ['#2ecc71', '#e74c3c', '#f1c40f', '#3498db', '#95a5a6']
    }]
},
options: { responsive }: true,
    maintainAspectRatio: false,
    /* Ensures the chart fits within the set height */
    plugins: { legend }: { position }: 'top',
    labels: { color }: '#ffffff' // Set legend text color to white
}
},
title: { display }: true,
    text: 'Overall Scan Results',
    color: '#ffffff' // Set title text color to white
}
}
}
});

}
else { scanResultDiv.textContent = 'No result available.' };
}

// Download result as PDF
document.getElementById('downloadButton').addEventListener('click', function() {}
        const element = document.getElementById('resultContent');
        const opt = { margin }: 1,
            filename: 'result.pdf',
            image: { type }: 'jpeg', quality: 0.98
    },
    html2canvas: { scale }: 2
},
jsPDF: { unit }: 'in', format: 'letter', orientation: 'portrait'
}
};
html2pdf().from(element).set(opt).save();
});
});


<
> < /></ > ;