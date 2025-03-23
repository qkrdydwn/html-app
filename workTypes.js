const workTypes = [
    {
        id: 'picking',
        title: '피킹',
        icon: '🛒',
        color: '#4CAF50',
        description: '상품을 선반에서 찾아 수집하는 작업',
        requirements: [
            '정확한 상품 식별능력',
            '신속한 이동능력',
            '체력',
            '집중력',
            '공간 파악 능력'
        ],
        precautions: [
            '무거운 물건은 허리를 굽히지 말고 무릎을 굽혀 들어올리기',
            '상품 위치 확인 후 이동하기',
            '계단 이용 시 난간 잡기',
            '무리한 동작 피하기',
            '피로도를 체크하며 적절한 휴식 취하기'
        ],
        equipment: [
            '스캐너',
            '카트',
            '안전화'
        ],
        initialFatigue: {
            physical: 75,
            mental: 60,
            stress: 65,
            bodyParts: {
                neck: 65,
                back: 80,
                shoulder: 70,
                leg: 85,
                wrist: 60
            }
        }
    },
    {
        id: 'packing',
        title: '패킹',
        icon: '📦',
        color: '#2196F3',
        description: '상품을 포장하고 배송 준비하는 작업',
        requirements: [
            '신속한 포장능력',
            '정확한 라벨링',
            '꼼꼼함',
            '손재주',
            '체력'
        ],
        precautions: [
            '포장 규격 준수하기',
            '라벨 정확히 부착하기',
            '날카로운 도구 사용 시 주의',
            '반복 동작 시 손목 스트레칭하기',
            '포장재 정리정돈 철저히 하기'
        ],
        equipment: [
            '테이프건',
            '박스',
            '라벨프린터'
        ],
        initialFatigue: {
            physical: 65,
            mental: 70,
            stress: 60,
            bodyParts: {
                neck: 70,
                back: 60,
                shoulder: 75,
                leg: 50,
                wrist: 85
            }
        }
    },
    {
        id: 'sorting',
        title: '소팅',
        icon: '🔄',
        color: '#FF9800',
        description: '상품을 종류별, 배송지별로 분류하는 작업',
        requirements: [
            '신속한 판단력',
            '정확한 분류능력',
            '집중력',
            '체력',
            '공간 활용 능력'
        ],
        precautions: [
            '상품 분류 기준 정확히 확인하기',
            '무거운 물건 들어올릴 때 허리 조심하기',
            '이동 경로 확보하기',
            '분류된 상품 정확히 라벨링하기',
            '작업장 정리정돈 유지하기'
        ],
        equipment: [
            '분류 테이블',
            '스캐너',
            '라벨'
        ],
        initialFatigue: {
            physical: 70,
            mental: 75,
            stress: 70,
            bodyParts: {
                neck: 75,
                back: 75,
                shoulder: 65,
                leg: 70,
                wrist: 60
            }
        }
    },
    {
        id: 'loading',
        title: '상하차',
        icon: '🚛',
        color: '#9C27B0',
        description: '상품을 차량에 싣고 내리는 작업',
        requirements: [
            '체력',
            '안전의식',
            '팀워크',
            '신속성',
            '공간 활용 능력'
        ],
        precautions: [
            '중량물 취급 시 팀원과 협력하기',
            '차량 이동 시 주변 확인하기',
            '적재 한도 준수하기',
            '미끄럼 방지를 위한 안전화 착용하기',
            '날씨 조건 확인하고 대비하기'
        ],
        equipment: [
            '지게차',
            '운반카트',
            '안전모'
        ],
        initialFatigue: {
            physical: 85,
            mental: 55,
            stress: 75,
            bodyParts: {
                neck: 80,
                back: 90,
                shoulder: 85,
                leg: 80,
                wrist: 70
            }
        }
    },
    {
        id: 'walking',
        title: '워킹',
        icon: '👣',
        color: '#795548',
        description: '물류센터 내 보행 이동 작업',
        requirements: [
            '체력',
            '방향감각',
            '안전의식',
            '신속성',
            '집중력'
        ],
        precautions: [
            '지정된 보행로 이용하기',
            '주변 차량 및 장비 주의하기',
            '적절한 보행 속도 유지하기',
            '미끄러운 바닥 주의하기',
            '장시간 보행 시 휴식 취하기'
        ],
        equipment: [
            '안전화',
            '무전기',
            '작업복'
        ],
        initialFatigue: {
            physical: 70,
            mental: 45,
            stress: 50,
            bodyParts: {
                neck: 45,
                back: 65,
                shoulder: 40,
                leg: 90,
                wrist: 30
            }
        }
    },
    {
        id: 'equipment',
        title: '장비운용',
        icon: '🚜',
        color: '#607D8B',
        description: '지게차, 운반기기 등 장비 조작 작업',
        requirements: [
            '장비 조작 능력',
            '안전 의식',
            '주의력',
            '판단력',
            '팀워크'
        ],
        precautions: [
            '장비 시동 전 안전점검 실시하기',
            '규정 속도 준수하기',
            '화물 적재 한도 확인하기',
            '주변 작업자 안전 확인하기',
            '장비 이상 시 즉시 보고하기'
        ],
        equipment: [
            '지게차',
            '안전모',
            '무전기'
        ],
        initialFatigue: {
            physical: 60,
            mental: 80,
            stress: 75,
            bodyParts: {
                neck: 85,
                back: 70,
                shoulder: 65,
                leg: 55,
                wrist: 75
            }
        }
    },
    {
        id: 'other',
        title: '기타작업',
        icon: '🔧',
        color: '#455A64',
        description: '기타 물류센터 내 보조 작업',
        requirements: [
            '기본 체력',
            '협동심',
            '의사소통 능력',
            '적응력',
            '문제해결 능력'
        ],
        precautions: [
            '작업 지시사항 정확히 확인하기',
            '안전수칙 준수하기',
            '동료와 원활한 소통하기',
            '작업환경 정리정돈하기',
            '이상상황 발생 시 즉시 보고하기'
        ],
        equipment: [
            '기본 공구',
            '안전화',
            '작업복'
        ],
        initialFatigue: {
            physical: 55,
            mental: 50,
            stress: 45,
            bodyParts: {
                neck: 50,
                back: 60,
                shoulder: 55,
                leg: 65,
                wrist: 50
            }
        }
    }
]; 