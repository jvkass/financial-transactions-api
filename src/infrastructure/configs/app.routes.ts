const userRoot = "";
const accountRoot = "";
const transactionRoot = "";

export const routesV1 = {
    version: "v1",
    user: {
        root: userRoot,
        createUser: `${userRoot}/user`,
        me: `${userRoot}/me`,
    },
    account: {
        root: accountRoot,
        createAccount: `${accountRoot}/accounts`,
        balance: `${accountRoot}/accounts/:id/balance`,
    },
    transaction: {
        root: transactionRoot,
        transfer: `${transactionRoot}/transactions/transfer`,
    },
};