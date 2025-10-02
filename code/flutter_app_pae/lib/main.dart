import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
// Las librerías que no usas (como flutter_native_splash o url_launcher)
// se han quitado o comentado para mantener el código limpio.
import 'package:http/http.dart' as http; // NECESARIO: Para la API
import 'dart:convert'; // NECESARIO: Para JSON
import 'login_page.dart'; 

void main() {
 runApp(const MyApp());
}

class MyApp extends StatelessWidget {
 const MyApp({super.key});

 @override
 Widget build(BuildContext context) {
  return MaterialApp(
   title: 'App Pae QR',
   theme: ThemeData(
    colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
    useMaterial3: true,
   ),
   home: const LoginPage(), // Inicia siempre en el Login
  );
 }
}

class MyHomePage extends StatefulWidget {
 // 🌟 CORRECCIÓN CLAVE: Definimos el parámetro 'accessToken' en el constructor
 const MyHomePage({super.key, required this.title, this.accessToken});

 final String title;
 final String? accessToken; // Almacena el token JWT
  
 @override
 State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
 Barcode? result;
 String qrText = "Scan code";
  
  // 💡 CONFIGURACIÓN DE LA API PARA ASISTENCIA 💡
  // ¡Asegúrate de que esta IP sea la correcta para tu servidor NestJS!
  final String _baseUrl = 'http://138.121.13.18:3000'; 
  final String _asistenciaEndpoint = '/asistencia/registrar'; 

  // Función para enviar el código QR a la API
  Future<void> _sendAsistencia(String code) async {
    // 1. Obtener el token
    final String? token = widget.accessToken;
    if (token == null) {
      // Si no hay token, forzamos la vuelta al login.
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Sesión caducada. Reingrese.'), backgroundColor: Colors.orange),
      );
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const LoginPage()),
      );
      return;
    }

    try {
      // 2. Realizar la petición POST autenticada
      final response = await http.post(
        Uri.parse('$_baseUrl$_asistenciaEndpoint'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token', // 🔑 Se envía el token JWT para autenticar la petición
        },
        body: jsonEncode({'codigoQr': code}), 
      );

      // 3. Manejar la respuesta
      final responseBody = jsonDecode(response.body);
      final String mensaje = responseBody['message'] is String 
                             ? responseBody['message'] 
                             : (response.statusCode == 200 || response.statusCode == 201 
                                ? 'Asistencia registrada con éxito.' 
                                : 'Error desconocido.');

      if (response.statusCode == 201 || response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(mensaje), backgroundColor: Colors.green),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(mensaje), backgroundColor: Colors.red),
        );
      }
    } catch (e) {
      // Error de red
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Error de conexión con el servidor.'), backgroundColor: Colors.red),
      );
    }
  }

 @override
 Widget build(BuildContext context) {
  return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
      ),
   body: Column(
    children: <Widget>[
     Expanded(
      flex: 5,
      child: MobileScanner(
       onDetect: (capture) {
        final List<Barcode> barcodes = capture.barcodes;
        if (barcodes.isNotEmpty) {
         final String? detectedCode = barcodes.first.rawValue;
                  
                  // Solo procesamos si detectamos un código y es diferente al anterior (para evitar spam)
                  if (detectedCode != null && detectedCode != qrText) {
                    setState(() {
                      result = barcodes.first;
                      qrText = detectedCode;
                    });
                    
                    // 🚀 Llamamos a la función API para registrar la asistencia
                    _sendAsistencia(detectedCode); 
                  }
        }
       },
      ),
     ),
     Expanded(
      flex: 1,
      child: Center(
       // Mostramos el código QR escaneado y el estado de autenticación
       child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text("Código escaneado: $qrText"),
                  Text(widget.accessToken != null ? "Status: Autenticado" : "Status: Error de Sesión",
                    style: TextStyle(color: widget.accessToken != null ? Colors.green : Colors.red, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
      ),
     )
    ],
   ),
  );
 }
}