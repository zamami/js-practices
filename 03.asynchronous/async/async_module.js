import sqlite3 from "sqlite3";

export const db = new (sqlite3.verbose().Database)(":memory:");

export const runQuery = async (query, params = []) => {
    return new Promise((resolve) => {
        db.run(query, params, function () {
            resolve(this);
        });
    });
};

export const getQuery = async (query, params = []) => {
    return new Promise((resolve) => {
        db.get(query, params, (_, row) => {
            resolve(row);
        });
    });
};
