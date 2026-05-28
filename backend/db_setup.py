import psycopg2
from psycopg2.extras import RealDictCursor
import os

# Database connection parameters
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_NAME = os.getenv('DB_NAME', 'chronicle_finance')
DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'postgres')
DB_PORT = os.getenv('DB_PORT', '5432')

def get_db_connection():
    """
    Establish a connection to the PostgreSQL database.
    """
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
          port=DB_PORT
        )
        return conn
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return None

def init_db():
    """
    Initialize the database and create tables if they don't exist.
    """
    conn = get_db_connection()
    if conn:
        try:
            with conn.cursor() as cur:
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
                        id SERIAL PRIMARY KEY,
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

            conn.commit()
            print("Database initialized successfully")
        except Exception as e:
            print(f"Error creating tables: {e}")
            conn.rollback()
        finally:
            conn.close()
    else:
        print("Failed to connect to database")

# Run database initialization
if __name__ == "__main__":
    init_db()