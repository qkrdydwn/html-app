class WatchConnector {
    constructor() {
        this.device = null;
        this.characteristic = null;
        this.chart = null;
        this.heartRateData = [];
        this.maxDataPoints = 20;
        
        this.initChart();
        this.setupEventListeners();
    }

    async connectWatch() {
        try {
            // 워치 디바이스 요청
            this.device = await navigator.bluetooth.requestDevice({
                filters: [
                    { namePrefix: 'Galaxy Watch' },
                    { services: ['heart_rate'] }
                ]
            });

            // 서버 연결
            const server = await this.device.gatt.connect();
            const service = await server.getPrimaryService('heart_rate');
            this.characteristic = await service.getCharacteristic('heart_rate_measurement');

            // 데이터 수신 시작
            await this.characteristic.startNotifications();
            this.characteristic.addEventListener('characteristicvaluechanged', this.handleHeartRateData.bind(this));

            // UI 업데이트
            document.getElementById('connectButton').style.display = 'none';
            document.getElementById('disconnectButton').style.display = 'inline-block';
            document.getElementById('status').textContent = '연결됨';
            document.getElementById('status').className = 'heart-rate-status status normal';

            return true;
        } catch (error) {
            console.error('워치 연결 실패:', error);
            alert('워치 연결에 실패했습니다.');
            return false;
        }
    }

    async disconnectWatch() {
        if (this.characteristic) {
            await this.characteristic.stopNotifications();
            this.characteristic.removeEventListener('characteristicvaluechanged', this.handleHeartRateData.bind(this));
        }
        if (this.device && this.device.gatt.connected) {
            await this.device.gatt.disconnect();
        }

        // UI 업데이트
        document.getElementById('connectButton').style.display = 'inline-block';
        document.getElementById('disconnectButton').style.display = 'none';
        document.getElementById('status').textContent = '연결 해제됨';
        document.getElementById('status').className = 'heart-rate-status';
    }

    handleHeartRateData(event) {
        const value = event.target.value;
        const heartRate = value.getUint8(1);
        
        this.updateHeartRateDisplay(heartRate);
        this.updateChart(heartRate);
        this.saveHeartRateData(heartRate);
    }

    updateHeartRateDisplay(rate) {
        const heartRateElement = document.getElementById('heartRate');
        const statusElement = document.getElementById('status');
        
        heartRateElement.textContent = `${rate} BPM`;
        
        let status = '';
        let statusClass = '';
        
        if (rate < 60) {
            status = '낮음';
            statusClass = 'low';
        } else if (rate < 100) {
            status = '정상';
            statusClass = 'normal';
        } else if (rate < 120) {
            status = '높음';
            statusClass = 'high';
        } else {
            status = '위험';
            statusClass = 'danger';
        }
        
        statusElement.textContent = status;
        statusElement.className = `heart-rate-status status ${statusClass}`;
    }

    initChart() {
        const ctx = document.getElementById('heartRateChart').getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: '심박수',
                    data: [],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'BPM'
                        }
                    }
                }
            }
        });
    }

    updateChart(heartRate) {
        const now = new Date().toLocaleTimeString();
        
        this.heartRateData.push({ time: now, rate: heartRate });
        
        if (this.heartRateData.length > this.maxDataPoints) {
            this.heartRateData.shift();
        }

        this.chart.data.labels = this.heartRateData.map(d => d.time);
        this.chart.data.datasets[0].data = this.heartRateData.map(d => d.rate);
        this.chart.update();
    }

    saveHeartRateData(rate) {
        const data = {
            timestamp: new Date().toISOString(),
            heartRate: rate
        };
        
        let history = JSON.parse(localStorage.getItem('heartRateHistory') || '[]');
        history.push(data);
        localStorage.setItem('heartRateHistory', JSON.stringify(history));
        
        this.updateHistoryList();
    }

    updateHistoryList() {
        const history = JSON.parse(localStorage.getItem('heartRateHistory') || '[]');
        const historyList = document.getElementById('historyList');
        
        historyList.innerHTML = history.slice(-10).reverse().map(item => `
            <div class="history-item">
                <span class="history-time">${new Date(item.timestamp).toLocaleString()}</span>
                <span class="history-value">${item.heartRate} BPM</span>
            </div>
        `).join('');
    }

    setupEventListeners() {
        document.getElementById('connectButton').addEventListener('click', () => this.connectWatch());
        document.getElementById('disconnectButton').addEventListener('click', () => this.disconnectWatch());
        
        // 초기 기록 표시
        this.updateHistoryList();
    }
}

// 앱 초기화
window.addEventListener('load', () => {
    new WatchConnector();
}); 