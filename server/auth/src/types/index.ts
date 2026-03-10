import type {User as IUser, Device as IDevice, Session as ISession} from "../generated/prisma/client.ts";

export interface IData {
    user?: IUser;
    accessToken?: string;
    refreshToken?: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
            device?: IDevice;
            session?: ISession;
        }
    }
}
