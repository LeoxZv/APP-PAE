from extensions import db

class Alimento(db.Model):
    __tablename__ = 'tbl_alimento'
    
    alimento_id = db.Column(db.Integer, primary_key=True)
    descripcion_alimento = db.Column(db.String(100), nullable=False, unique=True)

    def __repr__(self):
        return f"<Alimento id={self.alimento_id}, descripcion={self.descripcion_alimento}>"