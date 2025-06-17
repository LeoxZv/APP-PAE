from extensions import db

class User(db.Model):
    __tablename__ = 'tbl_usuario'
    
    user_id = db.Column(db.Integer, primary_key=True)
    nombre_usuario = db.Column(db.String(75), nullable=False, unique=True)
    apellido_usuario = db.Column(db.String(75), nullable=False, unique=True)
    documento = db.Column(db.String(20), nullable=False, unique=True)
    grado = db.Column(db.String(20), nullable=False, unique=True)
    jornada = db.Column(db.String(10), nullable=False, unique=True)
    fk_tipo_doc = db.Column(db.Integer, db.ForeignKey('tbl_tipo_doc.doc_id'), nullable=False)
    fk_rol = db.Column(db.Integer, db.ForeignKey('tbl_rol.rol_id'), nullable=False)
    fk_colegio = db.Column(db.Integer, db.ForeignKey('tbl_colegio.colegio_id'), nullable=False)

    def __repr__(self):
        return  f"<User id={self.user_id}, nombre={self.nombre_usuario}, apellido={self.apellido_usuario}, documento={self.documento}, grado={self.grado}, jornada={self.jornada}>"
