import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));
var userInputArray = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs");
});

app.post("/", (req, res) => {
    const buttonClicked = req.body.button;
    if(buttonClicked === "Submit" || buttonClicked === "Update"){
        const newTask = req.body["txt"];
        if(newTask.length > 0){
            if(buttonClicked === "Submit"){
                userInputArray.push(newTask);
            }
            else if(buttonClicked === "Update"){
                const taskNumberToUpdate = parseInt(req.body.taskNumberToUpdate, 10);
                userInputArray[taskNumberToUpdate] = newTask;
            }
        }
    }
    else if(buttonClicked === "Delete task"){
        const userChoiceToDeleteOrCancel = req.body.userChoiceToDeleteOrCancel;
        if(userChoiceToDeleteOrCancel === "OK"){
            const taskNumber = parseInt(req.body.taskNumber, 10);
            var newUserInputArray = [];
            for(var i = 0; i < userInputArray.length; i++){
                if(i !== taskNumber){
                    newUserInputArray.push(userInputArray[i]);
                }
            }
            userInputArray = newUserInputArray;
        }
    }

    else if(buttonClicked === "Edit task"){
        const taskNumberToUpdate = parseInt(req.body.taskNumber, 10);
        const initialValue = userInputArray[taskNumberToUpdate];
        res.render(__dirname + "/views/index.ejs", {userInputArray, initialValue, taskNumberToUpdate});
        return;
    }
    res.render(__dirname + "/views/index.ejs", { userInputArray});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});