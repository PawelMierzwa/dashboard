export default defineEventHandler(async (event) => {
    deleteCookie(event, 'token');
    return {
        status: 200,
        message: 'Logged out',
    };
});