from flask import Flask, jsonify, request
from werkzeug.exceptions import HTTPException
import sqlite3
import logging as log
import sys
import traceback
import json
log.basicConfig(level=log.INFO)

app = Flask(__name__)

@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response

##############
### Routes ###
##############

# Programs
@app.route("/api/v1/programs", methods=['GET'])
def list_programs():
    return jsonify(get_programs())

# Routines
@app.route("/api/v1/routines", methods=['GET'])
def list_routines():
    program_id = request.args.get('programId')
    return jsonify(get_routines(program_id))

# Routine days
@app.route("/api/v1/routine-days", methods=['GET'])
def list_routine_days():
    return jsonify(get_routine_days())

@app.route("/api/v1/routine-days/new", methods=['POST'])
def update_routine_days_route():
    return jsonify(update_routine_days())

# Exercises
@app.route("/api/v1/exercises", methods=['GET'])
def list_exercises():
    return jsonify(get_exercises())

# Exercise Weights
@app.route("/api/v1/exercise-weights", methods=['GET'])
def list_exercise_weights():
    return jsonify(get_exercise_weights())

# Exercise->Routine map
@app.route("/api/v1/routine-exercise-map", methods=['GET'])
def list_routines_exercises_map():
    return jsonify(get_routines_exercises_map())

# Sessions
@app.route("/api/v1/workout-sessions", methods=['GET'])
def list_workout_sessions():
    return jsonify(get_workout_sessions())

@app.route("/api/v1/workout-sessions/new", methods=['POST'])
def add_new_session_route():
    return jsonify(add_new_session())

##############
## Private ###
##############
def connect_db():
    with sqlite3.connect('./database.db') as conn:
        if conn:
            conn.row_factory = sqlite3.Row
    return conn

''' Routines '''
def get_routines(program_id):
    try:
        conn = connect_db()
        query = '''
            SELECT r.rowid as routineId,
                   r.name
            FROM ft_routines r
            LEFT JOIN ft_programs p ON p.id = r.program_id
            WHERE 1=1
            AND r.program_id = ?
            ORDER BY p.id, r.name
        '''
        cursor = conn.execute(query, (program_id,));
        return get_list_from_rows(cursor)
    except sqlite3.Error as er:
        log.error('get_routines error: %s' % (' '.join(er.args)))
    finally:
        close_connection(conn)

def get_routines_exercises_map():
    try:
        conn = connect_db()
        cursor = conn.execute('SELECT routine_id AS routineId, exercise_id AS exerciseId FROM ft_routines_exercises');
        return get_list_from_rows(cursor)
    except:
        log.error('get_routines_exercises_map error')
    finally:
        close_connection(conn)

''' Exercises '''
def get_exercises():
    try:
        conn = connect_db()
        params = []
        query = '''
            SELECT e.rowid AS exerciseId,
                   e.name,
                   e.repetitions,
                   e.number_of_sets AS numberOfSets 
            FROM ft_exercises e
            LEFT JOIN ft_routines_exercises re ON re.exercise_id = e.id
            WHERE 1=1
        '''
        routineId = request.args.get('routineId')
        if routineId is not None:
            query += " AND re.routine_id = ?"
            params = [routineId]

        query += " ORDER BY e.name"
        cursor = conn.execute(query, params);
        return get_list_from_rows(cursor)
    except sqlite3.Error as er:
        log.error('SQLite error: %s' % (' '.join(er.args)))
    finally:
        close_connection(conn)

def get_exercise_weights():
    try:
        conn = connect_db()
        params = []
        query = '''
            SELECT ew.rowid AS exerciseWeightId,
                   e.name,
                   e.id AS exerciseId,
                   ew.weight
            FROM ft_exercise_weights ew
            JOIN ft_exercises e ON ew.exercise_id = e.id
            ORDER BY e.name
        '''
        cursor = conn.execute(query, params);
        return get_list_from_rows(cursor)
    except sqlite3.Error as er:
        log.error('SQLite error: %s' % (' '.join(er.args)))
    finally:
        close_connection(conn)

def get_workout_sessions():
    try:
        conn = connect_db()
        params = []
        query = '''
            SELECT  s.id AS workoutId,
                    s.routine_id AS routineId,
                    s.created_at AS createdAt,
                    s.updated_at AS updatedAt,
                    s.completed_at AS completedAt,
                    s.sets_completed AS setsCompleted,
                    r.name AS routineName,
                    CAST ((
                        JULIANDAY(s.completed_at) - JULIANDAY(s.created_at)
                    ) * 24 * 60 * 60 AS Integer) AS durationInSeconds
            FROM ft_workout_sessions s
            JOIN ft_routines r ON r.rowid = routine_id
            JOIN ft_programs p ON p.rowid = program_id
            WHERE 1=1
        '''

        query += "ORDER BY s.created_at DESC"
        cursor = conn.execute(query, params);
        return get_list_from_rows(cursor)
    except sqlite3.Error as er:
        log.error('SQLite error: %s' % (' '.join(er.args)))
        log.error("Exception class is: ", er.__class__)
        log.error('SQLite traceback: ')
        exc_type, exc_value, exc_tb = sys.exc_info()
        log.error(traceback.format_exception(exc_type, exc_value, exc_tb))
    finally:
        close_connection(conn)

def get_programs():
    try:
        conn = connect_db()
        params = []
        query = '''
            SELECT p.rowid AS programId,
                   p.name,
                   p.created_at AS createdAt
            FROM ft_programs p
            WHERE 1=1
        '''
        programId = request.args.get('programId')
        if programId is not None:
            query += " AND p.id = ?"
            params = [programId]

        query += " ORDER BY p.created_at"

        cursor = conn.execute(query, params);
        return get_list_from_rows(cursor)
    finally:
        close_connection(conn)

def get_routine_days():
    try:
        conn = connect_db()
        params = []
        query = '''
            SELECT  rd.routine_id AS routineId,
                    rd.sunday,
                    rd.monday,
                    rd.tuesday,
                    rd.wednesday,
                    rd.thursday,
                    rd.friday,
                    rd.saturday
            FROM ft_routine_days rd
        '''
        cursor = conn.execute(query, params);
        return get_list_from_rows(cursor)
    except sqlite3.Error as er:
        log.error('SQLite error: %s' % (' '.join(er.args)))
    finally:
        close_connection(conn)

def update_routine_days():
    try:
        conn = connect_db()
        routine_days = request.json
        params = (routine_days['Sun'],
                  routine_days['Mon'],
                  routine_days['Tue'],
                  routine_days['Wed'],
                  routine_days['Thu'],
                  routine_days['Fri'],
                  routine_days['Sat'],
                  routine_days['routineId'])
        query = '''
            UPDATE ft_routine_days
            SET sunday = ?,
                monday = ?,
                tuesday = ?,
                wednesday = ?,
                thursday = ?,
                friday = ?,
                saturday = ?
            WHERE routine_id = ?
        '''
        cursor = conn.execute(query, params);
        status = 'ERROR'
        if cursor.rowcount > 0:
            status = 'OK'
        return {
            'status': status,
            'message': "{} rows affected".format(cursor.rowcount),
            'routineDayId': cursor.lastrowid
        }
    except sqlite3.Error as er:
        log.error('update_routine_days error: %s' % (' '.join(er.args)))
    finally:
        close_connection(conn)

def log_query(query, params):
    fmt_qry = query.replace('?', '{}')
    log.info(fmt_qry.format(params))

def add_new_session():
    try:
        conn = connect_db()
        req = request.data.jsonify()
        params = [req.routineId, req.createdAt, req.completedAt, req.setsCompleted]
        query = '''
            INSERT INTO ft_workout_sessions(routine_id, 
                                            created_at,
                                            completed_at,
                                            sets_completed)
            VALUES(?, ?, ?, ?)
        '''
        cursor = conn.execute(query, params);
        return jsonify({
            'status': 'OK',
            'workoutId': cursor.lastrowid
        })
    except sqlite3.Error as er:
        log.error('SQLite error: %s' % (' '.join(er.args)))
    finally:
        close_connection(conn)

##########################################

def close_connection(connection):
    if connection:
        connection.close()

def get_list_from_rows(cursor):
    results = []

    try:
        columns = [column[0] for column in cursor.description]
        
        for row in cursor.fetchall():
            results.append(dict(zip(columns, row)))

        return results
    except:
        log.error('Error in get_list_from_rows')
    finally:
        return results