import { Router } from 'express';
import { DB } from '../models/Database.js'; 

router.get("/cadastro", (req, res) => {
    res.render("create");
  });
  
  router.post("/create", async (req, res) => {
    const { name, email, description, cpf, date, time } = req.body;
  
    try {
      await DB.Create(name, email, description, cpf, date, time);
      res.redirect("/");
    } catch (err) {
      console.error(err);
      res.send("Ocorreu uma falha!");
    }
  });
  
  router.get("/getcalendar", async (req, res) => {
    const vacations = await DB.GetAll(false);
    res.json(vacations);
  });
  
  export default router