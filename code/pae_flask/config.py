import os
from dotenv import load_dotenv

load_dotenv() # Carga las variables de entorno desde .env

class Config:
    SECRET_KEY = "clave1"
    # Configuración base de la DB (se sobrescribe en entornos específicos si es necesario)
    SQLALCHEMY_DATABASE_URI = "C:\APP-PAE\code\pae_flask\pae.db"
    # Si se usa una base de datos diferente, se puede cambiar aquí
    SQLALCHEMY_TRACK_MODIFICATIONS = False # Recomendado para deshabilitar