import { Request, Response } from "express";

export const createEvent = (req: Request, res: Response): void => {
    res.status(501).json({ message: "Not implemented" });
};