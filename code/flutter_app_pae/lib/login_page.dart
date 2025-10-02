import 'package:flutter/material.dart';
import 'dart:developer'; // Para el log optimizado en desarrollo
import 'package:http/http.dart' as http; // Importación para peticiones HTTP
import 'dart:convert'; // Importación para codificar y decodificar JSON

// Importamos 'main.dart' para poder navegar a MyHomePage (la pantalla del scanner).
import 'main.dart'; 

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  // Clave global para manejar el formulario y sus validaciones.
  final _formKey = GlobalKey<FormState>(); 
  // Controladores para obtener el texto de los campos de formulario.
  final TextEditingController _documentController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  
  final String _baseUrl = 'http://138.121.13.18:3000'; 
  final String _loginEndpoint = '/auth/login'; // Asegúrate que el endpoint sea correcto

  // Función asíncrona para manejar el inicio de sesión con la API.
  void _login() async {
    // Si la validación del formulario local es correcta
    if (_formKey.currentState!.validate()) {
      
      // Muestra en el log (solo para desarrollo) los datos que se enviarán
      log('Intentando login con Documento: ${_documentController.text}', name: 'LoginProcess');

      // 1. Preparar el cuerpo de la petición
      final Map<String, dynamic> loginData = {
        'documento': _documentController.text, // Asegúrate de que el nombre del campo coincida con NestJS
        'password': _passwordController.text, // Asegúrate de que el nombre del campo coincida con NestJS
      };

      try {
        // 2. Enviar la petición POST al endpoint de login
        final response = await http.post(
          Uri.parse('$_baseUrl$_loginEndpoint'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode(loginData), // Convertir el mapa a una cadena JSON
        );

        // 3. Manejar la respuesta del servidor
        if (response.statusCode == 201 || response.statusCode == 200) {
          // Éxito: Login validado por NestJS
          final responseBody = jsonDecode(response.body);
          
          // CRUCIAL: Obtener el token de acceso (JWT)
          // La variable accessToken se declara y usa DENTRO de este bloque.
          final String accessToken = responseBody['access_token']; 
          log('Login Exitoso. Token recibido.', name: 'LoginProcess');

          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('¡Acceso concedido!'), backgroundColor: Colors.green),
          );

          // Navegar al Scanner (MyHomePage) y pasar el token
          Navigator.pushReplacement(
            context,
            // La navegación ocurre aquí, donde accessToken está definido 
            MaterialPageRoute(builder: (context) => MyHomePage(title: 'Asistencia', accessToken: accessToken)), 
          );

        } else {
          // Error de credenciales (ej: 401 Unauthorized) u otro error
          final errorBody = jsonDecode(response.body);
          // Aseguramos que 'message' exista antes de usarlo
          final String errorMessage = errorBody['message'] is String 
                                      ? errorBody['message'] 
                                      : 'Credenciales incorrectas o error de servidor.';

          log('Error de Login (${response.statusCode}): $errorMessage', name: 'LoginProcess');

          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(errorMessage),
              backgroundColor: Colors.red,
            ),
          );
        }
      } catch (e) {
        // Error de red (ej. servidor apagado, URL incorrecta)
        log('Error de conexión con la API: $e', name: 'LoginProcess');
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('No se pudo conectar al servidor. Verifique la conexión.'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  @override
  void dispose() {
    // Es importante liberar los recursos de los controladores.
    _documentController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(32.0),
          child: Form(
            key: _formKey, // Asignamos la clave al formulario
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                // Logo centrado
                Image.asset(
                  'assets/logo3.png', 
                  height: 150, 
                ),
                const SizedBox(height: 40),
                
                //  Campo de Documento
                TextFormField(
                  controller: _documentController,
                  keyboardType: TextInputType.number, // Para facilitar la entrada de números
                  decoration: const InputDecoration(
                    labelText: 'Documento',
                    border: OutlineInputBorder(),
                    prefixIcon: Icon(Icons.badge),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Por favor, ingrese su documento.';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 20),
                
                //  Campo de Contraseña
                TextFormField(
                  controller: _passwordController,
                  obscureText: true, // Para ocultar el texto de la contraseña
                  decoration: const InputDecoration(
                    labelText: 'Contraseña',
                    border: OutlineInputBorder(),
                    prefixIcon: Icon(Icons.lock),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Por favor, ingrese su contraseña.';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 50), // Espacio extra antes del botón
                
                // Botón de Acceder
                ElevatedButton(
                  onPressed: _login, // Llama a la función de login al presionar
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 15),
                    textStyle: const TextStyle(fontSize: 18),
                    backgroundColor: Colors.blueAccent, // Color primario
                    foregroundColor: Colors.white, // Color del texto
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                  ),
                  child: const Text('Acceder')
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
