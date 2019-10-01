const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        let node = new Node(data);
        if (!this._head) {
            this._head = node;
            this._tail = node;
        } else {
            node["prev"] = this._tail;
            this._tail["next"] = node;
            this._tail = node
        }
        this.length ++;
        return node;
    }

    head() {
        return this._head["data"];
    }

    tail() {
        return this._tail["data"];
    }

    at(index) {
        const search = (tail, currentIndex = 0) => {
            if (currentIndex === index) return tail["data"];
            return search(tail["next"], currentIndex + 1)
        };
        return search(this._head)
    }

    insertAt(index, data) {
        const node = new Node(data);
        const search = (tail, currentIndex = 0) => {
            if (index === 0) {
                this._head["prev"] = node;
                node["next"] = this._head;
                this._head = node;
                return this._head;
            } else if (currentIndex === index) {
                node["prev"] = tail["prev"];
                tail["prev"]["next"] = node;
                node["next"] = tail;
                tail["prev"] = node;
                this.length ++;
                return this._head;
            } else {
                return search(tail["next"], currentIndex + 1)
            }
        };
        return search(this._head)
    };

    isEmpty() {
        return !this.length;
    }

    clear() {
        let node = new Node();
        this.length = 0;
        this._head = node;
        this._tail = node;
    }

    deleteAt(index) {
        let current = this._head;
        let count = 1;
        if( index === 0 ) {
            this._head = this._head["next"];
            this._head["prev"] = null;
            return this._head;
        } else {
            while( current ) {
                current = current["next"];
                if ( current === this._tail ) {
                    this._tail = this._tail["prev"];
                    this._tail["next"] = null;
                    this.length -=1;
                    return this._head;
                } else if( count === index ) {
                    current["prev"]["next"] = current["next"];
                    current["next"]["prev"] = current["prev"];
                    this.length -=1;
                    return current;
                }
                count++;
            }
        }
    }

    reverse() {
        const helper = (current, prev = null) => {
            if (current === null) {
                this._tail = this._head;
                this._head = prev;
                return this._head;
            }
            let next = current["next"];
            current["next"] = prev;
            current["prev"] = next;
            prev = current;
            current = next;

            return helper(current, prev);
        };
        return helper(this._head);
    }

    indexOf(data) {
        const search = (tail, currentIndex = 0) => {
            if (tail["data"] === data) return currentIndex;
            if (tail["next"] === null && tail["data"] !== data) return -1;
            return search(tail["next"], currentIndex + 1)
        };
        return search(this._head)
    }
}

module.exports = LinkedList;
