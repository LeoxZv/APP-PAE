import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
//import 'package:animated_splash_screen/animated_splash_screen.dart';
// Importación de 'url_launcher' ya no es necesaria, la he comentado.
// import 'package:url_launcher/url_launcher.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter QR',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Asistencia'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  Barcode? result;
  // Esta variable almacenará el texto del código QR.
  String qrText = "Scan code";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: <Widget>[
          Expanded(
            flex: 5,
            child: MobileScanner(
              onDetect: (capture) {
                final List<Barcode> barcodes = capture.barcodes;
                if (barcodes.isNotEmpty) {
                  setState(() {
                    result = barcodes.first;
                    if (result!.rawValue != null) {
                      // Comentamos la función original de abrir el navegador.
                      // _launchInBrowser(result!.rawValue!);

                      // ✨ Nuevo: Aquí actualizamos el texto de la variable `qrText`
                      // con el valor del código QR.
                      qrText = result!.rawValue!;
                    }
                  });
                }
              },
            ),
          ),
          Expanded(
            flex: 1,
            child: Center(
              // ✨ Nuevo: Mostramos el texto de la variable `qrText`.
              child: Text("Barcode data: $qrText"),
            ),
          )
        ],
      ),
    );
  }

  // Comentamos la función porque ya no se utiliza.
  // void _launchInBrowser(String url) async {
  //   final Uri uri = Uri.parse(url);
  //   if (!await launchUrl(uri, mode: LaunchMode.externalApplication)) {
  //     throw 'Could not launch $uri';
  //   }
  // }
}