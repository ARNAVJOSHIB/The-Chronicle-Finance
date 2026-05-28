import psycopg2
import sys

# Database connection parameters - update these as needed
DB_HOST = "localhost"
DB_NAME = "chronicle_finance"
DB_USER = "postgres"
DB_PASSWORD = "postgres"
DB_PORT = "5432"

def init_db():
    """
    Initialize the database and create tables if they don't exist.
    """
    try:
        # Connect to PostgreSQL
        conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            port=DB_PORT
        )

        # Create a cursor object
        cur = conn.cursor()

        # Create simulations table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS simulations (
                id SERIAL PRIMARY KEY,
                user_id INTEGER,
                model_type VARCHAR(50),
                parameters JSONB,
                results JSONB,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Create users table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY org,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Create reports table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS reports (
                id SERIAL PRIMARY KEY,
                simulation_id INTEGER REFERENCES simulations(id),
                content TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Create interpretations table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS interpretations (
                id SERIAL PRIMARY KEY,
                report_id INTEGER REFERENCES reports(id),
                content TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Commit changes and close connection
        conn.commit()
        cur.close()
        conn.close()

        print("Database initialized successfully")

    except Exception as e:
        print(f"Error initializing database: {e}")
        sys.exit(1)

if __name__ == "__main__":
    init_db()