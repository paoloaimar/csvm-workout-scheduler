const { EventEmitter } = require("events");
require("dotenv").config();
import sql, { Request } from 'mssql'

//Result getData function
interface IGetDataResult {
    rows?: sql.IRecordSet<any>;
    rowNumber: number;
    error: string;
};

//Result executeNonQuery function
interface IExecuteQueryResult {
    status: boolean;
    error: string;
    rowAffected?: number;
};

interface IExecuteStoredProcedureResult {
    status: boolean;
    error: string;
    data?: any;
}

export interface ISqlParameter {
    name: string;
    value: any;
    type: sql.ISqlTypeFactoryWithNoParams | sql.ISqlType;
    direction: ParameterDirection
}

export enum ParameterDirection {
    Input,
    Output
}

export class SqlParameter {

    name: string;
    value: any;
    type: sql.ISqlTypeFactoryWithNoParams | sql.ISqlType;
    direction: ParameterDirection;

    constructor(name: string, value: any, type: sql.ISqlTypeFactoryWithNoParams | sql.ISqlType, direction: ParameterDirection = ParameterDirection.Input) {
        this.name = name;
        this.value = value;
        this.type = type;
        this.direction = direction
    }
}

export class SqlStatement {
    query: string;
    params?: SqlParameter[];

    constructor(query: string) {
        this.query = query;
    }

}

/**
 * SqlService Class
 * Gestisce la connessione, il recupero e modifica dei dati in un DB MS SQL SERVER
 */
class MssqlService extends EventEmitter {

    private static instance: MssqlService;

    constructor() {
        super();

        this._init();
        this._testConnection();
    }

    //#region PRIVATE FUNCTIONS

    /**
     * Initialize the service
     */
    _init() {

        //Proprietà di configurazione connessione
        this.sqlConfig = {
            database: process.env.DB_NAME,
            server:
                process.env.ENVIRONMENT === "PROD"
                    ? process.env.DB_SERVER_PROD
                    : process.env.DB_SERVER_DEV,
            port: Number(process.env.DB_PORT),
            password: process.env.DB_PWD,
            user: process.env.DB_USER,
            pool: {
                max: 10,
                min: 1,
                createRetryIntervalMillis: 200,
                acquireTimeoutMillis: 15000,
                idleTimeoutMillis: 30000,
            },
            options: {
                encrypt: false,
                trustServerCertificate: false,
            },
        };

        //sottoscrizione evento error
        //sql.on("error", (err: any) => this._errorHandler(err));
    }

    /**
     * Gestore degli errori database
     * @param {*} err Errore/eccezione verificata
     */
    _errorHandler(err: any) {
        this.LastException = err;
        console.error(err);
    }

    /**
     * Esegue il test di connessione all'istanza MSSQL applicazione
     */
    _testConnection() {
        try {
            const connection = new sql.ConnectionPool(this.sqlConfig);

            connection.connect((err: Error) => {
                if (err) {
                    //errore di connessione
                    console.error(`Connection on SQL DB failed - ${err}`);
                    return;
                }

                //database collegato

                //emetto l'evento dbConnected
                this.emit("dbConnected");

                //chiudo la connessione
                connection.close();
            });
        } catch (err) {
            console.error(`Connection on SQL DB failed - ${err}`);
        }
    }

    //#endregion

    //#region PUBLIC FUNCTIONS

    /**
     * Get data returned by a TSQL SELECT Statement 
     * @param {string} selectStatement TSQL SELECT Statement to execute
     * @returns 
     */
    async getData(sqlQuery: string, sqlParams?: ISqlParameter[]) {

        let result: IGetDataResult = { rows: undefined, rowNumber: 0, error: "" };

        try {
            //apertura connessione verso il DB
            let pool = await sql.connect(this.sqlConfig);
            //riferimento alla richiesta
            let request = pool.request();

            if (sqlParams) {
                //specificati dei parametri => aggiungo alla richiesta
                sqlParams.forEach((param) => {
                    //debug(param);
                    request.input(param.name, param.type, param.value);
                });
            }

            //esecuzione query
            let dbRes = await request.query<any[]>(sqlQuery);

            if (dbRes) {
                //QUERY OK => composizione dell'oggetto ritornato
                result.rows = dbRes.recordsets ? dbRes.recordsets[0] ? dbRes.recordsets[0] : undefined : undefined; //righe ritornate;
                result.rowNumber = dbRes.rowsAffected[0]; //numero di righe
                result.error = "";

            } else {
                throw new Error(`Sql getData Exception - Query:${sqlQuery}`);
            }

        } catch (err) {
            this._errorHandler(err);

            result.rows = undefined; //righe ritornate;
            result.rowNumber = 0; //numero di righe
            result.error = String(err);


        }

        return result;
    }

    /**
     * Execute a generic SQL query
     * @param {string} sqlQuery SQL Query to execute 
     * @param {ISqlParameter[]} sqlParams SQL Parameters contained in the query
     * @returns True => Query OK / False => Query KO
     */
    async executeNonQuery(sqlQuery: string, sqlParams?: ISqlParameter[], request?: Request) {

        let result: IExecuteQueryResult = { status: false, error: "" };
        try {

            if (!request) {

                //apertura connessione verso il DB (solo se non specificata)
                let pool = await sql.connect(this.sqlConfig);
                request = pool.request();
            }

            if (sqlParams) {
                //specificati dei parametri => aggiungo alla richiesta
                sqlParams.forEach((param) => {
                    //debug(param);
                    request?.input(param.name, param.type, param.value);
                });
            }

            //esecuzione query
            const dbRes = await request.query(sqlQuery);

            //QUERY OK => composizione dell'oggetto ritornato
            result.status = dbRes.rowsAffected[0] > 0;
            result.rowAffected = dbRes.rowsAffected[0];

        } catch (err) {
            this._errorHandler(err);
            result.error = String(err);
            result.rowAffected = 0;

        }

        return result;
    }

    /**
     * Execute a list of queries inside a SQL transaction
     * @param sqlStatement SQL Statement list to execute
     */
    async executeQueriesInTransaction(sqlStatements?: SqlStatement[]) {
        let result: IExecuteQueryResult = { status: false, error: "" };

        //apertura connessione/transazione verso il DB
        const dbConn = new sql.ConnectionPool(this.sqlConfig);
        await dbConn.connect();
        const transaction = new sql.Transaction(dbConn);

        try {
            //inizio transazione
            await transaction.begin();

            //creazione richiesta (unica per tutti gli statement)
            const request = new sql.Request(transaction);

            let rowsAffected: number = 0;
            let lastError: string = "";

            let results: IExecuteQueryResult[] = [];
            //ciclo per tutti gli statement specificati
            for (const statement of sqlStatements!) {
                if (statement.query) {

                    //esecuzione statement
                    const res = await this.executeNonQuery(statement.query, statement.params, request)
                    rowsAffected += res.rowAffected ?? 0;
                    lastError = res.error;

                    //memorizzo i risultati
                    results.push(res);
                }
            }

            //verifico eventuali KO
            const badExecution = results.filter(r => r.status === false);
            if (badExecution.length > 0) {
                //KO presenti!!
                throw (Error(badExecution[0].error));
            }

            await transaction.commit();

            result.status = rowsAffected > 0;
            result.error = lastError;

        } catch (err) {
            await transaction.rollback();
            this._errorHandler(err);
            result.error = String(err);

        } finally {
            await dbConn.close();
        }

        return result;
    }

    /**
     * Execute a SQL Stored Procedure
     * @param spName Stored procedure name
     * @param sqlParams Parameters to pass to the stored procedure
     * @param request  SQL connection pool to use (if empty a new pool will be created)
     * @returns 
     */
    async executeStoredProcedure(spName: string, sqlParams?: ISqlParameter[], request?: Request) {
        let result: IExecuteStoredProcedureResult = { status: false, error: "" }
        try {
            if (!request) {

                //apertura connessione verso il DB (solo se non specificata)
                let pool = await sql.connect(this.sqlConfig);
                request = pool.request();
            }

            if (sqlParams) {
                //specificati dei parametri => aggiungo alla richiesta
                sqlParams.forEach((param) => {
                    if (param.direction === ParameterDirection.Input) {
                        request?.input(param.name, param.type, param.value);
                    } else {
                        request?.output(param.name, param.type, param.value);
                    }

                });
            }

            //stored procedure execution
            const dbRes = await request.execute<any[]>(spName);

            //Stored procedure execution OK => modelling of the returned object
            if (dbRes.recordsets) {
                result.data = dbRes.recordsets.pop();
            } else if (dbRes.output) {
                result.data = dbRes.output;
            }
            result.error = "";
            result.status = true;


        } catch (error) {
            this._errorHandler(error);
            result.error = String(error);
            result.data = undefined;
        }

        return result;
    }

    //#endregion

    public static getInstance(): MssqlService {
        if (!MssqlService.instance) {
            MssqlService.instance = new MssqlService();
        }

        return MssqlService.instance;
    }
}


export const db = MssqlService.getInstance();