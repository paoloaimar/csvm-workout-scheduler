import { Request } from "express";

/**
 * Check if a request object has a body
 * @param req Request to check
 * @returns True = the request has a body, False = the request hasn't a body
 */
export function requestHasBody(req: Request): boolean {
    if (Object.keys(req.body).length === 0) {
        return false;
    } else {
        return true;
    }
}