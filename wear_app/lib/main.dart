import 'package:flutter/material.dart';
import 'package:wear/wear.dart';
import 'package:sensors_plus/sensors_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Wear OS Health Monitor',
      theme: ThemeData(
        brightness: Brightness.dark,
        textTheme: const TextTheme(
          bodyLarge: TextStyle(fontSize: 16),
          bodyMedium: TextStyle(fontSize: 14),
        ),
      ),
      home: const HealthMonitorScreen(),
    );
  }
}

class HealthMonitorScreen extends StatefulWidget {
  const HealthMonitorScreen({super.key});

  @override
  State<HealthMonitorScreen> createState() => _HealthMonitorScreenState();
}

class _HealthMonitorScreenState extends State<HealthMonitorScreen> {
  int _heartRate = 0;
  int _steps = 0;
  bool _isMonitoring = false;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _heartRate = prefs.getInt('heartRate') ?? 0;
      _steps = prefs.getInt('steps') ?? 0;
    });
  }

  Future<void> _saveData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('heartRate', _heartRate);
    await prefs.setInt('steps', _steps);
  }

  void _startMonitoring() {
    setState(() {
      _isMonitoring = true;
    });
    
    // 심박수 모니터링 (실제 구현에서는 Wear OS의 심박수 센서 API 사용)
    Stream.periodic(const Duration(seconds: 1)).listen((_) {
      setState(() {
        _heartRate = 60 + DateTime.now().second % 20; // 임시 데이터
      });
      _saveData();
    });

    // 걸음 수 모니터링 (실제 구현에서는 Wear OS의 걸음 수 센서 API 사용)
    accelerometerEvents.listen((event) {
      if (_isMonitoring) {
        setState(() {
          _steps++;
        });
        _saveData();
      }
    });
  }

  void _stopMonitoring() {
    setState(() {
      _isMonitoring = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              '심박수: $_heartRate BPM',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: 20),
            Text(
              '걸음 수: $_steps',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: 40),
            ElevatedButton(
              onPressed: _isMonitoring ? _stopMonitoring : _startMonitoring,
              child: Text(_isMonitoring ? '모니터링 중지' : '모니터링 시작'),
            ),
          ],
        ),
      ),
    );
  }
}
