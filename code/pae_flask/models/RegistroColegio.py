from extensions import db
from datetime import datetime

class RegistroColegio(db.Model):
    __tablename__ = 'tbl_registro_colegio'
    
    registro_id = db.Column(db.Integer, primary_key=True)
    fk_colegio = db.Column(db.Integer, db.ForeignKey('tbl_colegio.colegio_id'), nullable=False)
    fk_alimento = db.Column(db.Integer, db.ForeignKey('tbl_alimento.alimento_id'), nullable=False)
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    fk_estudiante = db.Column(db.Integer, db.ForeignKey('tbl_usuario.user.id'), nullable=False)
    fk_cocinero = db.Column(db.Integer, db.ForeignKey('tbl_usuario.user.id'), nullable=False)


    def __repr__(self):
        return f"<RegistroColegio id={self.id_registro}, colegio_id={self.fk_colegio}, alimento_id={self.fk_alimento}, fecha_registro={self.fecha_registro}, estudiante_id={self.fk_estudiante}, cocinero_id={self.fk_cocinero}>"