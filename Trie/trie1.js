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

    search(word){
        let node = this.root
        for(let char of word){
            if(!node.children[char]) return false
            node = node.children[char]
        }
        return node.isEndOfWord
    }

    startsWith(prefix){
        let node = this.root
        for(let char of prefix){
            if(!node.children[char]) return false
            node = node.children[char]
        }
        return true
    }

    delete(word){
        let node = this.root
        for(let char of word){
            if(!node.children[char]) return -1
            node = node.children[char]
        }

        if(node.isEndOfWord){
            node.isEndOfWord = false
        }else return -1
    }
}


const trie = new Trie()
trie.insert("cat")
trie.insert("can")
trie.insert("children")
trie.delete("can")
console.log(trie.search("can"))
console.log(trie.search("cat"))
console.log(trie.startsWith("aa"))
console.log(trie.startsWith("ca"))