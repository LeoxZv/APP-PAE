from marshmallow import Schema, fields

class SchemaRegistroEntrega(Schema):
    entrega_id = fields.Int(required=True, description="ID de la entrega")
    fk_colegio = fields.Int(required=True, description="ID del colegio")
    fk_alimento = fields.Int(required=True, description="ID del alimento")
    fecha_registro = fields.DateTime(required=True, description="Fecha de la entrega")
    cantidad_entregada = fields.Int(required=True, description="Cantidad entregada")
    fk_repartidor = fields.Int(required=True, description="ID del repartidor")
    fk_cocinero = fields.Int(required=True, description="ID del cocinero")

    class Meta:
        ordered = True
