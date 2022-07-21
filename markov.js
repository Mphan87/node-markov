/** Textual markov chain generator */


class MarkovMachine {



  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) 
      
      chains.get(word).push(nextWord);


      
      else chains.set(word, [nextWord]);
    }

    this.chains = chains;
  }



  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }




  makeText(numWords = 100) {
    // pick a random key to begin
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    // produce markov chain until reaching termination word
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    return out.join(" ");
  }
}


module.exports = {
  MarkovMachine,
};




// You would basically split up the words into an array in the constructor! As for handling 
// the makeChains() method, inside of it you could create a JS object or a JS Map type, for example. 
// You would add each word as a key (keys in objects are unique too, so that could be a way to avoid duplicate entries, etc).

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map (Map is specifically 
// used in the solution code to create the chains)

// So, you would basically iterate over the array of split words, then, you would check if the specific word 
// is already added to the object/Map.

// If the word already exists in the object that you are creating (as a key), then you would extract the next 
// word (coming after in in the array) and push it as another value for that key.

// If the word isn't found as a key in the object, then you need to create that new key in the object/Map, and 
// add the next word following it as a single array element (value side).

// You would do that as you iterate over all the words in the array

// When you are done, you should have something along the lines of this 
// as a result: {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]}

// Then, in the makeText method you would figure out a way on how
//  to use this data structure choose random words followed by their chained words to create random text as a result!

// I hope that helps! Feel free to let us know if you have any 
// more doubts or questions about the exercise.
