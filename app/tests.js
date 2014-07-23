/**
 * Created by maxwellzirbel on 7/19/14.
 */

function hi() {
    var zip = 12345;
    var age = 22;
    var q1 = 'yes';
    var q2 = 'no';
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'brendancwood.com/lincolnLabHackathonVoting/tropo.html?zip=' + zip + '&age=' + age + '&q1=' + q1 + '&q2=' + q2, false);
    xmlHttp.send(null);
}

hi();