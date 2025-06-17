from extensions import db

class Colegio(db.Model):
    __tablename__ = 'tbl_colegio'
    
    colegio_id = db.Column(db.Integer, primary_key=True)
    nombre_colegio = db.Column(db.String(75), nullable=False, unique=True)
    direccion_colegio = db.Column(db.String(50), nullable=False, unique=True)


    def __repr__(self):
        return f"<Colegio id={self.colegio_id}, nombre={self.nombre_colegio}, direccion={self.direccion_colegio}>"