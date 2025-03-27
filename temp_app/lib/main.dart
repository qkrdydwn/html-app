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
  final TextEditingController _heartRateController = TextEditingController();

  void _updateHeartRate() {
    setState(() {
      // 심박수를 60-80 사이에서 자연스럽게 변동
      _heartRate = 70 + _random.nextInt(21) - 10;
      _updateStatus();
    });
  }

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
      _updateHeartRate();
    });
  }

  void _stopMonitoring() {
    setState(() {
      _isMonitoring = false;
    });
    _timer?.cancel();
  }

  void _updateHeartRateManually() {
    final newHeartRate = int.tryParse(_heartRateController.text);
    if (newHeartRate != null) {
      setState(() {
        _heartRate = newHeartRate;
        _updateStatus();
      });
      _heartRateController.clear();
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    _heartRateController.dispose();
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
                ],
              ),
            ),
            const SizedBox(height: 40),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                  width: 100,
                  child: TextField(
                    controller: _heartRateController,
                    keyboardType: TextInputType.number,
                    decoration: const InputDecoration(
                      labelText: '심박수 입력',
                      border: OutlineInputBorder(),
                    ),
                    onSubmitted: (_) => _updateHeartRateManually(),
                  ),
                ),
                const SizedBox(width: 10),
                ElevatedButton(
                  onPressed: _updateHeartRateManually,
                  child: const Text('입력'),
                ),
              ],
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _isMonitoring ? _stopMonitoring : _startMonitoring,
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15),
                textStyle: const TextStyle(fontSize: 20),
              ),
              child: Text(_isMonitoring ? '모니터링 중지' : '모니터링 시작'),
            ),
          ],
        ),
      ),
    );
  }
} 