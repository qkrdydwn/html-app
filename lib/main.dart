import 'package:flutter/material.dart';

// 작업 유형 데이터 모델
class WorkType {
  final String id;
  final String title;
  final IconData icon;
  final Color color;
  final String description;
  final String requirements;
  final String precautions;
  final String equipment;
  final String process;

  const WorkType({
    required this.id,
    required this.title,
    required this.icon,
    required this.color,
    required this.description,
    required this.requirements,
    required this.precautions,
    required this.equipment,
    required this.process,
  });
}

// 작업 유형 데이터
final List<WorkType> workTypes = [
  WorkType(
    id: 'picking',
    title: '피킹',
    icon: Icons.shopping_cart,
    color: Colors.blue,
    description: '상품을 찾아 수집하는 작업',
    requirements: '정확한 상품 식별 능력, 빠른 이동 능력',
    precautions: '상품 파손에 주의, 정확한 수량 확인 필수',
    equipment: '스캐너, 카트',
    process: '1. 피킹 리스트 확인\n2. 최적 경로 설정\n3. 상품 위치 파악\n4. 상품 스캔 및 수집\n5. 수량 확인\n6. 카트에 적재',
  ),
  WorkType(
    id: 'packing',
    title: '패킹',
    icon: Icons.inventory_2,
    color: Colors.green,
    description: '수집된 상품을 포장하는 작업',
    requirements: '신속한 포장 능력, 정확한 상품 확인',
    precautions: '포장 규격 준수, 파손 주의',
    equipment: '테이프건, 박스, 완충재',
    process: '1. 포장 지시서 확인\n2. 상품 상태 검수\n3. 적합한 박스 선택\n4. 완충재 사용\n5. 포장 및 테이핑\n6. 송장 부착',
  ),
  WorkType(
    id: 'sorting',
    title: '소팅',
    icon: Icons.sort,
    color: Colors.orange,
    description: '상품을 분류하고 정리하는 작업',
    requirements: '빠른 분류 능력, 정확한 위치 파악',
    precautions: '잘못된 분류 주의, 효율적인 동선',
    equipment: '분류 카트, 스캐너',
    process: '1. 분류 기준 확인\n2. 상품 스캔\n3. 해당 구역으로 분류\n4. 수량 확인\n5. 분류 완료 처리',
  ),
  WorkType(
    id: 'loading',
    title: '상하차',
    icon: Icons.local_shipping,
    color: Colors.red,
    description: '차량에 상품을 싣고 내리는 작업',
    requirements: '안전한 상품 운반, 차량 적재 능력',
    precautions: '안전사고 예방, 적재 순서 준수',
    equipment: '지게차, 운반구',
    process: '1. 작업 지시서 확인\n2. 안전 장비 착용\n3. 상품 상태 확인\n4. 적재 순서 확인\n5. 상하차 작업\n6. 수량 확인',
  ),
  WorkType(
    id: 'walking',
    title: '이동/운반(도보)',
    icon: Icons.directions_walk,
    color: Colors.purple,
    description: '도보로 상품을 운반하는 작업',
    requirements: '체력, 안전한 운반 능력',
    precautions: '무리한 운반 금지, 안전한 이동경로',
    equipment: '카트, 운반구',
    process: '1. 운반 경로 확인\n2. 안전한 적재\n3. 이동 중 주의사항 확인\n4. 안전한 운반\n5. 도착지 확인',
  ),
  WorkType(
    id: 'equipment',
    title: '이동/운반(장비)',
    icon: Icons.forklift,
    color: Colors.teal,
    description: '지게차 등 장비를 사용한 운반 작업',
    requirements: '장비 운전 자격, 안전 운전',
    precautions: '장비 점검, 안전거리 확보',
    equipment: '지게차, 전동 운반구',
    process: '1. 장비 시동 전 점검\n2. 안전 장비 착용\n3. 적재 상태 확인\n4. 안전 운전\n5. 하역 및 정리',
  ),
  WorkType(
    id: 'other',
    title: '기타',
    icon: Icons.more_horiz,
    color: Colors.grey,
    description: '기타 창고 관리 및 정리 작업',
    requirements: '다양한 업무 적응력, 협동심',
    precautions: '작업별 주의사항 확인',
    equipment: '상황별 필요 장비',
    process: '1. 작업 지시 확인\n2. 필요 장비 준비\n3. 안전 수칙 확인\n4. 작업 수행\n5. 결과 보고',
  ),
];

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '쿠팡 작업 관리',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('작업 유형 선택 실시간'),
        backgroundColor: Colors.blue,
      ),
      body: ListView.builder(
        itemCount: workTypes.length,
        itemBuilder: (context, index) {
          final workType = workTypes[index];
          return WorkTypeItem(
            title: workType.title,
            description: workType.description,
            icon: workType.icon,
            color: workType.color,
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => WorkTypeDetailScreen(workType: workType),
                ),
              );
            },
          );
        },
      ),
    );
  }
}

class WorkTypeItem extends StatelessWidget {
  final String title;
  final String description;
  final IconData icon;
  final Color color;
  final VoidCallback onTap;

  const WorkTypeItem({
    super.key,
    required this.title,
    required this.description,
    required this.icon,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.all(8.0),
      child: ListTile(
        leading: Icon(icon, size: 32, color: color),
        title: Text(
          title,
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        subtitle: Text(description),
        onTap: onTap,
      ),
    );
  }
}

class WorkTypeDetailScreen extends StatelessWidget {
  final WorkType workType;

  const WorkTypeDetailScreen({
    super.key,
    required this.workType,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(workType.title),
        backgroundColor: workType.color,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(workType.icon, size: 48, color: workType.color),
                const SizedBox(width: 16),
                Expanded(
                  child: Text(
                    workType.title,
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            _buildSection('작업 설명', workType.description),
            _buildSection('필요 역량', workType.requirements),
            _buildSection('주의사항', workType.precautions),
            _buildSection('필요 장비', workType.equipment),
            _buildSection('작업 과정', workType.process),
          ],
        ),
      ),
    );
  }

  Widget _buildSection(String title, String content) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: workType.color,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            content,
            style: const TextStyle(fontSize: 16),
          ),
        ],
      ),
    );
  }
} 