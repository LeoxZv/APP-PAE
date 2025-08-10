from flask import Flask
from extensions import db, migrate, cors
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)

    with app.app_context():
        # Import all models to register them with SQLAlchemy before creating tables
        from models.Alimento import Alimento
        from models.Colegio import Colegio
        from models.RegistroColegio import RegistroColegio
        from models.RegistroEntrega import RegistroEntrega
        from models.Rol import Rol
        from models.TipoDoc import TipoDoc
        from models.User import User

        db.create_all()

    @app.route('/')
    def hello_world():
        return 'Hello, World!'

    @app.route('/api/users')
    def get_users():
        return {'users': ['Alice', 'Bob', 'Charlie']}

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=8080)
