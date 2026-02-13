#!/usr/bin/python3

import MySQLdb # or import pymysql as MySQLdb if using PyMySQL

DB_NAME = 'teams'
DB_USER = 'totes'
DB_PASSWORD = 'thesmurfs'
DB_HOST = 'dicorcia.pdx1-mysql-a7-3a.dreamhost.com' # e.g., mysql.example.com

try:
    conn = MySQLdb.connect(db=DB_NAME, host=DB_HOST, user=DB_USER, passwd=DB_PASSWORD)
    cursor = conn.cursor()
    cursor.execute("SELECT VERSION()")
    row = cursor.fetchone()
    if row:
        print(f"Server version: {row[0]}")
    cursor.close()
    conn.close()
except MySQLdb.Error as e:
    print(f"Error connecting to the database: {e}")
