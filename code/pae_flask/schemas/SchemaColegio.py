from marshmallow import Schema, fields

class SchemaColegio(Schema):
    colegio_id = fields.Int(required=True, description="ID del colegio")
    nombre_colegio = fields.Str(required=True, description="Nombre del colegio")
    direccion_colegio = fields.Str(required=True, description="Dirección del colegio")

    class Meta:
        ordered = True
