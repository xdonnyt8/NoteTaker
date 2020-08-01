var fs = require("fs");

module.exports = function (app) {


    app.get("/api/notes", (req, res) => {
        let json = getData()
        res.json(json);
    });

    app.post("/api/notes", function (req, res) {
        let json = getData()
        let id = json.length.toString();
        req.body.id = id
        json.push(req.body)
        saveData(json)
        res.json(json);
    });

    app.delete("/api/notes/:id", (req, res) => {
        let notes = getData();
        let noteID = req.params.id;
        let newID = 0;
        notes = notes.filter(currId => {
            return currId.id != noteID;
        })
        for (currId of notes) {
            currId.id = newID.toString();
            newID++;
        }
        saveData(notes)
        res.json(notes);

    });

    function getData() {
        let string = JSON.parse(fs.readFileSync(__dirname + '/db/db.json'))
        return string
    }
    function saveData(notes) {
        let data = JSON.stringify(notes)
        fs.writeFileSync(__dirname + '/db/db.json', data, err => {
            if (err) throw err
        })
    }

}
