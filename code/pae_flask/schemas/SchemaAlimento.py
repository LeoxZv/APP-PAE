from marshmallow import Schema, fields

class SchemaAlimento(Schema):
    alimento_id = fields.Int(required=True, description="ID del alimento")
    descripcion_alimento = fields.Str(required=True, description="Descripción del alimento")

    class Meta:
        ordered = True
