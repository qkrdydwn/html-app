import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:math';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '심박수 모니터',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        brightness: Brightness.dark,
        textTheme: const TextTheme(
          bodyLarge: TextStyle(fontSize: 16),
          bodyMedium: TextStyle(fontSize: 14),
        ),
      ),
      home: const HeartRateMonitor(),
    );
  }
}

class HeartRateMonitor extends StatefulWidget {
  const HeartRateMonitor({super.key});

  @override
  State<HeartRateMonitor> createState() => _HeartRateMonitorState();
}

class _HeartRateMonitorState extends State<HeartRateMonitor> {
  int _heartRate = 70;
  String _status = '정상';
  Color _statusColor = Colors.green;
  Timer? _timer;
  bool _isMonitoring = false;
  final Random _random = Random();
  List<Map<String, dynamic>> _history = [];

  void _updateStatus() {
    if (_heartRate < 60) {
      _status = '낮음';
      _statusColor = Colors.blue;
    } else if (_heartRate < 100) {
      _status = '정상';
      _statusColor = Colors.green;
    } else if (_heartRate < 120) {
      _status = '높음';
      _statusColor = Colors.orange;
    } else {
      _status = '위험';
      _statusColor = Colors.red;
    }
  }

  void _startMonitoring() {
    setState(() {
      _isMonitoring = true;
    });

    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      setState(() {
        // 60-100 사이의 심박수 생성
        _heartRate = 60 + _random.nextInt(41);
        _updateStatus();
        
        // 기록 저장
        _history.add({
          'timestamp': DateTime.now().toIso8601String(),
          'heartRate': _heartRate,
          'status': _status,
        });
      });
    });
  }

  void _stopMonitoring() {
    setState(() {
      _isMonitoring = false;
    });
    _timer?.cancel();
  }

  void _showHistory() {
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              '심박수 기록',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: ListView.builder(
                itemCount: _history.length,
                itemBuilder: (context, index) {
                  final record = _history[_history.length - 1 - index];
                  return ListTile(
                    title: Text('${record['heartRate']} BPM'),
                    subtitle: Text(
                      DateTime.parse(record['timestamp']).toLocal().toString(),
                    ),
                    trailing: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 4,
                      ),
                      decoration: BoxDecoration(
                        color: _getStatusColor(record['status']),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        record['status'],
                        style: const TextStyle(color: Colors.white),
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case '낮음':
        return Colors.blue;
      case '정상':
        return Colors.green;
      case '높음':
        return Colors.orange;
      case '위험':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.black26,
                borderRadius: BorderRadius.circular(15),
              ),
              child: Column(
                children: [
                  Text(
                    '$_heartRate',
                    style: const TextStyle(
                      fontSize: 72,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const Text(
                    'BPM',
                    style: TextStyle(fontSize: 24),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    _status,
                    style: TextStyle(
                      fontSize: 24,
                      color: _statusColor,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    _isMonitoring ? '모니터링 중' : '모니터링 중지됨',
                    style: TextStyle(
                      fontSize: 16,
                      color: _isMonitoring ? Colors.green : Colors.red,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 40),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  onPressed: _isMonitoring ? _stopMonitoring : _startMonitoring,
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 40,
                      vertical: 15,
                    ),
                    textStyle: const TextStyle(fontSize: 20),
                  ),
                  child: Text(_isMonitoring ? '모니터링 중지' : '모니터링 시작'),
                ),
                ElevatedButton(
                  onPressed: _showHistory,
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 40,
                      vertical: 15,
                    ),
                    textStyle: const TextStyle(fontSize: 20),
                  ),
                  child: const Text('기록 보기'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
