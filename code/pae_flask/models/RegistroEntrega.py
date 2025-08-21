from extensions import db
from datetime import datetime

class RegistroColegio(db.Model):
    __tablename__ = 'tbl_registro_entrega'
    
    entrega_id = db.Column(db.Integer, primary_key=True)
    fk_colegio = db.Column(db.Integer, db.ForeignKey('tbl_colegio.colegio_id'), nullable=False)
    fk_alimento = db.Column(db.Integer, db.ForeignKey('tbl_alimento.alimento_id'), nullable=False)
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    cantidad_entregada = db.Column(db.Integer, nullable=False)
    fk_repartidor = db.Column(db.Integer, db.ForeignKey('tbl_usuario.user.id'), nullable=False)
    fk_cocinero = db.Column(db.Integer, db.ForeignKey('tbl_usuario.user.id'), nullable=False)


    def __repr__(self):
        return f"<RegistroColegio id={self.entrega_id}, colegio_id={self.fk_colegio}, alimento_id={self.fk_alimento}, cantidad={self.cantidad_entregada}, fecha_registro={self.fecha_registro}, repartidor_id={self.fk_repartidor}, cocinero_id={self.fk_cocinero}>"