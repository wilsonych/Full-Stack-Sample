import formidable from "formidable";
import knex from "../../db/knex";

export const config = {
    api: {
        bodyParser: false,
    },
};

async function post(req, res) {
    const form = new formidable.IncomingForm({
        uploadDir: "./upload",
        filename: (name, ext, part) => `${req.query.id}_${part.originalFilename}`,
    });
    form.parse(req, async function (err, fields, files) {
        let employee = fields;
        if (files.document) {
            employee.document = files.document.filepath;
        }
        save(employee);
        
    });

    form.once("end", () => {
        console.log("Done!");
        return res.status(201).send("success");
    });
}

async function save(employee) {
    knex("employee")
        .insert(employee)
        .then((res) => console.log({ res }))
        .catch((err) => console.log({ err }));
}


export default (req, res) => {
    if(req.method === "POST") return post(req, res)
    return res.status(404).send("")
};
