// Player class represents a player in a team
class Player {
  // constructor method is called when a new Player object is created
  constructor(name, position) {
    // properties of the Player object
    this.name = name;
    this.position = position;
  }

  // describe method returns a string describing the player
  describe() {
    return `${this.name} plays ${this.position}`;
  }
}

// Team class represents a team of players
class Team {
  // constructor method is called when a new Team object is created
  constructor(name) {
    this.name = name;
    this.players = []; // an array to hold Player objects
  }

  // addPlayer method adds a Player object to the players array
  addPlayer(player) {
    if (player instanceof Player) {
      this.players.push(player);
    } else {
      throw new Error(`You can only add an instance of Player. 
argument is not a player: ${player}`);
    }
  }

  // describe method returns a string describing the team
  describe() {
    return `${this.name} has ${this.players.length} players.`;
  }
}

// Menu class represents the application menu
class Menu {
  constructor() {
    this.teams = []; // an array to hold Team objects
    this.selectedTeam = null; // the currently selected team
  }

  // start method is the entry point to the application
  start() {
    let selection = this.showMainMenuOptions();
    while (selection != 0) {
      switch (selection) {
        case "1":
          this.createTeam();
          break;
        case "2":
          this.viewTeam();
          break;
        case "3":
          this.deleteTeam();
          break;
        case "4":
          this.displayTeams();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions();
    }
    alert("Goodbye!");
  }

  // showMainMenuOptions method displays the main menu and returns the user's selection
  showMainMenuOptions() {
    return prompt(`
0) exit
1) create a new team
2) view a team
3) delete a team
4) display all teams
`);
  }

  // showTeamMenuOptions method displays the team menu and returns the user's selection
  showTeamMenuOptions(teamInfo) {
    return prompt(`
0) back
1) add a new player
2) delete a player
-----------------
${teamInfo}
`);
  }

  // displayTeams method displays all the teams
  displayTeams() {
    let teamString = "";
    for (let i = 0; i < this.teams.length; i++) {
      teamString += i + ") " + this.teams[i].name + "\n";
    }
    alert(teamString);
  }

  // createTeam method creates a new team and adds it to the teams array
  createTeam() {
    let name = prompt("Enter name for new team: ");
    this.teams.push(new Team(name));
  }

  // viewTeam method displays the details of a specific team
  viewTeam() {
    
    let index = prompt("Enter the index of the team that you want to view:");
    if (index > -1 && index < this.teams.length) {
      this.selectedTeam = this.teams[index];

      let description = "Team Name: " + this.selectedTeam.name + "\n";
      description += " " + this.selectedTeam.describe() + "\n ";

      for (let i = 0; i < this.selectedTeam.players.length; i++) {
        description +=
          i + ") " + this.selectedTeam.players[i].describe() + "\n";
      }
      
      let selection1 = this.showTeamMenuOptions(description);
      switch (selection1) {
        case "1":
          this.createPlayer();
          break;
        case "2":
          this.deletePlayer();
      }
    }
  }

  // deleteTeam method deletes a specific team from the teams array
  deleteTeam() {
    let index = prompt("Enter the index of the team that you wish to delete: ");
    if (index > -1 && index < this.teams.length) {
      this.teams.splice(index, 1);
    }
  }

  // createPlayer method creates a new player and adds it to the selected team
  createPlayer() {
    let name = prompt("Enter name for new player: ");
    let position = prompt("Enter position for new player: ");
    this.selectedTeam.addPlayer(new Player(name, position));
  }

  // deletePlayer method deletes a specific player from the selected team
  deletePlayer() {
    let index = prompt(
      "Enter the index of the player that you wish to delete: "
    );
    if (index > -1 && index < this.selectedTeam.players.length) {
      this.selectedTeam.players.splice(index, 1);
    }
  }
}

let menu = new Menu();
menu.start();