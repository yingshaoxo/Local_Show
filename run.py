from auto_everything import Base

b = Base()

b.run_program('gunicorn -b 0.0.0.0:2018 --workers=2 app.app:app')
    
