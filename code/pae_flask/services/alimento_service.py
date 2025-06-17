from extensions import db
from models.Alimento import Alimento

def get_alimento_by_id(alimento_id):
    """
    Obtiene un alimento por su ID.

    :param alimento_id: ID del alimento.
    :return: Objeto Alimento o None si no se encuentra.
    """
    return Alimento.query.get(alimento_id)

def get_all_alimentos():
    """
    Obtiene todos los alimentos.

    :return: Lista de objetos Alimento.
    """
    return Alimento.query.all()

def create_alimento(descripcion_alimento):
    """
    Crea un nuevo alimento.

    :param descripcion_alimento: Descripción del alimento.
    :return: Objeto Alimento creado.
    """
    new_alimento = Alimento(descripcion_alimento=descripcion_alimento)
    db.session.add(new_alimento)
    db.session.commit()
    return new_alimento

def update_alimento(alimento_id, descripcion_alimento=None):
    """
    Actualiza un alimento existente.

    :param alimento_id: ID del alimento a actualizar.
    :param descripcion_alimento: Nueva descripción del alimento (opcional).
    :return: Objeto Alimento actualizado o None si no se encuentra.
    """
    alimento = get_alimento_by_id(alimento_id)
    if not alimento:
        return None

    if descripcion_alimento is not None:
        alimento.descripcion_alimento = descripcion_alimento

    db.session.commit()
    return alimento

def delete_alimento(alimento_id):
    """
    Elimina un alimento por su ID.

    :param alimento_id: ID del alimento a eliminar.
    :return: True si se eliminó correctamente, False si no se encontró.
    """
    alimento = get_alimento_by_id(alimento_id)
    if not alimento:
        return False

    db.session.delete(alimento)
    db.session.commit()
    return True
