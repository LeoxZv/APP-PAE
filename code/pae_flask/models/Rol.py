from extensions import db

class Rol(db.Model):
    __tablename__ = 'tbl_rol'
    
    rol_id = db.Column(db.Integer, primary_key=True)
    nombre_rol = db.Column(db.String(50), nullable=False, unique=True)

    def __repr__(self):
        return f"<Rol id={self.rol_id}, nombre={self.nombre_rol}>"