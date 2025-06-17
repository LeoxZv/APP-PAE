from marshmallow import Schema, fields

class SchemaRegistroColegio(Schema):
    registro_id = fields.Int(required=True, description="ID del registro colegio")
    fk_colegio = fields.Int(required=True, description="ID del colegio")
    fk_alimento = fields.Int(required=True, description="ID del alimento")
    fecha_registro = fields.DateTime(required=True, description="Fecha del registro")
    fk_estudiante = fields.Int(required=True, description="ID del estudiante")
    fk_cocinero = fields.Int(required=True, description="ID del cocinero")

    class Meta:
        ordered = True
