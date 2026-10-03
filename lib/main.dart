import 'package:flutter/material.dart';
import 'dart:ui_web' as ui_web;
import 'package:web/web.dart' as web;

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  // Registra el contenedor iframe para renderizar la web local adentro de Flutter
  ui_web.platformViewRegistry.registerViewFactory(
    'cv-web-view',
    (int viewId) {
      final iframe = web.HTMLIFrameElement()
        ..src = 'assets/assets/web/index.html'
        ..style.border = 'none'
        ..style.width = '100%'
        ..style.height = '100%';
      return iframe;
    },
  );

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CV - Contenedor Híbrido',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF1D4ED8)),
        useMaterial3: true,
      ),
      home: const HybridCVPage(),
    );
  }
}

class HybridCVPage extends StatefulWidget {
  const HybridCVPage({super.key});

  @override
  State<HybridCVPage> createState() => _HybridCVPageState();
}

class _HybridCVPageState extends State<HybridCVPage> {
  Key _viewKey = UniqueKey();

  void _reloadWeb() {
    setState(() {
      _viewKey = UniqueKey();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Hoja de Vida (Flutter Embed)',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        backgroundColor: const Color(0xFF1D4ED8),
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            tooltip: 'Recargar CV',
            onPressed: _reloadWeb,
          ),
        ],
      ),
      body: HtmlElementView(
        key: _viewKey,
        viewType: 'cv-web-view',
      ),
    );
  }
}