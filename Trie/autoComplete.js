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

    autoComplete(prefix){
        let node = this.root
        for(let char of prefix){
            if(!node.children[char]) return false
            node = node.children[char]
        }

        const queue = [[node,prefix]]
        const result = []

        while(queue.length){
            const [currentNode,word] = queue.shift()

            if(currentNode.isEndOfWord){
                result.push(word)
            }

            for(let char in currentNode.children){
                queue.push([currentNode.children[char],word+char])
            }
        }

        return result
    }
}