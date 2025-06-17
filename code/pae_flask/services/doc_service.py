from extensions import db
from models.TipoDoc import TipoDoc

def get_tipo_doc_by_id(tipo_doc_id):
    """
    Obtiene un tipo de documento por su ID.

    :param tipo_doc_id: ID del tipo de documento.
    :return: Objeto TipoDoc o None si no se encuentra.
    """
    return TipoDoc.query.get(tipo_doc_id)

def get_all_tipo_docs():
    """
    Obtiene todos los tipos de documentos.

    :return: Lista de objetos TipoDoc.
    """
    return TipoDoc.query.all()

def create_tipo_doc(nombre_doc, siglas_doc):
    """
    Crea un nuevo tipo de documento.

    :param nombre_doc: Nombre del tipo de documento.
    :param siglas_doc: Siglas del tipo de documento.
    :return: Objeto TipoDoc creado.
    """
    new_tipo_doc = TipoDoc(nombre_doc=nombre_doc, siglas_doc=siglas_doc)
    db.session.add(new_tipo_doc)
    db.session.commit()
    return new_tipo_doc

def update_tipo_doc(tipo_doc_id, nombre_doc=None, siglas_doc=None):
    """
    Actualiza un tipo de documento existente.

    :param tipo_doc_id: ID del tipo de documento a actualizar.
    :param nombre_doc: Nuevo nombre del tipo de documento (opcional).
    :param siglas_doc: Nuevas siglas del tipo de documento (opcional).
    :return: Objeto TipoDoc actualizado o None si no se encuentra.
    """
    tipo_doc = get_tipo_doc_by_id(tipo_doc_id)
    if not tipo_doc:
        return None

    if nombre_doc is not None:
        tipo_doc.nombre_doc = nombre_doc
    if siglas_doc is not None:
        tipo_doc.siglas_doc = siglas_doc

    db.session.commit()
    return tipo_doc

def delete_tipo_doc(tipo_doc_id):
    """
    Elimina un tipo de documento por su ID.

    :param tipo_doc_id: ID del tipo de documento a eliminar.
    :return: True si se eliminó correctamente, False si no se encontró.
    """
    tipo_doc = get_tipo_doc_by_id(tipo_doc_id)
    if not tipo_doc:
        return False

    db.session.delete(tipo_doc)
    db.session.commit()
    return True

