import psycopg2
from psycopg2.extras import RealDictCursor
import os
import json
from datetime import datetime

# Database connection parameters
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_NAME = os.getenv("DB_NAME", "chronicle_finance")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "postgres")
DB_PORT = os.getenv("DB_PORT", "5432")

# Fallback storage file
JSON_STORAGE = os.path.join(os.path.dirname(__file__), "simulations_storage.json")

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
            port=DB_PORT,
            connect_timeout=2
        )
        return conn
    except Exception as e:
        # Silently fail for the caller to handle fallback
        return None

def save_simulation_fallback(user_id, model_type, parameters, results):
    """
    Save simulation to a JSON file if DB is unavailable.
    """
    simulations = []
    if os.path.exists(JSON_STORAGE):
        try:
            with open(JSON_STORAGE, 'r') as f:
                simulations = json.load(f)
        except:
            simulations = []
    
    new_id = len(simulations) + 1
    new_sim = {
        "id": new_id,
        "user_id": user_id,
        "model_type": model_type,
        "parameters": parameters,
        "results": results,
        "notes": None,
        "created_at": datetime.now().isoformat()
    }
    simulations.append(new_sim)
    
    with open(JSON_STORAGE, 'w') as f:
        json.dump(simulations, f, indent=2)
    
    return new_sim

def update_simulation_notes_fallback(sim_id, notes):
    """
    Update notes for a simulation in JSON fallback.
    """
    if not os.path.exists(JSON_STORAGE):
        return False
        
    with open(JSON_STORAGE, 'r') as f:
        simulations = json.load(f)
        
    for sim in simulations:
        if sim['id'] == sim_id:
            sim['notes'] = notes
            with open(JSON_STORAGE, 'w') as f:
                json.dump(simulations, f, indent=2)
            return True
    return False

def get_simulations_fallback(model_type=None):
    """
    Retrieve simulations from JSON file.
    """
    if not os.path.exists(JSON_STORAGE):
        return []
    
    try:
        with open(JSON_STORAGE, 'r') as f:
            simulations = json.load(f)
        
        if model_type:
            simulations = [s for s in simulations if s['model_type'] == model_type]
            
        return sorted(simulations, key=lambda x: x['created_at'], reverse=True)
    except:
        return []

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
                        notes TEXT,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                """)
                
                # Add notes column if it was created before this update
                try:
                    cur.execute("ALTER TABLE simulations ADD COLUMN IF NOT EXISTS notes TEXT")
                except:
                    pass

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
        print("PostgreSQL connection failed. Using JSON fallback for storage.")
        if not os.path.exists(JSON_STORAGE):
            with open(JSON_STORAGE, 'w') as f:
                json.dump([], f)

# Run database initialization
if __name__ == "__main__":
    init_db()