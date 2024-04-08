import { User } from "@comet/cms-api";

export const staticUsers: User[] = [
    {
        id: "1",
        name: "Admin",
        email: "demo@comet-dxp.com",
        locale: "en",
        isAdmin: true,
    },
    {
        id: "2",
        name: "Non-Admin",
        email: "test@test.com",
        locale: "en",
        isAdmin: false,
    },
];
