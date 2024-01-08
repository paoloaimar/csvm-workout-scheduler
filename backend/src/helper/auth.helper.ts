import { Credential } from "../../common";
import { logger } from "../services/log.service";

//const CryptoJS = require("crypto-js");
import CryptoJS = require("crypto-js");

/**
 * Check if an input password is valid 
 * @param password 
 * @param credentials 
 * @param passwordInClear 
 * @returns 
 */
const passwordIsValid = function (password: string, credentials: Credential[], passwordInClear: boolean = false): boolean {
    try {

        let pwdValid: boolean = false;

        credentials.every(credential => {
            const passwordStored = credential.HashPwd!;

            if (passwordInClear) {
                pwdValid = password === decrypt(passwordStored, process.env.SECRET_KEY!);
            } else {
                pwdValid = decrypt(password, process.env.SECRET_KEY!) === decrypt(passwordStored, process.env.SECRET_KEY!);
            }

            if (pwdValid) {
                return;
            }
        });

        return pwdValid;

    } catch (error: any) {
        logger.error(`Authentication Helper passwordIsValid error - ${error.message}`);
        return false;
    }
}

/**
 * Encrypt a given string with a given string
 * @param value 
 * @param key 
 * @returns 
 */
const encrypt = function (value: string, key: string): string | undefined {
    try {
        return CryptoJS.AES.encrypt(value, key).toString();
    } catch (error: any) {
        logger.error(`Authentication Helper crypt error - ${error.message}`);
        return undefined;
    }
}

/**
 * Decrypt a crypted string with a given secret key
 * @param cryptedValue 
 * @param key 
 * @returns 
 */
const decrypt = function (cryptedValue: string, key: string): string | undefined {
    try {
        const bytes = CryptoJS.AES.decrypt(cryptedValue, key);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error: any) {
        logger.error(`Authentication Helper decrypt error - ${error.message}`);
        return undefined;
    }
}

export { passwordIsValid, encrypt, decrypt }

