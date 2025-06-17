from extensions import db
from models.Colegio import Colegio

def get_colegio_by_id(colegio_id):
    """
    Obtiene un colegio por su ID.

    :param colegio_id: ID del colegio.
    :return: Objeto Colegio o None si no se encuentra.
    """
    return Colegio.query.get(colegio_id)

def get_all_colegios():
    """
    Obtiene todos los colegios.

    :return: Lista de objetos Colegio.
    """
    return Colegio.query.all()

def create_colegio(nombre_colegio, direccion_colegio):
    """
    Crea un nuevo colegio.

    :param nombre_colegio: Nombre del colegio.
    :param direccion_colegio: Dirección del colegio.
    :return: Objeto Colegio creado.
    """
    new_colegio = Colegio(nombre_colegio=nombre_colegio, direccion_colegio=direccion_colegio)
    db.session.add(new_colegio)
    db.session.commit()
    return new_colegio

def update_colegio(colegio_id, nombre_colegio=None, direccion_colegio=None):
    """
    Actualiza un colegio existente.

    :param colegio_id: ID del colegio a actualizar.
    :param nombre_colegio: Nuevo nombre del colegio (opcional).
    :param direccion_colegio: Nueva dirección del colegio (opcional).
    :return: Objeto Colegio actualizado o None si no se encuentra.
    """
    colegio = get_colegio_by_id(colegio_id)
    if not colegio:
        return None

    if nombre_colegio is not None:
        colegio.nombre_colegio = nombre_colegio
    if direccion_colegio is not None:
        colegio.direccion_colegio = direccion_colegio

    db.session.commit()
    return colegio

def delete_colegio(colegio_id):
    """
    Elimina un colegio por su ID.

    :param colegio_id: ID del colegio a eliminar.
    :return: True si se eliminó correctamente, False si no se encontró.
    """
    colegio = get_colegio_by_id(colegio_id)
    if not colegio:
        return False

    db.session.delete(colegio)
    db.session.commit()
    return True
