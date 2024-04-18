const items = new Map();
items.set("berries", false);
items.set("gift", false);
items.set("note", false);


class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // (X) TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // (X) TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // (X)TODO: use `key` to get the data object for the current story location
        this.engine.show(this.engine.storyData.Locations[key].Body); // (X)TODO: replace this text by the Body of the location data

        if(key == "Rock"){ 
            items.set("note",true);
        }
        if(key == "Berries"){
            items.set("berries",true);
        }
        if(key == "Tree Hollow"){
            items.set("gift",true);
        }


        if(this.engine.storyData.Locations[key].Choices) { // (X) TODO: check if the location has any Choices
            for(let choice of this.engine.storyData.Locations[key].Choices) { // (X)TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // (X) TODO: use the Text of the choice
                // (X)TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }

        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            if(choice.Requirements){                
                if(items.get(choice.Requirements[0]) == true){
                    this.engine.show("&gt; "+choice.Text);
                    this.engine.gotoScene(Location, choice.Target);
                }
                else{
                    this.engine.gotoScene(Location, choice.TargetFailed);
                }
            }   
            else{
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(Location, choice.Target);
            } 
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');