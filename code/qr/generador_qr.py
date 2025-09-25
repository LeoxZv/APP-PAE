import pandas as pd
import qrcode as qr
import mysql.connector as mysql
import os
from dotenv import load_dotenv

def generar_qrs_desde_db(excel_path):
    # Cargar las variables de entorno del archivo .env
    load_dotenv()

    # 1. Conexión a la base de datos
    try:
        conn = mysql.connect(
            host=os.getenv('DB_HOST'),
            port=int(os.getenv('DB_PORT')),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME')
        )
        cursor = conn.cursor()

        print("Conexión a la base de datos establecida exitosamente.")
        
        # 2. Obtener datos de estudiantes de la base de datos
        cursor.execute("SELECT id_estudiante, numero_documento FROM estudiante")
        db_data = cursor.fetchall()
        conn.close()

        # Crear un diccionario para un acceso más rápido
        estudiantes_db = {str(doc): id for id, doc in db_data}
        
        # 3. Leer el archivo de Excel usando el parámetro excel_path
        dtf1 = pd.read_excel(excel_path)
        
        # Crear la carpeta para guardar los QR si no existe
        if not os.path.exists('qrs_generados'):
            os.makedirs('qrs_generados')
        
        qrs_generados = 0
        qrs_no_encontrados = []
        
        # 4. Iterar sobre el DataFrame para generar los QRs
        for index, row in dtf1.iterrows():
            documento_excel = str(row['Documento'])
            
            if documento_excel in estudiantes_db:
                id_estudiante = estudiantes_db[documento_excel]
                
                qr_code = qr.QRCode(version=1, error_correction=qr.constants.ERROR_CORRECT_L)
                qr_code.add_data(str(id_estudiante))
                qr_code.make(fit=True)
                
                img = qr_code.make_image(fill_color="black", back_color="white")
                filename = f'qr_{id_estudiante}.png'
                img.save(f'./qrs_generados/{filename}')
                
                print(f"Código QR para el estudiante con ID {id_estudiante} generado.")
                qrs_generados += 1
            else:
                qrs_no_encontrados.append(documento_excel)
                print(f"Documento {documento_excel} no encontrado en la base de datos. QR no generado.")
        
        print("\n--- Resumen del proceso ---")
        print(f"Proceso de generación de códigos QR completado. Se generaron {qrs_generados} QRs.")
        if qrs_no_encontrados:
            print(f"No se encontraron los siguientes documentos en la base de datos: {', '.join(qrs_no_encontrados)}")

    except mysql.Error as e:
        print(f"Error de conexión a la base de datos: {e}")

# Llamada a la función para ejecutar el script
if __name__ == "__main__":
    generar_qrs_desde_db("./estudiantes_prueba.xlsx")