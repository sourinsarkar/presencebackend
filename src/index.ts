import express, { Application} from "express";
import cors from "cors";
import { router as countryRoutes } from "./routes/countryRoutes";
import { router as platformRoutes } from "./routes/platfofrmRoutes";
import { router as availabilityRoutes } from "./routes/availabilityRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app: Application = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/countries", countryRoutes);
app.use("/api/platforms", platformRoutes);
app.use("/api/availability", availabilityRoutes);

// Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on the PORT ${PORT}`);
});