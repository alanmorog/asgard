
import cors from "cors";
import express from "express";



// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-3340026957331073-123102-4ef590c5390f78494b86610149728e00-182663982' });


const app = express();
const port = 3000;

app.use(cors());


app.use(express.json());

app.get("/", (req, res) => {
    res.send("soy el server");
});


app.post("/create_preference", async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "ARS",
                },
            ],
            back_urls: {
                success: "https://github.com/alanmorog/asgard",
                failure: "https://github.com/alanmorog/asgard",
                pending: "https://github.com/alanmorog/asgard",
            },
            auto_return: "approved",
        };
        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json({
            id: result.id,
        });
    } catch {
        console.log(error);
        res.status(500).json({
            error: "Error al crear la preferencia :("
        });
    }
})

app.listen(port, () => {
    console.log(`el servidor esta corriendo en el puerto ${port}`);
});