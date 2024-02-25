export const requestLog = (req: { method: any; url: any; }, res: any, next: () => void) => {
    console.log(`[${new Date().toLocaleString()}]  Requested: ${req.method} ${req.url}`);
    next();
} 