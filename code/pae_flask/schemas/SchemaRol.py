from marshmallow import Schema, fields

class SchemaRol(Schema):
    rol_id = fields.Int(required=True, description="ID del rol")
    nombre_rol = fields.Str(required=True, description="Nombre del rol")

    class Meta:
        ordered = True
