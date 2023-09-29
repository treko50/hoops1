class Player{

    #yearsPlayed;
    #name;
    #pos;
    #age;
    #team_id;
    #g;
    #gs;
    #mp;
    #fg;
    #fga;
    // #fg_pct;
    #fg3;
    #fg3a;
    // #fg3_pct;
    #fg2;
    #fg2a;
    // #fg2_pct;
    // #efg_pct;
    #ft;
    #fta;
    // #ft_pct;
    #orb;
    #drb;
    #trb;
    #ast;
    #stl;
    #blk;
    #tov;
    #pf;
    #pts;

    constructor(name, pos, age, team_id, g, gs, mp, fg, fga, fg3, fg3a, fg2, fg2a, ft, fta, orb, drb, trb, ast, stl, blk, tov, pf, pts, yearsPlayed){

    //private fields need # before the var name  
   
    this.#name = name;
    this.#pos = pos;
    this.#age = age;
    this.#team_id = team_id;
    this.#g = g;
    this.#gs = gs;
    this.#mp = mp;
    this.#fg = fg;
    this.#fga = fga;
    // this.#fg_pct = fg_pct;
    this.#fg3 = fg3;
    this.#fg3a =fg3a;
    // this.#fg3_pct = fg3_pct;
    this.#fg2 = fg2;
    this.#fg2a = fg2a;
    // this.#fg2_pct= fg2_pct;
    // this.#efg_pct = efg_pct;
    this.#ft = ft;
    this.#fta = fta;
    // this.#ft_pct = ft_pct;
    this.#orb = orb;
    this.#drb = drb;
    this.#trb = trb;
    this.#ast = ast;
    this.#stl = stl;
    this.#blk = blk;
    this.#tov = tov;
    this.#pf = pf;
    this.#pts = pts;
    this.#yearsPlayed = yearsPlayed;
    }

    getName(){
        return this.#name;
    }

    getPos(){
        return this.#pos;
    }
 
    getAge(){
        return this.#age;
    }

    getTeamID(){
        return this.#team_id;
    }


    getG(){ //games played 
        return this.#g
    }

    getGS(){
        return this.#gs
    }

    getMP(){
        return this.#mp
    }

    getFG(){
        return this.#fg
    }

    getFGA(){ //FieldGo
        return this.#fga
    }

    getFGPCT(){
        return this.#fg/this.#fga;
    }

    getFG3(){
        return this.#fg3
    }

    getFG3A(){
        return this.#fg3a
    }

    getFG3PCT(){
        return this.#fg3/this.#fg3a;
    }

    getFG2(){
        return this.#fg2
    }

    getFG2A(){
        return this.#fg2a
    }

    getFG2PCT(){
        return this.#fg2a/this.#fg3a;
    }

    // getEFGPCT(){
    //     return this.#efg_pct
    // }

    getFT(){
        return this.#ft
    }

    getFTA(){
        return this.#fta
    }

    getFTPCT(){
        return this.#ft/this.#fta;
    }

    getORB(){
        return this.#orb
    }

    getDRB(){
        return this.#drb
    }

    getTRB(){
        return this.#trb
    }

    getAST(){
        return this.#ast
    }

    getBLK(){
        return this.#blk
    }
    
    getSTL(){
        return this.#stl
    }

    getTOV(){
        return this.#tov
    }

    getPF(){
        return this.#pf
    }

    getPTS(){
        return this.#pts
    }
    getYP()
    {
        return this.#yearsPlayed
    }

//////////////////////////////////////////////////////Setters/////////////////////////////////////////////////////

    setG(games){ //games played 
        return this.#g = games;
    }

    setGS(games){
        return this.#gs = games;
    }

    setMP(MP){
        return this.#mp = MP;
    }

    setFG(FG){
        return this.#fg = FG;
    }

    setFGA(FGA){ //FieldGo
        return this.#fga = FGA;
    }

    setFG3(FG3){
        return this.#fg3 = FG3;
    }

    setFG3A(FG3A){
        return this.#fg3a = FG3A;
    }

    setFG2(FG2){
        return this.#fg2 = FG2;
    }

    setFG2A(FG2A){
        return this.#fg2a = FG2A;
    }

    setFT(FT){
        return this.#ft = FT;
    }

    setFTA(FTA){
        return this.#fta = FTA;
    }

    setORB(ORB){
        return this.#orb = ORB;
    }

    setDRB(DRB){
        return this.#drb = DRB;
    }
    
    setTRB(TRB){
        return this.#trb = TRB;
    }

    setAST(AST){
        return this.#ast = AST;
    }
    setBLK(BLK){
        return this.#blk = BLK;
    }
    setSTL(STL){
        return this.#stl = STL;
    }

    setTOV(TOV){
        return this.#tov = TOV;
    }

    setPF(PF){
        return this.#pf = PF;
    }

    setPTS(PTS){
        return this.#pts = PTS;
    }
    setYP(YP)
    {
        return this.#yearsPlayed = YP;
    }
}

module.exports = Player

//for testing purposes 
// function makePlayer(){
//     var player1 = new Player("Ali", "C", 25, "TOR", 82, 82, 3936, 50000, 50000, 10000,10000, 40000,40000, 1,1,1,1,1,1,1,1,1,1,110000,1);
//     console.log(player1.getName())
//     player1.setAST(2);
//     console.log(player1.getAST())
// }

// makePlayer();