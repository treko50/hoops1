var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const Player = require("./player.js");
const rp = require('request-promise');
const cheerio = require('cheerio');
const request = require('request');
const { each } = require('cheerio/lib/api/traversing');


function getTotalsByYear(url, collectionName)
{
    request(url,(error,response,html) => 
    {
        if(!error && response.statusCode == 200)
        {
            const $ = cheerio.load(html);
            
            const table = $('.full_table').each((i, x) => {
                
                const name = $(x).find( '[data-stat = "player"]').text()
                const pos = $(x).find('[data-stat = "pos"]').text()
                const age = parseInt($(x).find('[data-stat = "age"]').text())
                const team_id = $(x).find('[data-stat = "team_id"]').text()
                const g = parseInt($(x).find('[data-stat = "g"]').text())
                const gs = parseInt($(x).find('[data-stat = "gs"]').text())
                const mp = parseInt($(x).find('[data-stat = "mp"]').text())
                const fg = parseInt($(x).find('[data-stat = "fg"]').text())
                const fga = parseInt($(x).find('[data-stat = "fga"]').text())
                const fg_pct = $(x).find('[data-stat = "fg_pct"]').text()
                const fg3 = parseInt($(x).find('[data-stat = "fg3"]').text())
                const fg3a = parseInt($(x).find('[data-stat = "fg3a"]').text())
                const fg3_pct = $(x).find('[data-stat = "fg3_pct"]').text()
                const fg2 = parseInt($(x).find('[data-stat = "fg2"]').text())
                const fg2a = parseInt($(x).find('[data-stat = "fg2a"]').text())
                const fg2_pct = $(x).find('[data-stat = "fg2_pct"]').text()
                const efg_pct = $(x).find('[data-stat = "efg_pct"]').text()
                const ft = parseInt($(x).find('[data-stat = "ft"]').text())
                const fta = parseInt($(x).find('[data-stat = "fta"]').text())
                const ft_pct = $(x).find('[data-stat = "ft_pct"]').text()
                const orb = parseInt($(x).find('[data-stat = "orb"]').text())
                const drb = parseInt($(x).find('[data-stat = "drb"]').text())
                const trb = parseInt($(x).find('[data-stat = "trb"]').text())
                const ast = parseInt($(x).find('[data-stat = "ast"]').text())
                const stl = parseInt($(x).find('[data-stat = "stl"]').text())
                const blk = parseInt($(x).find('[data-stat = "blk"]').text())
                const tov = parseInt($(x).find('[data-stat = "tov"]').text())
                const pf = parseInt($(x).find('[data-stat = "pf"]').text())
                const pts = parseInt($(x).find('[data-stat = "pts"]').text())
    
                var player = {
                "Name" : name,
                 "Position": pos,
                 "Age" : age,
                 "Team_ID" : team_id,
                 "Games_Played" : g,
                 "Games_Started": gs,
                 "Minutes_Played":mp,
                 "Field_Goals_Made":fg,
                 "Field_Goals_Attempted": fga,
                 "Field_Goal_Percentage": fg_pct + "%",
                 "Three_Point_Field_Goals": fg3,
                 "Three_Point_Field_Goal_Attempts": fg3a,
                 "Three_Point_Field_Goal_Percentage": fg3_pct+ "%",
                 "Two_Point_Field_Goals_Made":fg2,
                 "Two_Point_Field_Goals_Attempted":fg2a,
                 "Two_Point_Field_Goal_Percentage":fg2_pct + "%",
                 "Effective_Field_Goal_Percentage":efg_pct + "%",
                 "Free_Throws_Made":ft,
                 "Free_Throws_Attempted":fta,
                 "Free_Throw_Percentage":ft_pct + "%",
                 "Offensive_Rebounds":orb,
                 "Defensive_Rebounds":drb,
                 "Total_Rebounds":trb,
                 "Assists":ast,
                 "Steals":stl,
                 "Blocks":blk,
                 "Turnovers":tov,
                 "Personal_Fouls":pf,
                 "Points":pts
            }
                db.collection(collectionName).doc(name).set(player);
                
            });
        }
    })
}

//  getTotalsByYear('https://www.basketball-reference.com/leagues/NBA_2021_totals.html', '2021_Stats');
//  getTotalsByYear('https://www.basketball-reference.com/leagues/NBA_2020_totals.html', '2020_Stats');
//  getTotalsByYear('https://www.basketball-reference.com/leagues/NBA_2019_totals.html', '2019_Stats');
//  getTotalsByYear('https://www.basketball-reference.com/leagues/NBA_2018_totals.html', '2018_Stats');
//  getTotalsByYear('https://www.basketball-reference.com/leagues/NBA_2017_totals.html', '2017_Stats');
//  getTotalsByYear('https://www.basketball-reference.com/leagues/NBA_2016_totals.html', '2016_Stats');
//  getTotalsByYear('https://www.basketball-reference.com/leagues/NBA_2015_totals.html', '2015_Stats');
//  getTotalsByYear('https://www.basketball-reference.com/leagues/NBA_2014_totals.html', '2014_Stats');
//  getTotalsByYear('https://www.basketball-reference.com/leagues/NBA_2013_totals.html', '2013_Stats');
//  getTotalsByYear('https://www.basketball-reference.com/leagues/NBA_2012_totals.html', '2012_Stats');
//  getTotalsByYear('https://www.basketball-reference.com/leagues/NBA_2011_totals.html', '2011_Stats');
//  getTotalsByYear('https://www.basketball-reference.com/leagues/NBA_2010_totals.html', '2010_Stats');
//  getTotalsByYear('https://www.basketball-reference.com/leagues/NBA_2009_totals.html', '2009_Stats');
//  getTotalsByYear('https://www.basketball-reference.com/leagues/NBA_2008_totals.html', '2008_Stats');
//  getTotalsByYear('https://www.basketball-reference.com/leagues/NBA_2007_totals.html', '2007_Stats');
//  getTotalsByYear('https://www.basketball-reference.com/leagues/NBA_2006_totals.html', '2006_Stats');
//  getTotalsByYear('https://www.basketball-reference.com/leagues/NBA_2005_totals.html', '2005_Stats');
//  getTotalsByYear('https://www.basketball-reference.com/leagues/NBA_2004_totals.html', '2004_Stats');
//  getTotalsByYear('https://www.basketball-reference.com/leagues/NBA_2003_totals.html', '2003_Stats');

async function getAverage()
{
    
    var playerTotals = [];
    try {
        
    
    var first = await db.collection('2021_Stats').get();
    first.forEach(doc => {
            const obj = doc.data();
            console.log(obj.Personal_Fouls)
            const name = obj.Name;
            const pos = obj.Position;
            const age = obj.Age;
            const team_id = obj.Team_ID;
            const  g = obj.Games_Played;
            const gs = obj.Games_Started;
            const mp = obj.Minutes_Played;
            const fg = obj.Field_Goals_Made;
            const fga = obj.Field_Goals_Attempted;
            const fg3 = obj.Three_Point_Field_Goals;
            const fg3a = obj.Three_Point_Field_Goal_Attempts;
            const fg2 = obj.Two_Point_Field_Goals_Made;
            const fg2a = obj.Two_Point_Field_Goals_Attempted;
            const ft = obj.Free_Throws_Made;
            const fta = obj.Free_Throws_Attempted;
            const orb = obj.Offensive_Rebounds;
            const drb = obj.Defensive_Rebounds;
            const trb = obj.Total_Rebounds;
            const ast = obj.Assists;
            const stl = obj.Steals;
            const blk = obj.Blocks;
            const tov = obj.Turnovers;
            const pf = obj.Personal_Fouls;
            const pts =obj.Points;
            
            
            var player1 = new Player(name, pos, age, team_id, g, gs, mp, fg, fga, fg3,fg3a, fg2, fg2a, ft, fta, orb, drb, trb, ast, stl, blk, tov, pf, pts, 1);
            // console.log(pos)
            console.log(player1.getName())
            playerTotals.push(player1);
    })

} catch (error) {
    console.log(error + " yeah its an error")
    return
}
async () => {
    try {
      const listOfCollections = await db.listCollections().toArray();
  
      for (const collection of listOfCollections) {
        if (collection.id != first.id) {
            collection.forEach(doc =>
                {
                    for(let i = 0; i< playerTotals.length; i++)
                     {
                        if (playerTotals[i].getName() == doc.Name)
                          {
                            playerTotals[i].setG(playerTotals[i].getG()+ parseInt(doc.Games_Played));
                            playerTotals[i].setGS(playerTotals[i].getGS()+parseInt(doc.Games_Started));
                            playerTotals[i].setMP(playerTotals[i].getMP()+parseInt(doc.Minutes_Played));
                            playerTotals[i].setFG(playerTotals[i].getFG()+parseInt(doc.Field_Goals_Made));
                            playerTotals[i].setFGA(playerTotals[i].getFGA()+parseInt(doc.Field_Goals_Attempted));
                            playerTotals[i].setFG3(playerTotals[i].getFG3()+parseInt(doc.Three_Point_Field_Goals));
                            playerTotals[i].setFG3A(playerTotals[i].getFG3A()+parseInt(doc.Three_Point_Field_Goal_Attempts));
                            playerTotals[i].setFG2(playerTotals[i].getFG2()+parseInt(doc.Two_Point_Field_Goals_Made));
                            playerTotals[i].setFG2A(playerTotals[i].getFG2A()+parseInt(doc.Two_Point_Field_Goals_Attempted))
                            playerTotals[i].setFT(playerTotals[i].getFT()+parseInt(doc.Free_Throws_Made))
                            playerTotals[i].setFTA(playerTotals[i].getFTA()+parseInt(doc.Free_Throws_Attempted))
                            playerTotals[i].setORB(playerTotals[i].getORB()+parseInt(doc.Offensive_Rebounds))
                            playerTotals[i].setDRB(playerTotals[i].getDRB()+ parseInt(doc.Defensive_Rebounds))
                            playerTotals[i].setTRB(playerTotals[i].getTRB()+parseInt(doc.Total_Rebounds))
                            playerTotals[i].setAST(playerTotals[i].getAST()+parseInt(doc.Assists))
                            playerTotals[i].setSTL(playerTotals[i].getSTL()+parseInt(doc.Steals))
                            playerTotals[i].setBLK(playerTotals[i].getBLK()+parseInt(doc.Blocks))
                            playerTotals[i].setTOV(playerTotals[i].getTOV()+parseInt(doc.Turnovers))
                            playerTotals[i].setPF(playerTotals[i].getPF()+parseInt(doc.Personal_Fouls))
                            playerTotals[i].setPTS(playerTotals[i].getPTS()+parseInt(doc.Points))
                            playerTotals[i].setYP(playerTotals[i].getYP()+parseInt(1))
                            
                          }
                     }
                }) 
            }
  
        }
    } catch (error) {
      console.error(error);
    }
  }

   
    for(let x = 0; x < playerTotals.length; x++)
    {
        var player = {
             "Name": playerTotals[x].getName(),
             "Games_Played" : playerTotals[x].getG(),
             "Field_Goal_Percentage": playerTotals[x].getFGPCT() + "%",
             "Three_Point_Field_Goal_Percentage": playerTotals[x].getFG3PCT()+ "%",
             "Two_Point_Field_Goal_Percentage":playerTotals[x].getFG2PCT() + "%",
             "Free_Throw_Percentage":playerTotals[x].getFTPCT() + "%",
             "Offensive_Rebounds":parseFloat(playerTotals[x].getORB()/playerTotals[x].getG()) ,
             "Defensive_Rebounds":parseFloat(playerTotals[x].getDRB()/ playerTotals[x].getG()),
             "Total_Rebounds":parseFloat(playerTotals[x].getTRB()/playerTotals[x].getG()),
             "Assists":parseFloat(playerTotals[x].getAST()/ playerTotals[x].getG()),
             "Steals":parseFloat(playerTotals[x].getSTL()/playerTotals[x].getG()),
             "Blocks":parseFloat(playerTotals[x].getBLK()/playerTotals[x].getG()),
             "Turnovers":parseFloat(playerTotals[x].getTOV()/playerTotals[x].getG()),
             "Personal_Fouls":parseFloat(playerTotals[x].getPF()/playerTotals[x].getG()),
             "Points":parseFloat(playerTotals[x].getPTS()/playerTotals[x].getG())
        }
            db.collection("Career Averages").doc(playerTotals[x].getName()).set(player);
    }
 
}
getAverage()



/*
const url1 = 'https://www.basketball-reference.com/leagues/NBA_2020_totals.html';

// const Player = require('./player.js')
const Totals = require('./career-totals')
request(url1,(error,response,html) => 
{
    if(!error && response.statusCode == 200)
    {
        const $ = cheerio.load(html);
        const table = $('.full_table').each((i, x) => {

            
            
           
            // console.log(player.getName())
        });
    }
})


// function totals2019(){

    // const rp = require('request-promise');
    // const cheerio = require('cheerio');
    // const request = require('request');
    // const { each } = require('cheerio/lib/api/traversing');
    const url2 = 'https://www.basketball-reference.com/leagues/NBA_2019_totals.html';
    
    // const Player = require('./player.js')
    // const Totals = require('./career-totals')
    request(url2,(error,response,html) => 
    {
        if(!error && response.statusCode == 200)
        {
            const $ = cheerio.load(html);
            const table = $('.full_table').each((i, x) => {
    
                const name = $(x).find( '[data-stat = "player"]').text()
                const pos = $(x).find('[data-stat = "pos"]').text()
                const age = parseInt($(x).find('[data-stat = "age"]').text())
                const team_id = $(x).find('[data-stat = "team_id"]').text()
                const g = parseInt($(x).find('[data-stat = "g"]').text())
                const gs = parseInt($(x).find('[data-stat = "gs"]').text())
                const mp = parseInt($(x).find('[data-stat = "mp"]').text())
                const fg = parseInt($(x).find('[data-stat = "fg"]').text())
                const fga = parseInt($(x).find('[data-stat = "fga"]').text())
                // const fg_pct = $(x).find('[data-stat = "fg_pct"]').text()
                const fg3 = parseInt($(x).find('[data-stat = "fg3"]').text())
                const fg3a = parseInt($(x).find('[data-stat = "fg3a"]').text())
                // const fg3_pct = $(x).find('[data-stat = "fg3_pct"]').text()
                const fg2 = parseInt($(x).find('[data-stat = "fg2"]').text())
                const fg2a = parseInt($(x).find('[data-stat = "fg2a"]').text())
                // const fg2_pct = $(x).find('[data-stat = "fg2_pct"]').text()
                // const efg_pct = $(x).find('[data-stat = "efg_pct"]').text()
                const ft = parseInt($(x).find('[data-stat = "ft"]').text())
                const fta = parseInt($(x).find('[data-stat = "fta"]').text())
                // const ft_pct = $(x).find('[data-stat = "ft_pct"]').text()
                const orb = parseInt($(x).find('[data-stat = "orb"]').text())
                const drb = parseInt($(x).find('[data-stat = "drb"]').text())
                const trb = parseInt($(x).find('[data-stat = "trb"]').text())
                const ast = parseInt($(x).find('[data-stat = "ast"]').text())
                const stl = parseInt($(x).find('[data-stat = "stl"]').text())
                const blk = parseInt($(x).find('[data-stat = "blk"]').text())
                const tov = parseInt($(x).find('[data-stat = "tov"]').text())
                const pf = parseInt($(x).find('[data-stat = "pf"]').text())
                const pts = parseInt($(x).find('[data-stat = "pts"]').text())
                
                for(let i = 0; i< playerTotals.length; i++)
                {
                    if (playerTotals[i].getName() == name)
                    {
                        playerTotals[i].setG(playerTotals[i].getG()+G);
                        playerTotals[i].setGS(playerTotals[i].getGS()+GS);
                        playerTotals[i].setMP(playerTotals[i].getMP()+MP);
                        playerTotals[i].setFG(playerTotals[i].getFG()+FG);
                        playerTotals[i].setFGA(playerTotals[i].getFGA()+FGA);
                        playerTotals[i].setFG3(playerTotals[i].getFG3()+FG3);
                        playerTotals[i].setFG3A(playerTotals[i].getFG3A()+FG3A);
                        playerTotals[i].setFG2(playerTotals[i].getFG2()+FG2);
                        playerTotals[i].setFG2A(playerTotals[i].getFG2A()+FG2A)
                        playerTotals[i].setFT(playerTotals[i].getFT()+FT)
                        playerTotals[i].setFTA(playerTotals[i].getFTA()+FTA)
                        playerTotals[i].setORB(playerTotals[i].getORB()+ORB)
                        playerTotals[i].setDRB(playerTotals[i].getDRB()+ DRB)
                        playerTotals[i].setTRB(playerTotals[i].getTRB()+TRB)
                        playerTotals[i].setAST(playerTotals[i].getAST()+AST)
                        playerTotals[i].setSTL(playerTotals[i].getSTL()+STL)
                        playerTotals[i].setBLK(playerTotals[i].getBLK()+BLK)
                        playerTotals[i].setTOV(playerTotals[i].getTOV()+TOV)
                        playerTotals[i].setPF(playerTotals[i].getPF()+PF)
                        playerTotals[i].setPTS(playerTotals[i].getPTS()+PTS)
                    }
    
                }
                
               
                // console.log(player.getName())
            });
        }
    })
    // }
    */