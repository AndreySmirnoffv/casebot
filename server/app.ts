import { app } from "./server";
import { Response } from "express";
import refRoutes from './src/routes/ref.routes'
import paymentRoutes from './src/routes/payment.routes'
import casesRoutes  from './src/routes/cases.routes'
import usersRoutes from './src/routes/users.routes'
import cryptoRoutes from './src/routes/crypto.routes'
import allData from './src/routes/getAllData.routes'

app.get("/", (_, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.use('/api/payments', paymentRoutes);
app.use('/api/ref', refRoutes);
app.use("/api/cases", casesRoutes)
app.use("/api/user", usersRoutes)
app.use("/api/crypto", cryptoRoutes)
app.use("/api/getAllData", allData)