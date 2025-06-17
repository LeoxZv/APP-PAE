from marshmallow import Schema, fields

class SchemaUser(Schema):
    user_id = fields.Int(required=True, description="ID del usuario")
    nombre_usuario = fields.Str(required=True, description="Nombre del usuario")
    apellido_usuario = fields.Str(required=True, description="Apellido del usuario")
    documento = fields.Str(required=True, description="Documento del usuario")
    grado = fields.Str(required=True, description="Grado del usuario")
    jornada = fields.Str(required=True, description="Jornada del usuario")
    fk_tipo_doc = fields.Int(required=True, description="ID del tipo de documento")
    fk_rol = fields.Int(required=True, description="ID del rol")
    fk_colegio = fields.Int(required=True, description="ID del colegio")

    class Meta:
        ordered = True
