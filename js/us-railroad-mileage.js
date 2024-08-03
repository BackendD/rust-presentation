const ctx = document.getElementById('usRailroadMileage');
Chart.defaults.font.size = 32;
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['1830', '1840', '1850', '1860', '1870', '1880', '1890', '1900', '1910', '1920'],
        datasets: [{
            label: 'طول خطوط ریلی ایالات متحده',
            data: [0, 1000, 10000, 30000, 55000, 90000, 165000, 190000, 240000, 255000],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, ticks) {
                        return value + ' mi';
                    }
                }
            }
        }
    }
});