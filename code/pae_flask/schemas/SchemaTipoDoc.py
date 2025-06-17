from marshmallow import Schema, fields

class SchemaTipoDoc(Schema):
    doc_id = fields.Int(required=True, description="ID del tipo de documento")
    nombre_doc = fields.Str(required=True, description="Nombre del tipo de documento")
    siglas_doc  = fields.Str(required=True, description="Siglas del tipo de documento")    

    class Meta:
        ordered = True  # Mantiene el orden de los campos al serializar