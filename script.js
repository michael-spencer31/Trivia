json_data = [];
question_counter = 1;
answer_counter = 0;
user_score = 0;

function myFunction(){

    const category_id = new Map([
        ["General Knowledge", 9],
        ["Entertainment: Books", 10],
        ["Entertainment: Film", 11],
        ["Entertainment: Music", 12],
        ["Entertainment: Musicals & Theatres", 13],
        ["Entertainment: Television", 14],
        ["Entertainment: Video Games", 15],
        ["Entertainment: Board Games", 16],
        ["Science & Nature", 17],
        ["Science: Computers", 18],
        ["Science: Mathematics", 19],
        ["Mythology", 20],
        ["Sports", 21],
        ["Geography", 22],
        ["History", 23],
        ["Politics", 24],
        ["Art", 25],
        ["Celebrities", 26],
        ["Animals", 27],
    ]);
    
    var category = document.getElementById("standard-select");
    var value = category.options[category.selectedIndex].text;
    
    var id = category_id.get(value); 

    let request = new XMLHttpRequest();

    var amount = document.getElementById("amount").value;
    document.getElementById("trueanswer").addEventListener("click", () => trueAnswer(amount)); 
    document.getElementById("falseanswer").addEventListener("click", () => falseAnswer(amount));

    request.open("GET", "https://opentdb.com/api.php?amount=" + amount + "&category=" + id + "&type=boolean");
    request.send();

    request.onload = () => {
        console.log();

        if(request.status == 200){

            var json = JSON.parse(request.responseText);
            json_data = json;

            const amount_remove = document.getElementById("amount");
            const button_remove = document.getElementById("submit");
            const drop_remove = document.getElementById("standard-select1");
            drop_remove.remove();
            amount_remove.remove();
            button_remove.remove();

            let btn = document.getElementsByClassName('btn');
            let container = document.getElementsByClassName('container');

            console.log(json_data["results"]); 

            document.getElementById("results").innerHTML = json_data["results"][0]["question"] + "<br>";
        }else{
            console.log("Eror");
        }
    }
}
function trueAnswer(amount){

    answer_key = [];

    for(var i = 0; i < amount; i++){

        answer_key[i] = json_data["results"][i]["correct_answer"];
    }
    if(answer_key[answer_counter] === "True"){
        user_score++;
        document.getElementById("user_answer").innerHTML = "You got it right! Score: " + user_score;
    }else{
        document.getElementById("user_answer").innerHTML = "You got it wrong! Score: " + user_score;
    }
    document.getElementById("results").innerHTML = json_data["results"][question_counter]["question"] + "<br>";

    answer_counter++;
    question_counter++;
}
function falseAnswer(amount){

    answer_key = [];

    for(var i = 0; i < amount; i++){

        answer_key[i] = json_data["results"][i]["correct_answer"];
    }
    if(answer_key[answer_counter] === "False"){
        user_score++;
        document.getElementById("user_answer").innerHTML = "You got it right! Score: " + user_score;
    }else{
        document.getElementById("user_answer").innerHTML = "You got it wrong! Score: " + user_score;
    }
    document.getElementById("results").innerHTML = json_data["results"][question_counter]["question"] + "<br>";

    answer_counter++;
    question_counter++;
}
function gameOver(){

    const true_remove = document.getElementById("trueanswer");
    true_remove.remove();
    const false_remove = document.getElementById("falseanswer");
    false_remove.remove();
    const results_remove = doucment.getElementById("results");
    results_remove.remove();
}