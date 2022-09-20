import { Request } from "express";

export interface ReadRequest extends Request {
    params: {
        postId?: string;
    };
}

export interface ScriptRequest extends Request {
    params: {
        filename?: string;
    };
}