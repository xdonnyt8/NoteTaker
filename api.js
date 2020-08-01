var db = require("./db/db.json")
var fs = require("fs");

module.exports = function (app) {


    app.get("/api/notes", (req, res) => {
        console.log("get")
        let json = getData()
        res.json(json);
    });
    app.get("/api/notes/:id", (req, res) => {
        let notes = getData()
        console.log(req.params.id)
        res.json(notes[Number(req.params.id)])
        
    })

    app.post("/api/notes", function (req, res) {
        console.log("post")
        let json = getData()
        let newObj = {
            title: req.body.title,
            text: req.body.text
        }
        json.push(newObj)
        saveData(json)
    });

    app.delete("/api/notes/:id", (req, res) => {
        let newId = req.params.id
        console.log(req.params.id)

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
