class Group {
    constructor(name, description, participants) {
        this._name = name;
        this._description = description;
        this._participants = participants;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get participants(){
        return this._participants
    }

    set participants(value){
        this._participants=value;
    }
}

export default Group;