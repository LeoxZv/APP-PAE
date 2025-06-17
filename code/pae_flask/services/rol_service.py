from extensions import db
from models.Rol import Rol

def get_rol_by_id(rol_id):
    """
    Obtiene un rol por su ID.

    :param rol_id: ID del rol.
    :return: Objeto Rol o None si no se encuentra.
    """
    return Rol.query.get(rol_id)

def get_all_roles():
    """
    Obtiene todos los roles.

    :return: Lista de objetos Rol.
    """
    return Rol.query.all()

def create_rol(nombre_rol):
    """
    Crea un nuevo rol.

    :param nombre_rol: Nombre del rol.
    :return: Objeto Rol creado.
    """
    new_rol = Rol(nombre_rol=nombre_rol)
    db.session.add(new_rol)
    db.session.commit()
    return new_rol

def update_rol(rol_id, nombre_rol=None):
    """
    Actualiza un rol existente.

    :param rol_id: ID del rol a actualizar.
    :param nombre_rol: Nuevo nombre del rol (opcional).
    :return: Objeto Rol actualizado o None si no se encuentra.
    """
    rol = get_rol_by_id(rol_id)
    if not rol:
        return None

    if nombre_rol is not None:
        rol.nombre_rol = nombre_rol

    db.session.commit()
    return rol

def delete_rol(rol_id):
    """
    Elimina un rol por su ID.

    :param rol_id: ID del rol a eliminar.
    :return: True si se eliminó correctamente, False si no se encontró.
    """
    rol = get_rol_by_id(rol_id)
    if not rol:
        return False

    db.session.delete(rol)
    db.session.commit()
    return True
