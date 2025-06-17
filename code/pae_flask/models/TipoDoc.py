from extensions import db

class TipoDoc(db.Model):
    __tablename__ = 'tbl_tipo_doc'
    
    doc_id = db.Column(db.Integer, primary_key=True)
    nombre_doc = db.Column(db.String(50), nullable=False, unique=True)
    siglas_doc = db.Column(db.String(10), nullable=False, unique=True)


    def __repr__(self):
        return f"<TipoDoc id={self.doc_id}, nombre={self.nombre_doc}, siglas={self.siglas_doc}>"