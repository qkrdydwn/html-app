function renderWorkTypes() {
    const mainScreen = document.getElementById('mainScreen');
    mainScreen.innerHTML = '';
    
    workTypes.forEach(workType => {
        const card = document.createElement('div');
        card.className = 'work-type-card';
        card.style.borderLeft = `4px solid ${workType.color}`;
        card.onclick = () => showWorkDetail(workType.id);
        
        card.innerHTML = `
            <h2>${workType.icon} ${workType.title}</h2>
            <p>${workType.description}</p>
        `;
        
        mainScreen.appendChild(card);
    });

    const myInfoCard = document.createElement('div');
    myInfoCard.className = 'my-info-card';
    myInfoCard.onclick = showHistory;
    myInfoCard.innerHTML = `
        <h2>📊 내 정보</h2>
        <p>나의 작업 기록 확인하기</p>
    `;
    mainScreen.appendChild(myInfoCard);
}

function showWorkDetail(workId) {
    const workType = workTypes.find(w => w.id === workId);
    if (!workType) return;

    document.getElementById('detailScreen').style.display = 'block';
    document.getElementById('detailTitle').textContent = `${workType.icon} ${workType.title}`;
    
    const content = document.getElementById('detailContent');
    content.innerHTML = `
        <h3>작업 설명</h3>
        <p>${workType.description}</p>
        
        <h3>필요 역량</h3>
        <ul>${workType.requirements.map(req => `<li>${req}</li>`).join('')}</ul>
        
        <h3>작업시 유의사항</h3>
        <ul>${workType.precautions.map(prec => `<li>${prec}</li>`).join('')}</ul>
        
        <h3>필요 장비</h3>
        <ul>${workType.equipment.map(equip => `<li>${equip}</li>`).join('')}</ul>
        
        <div class="fatigue-controls">
            <h3>피로도 분석</h3>
            <h4>전반적인 피로도</h4>
            <div>
                <label>신체적 피로도: <span id="physicalValue">${workType.initialFatigue.physical}</span>%</label>
                <input type="range" class="fatigue-slider" id="physical" value="${workType.initialFatigue.physical}" min="0" max="100">
            </div>
            <div>
                <label>정신적 피로도: <span id="mentalValue">${workType.initialFatigue.mental}</span>%</label>
                <input type="range" class="fatigue-slider" id="mental" value="${workType.initialFatigue.mental}" min="0" max="100">
            </div>
            <div>
                <label>스트레스 수준: <span id="stressValue">${workType.initialFatigue.stress}</span>%</label>
                <input type="range" class="fatigue-slider" id="stress" value="${workType.initialFatigue.stress}" min="0" max="100">
            </div>
            
            <h4>신체 부위별 피로도</h4>
            <div>
                <label>목: <span id="neckValue">${workType.initialFatigue.bodyParts.neck}</span>%</label>
                <input type="range" class="fatigue-slider" id="neck" value="${workType.initialFatigue.bodyParts.neck}" min="0" max="100">
            </div>
            <div>
                <label>허리: <span id="backValue">${workType.initialFatigue.bodyParts.back}</span>%</label>
                <input type="range" class="fatigue-slider" id="back" value="${workType.initialFatigue.bodyParts.back}" min="0" max="100">
            </div>
            <div>
                <label>어깨: <span id="shoulderValue">${workType.initialFatigue.bodyParts.shoulder}</span>%</label>
                <input type="range" class="fatigue-slider" id="shoulder" value="${workType.initialFatigue.bodyParts.shoulder}" min="0" max="100">
            </div>
            <div>
                <label>다리: <span id="legValue">${workType.initialFatigue.bodyParts.leg}</span>%</label>
                <input type="range" class="fatigue-slider" id="leg" value="${workType.initialFatigue.bodyParts.leg}" min="0" max="100">
            </div>
            <div>
                <label>손목: <span id="wristValue">${workType.initialFatigue.bodyParts.wrist}</span>%</label>
                <input type="range" class="fatigue-slider" id="wrist" value="${workType.initialFatigue.bodyParts.wrist}" min="0" max="100">
            </div>
            
            <button class="save-button" onclick="saveFatigueData('${workType.id}')">저장</button>
        </div>
    `;
    
    setupFatigueSliders();
}

function setupFatigueSliders() {
    const sliders = document.querySelectorAll('.fatigue-slider');
    sliders.forEach(slider => {
        const valueSpan = document.getElementById(`${slider.id}Value`);
        slider.oninput = () => valueSpan.textContent = slider.value;
    });
}

function saveFatigueData(workId) {
    const fatigueData = {
        timestamp: new Date().toISOString(),
        workType: workId,
        physical: parseInt(document.getElementById('physical').value),
        mental: parseInt(document.getElementById('mental').value),
        stress: parseInt(document.getElementById('stress').value),
        bodyParts: {
            neck: parseInt(document.getElementById('neck').value),
            back: parseInt(document.getElementById('back').value),
            shoulder: parseInt(document.getElementById('shoulder').value),
            leg: parseInt(document.getElementById('leg').value),
            wrist: parseInt(document.getElementById('wrist').value)
        }
    };
    
    let history = JSON.parse(localStorage.getItem('fatigueHistory') || '[]');
    history.push(fatigueData);
    localStorage.setItem('fatigueHistory', JSON.stringify(history));
    
    alert('피로도 데이터가 저장되었습니다.');
}

function showHistory() {
    const history = JSON.parse(localStorage.getItem('fatigueHistory') || '[]');
    document.getElementById('historyScreen').style.display = 'block';
    
    const content = document.getElementById('historyContent');
    if (history.length === 0) {
        content.innerHTML = '<p>저장된 기록이 없습니다.</p>';
        return;
    }
    
    content.innerHTML = history.reverse().map((record, index) => {
        const workType = workTypes.find(w => w.id === record.workType);
        if (!workType) return '';
        
        return `
            <div class="history-item" style="border-left-color: ${workType.color}" data-index="${index}">
                <div class="delete-options">
                    <div class="delete-option" onclick="deleteRecord(${index})">이 기록 삭제</div>
                    <div class="delete-option delete-all" onclick="deleteAllRecords()">전체 삭제</div>
                </div>
                <div class="history-title">
                    <h3>${workType.icon} ${workType.title}</h3>
                </div>
                <p class="history-date">${new Date(record.timestamp).toLocaleString()}</p>
                
                <div class="fatigue-group">
                    <h4>전반적인 피로도</h4>
                    <div class="fatigue-label">
                        <span>신체적 피로도 ${record.physical}%</span>
                    </div>
                    <div class="fatigue-bar-container">
                        <div class="fatigue-bar" style="width: ${record.physical}%; background-color: #4CAF50;"></div>
                    </div>
                    
                    <div class="fatigue-label">
                        <span>정신적 피로도 ${record.mental}%</span>
                    </div>
                    <div class="fatigue-bar-container">
                        <div class="fatigue-bar" style="width: ${record.mental}%; background-color: #2196F3;"></div>
                    </div>
                    
                    <div class="fatigue-label">
                        <span>스트레스 수준 ${record.stress}%</span>
                    </div>
                    <div class="fatigue-bar-container">
                        <div class="fatigue-bar" style="width: ${record.stress}%; background-color: #FF9800;"></div>
                    </div>
                </div>
                
                <div class="fatigue-group">
                    <h4>신체 부위별 피로도</h4>
                    <div class="fatigue-label">
                        <span>목 ${record.bodyParts.neck}%</span>
                    </div>
                    <div class="fatigue-bar-container">
                        <div class="fatigue-bar" style="width: ${record.bodyParts.neck}%; background-color: #9C27B0;"></div>
                    </div>
                    
                    <div class="fatigue-label">
                        <span>허리 ${record.bodyParts.back}%</span>
                    </div>
                    <div class="fatigue-bar-container">
                        <div class="fatigue-bar" style="width: ${record.bodyParts.back}%; background-color: #9C27B0;"></div>
                    </div>
                    
                    <div class="fatigue-label">
                        <span>어깨 ${record.bodyParts.shoulder}%</span>
                    </div>
                    <div class="fatigue-bar-container">
                        <div class="fatigue-bar" style="width: ${record.bodyParts.shoulder}%; background-color: #9C27B0;"></div>
                    </div>
                    
                    <div class="fatigue-label">
                        <span>다리 ${record.bodyParts.leg}%</span>
                    </div>
                    <div class="fatigue-bar-container">
                        <div class="fatigue-bar" style="width: ${record.bodyParts.leg}%; background-color: #9C27B0;"></div>
                    </div>
                    
                    <div class="fatigue-label">
                        <span>손목 ${record.bodyParts.wrist}%</span>
                    </div>
                    <div class="fatigue-bar-container">
                        <div class="fatigue-bar" style="width: ${record.bodyParts.wrist}%; background-color: #9C27B0;"></div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    setupLongPressEvents();
}

function setupLongPressEvents() {
    const historyItems = document.querySelectorAll('.history-item');
    let pressTimer;
    let isLongPress = false;

    historyItems.forEach(item => {
        // 터치 이벤트
        item.addEventListener('touchstart', (e) => {
            pressTimer = setTimeout(() => {
                showDeleteOptions(item);
                isLongPress = true;
            }, 500);
        });

        item.addEventListener('touchend', () => {
            clearTimeout(pressTimer);
            if (!isLongPress) {
                hideAllDeleteOptions();
            }
            isLongPress = false;
        });

        // 마우스 이벤트
        item.addEventListener('mousedown', (e) => {
            pressTimer = setTimeout(() => {
                showDeleteOptions(item);
                isLongPress = true;
            }, 500);
        });

        item.addEventListener('mouseup', () => {
            clearTimeout(pressTimer);
            if (!isLongPress) {
                hideAllDeleteOptions();
            }
            isLongPress = false;
        });

        item.addEventListener('mouseleave', () => {
            clearTimeout(pressTimer);
        });
    });

    // 다른 곳 클릭 시 삭제 옵션 숨기기
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.history-item')) {
            hideAllDeleteOptions();
        }
    });
}

function showDeleteOptions(item) {
    hideAllDeleteOptions();
    const deleteOptions = item.querySelector('.delete-options');
    if (deleteOptions) {
        deleteOptions.style.display = 'block';
    }
}

function hideAllDeleteOptions() {
    document.querySelectorAll('.delete-options').forEach(options => {
        options.style.display = 'none';
    });
}

function deleteRecord(index) {
    if (confirm('이 기록을 삭제하시겠습니까?')) {
        let history = JSON.parse(localStorage.getItem('fatigueHistory') || '[]');
        history.splice(history.length - 1 - index, 1);
        localStorage.setItem('fatigueHistory', JSON.stringify(history));
        showHistory();
    }
}

function deleteAllRecords() {
    if (confirm('모든 기록을 삭제하시겠습니까?')) {
        localStorage.removeItem('fatigueHistory');
        showHistory();
    }
}

function showMainScreen() {
    document.getElementById('detailScreen').style.display = 'none';
    document.getElementById('historyScreen').style.display = 'none';
}

window.onload = renderWorkTypes; 