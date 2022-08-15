import Knex from "knex";
const option = {
    client: "sqlite3",
    connection: {
        filename: "./mydb.sqlite",
    },
    useNullAsDefault: true,
};

const knex = Knex(option);

knex.schema.hasTable("employee").then(function (exists) {
    console.log({ exists });
    if (!exists) {
        knex.schema
            .createTable("employee", function (table) {
                table.string("id");
                table.string("name");
                table.string("email");
                table.string("department");
                table.string("employment");
                table.string("document");
            })
            .then((res) => console.log("Create table success"))
            .catch((err) => console.log(err));
    }
});

export default knex;
