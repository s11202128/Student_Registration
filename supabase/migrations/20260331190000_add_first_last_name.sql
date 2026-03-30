-- Migration: Add first_name and last_name columns to students table
ALTER TABLE students ADD COLUMN first_name VARCHAR(50);
ALTER TABLE students ADD COLUMN last_name VARCHAR(50);
