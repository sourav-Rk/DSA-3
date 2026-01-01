class TrieNode {
    constructor(){
        this.children = {}
        this.isEndOfWord = false
    }
}

class Trie {
    constructor(){
        this.root = new TrieNode()
    }

    insert(word){
        let node = this.root
        for(let char of word){
            if(!node.children[char]){   
                node.children[char] = new TrieNode()
            }
            node = node.children[char]
        }
        node.isEndOfWord = true
    }

    longestPrefix(){
        let node = this.root
        let prefix = ""
        while(node && !node.isEndOfWord && Object.keys(node.children).length === 1){
            let char = Object.keys(node.children)[0]
            prefix+=char
            node = node.children[char]
        }
        return prefix
    }
}

const trie = new Trie()
trie.insert("flow")
trie.insert("flower")
trie.insert("flowing")
trie.insert("flight")
console.log(trie.longestPrefix())