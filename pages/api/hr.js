import jwt from "jsonwebtoken";
import knex from "../../db/knex";
const tokens = {};

export async function get(req, res) {
    
    try {
        if (!req.headers.authorization) throw new Error("Token required");
        const token = req.headers.authorization;
        //console.log({ tokens,token });
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        if (tokens[decoded.id] != token) throw new Error("Token not match");
        return knex.select("*")
            .from("employee")
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            });
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
}

function post(req, res) {
    const { id, password } = req.body;
    console.log({ id, password });
    if (!id || !password) return res.status(500).send("ID and password required");
    if (id == process.env.USERNAME && password == process.env.PASSWORD) {
        const token = jwt.sign({ id: id, password: password }, process.env.PRIVATE_KEY);
        tokens[id] = token;
        console.log({ token });
        return res.status(200).send(token);
    }else{
        return res.status(500).send("ID or password not match");
    }
}

export default (req, res) => {
    if(req.method === "POST") return post(req, res)
    if(req.method === "GET") return get(req, res)
    return res.status(404).send("")
};
