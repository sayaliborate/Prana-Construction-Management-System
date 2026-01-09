


Quick start (Linux / Mac / Windows WSL):
1. python -m venv env
2. source env/bin/activate   (or .\env\Scripts\activate on Windows)
3. pip install -r requirements.txt
4. cd prana_backend
5. python manage.py migrate
6. python manage.py create_demo_admin  # creates admin with username admin@prana.com and password Admin@123
7. python manage.py runserver 8000

Notes:
- Uses SQLite by default (db.sqlite3 at project root).
- To switch to MySQL, edit settings.py DATABASES section and install mysqlclient.
- JWT auth endpoints available at /api/token/ and /api/token/refresh/.
