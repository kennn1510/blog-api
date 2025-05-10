import "dotenv/config";
import express from "express";
import expressSession from "express-session";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
// import passport from "./config/passport-config.js";
import routes from "./routes/index.js";

const app = express();
const prisma = new PrismaClient();

app.use(
  expressSession({
    secret: "Some Secret Value", // ??? trying the new stuff out!
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 10 * 60 * 1000, // 10 minutes
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 30 days
    },
  })
);
// app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function main() {
  const users = await prisma.user.findMany();
  console.log(users);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

app.use("/", routes.home);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
